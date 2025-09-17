import { apiRoutes, type ApiProductsArgs } from 'services/api-routes-builder';
import type { ProductCategory, ProductApi } from 'types/products';
import { isStrapiSuccessResponse, type StrapiResponse } from 'types/strapi-api';
import formateError from 'utils/formate-error';
import api from './api-client';
import { normalizeProductItem, normalizeProductList } from 'store/utils/normalize-products';

export type RequestArgs<T> = {
  request: T;
  signal?: AbortSignal;
};

const productApi = {
  getCategories: async ({ request, signal }: RequestArgs<ApiProductsArgs['Categories']>) => {
    try {
      const response = await api.get<StrapiResponse<ProductCategory[]>>(apiRoutes.categories.list(request), {
        signal: signal,
      }) as unknown as StrapiResponse<ProductCategory[]>;

      if (!isStrapiSuccessResponse(response)) {
        throw (new Error(response.error.message))
      }
      return response;

    } catch (err) {
      return formateError(err);
    }
  },
  getProductList: async ({ request, signal }: RequestArgs<ApiProductsArgs['ProductsList']>) => {
    try {
      const response = await api.get<StrapiResponse<ProductApi[]>>(apiRoutes.products.list(request), {
        signal,
      }) as unknown as StrapiResponse<ProductApi[]>;

      if (!isStrapiSuccessResponse(response)) {
        throw (new Error(response.error.message));
      }

      return ({
        ...response,
        data: normalizeProductList(response.data)
      });

    } catch (err) {
      return formateError(err)
    }
  },
  getProductDetails: async ({
    request,
    signal,
  }: RequestArgs<ApiProductsArgs['ProductsDetails']>) => {
    try {
      const response = await api.get<StrapiResponse<ProductApi>>(apiRoutes.products.details(request), {
        signal,
      }) as unknown as StrapiResponse<ProductApi>;

      if (!isStrapiSuccessResponse(response)) {
        throw new Error(response.error.message);
      }

      return ({
        ...response,
        data: normalizeProductItem(response.data)
      });

    } catch (err) {
      return formateError(err);
    }
  },
};

export default productApi;
