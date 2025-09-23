import useRootStore from 'context/root-store/useRootStore';
import { useCallback } from 'react';
import SearchStore from 'store/local/SearchStore';
import type { QueryParams } from 'types/query-params';

import useLocalStore from './useLocalStore';
import useQueryParams from './useQueryParams';

export type UseSearchStore = {
  handleChange: (params: QueryParams) => void;
};
const useSearchStore = ({ handleChange }: UseSearchStore) => {
  const { queryParams } = useQueryParams();
  const hookHandleChange = useCallback(
    (params: QueryParams) => {
      handleChange(params);
    },
    [handleChange]
  );

  const rootStore = useRootStore();
  const searchStore = useLocalStore(
    () =>
      new SearchStore({
        initData: queryParams,
        handleChange: hookHandleChange,
        rootStore,
      })
  );

  return {
    inputValue: searchStore.inputValue,
    categories: searchStore.categories,
    selectedCategories: searchStore.selectedCategories,
    handleInput: searchStore.handleInput,
    handleSelectCategories: searchStore.handleSelectCategories,
    handleSearch: searchStore.handleSearch,
    resetValues: searchStore.resetValues,
    options: searchStore.options,
    value: searchStore.value,
    title: searchStore.title,
  };
};

export default useSearchStore;
