import type { ProductResponseShort } from "types/product"
import type { ProductListProps } from ".";
import Text from "components/Text";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { appRoutes } from "consts/app-routes";
import Card from "components/Card";
import Button from "components/Button";

type ProductListProps = {
    products: ProductResponseShort[];
}

const ProductList = ({ products }: ProductListProps) => {
    const navigate = useNavigate()
    const handleCartClick = useCallback((id: ProductResponseShort['id']) => {
        navigate(`${appRoutes.products.details.create(id)}`)
    }, [products])

    const handleButtonClick = useCallback((id: ProductResponseShort['id']) => {

    }, [products])

    return (
        <div>
            <div>
                <Text>
                    Total products
                </Text>
                <Text>
                    {products.length}
                </Text>
            </div>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <Card
                            image={product.images[0].url}
                            captionSlot={product.images[0].caption}
                            title={product.title}
                            subtitle={product.description}
                            contentSlot={product.price}
                            onClick={() => handleCartClick(product.id)}
                            actionSlot={
                                <Button onClick={() => handleButtonClick(product.id)}>
                                    Add to Cart
                                </Button>
                            }
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProductList;