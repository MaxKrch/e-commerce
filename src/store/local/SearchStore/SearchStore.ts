import type { ILocalStore } from "hooks/useLocalStore";
import { action, computed, makeObservable, observable, reaction, type IReactionDisposer } from "mobx";
import type RootStore from "store/RootStore/RootStore";
import getInitialCollection from "store/utils/get-initial-collection";
import { linearizeCollection, normalizeColection } from "store/utils/normalize-collection";
import type { Collection } from "types/collections";
import type { Option } from "types/option-dropdown";
import type { ProductCategory } from "types/products";
import type { QueryParams } from "types/query-params";

type PrivateFields =
    | '_inputValue'
    | '_selectedCategories'
    | '_filterSelectedCategories'
    | '_getSelectedCategoriegByIds'



export default class SearchStore implements ILocalStore {
    private _inputValue: string = '';
    private _selectedCategories: Collection<ProductCategory['id'], ProductCategory> = getInitialCollection();
    private _debounce: ReturnType<typeof setTimeout> | null = null;
    private _handleChange: (params: QueryParams) => void;
    private _rootStore: RootStore;
    private _pendingSelectedIds: ProductCategory['id'][] | null = null;

    constructor({
        initData,
        handleChange,
        rootStore
    }: {
        initData: QueryParams,
        handleChange: (params: QueryParams) => void,
        rootStore: RootStore,
    }) {
        makeObservable<SearchStore, PrivateFields>(this, {
            _inputValue: observable,
            _selectedCategories: observable,

            handleInput: action.bound,
            handleSelectCategories: action.bound,
            _filterSelectedCategories: action,
            _getSelectedCategoriegByIds: action,

            inputValue: computed,
            categories: computed,
            selectedCategories: computed,
            options: computed,
            value: computed,
            title: computed,
        })

        this._inputValue = initData.query ?? '';
        this._handleChange = handleChange;
        this._rootStore = rootStore;
    }

    private _filterSelectedCategories(categories: ProductCategory[]): void {
        const filtredCategories = categories.filter(item => this._selectedCategories.order.includes(item.id));
        this.selectedCategories = filtredCategories;
    }

    private _getSelectedCategoriegByIds(categories: ProductCategory[]): void {
        const filtredCategories = categories.filter(item => this._pendingSelectedIds?.includes(item.id));
        this.selectedCategories = filtredCategories;

        this._pendingSelectedIds = null;
    }

    get options(): Option[] {
        return this.categories.map(item => ({
            key: `${item.id}`,
            value: item.title,
        }))
    }

    get value(): Option[] {
        return this.selectedCategories.map(item => ({
            key: `${item.id}`,
            value: item.title,
        }))
    }

    get title(): string {
        if (this.selectedCategories.length > 0) {
            return this.selectedCategories.map(item => item.title)
                .join(', ')
        }

        return 'Любая категория'
    }

    get inputValue(): string {
        return this._inputValue
    }

    get categories(): ProductCategory[] {
        return this._rootStore.categoriesStore.list;
    }

    get selectedCategories(): ProductCategory[] {
        return linearizeCollection(this._selectedCategories);
    }

    private set selectedCategories(categories: ProductCategory[]) {
        this._selectedCategories = normalizeColection(
            categories,
            (item) => item.id
        )
    }

    handleInput(value: string): void {
        this._inputValue = value;
    }

    handleSelectCategories(options: Option[]): void {
        const selected: ProductCategory[] = []
        options.forEach(item => {
            const target = this.categories.find(el => `${el.id}` === item.key)
            if (target) {
                selected.push(target)
            }
        })
        this.selectedCategories = selected;
    }

    handleSearch = (): void => this._handleChange({
        query: this._inputValue,
        categories: this.selectedCategories.map(item => item.id)
    })


    reactionInputValue: IReactionDisposer = reaction(
        () => this.inputValue,
        (query) => {
            if (this._debounce) {
                clearTimeout(this._debounce)
            }
            this._debounce = setTimeout(() => this._handleChange({
                query,
                categories: this.selectedCategories.map(category => category.id)
            }), 1000)
        }
    )

    reactionLoadCategories: IReactionDisposer = reaction(
        () => this._rootStore.categoriesStore.list,
        (categories) => {
            if (this._pendingSelectedIds) {
                this._getSelectedCategoriegByIds(categories);
            } else {
                this._filterSelectedCategories(categories);
            }
        }
    )


    reactionSelectCategories: IReactionDisposer = reaction(
        () => this.selectedCategories,
        (categories) => this._handleChange({
            query: this.inputValue,
            categories: categories.map(category => category.id)
        })
    )

    destroy(): void {
        if (this._debounce) {
            clearTimeout(this._debounce)
        }

        this.reactionInputValue();
        this.reactionLoadCategories();
        this.reactionSelectCategories();
    }
}

