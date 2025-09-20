import useRootStore from 'context/root-store/useRootStore';
import { useCallback, useEffect } from 'react';

const useInitApp = () => {
  const rootStore = useRootStore();

  useEffect(() => {
    rootStore.categoriesStore.fetchCategories();
    rootStore.cartStore.fetchCart();
  }, [rootStore]);

  const reset = useCallback(() => {
    rootStore.categoriesStore.fetchCategories();
    rootStore.cartStore.fetchCart();
  }, [rootStore]);

  return {
    reset,
  };
};

export default useInitApp;
