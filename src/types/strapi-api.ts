export type StrapiPagination = {
    page: number,
    pageSize: number,
    pageCount: number,
    total: number
}

type MetaResponse<T> = T extends Array<any>
    ? { pagination: StrapiPagination }
    : {}

type StrapiResponseSuccess<T> = {
    data: T,
    meta: MetaResponse<T>,
    error: never
}

type StrapiResponseError = {
    data: {}
    meta: never,
    error: {
        status: number,
        name: string,
        message: string,
        details?: {}
    }
}

export type StrapiResponse<T> = StrapiResponseSuccess<T> | StrapiResponseError

export function isStrapiSuccessResponse<T>(response: StrapiResponse<T>): response is StrapiResponseSuccess<T> {
    return !('error' in response)
        ;
}