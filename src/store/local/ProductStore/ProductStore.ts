import type { ILocalStore } from "hooks/useLocalStore";
import { makeObservable, observable } from "mobx";
import type { Product } from "types/products";

type PrivateFields = '_product'

export default class ProductStore implements ILocalStore {
    private _product: Product | null = null;
    constructor() {
        makeObservable<ProductStore, PrivateFields>(this, {
            _product: observable,
        })

    }

    destroy(): void {
        console.log('im desroyed')
    }
}