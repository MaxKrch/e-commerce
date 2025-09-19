import ProductsStore from "store/global/ProductsStore";
import CategoriesStore from "../global/CategoriesStore/CategoriesStore";
import CartStore from "store/global/CartStore";

export interface IRootStore {
    readonly categoriesStore: CategoriesStore;
    readonly productsStore: ProductsStore;
    readonly cardStore: CartStore;
}
export default class RootStore implements IRootStore {
    readonly categoriesStore: CategoriesStore;
    readonly productsStore: ProductsStore;
    readonly cardStore: CartStore;

    constructor() {
        this.categoriesStore = new CategoriesStore();
        this.productsStore = new ProductsStore();
        this.cardStore = new CartStore();
    }
}