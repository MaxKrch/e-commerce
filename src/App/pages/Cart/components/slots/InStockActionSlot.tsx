import clsx from "clsx";
import useRootStore from "context/root-store/useRootStore";
import type { Product } from "types/products";
import style from '../../Cart.module.scss'
import Button from "components/Button";
import { observer } from "mobx-react-lite";

const InStockActionSlot: React.FC<{ product: Product }> = ({ product }) => {
    const { cartStore } = useRootStore();
    if (!product) {
        return null;
    }

    return (
        <div className={clsx(style['action-slot'])}>
            <Button onClick={() => cartStore.addToCart(product)}>Добавить</Button>
            <Button priority="secondary" onClick={() => cartStore.removeFromCart(product)}>
                Удалить
            </Button>
        </div>
    );
};

export default observer(InStockActionSlot);