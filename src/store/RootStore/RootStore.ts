import CategoriesStore from "../global/CategoriesStore/CategoriesStore";

export interface IRootStore {
    readonly categoriesStore: CategoriesStore
}
export default class RootStore implements IRootStore {
    readonly categoriesStore: CategoriesStore;

    constructor() {
        this.categoriesStore = new CategoriesStore()
    }
}