import { META_STATUS, type MetaStatus } from 'constants/meta-status';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import cartApi from 'services/cart-api';
import getInitialCollection from 'store/utils/get-initial-collection';
import { linearizeCollection, normalizeCollection } from 'store/utils/normalize-collection';
import { normalizeProductInCartList } from 'store/utils/normalize-products-in-cart';
import type { ProductInCart, ProductInCartApi } from 'types/cart';
import type { Collection } from 'types/collections';
import type { Product } from 'types/products';

type PrivateFields = '_products' | '_status' | '_setProducts' | '_addToCart' | '_removeFromCart';

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
      status: computed,

      _addToCart: action,
      _removeFromCart: action,
      _setProducts: action,
      handleAddToCart: action.bound,
      handleRemoveFromCart: action.bound,
      fetchCart: action.bound,
    });
  }

  get products(): ProductInCart[] {
    return linearizeCollection(this._products);
  }

  get inStockProducts(): ProductInCart[] {
    return this.products.filter(item => item.product.isInStock);
  }

  get outOfStockProducts(): ProductInCart[] {
    return this.products.filter(item => !item.product.isInStock);
  }

  get totalPrice(): number {
    return this.inStockProducts.reduce((total, item) => {
      return (total + (item.quantity * item.product.price))
    }, 0)
  }

  get status(): MetaStatus {
    return this._status;
  }

  async handleAddToCart(product: Product): Promise<void> {
    this._addToCart(product);

    try {
      const response = await cartApi.addProduct({ product: product.id });
      if (response instanceof Error) {
        throw response;
      }
    } catch {
      this._removeFromCart(product)
    }
  }

  async handleRemoveFromCart(product: Product): Promise<void> {
    this._removeFromCart(product)
    try {
      const response = await cartApi.removeProduct({ product: product.id });
      if (response instanceof Error) {
        throw response;
      }
    } catch {
      this._addToCart(product)
    }
  }

  private _addToCart(product: Product): void {
    const isToCart = this._products.order.includes(product.id);
    if (isToCart) {
      this._products.entities[product.id].quantity += 1;
      return;
    }

    this._products.order.push(product.id);
    this._products.entities[product.id] = {
      quantity: 1,
      product
    }
  }

  private _removeFromCart(product: Product): void {
    const isToCart = this._products.order.includes(product.id);

    if (!isToCart) {
      return;
    }

    const item = this._products.entities[product.id];

    if (item.quantity > 1) {
      item.quantity -= 1;
      return;
    }

    this._products.order = this._products.order.filter(item => item !== product.id);
    delete this._products.entities[product.id]
  }

  private _setProducts(products: ProductInCartApi[]): void {
    this._products = normalizeCollection(
      normalizeProductInCartList(products),
      (element) => element.product.id,
    )
  }


  async fetchCart(): Promise<void> {
    if (this._abortCtrl) {
      this._abortCtrl.abort()
    }

    this._abortCtrl = new AbortController()

    runInAction(() => {
      this._status = META_STATUS.PENDING;
      this._products = getInitialCollection();
    });

    try {
      const response = await cartApi.getCart({ signal: this._abortCtrl.signal })

      if (response instanceof Error) {
        throw response;
      }

      runInAction(() => {
        this._abortCtrl = null;
        this._setProducts(response)
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