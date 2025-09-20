import CartStore from 'store/global/CartStore';
import ProductsStore from 'store/global/ProductsStore';

import CategoriesStore from 'store/global/CategoriesStore/CategoriesStore';

export type IRootStore = {
  readonly categoriesStore: CategoriesStore;
  readonly productsStore: ProductsStore;
  readonly cartStore: CartStore;
};
export default class RootStore implements IRootStore {
  readonly categoriesStore: CategoriesStore;
  readonly productsStore: ProductsStore;
  readonly cartStore: CartStore;

  constructor() {
    this.categoriesStore = new CategoriesStore();
    this.productsStore = new ProductsStore();
    this.cartStore = new CartStore();
  }
}
