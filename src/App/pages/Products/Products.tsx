import Pagination from 'components/Pagination';
import SectionHeader from 'components/SectionHeader';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import productApi from 'services/product-api';
import type { Product } from 'types/product';
import { isStrapiSuccessResponse } from 'types/strapi-api';

import ProductFilter from './components/ProductFilter';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import { metaData, textData } from './config';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [pageCount, setPageCount] = useState<number | undefined>(undefined);
  const [productsTotal, setProductsTotal] = useState<number | undefined>(undefined);
  const lastRequestSignal = useRef<AbortController | null>(null);
  const [, setRequestError] = useState<Error | null>(null);

  const handleChangePage = useCallback(
    (page: number) => {
      if (page !== currentPage) {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('page', `${page}`);
        setSearchParams(newSearchParams);
        setCurrentPage(page);
      }
    },
    [currentPage, searchParams, setSearchParams]
  );

  useEffect(() => {
    const abortLastRequest = () => {
      if (lastRequestSignal.current) {
        lastRequestSignal.current.abort();
      }
    };

    const getProducts = async () => {
      abortLastRequest();
      lastRequestSignal.current = new AbortController();

      try {
        const response = await productApi.getProductList({
          request: {
            page: currentPage,
            pageSize: 9,
          },
          signal: lastRequestSignal.current.signal,
        });

        if (response instanceof Error) {
          throw response;
        }

        if (!isStrapiSuccessResponse<Product[]>(response.data)) {
          throw new Error('Unknown Error');
        }

        setPageCount(response.data.meta.pagination.pageCount);
        setProducts(response.data.data);
        setProductsTotal(response.data.meta.pagination.total);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') setRequestError(err);
      }
    };
    getProducts();

    return () => abortLastRequest();
  }, [currentPage]);

  return (
    <div>
      <Helmet>
        <title>{metaData.title()}</title>
      </Helmet>
      <SectionHeader title={textData.title()} content={textData.description()} />
      <ProductSearch onSearch={() => undefined} />
      <ProductFilter />
      <ProductList products={products} total={productsTotal} />
      <Pagination currentPage={currentPage} pageCount={pageCount} onClick={handleChangePage} />
    </div>
  );
};

export default ProductsPage;
