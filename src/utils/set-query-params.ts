import type { QueryParams } from "types/query-params"
import parseQueryParamsFromUrl from "./parse-query-params-from-url"
import QueryString from "qs"
import { useSearchParams } from "react-router-dom"

const setQueryParams = (change: QueryParams): void => {
    // const [testParams] = useSearchParams()
    const params = parseQueryParamsFromUrl()
    const newParams = {
        ...params,
        ...change
    }

    if (newParams.query?.length === 0) {
        delete newParams.query
    }

    let queryString = QueryString.stringify(newParams, { arrayFormat: 'brackets' })
    if (queryString.length > 0) {
        queryString = `?${queryString}`
    }
    const newUrl = `${window.location.pathname}${queryString}`
    console.log(newParams, newUrl)
    window.history.replaceState(null, '', newUrl)
}

export default setQueryParams