import QueryString from "qs"
import type { QueryParams } from "types/query-params";

const parseQueryParamsFromUrl = (): QueryParams => {
    const parsed = QueryString.parse(window.location.search, {
        ignoreQueryPrefix: true,
    });

    const params: QueryParams = {}

    params.query = (typeof parsed.query === "string" && parsed.query.length > 0) ? parsed.query : undefined;
    params.page = parsed.page ? Number(parsed.page) : undefined;
    params.count = parsed.count ? Number(parsed.count) : undefined;

    if (Array.isArray(parsed.categories)) {
        params.categories = parsed.categories?.map(Number)

    } else if (typeof parsed.categories === 'string') {
        params.categories = [Number(parsed.categories)]
    } else {
        params.categories = undefined;
    }
    console.log(params)
    return params;
};

export default parseQueryParamsFromUrl;

