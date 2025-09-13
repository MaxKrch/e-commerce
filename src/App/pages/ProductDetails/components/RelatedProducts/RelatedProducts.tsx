import clsx from "clsx"
import CardList from "components/CardList"
import { memo } from "react"
import type { ProductResponseShort } from "types/product"
import style from './RelatedProducts.module.scss';
import Text from "components/Text";
import previewCardContentSlot from "components/Card/slots/previewCardContentSlot";
import previewCardActionSlot from "components/Card/slots/previewCardActionSlot";

export type RelatedProductsProps = {
    products: ProductResponseShort[]
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
    return (
        <div className={clsx(style['container'])}>
            <Text
                color="primary"
                weight="bold"
                className={clsx(style['title'])}
            >
                Related Items
            </Text>
            <CardList
                display="preview"
                products={products}
                contentSlot={previewCardContentSlot}
                actionSlot={previewCardActionSlot}
            />
        </div>
    )
}

RelatedProducts.displayName = "RelatedProducts";
export default memo(RelatedProducts);