import { appRoutes } from 'constants/app-routes';

import clsx from 'clsx';
import Button from 'components/Button';
import useRootStore from 'context/root-store/useRootStore';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from 'types/products';

import style from '../ProductCard.module.scss';

const ActionSlot: React.FC<{ product: Product }> = ({ product }) => {
  const { cartStore } = useRootStore();
  const navigate = useNavigate();

  const handleSecondBtn = useCallback(
    (product: Product) => {
      cartStore.addToCart(product);
    },
    [cartStore]
  );

  const handlePrimaryBtn = useCallback(
    (product: Product) => {
      cartStore.addToCart(product);
      navigate(appRoutes.cart.create());
    },
    [cartStore, navigate]
  );

  return (
    <div className={clsx(style['action-slot'])}>
      <Button onClick={() => handlePrimaryBtn(product)}>Купить</Button>
      <Button priority="secondary" onClick={() => handleSecondBtn(product)}>
        В корзину
      </Button>
    </div>
  );
};

export default observer(ActionSlot);
