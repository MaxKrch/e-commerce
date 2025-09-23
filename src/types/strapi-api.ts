import type { ProductInCartApi } from './cart';

export type StrapiPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type MetaResponse<T> = T extends unknown[] ? { pagination: StrapiPagination } : object;

type StrapiResponseSuccess<T> = {
  data: T;
  meta: MetaResponse<T>;
  error: never;
};

type StrapiResponseError = {
  data: object;
  meta: never;
  error: {
    status: number;
    name: string;
    message: string;
  };
};

export type StrapiResponse<T> = StrapiResponseSuccess<T> | StrapiResponseError;

export function isStrapiSuccessResponse<T>(
  response: StrapiResponse<T>
): response is StrapiResponseSuccess<T> {
  return !('error' in response);
}

export type StrapiResponseCart<T extends ProductInCartApi | ProductInCartApi[]> =
  | T
  | StrapiResponseError;

export function isStrapiSuccessResponseCart<T extends ProductInCartApi | ProductInCartApi[]>(
  response: StrapiResponseCart<T>
): response is T {
  return !('error' in response);
}
