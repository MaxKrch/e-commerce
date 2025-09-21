import { META_STATUS, type MetaStatus } from 'constants/meta-status';

import { action, computed, makeObservable, observable, remove, runInAction } from 'mobx';
import cartApi from 'services/cart-api';
import getInitialCollection from 'store/utils/get-initial-collection';
import { linearizeCollection, normalizeCollection } from 'store/utils/normalize-collection';
import { normalizeProductInCartList } from 'store/utils/normalize-products-in-cart';
import type { ProductInCart, ProductInCartApi } from 'types/cart';
import type { Collection } from 'types/collections';
import type { Product } from 'types/products';

type PrivateFields =
  | '_products'
  | '_status'
  | '_setProducts'
  | '_addToCartOnServer'
  | '_removeFromCartOnServer';

export default class CartStore {
  private _products: Collection<Product['id'], ProductInCart> = getInitialCollection();
  private _abortCtrl: AbortController | null = null;
  private _status: MetaStatus = META_STATUS.IDLE;

  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      _products: observable,
      _status: observable,

      products: computed,
      inStockProducts: computed,
      outOfStockProducts: computed,
      totalPrice: computed,
      totalItemsToOrder: computed,
      status: computed,

      _addToCartOnServer: action,
      _removeFromCartOnServer: action,
      _setProducts: action,
      addToCart: action.bound,
      removeFromCart: action.bound,
      fetchCart: action.bound,
    });
  }

  get products(): ProductInCart[] {
    return linearizeCollection(this._products);
  }

  get inStockProducts(): ProductInCart[] {
    return this.products.filter((item) => item.product.isInStock);
  }

  get outOfStockProducts(): ProductInCart[] {
    return this.products.filter((item) => !item.product.isInStock);
  }

  get totalItemsToOrder(): number {
    return this.inStockProducts.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }

  get totalPrice(): number {
    return this.inStockProducts.reduce((total, item) => {
      return total + item.quantity * item.product.price;
    }, 0);
  }

  get status(): MetaStatus {
    return this._status;
  }

  async addToCart(product: Product): Promise<void> {
    this._addToCartOnServer(product);

    try {
      const response = await cartApi.addProduct({ product: product.id });
      if (response instanceof Error) {
        throw response;
      }
    } catch {
      this._removeFromCartOnServer(product);
    }
  }

  async removeFromCart(product: Product): Promise<void> {
    this._removeFromCartOnServer(product);
    try {
      const response = await cartApi.removeProduct({ product: product.id });
      if (response instanceof Error) {
        throw response;
      }
    } catch {
      this._addToCartOnServer(product);
    }
  }

  private _addToCartOnServer(product: Product): void {
    const isToCart = this._products.order.includes(product.id);
    if (isToCart) {
      this._products.entities[product.id].quantity += 1;
      return;
    }

    this._products = {
      order: [...this._products.order, product.id],
      entities: { ...this._products.entities, [product.id]: { quantity: 1, product } },
    };
  }

  private _removeFromCartOnServer(product: Product): void {
    const isToCart = this._products.order.includes(product.id);

    if (!isToCart) {
      return;
    }

    const item = this._products.entities[product.id];

    if (item.quantity > 1) {
      item.quantity -= 1;
      return;
    }

    this._products.order = this._products.order.filter((item) => item !== product.id);
    this._products.entities = {
      ...this._products.entities,
    };
    remove(this._products.entities, `${product.id}`);
  }

  private _setProducts(products: ProductInCartApi[]): void {
    this._products = normalizeCollection(
      normalizeProductInCartList(products),
      (element) => element.product.id
    );
  }

  async fetchCart(): Promise<void> {
    if (this._abortCtrl) {
      this._abortCtrl.abort();
    }

    this._abortCtrl = new AbortController();

    runInAction(() => {
      this._status = META_STATUS.PENDING;
      this._products = getInitialCollection();
    });

    try {
      const response = await cartApi.getCart({ signal: this._abortCtrl.signal });

      if (response instanceof Error) {
        throw response;
      }

      runInAction(() => {
        this._abortCtrl = null;
        this._setProducts(response);
        this._status = META_STATUS.SUCCESS;
      });
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }

      runInAction(() => {
        this._abortCtrl = null;
        this._products = getInitialCollection();
        this._status = META_STATUS.ERROR;
      });
    }
  }
}