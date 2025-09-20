import type React from "react";
import InStockProducts from "./components/InStockProducts";
import OutOfStock from "./components/OutOfStockProducts";
import CartSummary from "./components/CartSummary";
import clsx from "clsx";
import style from './Cart.module.scss'
import useRootStore from "context/root-store/useRootStore";
import { META_STATUS } from "constants/meta-status";
import Skeleton from "./components/Skeleton";
import NetworkError from "components/NetworkError";
import defaultContentSlot from "components/NetworkError/slots/defaultContentSlot";
import defaultActionSlot from "components/NetworkError/slots/defaultActionSlot";
import { useCallback } from "react";
import { observer } from "mobx-react-lite";

const CartPage: React.FC = () => {
  const { cartStore } = useRootStore();
  const handleErrorClick = useCallback(() => {
    cartStore.fetchCart()
  }, [cartStore.fetchCart])
  console.log(cartStore.status, cartStore)
  return (
    <div className={clsx(style['container'])}>
      {<Skeleton />}
      {cartStore.status === META_STATUS.ERROR &&
        <NetworkError
          contentSlot={defaultContentSlot()}
          actionSlot={defaultActionSlot(handleErrorClick)} />
      }
      {/* {cartStore.status === META_STATUS.SUCCESS &&
        <>
          <InStockProducts />
          <OutOfStock />
          <CartSummary />
        </>
      } */}
    </div>
  )
};

export default observer(CartPage);
