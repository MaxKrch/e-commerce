import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import productApi from 'services/product-api';
import type { Product } from 'types/products';

import ProductCard from './components/ProductCard';
import RelatedProducts from './components/RelatedProducts';
import StepBack from './components/StepBack';
import { metaData } from './config';
import { META_STATUS, type MetaStatus } from 'constants/meta-status';

const ProductDetailsPage = () => {
  const params = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const productAbortCntr = useRef<AbortController | null>(null);
  const [requestProductStatus, setRequestProductStatus] = useState<MetaStatus>(META_STATUS.IDLE);

  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const relatedProductsAbortCntr = useRef<AbortController | null>(null);
  const [requestRelatedProductsStatus, setRequestRelatedProductsStatus] = useState<MetaStatus>(META_STATUS.IDLE);

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
      setRequestProductStatus(META_STATUS.IDLE);

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
          setRequestProductStatus(META_STATUS.SUCCESS)
        } else {
          setRequestProductStatus(META_STATUS.IDLE)
        }

      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setRequestProductStatus(META_STATUS.ERROR);
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
      setRequestRelatedProductsStatus(META_STATUS.PENDING)
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
          setRequestRelatedProductsStatus(META_STATUS.SUCCESS);
        } else {
          setRequestRelatedProductsStatus(META_STATUS.IDLE)
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setRequestRelatedProductsStatus(META_STATUS.ERROR);
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
      {<ProductCard MetaStatus={requestProductStatus} product={product} />}
      {<RelatedProducts MetaStatus={requestRelatedProductsStatus} products={relatedProducts} />}
    </div>
  );
};

export default ProductDetailsPage;
