import type { ILocalStore } from "hooks/useLocalStore";
import { action, computed, makeObservable, observable, reaction } from "mobx";
import qs from "qs";
import type { ProductCategory } from "types/products";

type PrivateFields =
    | '_inputValue'
    | '_categories'
    | '_selectedCategories'
    | '_setInputValue'
    | '_setSelectedCategories'
    | '_setParams'

export default class SearchStore implements ILocalStore {
    private _inputValue: string = '';
    private _categories: ProductCategory[] = [];
    private _selectedCategories: ProductCategory[] = [];
    private _debounce: ReturnType<typeof setTimeout> | null = null;
    private _params: URLSearchParams | null = null;

    constructor() {
        makeObservable<SearchStore, PrivateFields>(this, {
            _inputValue: observable,
            _categories: observable,
            _selectedCategories: observable,

            _setInputValue: action.bound,
            _setSelectedCategories: action.bound,
            _setParams: action.bound,

            inputValue: computed,
            categories: computed,
            selectedCategories: computed,
        })

        const params = qs.parse(window.location.search, {
            ignoreQueryPrefix: true,
        });
        //кладем фильтры и инвпут значения в стор, 
        console.log(params)
    }

    get inputValue(): string {
        return this._inputValue
    }

    get categories(): ProductCategory[] {
        return this._categories;
    }

    get selectedCategories(): ProductCategory[] {
        return this._selectedCategories;
    }

    private _setSelectedCategories(categories: ProductCategory[]): void {
        console.log(categories)
    }

    private _setInputValue(value: string): void {
        this._inputValue = value;
        console.log(value, this._inputValue)
    }

    private _setParams(): void {
        console.log(5)
    }

    handleChangeInput(): void {
        if (this._debounce) {
            clearTimeout(this._debounce)
        }

        this._debounce = setTimeout(this._setParams, 1000)
    }

    handleSelectCategories(): void {

    }

    // private reactionDisposer = reaction(
    // Первый аргумент – колбэк, который возвращает отслеживаемые поля
    //   () => value,

    // Второй аргумент – колбэк, в котором выполняется желаемая логика
    //   (value, previousValue, reaction) => { задать url },

    // Третий аргумент — опции
    //   options
    // );

    destroy(): void {
        console.log(5)
        // отписаться от реакции (вызвать возаращеную реакцией)
    }

}

