import { META_STATUS, type MetaStatus } from 'constants/meta-status';

import type { ILocalStore } from 'hooks/useLocalStore';
import { action, computed, makeObservable, observable, runInAction, type IReactionDisposer } from 'mobx';
import productApi from 'services/product-api';
import type RootStore from 'store/RootStore';
import { normalizeProductItem } from 'store/utils/normalize-products';
import type { Product } from 'types/products';

type PrivateFields = '_product' | '_status' | '_requestId';

export default class ProductStore implements ILocalStore {
  private _product: Product | null = null;
  private _abortCtrl: AbortController | null = null;
  private _status: MetaStatus = META_STATUS.IDLE;
  private _requestId: string | undefined;
  private _rootStore: RootStore;
  reactions: IReactionDisposer[];

  constructor({ rootStore }: { rootStore: RootStore }) {
    makeObservable<ProductStore, PrivateFields>(this, {
      _product: observable,
      _status: observable,
      _requestId: observable,

      product: computed,
      status: computed,
      requestId: computed,

      resetProduct: action.bound,
      fetchProduct: action.bound,
    });

    this._rootStore = rootStore;
    this.reactions = [];
    this.initReactions()
  }

  initReactions(): void {
  }

  get product(): Product | null {
    return this._product;
  }

  get status(): MetaStatus {
    return this._status;
  }

  get requestId(): string | undefined {
    return this._requestId;
  }

  resetProduct(): void {
    this._product = null;
    this._requestId = undefined;
    this._status = META_STATUS.IDLE;
  }

  async fetchProduct(productId: Product['documentId'], requestId?: string): Promise<void> {
    if (this._abortCtrl) {
      this._abortCtrl.abort();
    }

    runInAction(() => {
      this._product = null;
      this._requestId = requestId;
      this._status = META_STATUS.PENDING;
      this._rootStore.productsStore.resetProductList();
    });

    this._abortCtrl = new AbortController();

    try {
      const response = await productApi.getProductDetails({
        params: { id: productId },
        signal: this._abortCtrl.signal,
      });

      if (response instanceof Error) {
        throw response;
      }

      this._rootStore.productsStore.fetchProducts({
        categories: [response.data.productCategory.id],
        count: 6,
      });

      runInAction(() => {
        this._product = normalizeProductItem(response.data);
        this._abortCtrl = null;
        this._status = META_STATUS.SUCCESS;
      });
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }

      runInAction(() => {
        this._product = null;
        this._requestId = undefined;
        this._status = META_STATUS.ERROR;
        this._rootStore.productsStore.resetProductList();
      });
    }
  }

  clearReactions(): void {
    this.reactions.map(item => item())
    this.reactions = [];
  }

  destroy(): void {
    if (this._abortCtrl) {
      this._abortCtrl.abort();
    }

    this.clearReactions()
  }
}
