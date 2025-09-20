import clsx from 'clsx';
import Button from 'components/Button';
import { observer } from 'mobx-react-lite';
import type { Product } from 'types/products';

import style from '../ProductCard.module.scss';
import { useCallback } from 'react';
import useRootStore from 'context/root-store/useRootStore';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from 'constants/app-routes';

const ActionSlot: React.FC<{ product: Product }> = ({ product }) => {
  const { cartStore } = useRootStore();
  const navigate = useNavigate()

  if (!product) {
    return null;
  }
  const handleSecondBtn = useCallback((product: Product) => {
    cartStore.handleAddToCart(product);
  }, [cartStore.handleAddToCart, product]);

  const handlePrimaryBtn = useCallback((product: Product) => {
    cartStore.handleAddToCart(product);
    navigate(appRoutes.cart.create())
  }, [cartStore.handleAddToCart, product]);

  return (
    <div className={clsx(style['action-slot'])}>
      <Button onClick={() => handlePrimaryBtn(product)}>Купить сразу</Button>
      <Button priority="secondary" onClick={() => handleSecondBtn(product)}>
        В корзину
      </Button>
    </div>
  );
};

export default observer(ActionSlot);
