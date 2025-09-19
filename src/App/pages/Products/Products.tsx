import SectionHeader from 'components/SectionHeader';
import { useCallback, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import { metaData, textData } from './config';
import { META_STATUS } from 'constants/meta-status';
import useRootStore from 'context/root-store/useRootStore';
import NetworkError from 'components/NetworkError';
import { observer } from 'mobx-react-lite';
import defaultContentSlot from 'components/NetworkError/slots/defaultContentSlot';
import defaultActionSlot from 'components/NetworkError/slots/defaultActionSlot';
import ProductPagination from './components/ProductPagination';
import useQueryParams from 'hooks/useQueryParams';

const ProductsPage = () => {
  const { queryParams } = useQueryParams()
  const currentRequestid = useRef<string | null>(null);
  const { productsStore } = useRootStore()

  const refetch = useCallback(() => {
    productsStore.fetchProducts({
      ...queryParams,
      count: 9
    })
  }, [queryParams])

  const isFailedRequest = productsStore.status === META_STATUS.ERROR
    || (productsStore.status === META_STATUS.SUCCESS && productsStore.requestId !== currentRequestid.current)

  useEffect(() => {
    const id = crypto.randomUUID();
    currentRequestid.current = id;

    productsStore.fetchProducts({
      ...queryParams,
      count: 9
    }, id);

    return () => {
      currentRequestid.current = null;
    }
  }, [queryParams])


  return (
    <div>
      <Helmet>
        <title>{metaData.title()}</title>
      </Helmet>
      <SectionHeader title={textData.title()} content={textData.description()} />
      {
        isFailedRequest
          ? <NetworkError contentSlot={defaultContentSlot()} actionSlot={defaultActionSlot(refetch)} />
          : (<>
            <ProductSearch />
            <ProductList />
            <ProductPagination />
          </>
          )
      }
    </div>
  );
};

export default observer(ProductsPage);
