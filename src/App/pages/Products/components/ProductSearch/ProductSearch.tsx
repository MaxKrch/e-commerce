import { clsx } from 'clsx';
import style from './ProductSearch.module.scss';
import MultiDropdown from 'components/MultiDropdown';
import Input from 'components/Input';
import Button from 'components/Button';
import SearchIcon from 'components/icons/SearchIcon';
import CrossIcon from 'components/icons/CrossIcon';
import { observer } from 'mobx-react-lite';
import useSearchStore from 'hooks/useSearchStore';
import useQueryParams from 'hooks/useQueryParams';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';


const ProductSearch = () => {
  const { setQueryParams } = useQueryParams();
  const searchCleared = useRef(false)
  const location = useLocation()

  const searchStore = useSearchStore({ handleChange: setQueryParams });

  useEffect(() => {
    if (location.search !== '') {
      searchCleared.current = false;
      return;
    }

    if (location.search === "" && !searchCleared.current) {
      searchStore.resetValues();
      searchCleared.current = true;
    }
  }, [location.search, searchStore.resetValues, searchCleared.current]);

  return (
    <div className={clsx(style['search'])}>
      <div className={clsx(style['query'])}>
        <div className={clsx(style['query-input'])}>
          <Input
            value={searchStore.inputValue}
            onChange={searchStore.handleInput}
            placeholder={'Что будем искать?'}
            className={clsx(style['query-input-element'])}
            name="searchInput"
          />
          {searchStore.inputValue.length > 0 && <CrossIcon className={clsx(style['query-input-cross'])} />}
        </div>

        <Button onClick={searchStore.handleSearch} disabled={false} className={clsx(style['query-button'])} name="searchButton">
          <SearchIcon className={clsx(style['query-button-icon'])} />
          {<div className={clsx(style['query-button-text'])}>Найти</div>}
        </Button>
      </div>

      <MultiDropdown
        options={searchStore.options}
        value={searchStore.value}
        onChange={searchStore.handleSelectCategories}
        getTitle={() => searchStore.title}
        className={clsx(style['filter'])}
      />
    </div>
  );
};


export default observer(ProductSearch);
