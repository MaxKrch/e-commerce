import type { QueryParams } from "types/query-params"
import parseQueryParamsFromUrl from "./parse-query-params-from-url"
import QueryString from "qs"

const setQueryParams = (change: QueryParams): void => {
    const params = parseQueryParamsFromUrl()
    const newParams = {
        ...params,
        ...change
    }

    const queryString = QueryString.stringify(newParams)
    const newUrl = `${window.location.pathname}?${queryString}`
    window.history.replaceState(null, '', newUrl)
}

export default setQueryParams