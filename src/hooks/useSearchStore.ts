import SearchStore from "store/local/SearchStore";
import useLocalStore from "./useLocalStore";
import type { QueryParams } from "types/query-params";
import useRootStore from "context/root-store/useRootStore";
import type { Option } from "types/option-dropdown";
import { useCallback } from "react";
import useQueryParams from "./useQueryParams";

export type UseSearchStore = {
    handleChange: (params: QueryParams) => void
}
const useSearchStore = ({ handleChange }: UseSearchStore) => {
    const { queryParams } = useQueryParams();
    const hookHandleChange = useCallback((params: QueryParams) => {
        handleChange(params)
    }, [handleChange])

    const rootStore = useRootStore();
    const searchStore = useLocalStore(() => new SearchStore({
        initData: queryParams,
        handleChange: hookHandleChange,
        rootStore
    }));

    const handleInput = useCallback((value: string) => {
        searchStore.handleInput(value);
    }, [searchStore.handleInput])

    const handleSelectCategories = useCallback((options: Option[]) => {
        searchStore.handleSelectCategories(options);
    }, [searchStore.handleSelectCategories])

    const handleSearch = useCallback(() => searchStore.handleSearch(), [searchStore.handleSearch])

    const hadleResetValues = useCallback(() => searchStore.resetValues(), [searchStore.resetValues])

    return ({
        inputValue: searchStore.inputValue,
        categories: searchStore.categories,
        selectedCategories: searchStore.selectedCategories,
        handleInput,
        handleSelectCategories,
        handleSearch,
        resetValues: hadleResetValues,
        options: searchStore.options,
        value: searchStore.value,
        title: searchStore.title,
    })
}

export default useSearchStore;