import { useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import RelatedProducts from './components/RelatedProducts';
import StepBack from './components/StepBack';
import { metaData } from './config';
import { META_STATUS } from 'constants/meta-status';
import useProductStore from 'hooks/useProductStore';
import useRootStore from 'context/root-store/useRootStore';
import NetworkError from 'components/NetworkError';
import defaultContentSlot from 'components/NetworkError/slots/defaultContentSlot';
import defaultActionSlot from 'components/NetworkError/slots/defaultActionSlot';
import { observer } from 'mobx-react-lite';

const ProductDetailsPage = () => {
  const params = useParams();
  const productDetailsStore = useProductStore()
  const { productsStore } = useRootStore()
  const isErrorProductDetails = productDetailsStore.status === META_STATUS.ERROR
    || (productDetailsStore.status === META_STATUS.SUCCESS && productDetailsStore.product?.documentId !== params.id)

  useEffect(() => {
    if (params.id) {
      productDetailsStore.fetchProduct(params.id);
    }
  }, [params.id, productDetailsStore.fetchProduct])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [params.id])

  const hadleRetryFetchProduct = useCallback(() => {
    if (params.id) {
      productDetailsStore.fetchProduct(params.id);
    }
  }, [params.id, productDetailsStore.fetchProduct])

  const hadleRetryFetchRelatedProducts = useCallback(() => {
    if (productDetailsStore.product) {
      productsStore.fetchProducts({
        categories: [productDetailsStore.product.productCategory.id]
      });
      return;
    }

    if (params.id) {
      productDetailsStore.fetchProduct(params.id)
    }
  }, [params.id])

  return (
    <div>
      <Helmet>
        <title>{metaData.title()}</title>
      </Helmet>
      <StepBack />
      {isErrorProductDetails
        ? <NetworkError contentSlot={defaultContentSlot()} actionSlot={defaultActionSlot(hadleRetryFetchProduct)} />
        : <ProductCard product={productDetailsStore.product} status={productDetailsStore.status} />
      }
      {productsStore.status === META_STATUS.ERROR
        ? <NetworkError contentSlot={defaultContentSlot()} actionSlot={defaultActionSlot(hadleRetryFetchRelatedProducts)} />
        : <RelatedProducts />
      }
    </div>
  );
};

export default observer(ProductDetailsPage);
