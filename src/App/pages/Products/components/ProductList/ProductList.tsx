import type { ProductResponseShort } from "types/product"
import type { ProductListProps } from ".";
import Text from "components/Text";
import { memo } from "react";
import style from './ProductList.module.scss';
import { clsx } from "clsx";
import CardList from "components/CardList";
import previewCardActionSlot from "components/Card/slots/previewCardActionSlot";
import previewCardContentSlot from "components/Card/slots/previewCardContentSlot";

type ProductListProps = {
    products: ProductResponseShort[];
    total?: number
}

const ProductList = ({ products, total }: ProductListProps) => {
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
                contentSlot={previewCardContentSlot}
                actionSlot={previewCardActionSlot}
            />
        </div>
    )
}

ProductList.displayName = "ProductList"
export default memo(ProductList);