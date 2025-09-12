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
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
    const [pageCount, setPageCount] = useState<number | null>(null);
    const lastRequestSignal = useRef<AbortController | null>(null)

    const handleChangePage = useCallback((page: number) => {
        if (page !== currentPage) {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('page', `${page}`)
            setSearchParams(newSearchParams)
            setCurrentPage(page);
        }
    }, [currentPage, searchParams, setSearchParams])


    const abortLastRequest = useCallback(() => {
        if (lastRequestSignal.current) {
            lastRequestSignal.current.abort()
        }
    }, [])

    useEffect(() => {
        const getProducts = async () => {
            abortLastRequest()
            lastRequestSignal.current = new AbortController()
            try {
                const response = await productApi.getProductList({
                    request: { page: currentPage },
                    signal: lastRequestSignal.current.signal
                })

                if (response instanceof Error) {
                    setProducts([])
                } else {
                    if (isStrapiSuccessResponse<ProductResponseShort[]>(response.data)) {
                        setPageCount(response.data.meta.pagination.pageCount);
                        setProducts(response.data.data);
                    }
                }
            } catch (err) {
                if (err instanceof Error && err.name !== 'AbortError') setProducts([])
            }
        }
        getProducts()

        return () => abortLastRequest()
    }, [currentPage])

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
                currentPage={currentPage}
                pageCount={pageCount}
                onClick={handleChangePage}
            />
        </div>
    )
}

export default ProductsPage;