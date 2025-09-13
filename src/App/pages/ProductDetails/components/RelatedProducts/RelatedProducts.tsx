import CardList from "components/CardList"
import { memo } from "react"
import type { ProductResponseShort } from "types/product"

export type RelatedProductsProps = {
    products: ProductResponseShort[]
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
    return (
        <CardList display="preview" products={products} />
    )
}

RelatedProducts.displayName = "RelatedProducts";
export default memo(RelatedProducts);