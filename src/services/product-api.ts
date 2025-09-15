import { apiRoutes, type ApiProductsArgs } from 'services/api-routes-builder';
import type { ProductCategory, ProductResponseFull, ProductResponseShort } from 'types/product';
import type { StrapiResponse } from 'types/strapi-api';
import formateAxiosError from 'utils/formate-axios-error';

import api from './api-client';

type RequestArgs<T> = {
  request: T;
  signal?: AbortSignal;
};

const productApi = {
  getCategories: async ({ request, signal }: RequestArgs<ApiProductsArgs['Categories']>) => {
    try {
      return api.get<StrapiResponse<ProductCategory[]>>(apiRoutes.categories.list(request), {
        signal: signal,
      });
    } catch (err) {
      return formateAxiosError(err);
    }
  },
  getProductList: async ({ request, signal }: RequestArgs<ApiProductsArgs['ProductsList']>) => {
    try {
      return api.get<StrapiResponse<ProductResponseShort[]>>(apiRoutes.products.list(request), {
        signal,
      });
    } catch (err) {
      return formateAxiosError(err);
    }
  },
  getProductDetails: async ({
    request,
    signal,
  }: RequestArgs<ApiProductsArgs['ProductsDetails']>) => {
    try {
      return api.get<StrapiResponse<ProductResponseFull>>(apiRoutes.products.details(request), {
        signal,
      });
    } catch (err) {
      return formateAxiosError(err);
    }
  },
};

export default productApi;
