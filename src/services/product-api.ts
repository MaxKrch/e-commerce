import { apiRoutes } from 'services/api-routes-builder';
import type { Product, ProductApi } from 'types/products';
import type { QueryParams } from 'types/query-params';
import { isStrapiSuccessResponse, type StrapiResponse } from 'types/strapi-api';
import formateError from 'utils/formate-error';

import api from './api-client';

export type RequestProductArgs<T> = {
  params: T;
  signal?: AbortSignal;
};

const productApi = {
  getProductList: async ({ params, signal }: RequestProductArgs<QueryParams>) => {
    try {
      const response = (await api.get<StrapiResponse<ProductApi[]>>(
        apiRoutes.products.list(params),
        {
          signal,
        }
      )) as unknown as StrapiResponse<ProductApi[]>;

      if (!isStrapiSuccessResponse(response)) {
        throw new Error(response.error.message);
      }

      return response;
    } catch (err) {
      return formateError(err);
    }
  },
  getProductDetails: async ({
    params,
    signal,
  }: RequestProductArgs<{ id: Product['documentId'] }>) => {
    try {
      const response = (await api.get<StrapiResponse<ProductApi>>(
        apiRoutes.products.details(params),
        {
          signal,
        }
      )) as unknown as StrapiResponse<ProductApi>;

      if (!isStrapiSuccessResponse(response)) {
        throw new Error(response.error.message);
      }

      return response;
    } catch (err) {
      return formateError(err);
    }
  },
};

export default productApi;
