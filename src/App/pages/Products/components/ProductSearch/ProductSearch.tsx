import { clsx } from 'clsx';
import { useCallback } from 'react';

import style from './ProductSearch.module.scss';
import MultiDropdown from 'components/MultiDropdown';
import Input from 'components/Input';
import Button from 'components/Button';
import SearchIcon from 'components/icons/SearchIcon';
import Loader from 'components/Loader';
import CrossIcon from 'components/icons/CrossIcon';
import useLocalStore from 'hooks/useLocalStore';
import SearchStore from 'store/local/SearchStore';
import { observer } from 'mobx-react-lite';

export type ProductSearchProps = {
  onSearch: (value: string) => void;
};

const ProductSearch = ({ onSearch }: ProductSearchProps) => {
  const searchStore = useLocalStore(() => new SearchStore)

  const mockStatus = false;

  const handleChange = useCallback(
    (newValue: string) => {
      console.log(searchStore.inputValue)
      if (newValue !== searchStore.inputValue) {
        searchStore.handleChangeInput()
        console.log(searchStore.inputValue)
      }

    },
    [searchStore.inputValue]
  );

  const handleSearch = useCallback(() => {
    onSearch(searchStore.inputValue);
    searchStore.handleChangeInput();
  }, [searchStore.inputValue, onSearch]);

  return (
    <div className={clsx(style['search'])}>
      <div className={clsx(style['query'])}>
        <div className={clsx(style['query-input'])}>
          <Input
            value={searchStore.inputValue}
            onChange={handleChange}
            placeholder={''}
            className={clsx(style['query-input-element'])}
            name="searchInput"
          />
          {searchStore.inputValue.length > 0 && <CrossIcon className={clsx(style['query-input-cross'])} />}
        </div>

        <Button onClick={handleSearch} disabled={false} className={clsx(style['query-button'])} name="searchButton">
          {mockStatus ? <Loader className={clsx(style['query-button-icon'])} /> : <SearchIcon className={clsx(style['query-button-icon'])} />}
          {<div className={clsx(style['query-button-text'])}>Найти</div>}
        </Button>
      </div>

      <MultiDropdown
        options={[]}
        value={[]}
        onChange={() => undefined}
        getTitle={() => ''}
        className={clsx(style['filter'])}
      />
    </div>
  );
};


export default observer(ProductSearch);
