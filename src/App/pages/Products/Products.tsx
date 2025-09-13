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
import { metaData, textData } from "./config";
import { Helmet } from "react-helmet-async";



const ProductsPage = () => {
    const [products, setProducts] = useState<ProductResponseShort[]>([]);
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
    const [pageCount, setPageCount] = useState<number | undefined>(undefined);
    const [productsTotal, setProductsTotal] = useState<number | undefined>(undefined);
    const lastRequestSignal = useRef<AbortController | null>(null)
    const [_requestError, setRequestError] = useState<Error | null>(null)

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
                    request: {
                        page: currentPage,
                        pageSize: 9,
                    },
                    signal: lastRequestSignal.current.signal
                })

                if (response instanceof Error) {
                    throw response
                }

                if (!isStrapiSuccessResponse<ProductResponseShort[]>(response.data)) {
                    throw new Error('Unknown Error')
                }

                setPageCount(response.data.meta.pagination.pageCount);
                setProducts(response.data.data);
                setProductsTotal(response.data.meta.pagination.total)

            } catch (err) {
                if (err instanceof Error && err.name !== 'AbortError') setRequestError(err)
            }
        }
        getProducts()

        return () => abortLastRequest()
    }, [currentPage])

    return (
        <div>
            <Helmet>
                <title>
                    {metaData.title()}
                </title>
            </Helmet>
            <SectionHeader
                title={textData.title()}
                content={textData.description()}
            />
            <ProductSearch onSearch={() => { }} />
            <ProductFilter />
            <ProductList
                products={products}
                total={productsTotal}
            />
            <Pagination
                currentPage={currentPage}
                pageCount={pageCount}
                onClick={handleChangePage}
            />
        </div>
    )
}

export default ProductsPage;