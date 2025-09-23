import { META_STATUS } from 'constants/meta-status';

import NetworkError from 'components/NetworkError';
import defaultActionSlot from 'components/NetworkError/slots/defaultActionSlot';
import defaultContentSlot from 'components/NetworkError/slots/defaultContentSlot';
import useRootStore from 'context/root-store/useRootStore';
import useProductStore from 'hooks/useProductStore';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import ProductCard from './components/ProductCard';
import RelatedProducts from './components/RelatedProducts';
import StepBack from './components/StepBack';
import { metaData } from './config';

const ProductDetailsPage = () => {
  const params = useParams();
  const lastRequestedProduct = useRef<string | null>(null)
  const productDetailsStore = useProductStore();
  const { productsStore } = useRootStore();
  const isErrorProductDetails =
    productDetailsStore.status === META_STATUS.ERROR ||
    (productDetailsStore.status === META_STATUS.SUCCESS &&
      productDetailsStore.product?.documentId !== params.id);

  useEffect(() => {
    if (params.id && params.id !== lastRequestedProduct.current) {
      productDetailsStore.fetchProduct(params.id);
      lastRequestedProduct.current = params.id
    }
  }, [params.id, productDetailsStore]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [params.id]);

  const hadleRetryFetchProduct = useCallback(() => {
    if (params.id) {
      productDetailsStore.fetchProduct(params.id);
    }
  }, [params.id, productDetailsStore]);

  const hadleRetryFetchRelatedProducts = useCallback(() => {
    if (productDetailsStore.product) {
      productsStore.fetchProducts({
        categories: [productDetailsStore.product.productCategory.id],
      });
      return;
    }

    if (params.id) {
      productDetailsStore.fetchProduct(params.id);
    }
  }, [params.id, productDetailsStore, productsStore]);

  return (
    <div>
      <Helmet>
        <title>{metaData.title()}</title>
      </Helmet>
      <StepBack />
      {isErrorProductDetails ? (
        <NetworkError
          contentSlot={defaultContentSlot()}
          actionSlot={defaultActionSlot(hadleRetryFetchProduct)}
        />
      ) : (
        <ProductCard product={productDetailsStore.product} status={productDetailsStore.status} />
      )}
      {productsStore.status === META_STATUS.ERROR ? (
        <NetworkError
          contentSlot={defaultContentSlot()}
          actionSlot={defaultActionSlot(hadleRetryFetchRelatedProducts)}
        />
      ) : (
        <RelatedProducts />
      )}
    </div>
  );
};

export default observer(ProductDetailsPage);
