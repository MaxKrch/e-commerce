import type { ILocalStore } from "hooks/useLocalStore";
import type { Product } from "types/products";

export default class ProductStore implements ILocalStore {
    _products: Product[] = []
    constructor() {

    }

    destroy(): void {
        console.log('im desroyed')
    }
}