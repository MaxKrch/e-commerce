import SectionHeader from "components/SectionHeader";
import { useCallback, useEffect, useRef, useState } from "react";
import productApi from "services/product-api";
import ProductSearch from "./components/ProductSearch";
import ProductFilter from "./components/ProductFilter";
import type { ProductResponseShort } from "types/product";
import { useSearchParams } from "react-router-dom";
import { isStrapiSuccessResponse } from "types/strapi-api";
import ProductList from "./components/ProductList";
import Pagination from "components/Pagination";

const TEXT_DATA = {
    TITLE: 'Products',
    CONTENT: 'We display products based on the latest products we have, if you want to see our old products please enter the name of the item'
}

const ProductsPage = () => {
    const [products, setProducts] = useState<ProductResponseShort[]>([]);
    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = useRef<string | null>(searchParams.get('page'))

    const handleChangePage = useCallback((page: string) => {
        if (page !== currentPage.current) {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('page', page)
            setSearchParams(newSearchParams)
            currentPage.current = page;
        }
    }, [currentPage.current, searchParams])

    const lastRequestSignal = useRef<AbortController | null>(null)
    const abortLastRequest = useCallback(() => {
        if (lastRequestSignal.current) {
            lastRequestSignal.current.abort()
        }
    }, [lastRequestSignal.current])

    useEffect(() => {
        const getProducts = async () => {
            abortLastRequest()
            const response = await productApi.getProductList({ request: { page: Number(currentPage.current ?? 1) } })
            if (response instanceof Error) {
                setProducts([])
            } else {
                if (isStrapiSuccessResponse<ProductResponseShort[]>(response.data)) setProducts(response.data.data)
            }
        }
        getProducts()

        return () => abortLastRequest()
    }, [currentPage.current])

    return (
        <div>
            <SectionHeader
                title={TEXT_DATA.TITLE}
                content={TEXT_DATA.CONTENT}
            />
            <ProductSearch onSearch={() => { }} />
            <ProductFilter />
            <ProductList products={products} />
            <Pagination
                currentPage={currentPage.current}
                onClick={handleChangePage}
            />
        </div>
    )
}

export default ProductsPage;