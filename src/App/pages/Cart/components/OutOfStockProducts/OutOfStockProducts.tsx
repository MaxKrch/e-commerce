import clsx from "clsx";
import type React from "react";
import style from './OutOfStockProducts.module.scss';
import { observer } from "mobx-react-lite";
import useRootStore from "context/root-store/useRootStore";
import Card from "components/Card";
import OutOfStockActionSlot from "../slots/OutOfStockActionSlot";
import Text from "components/Text";

const OutOfStock: React.FC = () => {
    const { cartStore } = useRootStore()

    if (cartStore.outOfStockProducts.length === 0) {
        return null;
    }

    return (
        <section className={clsx(style['container'])}>
            <Text tag="h2" className={clsx(style['title'])}>
                Эти товары закончились:
            </Text>
            <ul className={clsx(style['list'])}>
                {cartStore.inStockProducts.map(item => (
                    <li key={item.product.id}>
                        <Card
                            className={clsx(style['card'])}
                            product={item.product}
                            display="cart"
                            ActionSlot={() => <OutOfStockActionSlot product={item.product} />}
                        />
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default observer(OutOfStock);