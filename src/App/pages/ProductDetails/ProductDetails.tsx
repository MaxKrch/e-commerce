import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import productApi from 'services/product-api';
import type { Product } from 'types/product';
import { isStrapiSuccessResponse } from 'types/strapi-api';

import ProductCard from './components/ProductCard';
import RelatedProducts from './components/RelatedProducts';
import StepBack from './components/StepBack';
import { metaData } from './config';

const ProductDetailsPage = () => {
  const params = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const productAbortCntr = useRef<AbortController | null>(null);
  const [, setRequestProductError] = useState<Error | null>(null);

  const [relatedProducts, setRelatedProducts] = useState<Product[] | null>(null);
  const relatedProductsAbortCntr = useRef<AbortController | null>(null);
  const [, setRequestRelatedProductsError] = useState<Error | null>(null);

  useEffect(() => {
    const clearProductAbortCntrl = () => {
      if (productAbortCntr.current) {
        productAbortCntr.current.abort();
      }
    };

    const requestProduct = async () => {
      if (!params.id) return;

      clearProductAbortCntrl();
      setProduct(null);
      setRelatedProducts(null);
      productAbortCntr.current = new AbortController();

      try {
        const response = await productApi.getProductDetails({
          request: { id: params.id },
          signal: productAbortCntr.current.signal,
        });

        if (response instanceof Error) {
          throw response;
        }

        if (!isStrapiSuccessResponse<Product>(response.data)) {
          throw new Error('Unknown error');
        }

        setRequestProductError(null);

        if (response.data.data.documentId === params.id) {
          setProduct(response.data.data);
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') setRequestProductError(err);
      }
    };

    requestProduct();

    return () => clearProductAbortCntrl();
  }, [params]);

  useEffect(() => {
    const clearRelatedProductsAbortCntrl = () => {
      if (relatedProductsAbortCntr.current) {
        relatedProductsAbortCntr.current.abort();
      }
    };

    const requestRelatedProducts = async () => {
      clearRelatedProductsAbortCntrl();
      relatedProductsAbortCntr.current = new AbortController();

      try {
        const releatedProductId = params.id;
        const response = await productApi.getProductList({
          request: { pageSize: 3 },
          signal: relatedProductsAbortCntr.current.signal,
        });

        if (response instanceof Error) {
          throw response;
        }

        if (!isStrapiSuccessResponse<Product[]>(response.data)) {
          throw new Error('Unknown Error');
        }

        setRequestRelatedProductsError(null);

        if (releatedProductId === params.id) {
          setRelatedProducts(response.data.data);
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') setRequestRelatedProductsError(err);
      }
    };

    requestRelatedProducts();

    return () => clearRelatedProductsAbortCntrl();
  }, [product, params.id]);

  return (
    <div>
      <Helmet>
        <title>{metaData.title(product?.title)}</title>
      </Helmet>
      <StepBack />
      {product && <ProductCard product={product} />}
      {relatedProducts && <RelatedProducts products={relatedProducts} />}
    </div>
  );
};

export default ProductDetailsPage;
