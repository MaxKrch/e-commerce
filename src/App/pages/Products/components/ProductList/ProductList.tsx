import type { ProductResponseShort } from "types/product"
import type { ProductListProps } from ".";
import Text from "components/Text";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { appRoutes } from "consts/app-routes";
import Card from "components/Card";
import Button from "components/Button";
import style from './ProductList.module.scss';
import { clsx } from "clsx";

type ProductListProps = {
    products: ProductResponseShort[];
}

const ProductList = ({ products }: ProductListProps) => {
    const navigate = useNavigate()
    const handleCartClick = useCallback((id: ProductResponseShort['id']) => {
        navigate(`${appRoutes.products.details.create(id)}`)
    }, [products])

    const handleButtonClick = useCallback((_id: ProductResponseShort['id']) => {

    }, [products])

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
                    {products.length}
                </Text>
            </div>
            <ul className={clsx(style['list'])}>
                {products.map(product => (
                    <li key={product.id}>
                        <Card
                            className={clsx(style['card'])}
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