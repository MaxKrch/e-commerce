import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import type { QueryParams } from "types/query-params";

const useQueryParams = () => {
    const [params, setParams] = useSearchParams();

    const queryParams: QueryParams = useMemo(() => {
        const parsedParams: QueryParams = {};

        const categories = params.getAll("categories");

        parsedParams.categories = categories.length > 0
            ? categories.map(Number)
            : undefined;

        const query = params.get("query");
        if (query && query.length > 0) {
            parsedParams.query = query;
        }

        const page = params.get("page");
        if (page) {
            parsedParams.page = Number(page);
        }

        const count = params.get("count");
        if (count) {
            parsedParams.count = Number(count);
        }

        return parsedParams;
    }, [params]);

    const setQueryParams = useCallback((changes: QueryParams) => {
        const newParams = new URLSearchParams(params);
        if (changes.categories !== undefined) {
            newParams.delete("categories");
            if (changes.categories && changes.categories.length > 0) {
                changes.categories.forEach(
                    (item) => newParams.append("categories", `${item}`)
                );
            }
        }

        if (changes.query !== undefined) {
            if (changes.query.length > 0) {
                newParams.set("query", changes.query);
            } else {
                newParams.delete("query");
            }
        }

        if (changes.page !== undefined) {
            newParams.set("page", `${changes.page}`);
        }

        if (changes.count !== undefined) {
            newParams.set("count", `${changes.count}`);
        }

        setParams(newParams, { replace: true });
    }, [setParams]);

    return {
        queryParams,
        setQueryParams
    };
};

export default useQueryParams;