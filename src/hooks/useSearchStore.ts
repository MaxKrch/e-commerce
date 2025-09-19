import SearchStore from "store/local/SearchStore";
import useLocalStore from "./useLocalStore";
import parseQueryParamsFromUrl from "utils/parse-query-params-from-url";
import type { QueryParams } from "types/query-params";
import useRootStore from "context/root-store/useRootStore";
import type { Option } from "types/option-dropdown";
import { useCallback, useMemo } from "react";

export type UseSearchStore = {
    handleChange: (params: QueryParams) => void
}

const useSearchStore = ({ handleChange }: UseSearchStore) => {
    const hookHandleChange = useCallback((params: QueryParams) => {
        handleChange(params)
    }, [handleChange])
    const rootStore = useRootStore();

    const initData = parseQueryParamsFromUrl();

    const searchStore = useLocalStore(() => new SearchStore({
        initData: initData,
        handleChange: hookHandleChange,
        rootStore
    }));

    const handleInput = useCallback((value: string) => {
        searchStore.handleInput(value);
    }, [searchStore.handleInput])

    const handleSelectCategories = useCallback((options: Option[]) => {
        searchStore.handleSelectCategories(options);
    }, [searchStore.handleSelectCategories])

    const handleSearch = useCallback(() => () => searchStore.handleSearch(), [searchStore.handleSearch])


    return ({
        inputValue: searchStore.inputValue,
        categories: searchStore.categories,
        selectedCategories: searchStore.selectedCategories,
        handleInput,
        handleSelectCategories,
        handleSearch,
        options: searchStore.options,
        value: searchStore.value,
        title: searchStore.title
    })
}

export default useSearchStore;