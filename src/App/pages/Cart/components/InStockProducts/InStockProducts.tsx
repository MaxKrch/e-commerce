import clsx from "clsx";
import type React from "react";
import style from './InStockProducts.module.scss';
import { observer } from "mobx-react-lite";
import useRootStore from "context/root-store/useRootStore";
import Card from "components/Card";
import Text from "components/Text";
import InStockActionSlot from "../slots/InStockActionSlot";

const InStockProducts: React.FC = () => {
    const { cartStore } = useRootStore()

    return (
        <section className={clsx(style['container'])}>
            <ul className={clsx(style['list'])}>
                {cartStore.inStockProducts.map(item => (
                    <li key={item.product.id}>
                        <Card
                            className={clsx(style['card'])}
                            product={item.product}
                            display="cart"
                            contentSlot={
                                () => <Text className={clsx(style['content-slot'])}>${item.product.price}</Text>
                            }
                            ActionSlot={() => <InStockActionSlot product={item.product} />}
                        />
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default observer(InStockProducts);