import { META_STATUS } from "constants/meta-status";
import type { ILocalStore } from "hooks/useLocalStore";
import { action, computed, makeObservable, observable, reaction, type IReactionDisposer } from "mobx";
import type RootStore from "store/RootStore/RootStore";
import getInitialCollection from "store/utils/get-initial-collection";
import { linearizeCollection, normalizeCollection } from "store/utils/normalize-collection";
import type { Collection } from "types/collections";
import type { Option } from "types/option-dropdown";
import type { ProductCategory } from "types/products";
import type { QueryParams } from "types/query-params";

type PrivateFields =
    | '_inputValue'
    | '_selectedCategories'
    | '_filterSelectedCategories'
    | '_getSelectedCategoriesByIds'



export default class SearchStore implements ILocalStore {
    private _inputValue: string;
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
            _getSelectedCategoriesByIds: action,

            inputValue: computed,
            categories: computed,
            selectedCategories: computed,
            options: computed,
            value: computed,
            title: computed,
        })

        this._inputValue = initData.query ?? '';
        this._pendingSelectedIds = initData.categories ?? [];
        this._handleChange = handleChange;
        this._rootStore = rootStore;
    }

    private _filterSelectedCategories(categories: ProductCategory[]): void {
        const filtredCategories = categories.filter(item => this._selectedCategories.order.includes(item.id));
        this.setSelectedCategories(filtredCategories);
    }

    private _getSelectedCategoriesByIds(categories: ProductCategory[]): void {
        const filtredCategories = categories.filter(item => this._pendingSelectedIds?.includes(item.id));
        this.setSelectedCategories(filtredCategories);

        this._pendingSelectedIds = null;
    }

    private setSelectedCategories(categories: ProductCategory[]): void {
        this._selectedCategories = normalizeCollection(
            categories,
            (item) => item.id
        )
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
        return linearizeCollection(this._selectedCategories)
    }

    handleInput(value: string): void {
        this._inputValue = value;
    }

    handleSelectCategories(options: Option[]): void {
        const selected: ProductCategory[] = []
        options.forEach(item => {
            const target = this._rootStore.categoriesStore.getCategoryById(Number(item.key))
            if (target) {
                selected.push(target)
            }
        })
        this.setSelectedCategories(selected);
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
            if (this._rootStore.categoriesStore.status !== META_STATUS.SUCCESS) {
                return
            }
            if (this._pendingSelectedIds) {
                this._getSelectedCategoriesByIds(categories);
            } else {
                this._filterSelectedCategories(categories);
            }
        }
    )


    reactionSelectCategories: IReactionDisposer = reaction(
        () => this.selectedCategories,
        (categories) => {
            if (this._pendingSelectedIds || this._rootStore.categoriesStore.status !== META_STATUS.SUCCESS) {
                return
            }
            this._handleChange({
                query: this.inputValue,
                categories: categories.map(category => category.id)
            })
        }
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

