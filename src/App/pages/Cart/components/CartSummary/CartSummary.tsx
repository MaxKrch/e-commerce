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
        <section className={clsx(style['container'])}>
            <Text tag="h3" color="primary" className={clsx(style['title'])}>Ваша корзина:</Text>
            <div className={clsx(style['total'])}>
                <Text className={clsx(style['total-title'])}>Всего товаров:</Text>
                <Text className={clsx(style['total-value'])}>{cartStore.totalItemsToOrder}</Text>
            </div>
            <div className={clsx(style['total'])}>
                <Text className={clsx(style['total-title'])}>Сумма заказа:</Text>
                <Text className={clsx(style['total-value'])}>${cartStore.totalPrice}</Text>
            </div>
            <Button className={clsx(style['button'])}>Перейти к оплате</Button>
        </section>
    )
}

export default observer(CartSummary);