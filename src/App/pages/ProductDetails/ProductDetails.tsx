import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import productApi from "services/product-api";
import type { ProductResponseFull, ProductResponseShort } from "types/product";
import { isStrapiSuccessResponse } from "types/strapi-api";
import { metaData } from "./config";

const ProductDetailsPage = () => {
    const params = useParams()

    const [product, setProduct] = useState<ProductResponseFull | null>(null)
    const productAbortCntr = useRef<AbortController | null>(null)
    const [_requestProductError, setRequestProductError] = useState<Error | null>(null)

    const [relatedProducts, setRelatedProducts] = useState<ProductResponseShort[] | null>(null)
    const relatedProductsAbortCntr = useRef<AbortController | null>(null)
    const [_requestRelatedProductsError, setRequestRelatedProductsError] = useState<Error | null>(null)

    useEffect(() => {
        const clearProductAbortCntrl = () => {
            if (productAbortCntr.current) {
                productAbortCntr.current.abort()
            }
        }

        const requestProduct = async () => {
            if (!params.id) return;

            clearProductAbortCntrl()
            productAbortCntr.current = new AbortController()

            try {
                const response = await productApi.getProductDetails({
                    request: { id: params.id },
                    signal: productAbortCntr.current.signal
                })

                if (response instanceof Error) {
                    throw response;
                }

                if (!isStrapiSuccessResponse<ProductResponseFull>(response.data)) {
                    throw new Error('Unknown error')
                }

                setRequestProductError(null)

                if (response.data.data.documentId === params.id) {
                    setProduct(response.data.data)
                }

            } catch (err) {
                if (err instanceof Error && err.name !== 'AbortError') setRequestProductError(err)
            }
        }

        requestProduct()

        return () => clearProductAbortCntrl();

    }, [params])

    useEffect(() => {
        const clearRelatedProductsAbortCntrl = () => {
            if (relatedProductsAbortCntr.current) {
                relatedProductsAbortCntr.current.abort()
            }
        }

        const requestRelatedProducts = async () => {
            clearRelatedProductsAbortCntrl()
            relatedProductsAbortCntr.current = new AbortController()

            try {
                const releatedProductId = params.id;
                const response = await productApi.getProductList({
                    request: { pageSize: 3 },
                    signal: relatedProductsAbortCntr.current.signal
                })

                if (response instanceof Error) {
                    throw response
                }

                if (!isStrapiSuccessResponse<ProductResponseShort[]>(response.data)) {
                    throw new Error('Unknown Error')
                }

                setRequestRelatedProductsError(null)

                if (releatedProductId === params.id) {
                    setRelatedProducts(response.data.data)
                }

            } catch (err) {

            }
        }

        requestRelatedProducts()

        return () => clearRelatedProductsAbortCntrl();
    }, [product])

    return (
        <div>
            <Helmet>
                <title>
                    {metaData.title(product?.title)}
                </title>
            </Helmet>

        </div>
    )
}

export default ProductDetailsPage;