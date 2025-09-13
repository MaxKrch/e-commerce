import Card from "components/Card";
import { memo } from "react";
import type { ProductResponseShort } from "types/product"

export type ProductCardProps = {
    product: ProductResponseShort;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Card product={product} />
    )
}

ProductCard.displayName = "ProductCard";
export default memo(ProductCard)