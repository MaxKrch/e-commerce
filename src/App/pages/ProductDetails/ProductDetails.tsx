import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import productApi from 'services/product-api';
import type { Product } from 'types/products';
import { isStrapiSuccessResponse } from 'types/strapi-api';

import ProductCard from './components/ProductCard';
import RelatedProducts from './components/RelatedProducts';
import StepBack from './components/StepBack';
import { metaData } from './config';
import { REQUEST_STATUS, type RequestStatus } from 'constants/request-status';

const ProductDetailsPage = () => {
  const params = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const productAbortCntr = useRef<AbortController | null>(null);
  const [requestProductStatus, setRequestProductStatus] = useState<RequestStatus>(REQUEST_STATUS.IDLE);

  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const relatedProductsAbortCntr = useRef<AbortController | null>(null);
  const [requestRelatedProductsStatus, setRequestRelatedProductsStatus] = useState<RequestStatus>(REQUEST_STATUS.IDLE);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [params.id])

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
      setRelatedProducts([]);
      productAbortCntr.current = new AbortController();
      setRequestProductStatus(REQUEST_STATUS.IDLE);

      try {
        const response = await productApi.getProductDetails({
          request: { id: params.id },
          signal: productAbortCntr.current.signal,
        });

        if (response instanceof Error) {
          throw response;
        }

        if (response.data.documentId === params.id) {
          setProduct(response.data);
          setRequestProductStatus(REQUEST_STATUS.SUCCESS)
        } else {
          setRequestProductStatus(REQUEST_STATUS.IDLE)
        }

      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setRequestProductStatus(REQUEST_STATUS.ERROR);
        }
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
      setRequestRelatedProductsStatus(REQUEST_STATUS.PENDING)
      relatedProductsAbortCntr.current = new AbortController();
      const releatedProductId = params.id;

      try {
        const response = await productApi.getProductList({
          request: { pageSize: 3 },
          signal: relatedProductsAbortCntr.current.signal,
        });

        if (response instanceof Error) {
          throw response;
        }

        if (releatedProductId === params.id) {
          setRelatedProducts(response.data);
          setRequestRelatedProductsStatus(REQUEST_STATUS.SUCCESS);
        } else {
          setRequestRelatedProductsStatus(REQUEST_STATUS.IDLE)
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setRequestRelatedProductsStatus(REQUEST_STATUS.ERROR);
        }
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
      {<ProductCard requestStatus={requestProductStatus} product={product} />}
      {<RelatedProducts requestStatus={requestRelatedProductsStatus} products={relatedProducts} />}
    </div>
  );
};

export default ProductDetailsPage;
