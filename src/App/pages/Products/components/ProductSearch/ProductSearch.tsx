import { clsx } from 'clsx';
import Search from 'components/Search';
import { useCallback, useState } from 'react';

import style from './ProductSearch.module.scss';

export type ProductSearchProps = {
  onSearch: (value: string) => void;
};

const ProductSearch = ({ onSearch }: ProductSearchProps) => {
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (newValue: string) => {
      if (newValue !== value) setValue(newValue);
    },
    [value]
  );

  const handleSearch = useCallback(() => {
    onSearch(value);
    setValue('');
  }, [value, onSearch]);

  return (
    <div className={clsx(style['search'])}>
      <Search
        fullscreen={true}
        value={value}
        onChangeValue={handleChange}
        onSearch={handleSearch}
        placeholder="Search product"
      />
    </div>
  );
};

export default ProductSearch;
