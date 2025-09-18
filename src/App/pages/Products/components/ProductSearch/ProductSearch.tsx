import { clsx } from 'clsx';
import style from './ProductSearch.module.scss';
import MultiDropdown from 'components/MultiDropdown';
import Input from 'components/Input';
import Button from 'components/Button';
import SearchIcon from 'components/icons/SearchIcon';
import CrossIcon from 'components/icons/CrossIcon';
import { observer } from 'mobx-react-lite';
import useSearchStore from 'hooks/useSearchStore';
import setQueryParams from 'utils/set-query-params';


const ProductSearch = () => {
  const {
    inputValue,
    options,
    value,
    title,
    handleInput,
    handleSearch,
    handleSelectCategories
  } = useSearchStore({ handleChange: setQueryParams });

  return (
    <div className={clsx(style['search'])}>
      <div className={clsx(style['query'])}>
        <div className={clsx(style['query-input'])}>
          <Input
            value={inputValue}
            onChange={handleInput}
            placeholder={''}
            className={clsx(style['query-input-element'])}
            name="searchInput"
          />
          {inputValue.length > 0 && <CrossIcon className={clsx(style['query-input-cross'])} />}
        </div>

        <Button onClick={handleSearch} disabled={false} className={clsx(style['query-button'])} name="searchButton">
          <SearchIcon className={clsx(style['query-button-icon'])} />
          {<div className={clsx(style['query-button-text'])}>Найти</div>}
        </Button>
      </div>

      <MultiDropdown
        options={options}
        value={value}
        onChange={handleSelectCategories}
        getTitle={() => title}
        className={clsx(style['filter'])}
      />
    </div>
  );
};


export default observer(ProductSearch);
