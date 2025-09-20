import Button from 'components/Button';
import useRootStore from 'context/root-store/useRootStore';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import type { Product } from 'types/products';
import type { ActionSlot } from '../types';

const PreviewCardActionSlot: ActionSlot = ({ product }) => {
  const { cartStore } = useRootStore()
  const handleClick = useCallback((product: Product) => {
    cartStore.handleAddToCart(product)
  }, [cartStore.handleAddToCart, product]);

  return <Button onClick={() => handleClick(product)}>В корзину</Button>;
};

export default observer(PreviewCardActionSlot);
