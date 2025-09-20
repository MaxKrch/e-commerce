import useRootStore from 'context/root-store/useRootStore';
import { useLocalStore } from 'mobx-react-lite';
import ProductStore from 'store/local/ProductStore';

const useProductStore = () => {
  const rootStore = useRootStore();
  const productStore = useLocalStore(
    () =>
      new ProductStore({
        rootStore,
      })
  );

  return {
    product: productStore.product,
    requestid: productStore.requestId,
    status: productStore.status,
    fetchProduct: productStore.fetchProduct,
    resetProduct: productStore.resetProduct,
  };
};

export default useProductStore;
