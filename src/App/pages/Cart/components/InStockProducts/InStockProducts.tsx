import clsx from "clsx";
import type React from "react";
import style from './InStockProducts.module.scss';
import { observer } from "mobx-react-lite";
import useRootStore from "context/root-store/useRootStore";
import Card from "components/Card";

const InStockProducts: React.FC = () => {
    const { cartStore } = useRootStore()

    return (
        <section className={clsx(style['summary'])}>
            <h2>
                Доступно для заказа
            </h2>
            <ul>
                {cartStore.inStockProducts.map(item => (
                    <li key={item.product.id}>
                        <Card product={item.product} display="cart" />
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default observer(InStockProducts);