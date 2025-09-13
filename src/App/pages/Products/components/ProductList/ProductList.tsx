import type { ProductResponseShort } from "types/product"
import type { ProductListProps } from ".";
import Text from "components/Text";
import { memo, useCallback } from "react";
import Button from "components/Button";
import style from './ProductList.module.scss';
import { clsx } from "clsx";
import CardList from "components/CardList";

type ProductListProps = {
    products: ProductResponseShort[];
    total?: number
}

const ProductList = ({ products, total }: ProductListProps) => {
    const handleClick = useCallback((_id: ProductResponseShort['documentId']) => {
    }, [])

    const actionSlot = useCallback((id: ProductResponseShort['documentId']) => (
        <Button onClick={() => handleClick(id)}>
            Add to Cart
        </Button>
    ), [handleClick])

    const contentSlot = useCallback((product: ProductResponseShort) => (
        <Text
            color="primary"
            view="p-18"
            weight="bold"
        >
            ${product.price}
        </Text>
    ), [])

    return (
        <div className={clsx(style['container'])}>
            <div className={clsx(style['count'])}>
                <Text
                    color="primary"
                    weight="bold"
                    className={clsx(style['count__title'])}
                >
                    Total products
                </Text>
                <Text
                    view="p-20"
                    color="secondary"
                    className={clsx(style['count__size'])}
                >
                    {total || products.length}
                </Text>
            </div>
            <CardList
                display="preview"
                products={products}
                contentSlot={contentSlot}
                actionSlot={actionSlot}
            />
        </div>
    )
}

ProductList.displayName = "ProductList"
export default memo(ProductList);