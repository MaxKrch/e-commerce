import { META_STATUS } from 'constants/meta-status';

import clsx from 'clsx';
import NetworkError from 'components/NetworkError';
import defaultActionSlot from 'components/NetworkError/slots/defaultActionSlot';
import defaultContentSlot from 'components/NetworkError/slots/defaultContentSlot';
import useRootStore from 'context/root-store/useRootStore';
import { observer } from 'mobx-react-lite';
import type React from 'react';

import style from './Cart.module.scss';
import CartSummary from './components/CartSummary';
import InStockProducts from './components/InStockProducts';
import OutOfStock from './components/OutOfStockProducts';
import Skeleton from './components/Skeleton';

const CartPage: React.FC = () => {
  const { cartStore } = useRootStore();

  return (
    <div className={clsx(style['container'])}>
      {(cartStore.status === META_STATUS.PENDING || cartStore.status === META_STATUS.IDLE) && (
        <Skeleton />
      )}
      {cartStore.status === META_STATUS.ERROR && (
        <NetworkError
          contentSlot={defaultContentSlot()}
          actionSlot={defaultActionSlot(cartStore.fetchCart)}
        />
      )}
      {cartStore.status === META_STATUS.SUCCESS && (
        <>
          <InStockProducts />
          <OutOfStock />
          <CartSummary />
        </>
      )}
    </div>
  );
};

export default observer(CartPage);
