import { META_STATUS, type MetaStatus } from "constants/meta-status";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import categoryApi from "services/categories-api";
import { normalizeCategoriesList } from "store/utils/normalize-categories";
import { linearizeCollection, normalizeCollection } from "store/utils/normalize-collection";
import type { Collection } from "types/collections";
import type { ProductCategory } from "types/products";
import getInitialCollection from "store/utils/get-initial-collection";

export interface ICategoriesStore {
    getCategoryById: (id: ProductCategory['id']) => ProductCategory | undefined

}

type PrivateFields = '_list' | '_status'

export default class CategoriesStore implements ICategoriesStore {
    private _list: Collection<ProductCategory['id'], ProductCategory> = getInitialCollection()
    private _status: MetaStatus = META_STATUS.IDLE;
    private abortCtrl: AbortController | null = null;

    constructor() {
        makeObservable<CategoriesStore, PrivateFields>(this, {
            _list: observable,
            _status: observable,

            list: computed,
            status: computed,
            fetchCategories: action,
        })
    }

    get list(): ProductCategory[] {
        return linearizeCollection(this._list);
    }

    get status(): MetaStatus {
        return this._status;
    }

    getCategoryById(id: ProductCategory['id']): ProductCategory | undefined {
        return this._list.entities[id]
    }

    abort(): void {
        if (this.abortCtrl) {
            this.abortCtrl.abort();
            this.abortCtrl = null;
        }
    }

    async fetchCategories(): Promise<void> {
        this.abort()
        this.abortCtrl = new AbortController()

        runInAction(() => {
            this._status = META_STATUS.PENDING;
            this._list = getInitialCollection()
        })

        try {
            const response = await categoryApi.getCategories({
                signal: this.abortCtrl.signal
            })

            if (response instanceof Error) {
                throw response;
            }

            const normalized = normalizeCollection(
                normalizeCategoriesList(response.data),
                (element) => element.id
            )

            runInAction(() => {
                this._list = normalized;
                this._status = META_STATUS.SUCCESS;
            })
        } catch (err) {
            runInAction(() => {
                if (err instanceof Error && err.name === 'AbortError') {
                    return
                };

                this._list = getInitialCollection();
                this._status = META_STATUS.ERROR;
            })
        }
    }
}