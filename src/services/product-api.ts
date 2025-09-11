import { apiRoutes, type ApiProductsArgs } from "@/config/api-routes"
import api from "./api-client"
import type { StrapiResponse } from "@/types/strapi-api"
import type { ProductCategory, ProductResponseFull, ProductResponseShort } from "@/types/product"
import formateAxiosError from "@/utils/formate-axios-error"

const productApi = {
    getCategories: async (args: ApiProductsArgs['Categories']) => {
        try {
            return api.get<StrapiResponse<ProductCategory[]>>(apiRoutes.categories.list(args));
        } catch (err) {
            return formateAxiosError(err);
        }
    },
    getProductList: async (args: ApiProductsArgs['ProductsList']) => {
        try {
            return api.get<StrapiResponse<ProductResponseShort[]>>(apiRoutes.products.list(args));
        } catch (err) {
            return formateAxiosError(err);
        }
    },
    getProductDetails: async (args: ApiProductsArgs['ProductsDetails']) => {
        try {
            return api.get<StrapiResponse<ProductResponseFull>>(apiRoutes.products.details(args));
        } catch (err) {
            return formateAxiosError(err);
        }
    },
}

export default productApi