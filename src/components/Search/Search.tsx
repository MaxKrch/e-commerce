import clsx from 'clsx';
import Button from 'components/Button';
import Input from 'components/Input';
import { useMemo, type FC } from 'react';

import style from './Search.module.scss';

type SearchProps = {
  fullscreen?: boolean;
  placeholder?: string;
  minSearchLength?: number;
  value: string;
  onChangeValue: (value: string) => void;
  onSearch: () => void;
};

const Search: FC<SearchProps> = ({
  fullscreen,
  value,
  onChangeValue,
  placeholder,
  onSearch,
  minSearchLength,
}) => {
  const disabled = useMemo(() => {
    return !!minSearchLength && minSearchLength < value.length;
  }, [minSearchLength, value.length]);

  return (
    <div className={clsx(style['search'], fullscreen && style['fullscreen'])}>
      <Input
        value={value}
        onChange={onChangeValue}
        placeholder={placeholder}
        className={clsx(style['input'])}
      />
      <Button onClick={onSearch} disabled={disabled} className={clsx(style['button'])}>
        Find now
      </Button>
    </div>
  );
};

export default Search;
