import Pagination from "components/Pagination";
import useRootStore from "context/root-store/useRootStore";
import { observer } from "mobx-react-lite";
import type React from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import setQueryParams from "utils/set-query-params";

const ProductPagination: React.FC = () => {
    const { productsStore } = useRootStore();
    const pagination = productsStore.pagination;

    const [queryParams] = useSearchParams();
    const currentPage = useMemo(() => {
        return Number(queryParams.get('page') ?? 1)
    }, [queryParams]);

    const handleClick = useCallback((page: number) => {

        // setQueryParams({
        //     page,
        // })

    }, [pagination])

    if (!pagination) {
        return null
    }

    return (
        <Pagination
            currentPage={currentPage}
            onClick={handleClick}
            pageCount={pagination?.pageCount}
        />
    )
}

export default observer(ProductPagination);