import { apiRoutes, type ApiProductsArgs } from 'services/api-routes-builder';
import type { ProductApi } from 'types/products';
import { isStrapiSuccessResponse, type StrapiResponse } from 'types/strapi-api';
import formateError from 'utils/formate-error';
import api from './api-client';

export type RequestArgs<T> = {
  request: T;
  signal?: AbortSignal;
};

const productApi = {
  getProductList: async ({ request, signal }: RequestArgs<ApiProductsArgs['ProductsList']>) => {
    try {
      const response = await api.get<StrapiResponse<ProductApi[]>>(apiRoutes.products.list(request), {
        signal,
      }) as unknown as StrapiResponse<ProductApi[]>;

      if (!isStrapiSuccessResponse(response)) {
        throw (new Error(response.error.message));
      }

      return response

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

      response

    } catch (err) {
      return formateError(err);
    }
  },
};

export default productApi;
