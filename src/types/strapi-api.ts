export type StrapiPagination = {
    page: number,
    pageSize: number,
    pageCount: number,
    total: number
}

type MetaResponse<T> = T extends Array<any>
    ? { pagination: StrapiPagination }
    : {}

export type StrapiResponse<T> =
    | {
        data: T,
        meta: MetaResponse<T>,
        error: never
    }
    | {
        data: {}
        meta: never,
        error: {
            status: number,
            name: string,
            message: string,
            details?: {}
        }
    }
