import clsx from "clsx";
import type React from "react";
import style from './OutOfStockProducts.module.scss';
import { observer } from "mobx-react-lite";
import useRootStore from "context/root-store/useRootStore";
import Card from "components/Card";

const OutOfStock: React.FC = () => {
    const { cartStore } = useRootStore()
    return (
        <section className={clsx(style['outofstock'])}>
            {cartStore.outOfStockProducts.length > 0 &&
                <>
                    <h2>
                        Товары закончились
                    </h2>
                    <ul>
                        {cartStore.outOfStockProducts.map(item => (
                            <li key={item.product.id}>
                                <Card product={item.product} display="cart" />
                            </li>
                        ))}
                    </ul>
                </>
            }
        </section>
    )
}

export default observer(OutOfStock);