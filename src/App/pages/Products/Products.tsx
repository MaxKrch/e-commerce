import Pagination from 'components/Pagination';
import SectionHeader from 'components/SectionHeader';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import productApi from 'services/product-api';
import type { Product } from 'types/products';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import { metaData, textData } from './config';
import { META_STATUS, type MetaStatus } from 'constants/meta-status';


const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [MetaStatus, setMetaStatus] = useState<MetaStatus>(META_STATUS.IDLE)
  const [QueryParams, setQueryParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(Number(QueryParams.get('page')) || 1);
  const [pageCount, setPageCount] = useState<number | undefined>(undefined);
  const [productsTotal, setProductsTotal] = useState<number | undefined>(undefined);
  const lastRequestSignal = useRef<AbortController | null>(null);

  const handleChangePage = useCallback(
    (page: number) => {
      if (page !== currentPage) {
        const newQueryParams = new URLSearchParams(QueryParams);
        newQueryParams.set('page', `${page}`);
        setQueryParams(newQueryParams);
        setCurrentPage(page);
      }
    },
    [currentPage, QueryParams, setQueryParams]
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
        setMetaStatus(META_STATUS.PENDING);
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

        setPageCount(response.meta.pagination.pageCount);
        setProducts(response.data);
        setProductsTotal(response.meta.pagination.total);
        setMetaStatus(META_STATUS.SUCCESS)
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setMetaStatus(META_STATUS.ERROR)
        }
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
      <ProductSearch />
      <ProductList products={products} total={productsTotal} MetaStatus={MetaStatus} />
      <Pagination currentPage={currentPage} pageCount={pageCount} onClick={handleChangePage} />
    </div>
  );
};

export default ProductsPage;
