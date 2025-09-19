import { META_STATUS, type MetaStatus } from "constants/meta-status";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import productApi from "services/product-api";
import getInitialCollection from "store/utils/get-initial-collection";
import { linearizeCollection, normalizeCollection } from "store/utils/normalize-collection";
import { normalizeProductList } from "store/utils/normalize-products";
import type { Collection } from "types/collections";
import type { Product, ProductApi } from "types/products";
import type { QueryParams } from "types/query-params";
import type { MetaResponse } from "types/strapi-api";

type PrivateFields =
    | '_products'
    | '_status'
    | '_meta'
    | '_requestId'
    | 'setProducts'

export default class ProductsStore {
    private _products: Collection<Product['id'], Product> = getInitialCollection();
    private _meta: MetaResponse<Product[]> | null = null;
    private _status: MetaStatus = META_STATUS.IDLE;
    private _requestId: string | undefined = undefined;
    private _abortCtrl: AbortController | null = null;

    constructor() {
        makeObservable<ProductsStore, PrivateFields>(this, {
            _products: observable,
            _status: observable,
            _meta: observable,
            _requestId: observable,

            products: computed,
            status: computed,
            pagination: computed,
            requestId: computed,
            countProducts: computed,

            fetchProducts: action.bound,
            setProducts: action,
        })
    }

    get products(): Product[] {
        return linearizeCollection(this._products);
    }

    get status(): MetaStatus {
        return this._status;
    }

    get requestId(): string | undefined {
        return this._requestId;
    }

    get pagination(): MetaResponse<Product[]>['pagination'] | undefined {
        return this._meta?.pagination
    }

    get countProducts(): number {
        return this._products.order.length
    }

    private setProducts(products: ProductApi[] | null) {
        if (!products) {
            this._products = getInitialCollection();
            return;
        }

        this._products = normalizeCollection(
            normalizeProductList(products),
            (product) => product.id
        )
    }

    getProductbyId(id: Product['id']): Product | undefined {
        return this._products.entities[id]
    }

    async fetchProducts(params: QueryParams, id?: string): Promise<void> {
        if (this._abortCtrl) {
            this._abortCtrl.abort();
        }
        this._abortCtrl = new AbortController();

        runInAction(() => {
            this._status = META_STATUS.PENDING;
            this._requestId = id;
            this._meta = null;
            this.setProducts(null);
        })

        try {
            const response = await productApi.getProductList({
                request: params
            })

            if (response instanceof Error) {
                throw response
            }

            runInAction(() => {
                this._meta = response.meta;
                this.setProducts(response.data);
                this._status = META_STATUS.SUCCESS;
            })

        } catch (err) {
            if (err instanceof Error && err.name === "AbortError") {
                return;
            }

            runInAction(() => {
                this._meta = null;
                this._requestId = undefined;
                this.setProducts(null);
                this._status = META_STATUS.ERROR;
            })
        }
    }
}