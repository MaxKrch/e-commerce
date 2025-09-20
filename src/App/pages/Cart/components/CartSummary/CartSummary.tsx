import clsx from "clsx";
import React from "react";
import style from './CartSummary.module.scss';
import { observer } from "mobx-react-lite";
import useRootStore from "context/root-store/useRootStore";
import Text from "components/Text";
import Button from "components/Button";

const CartSummary: React.FC = () => {
    const { cartStore } = useRootStore()
    return (
        <section className={clsx(style['summary'])}>
            <Text>Сумма заказ: {cartStore.totalPrice} руб.</Text>
            <Button>Перейти к оплате</Button>
        </section>
    )
}

export default observer(CartSummary);