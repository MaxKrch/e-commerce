import clsx from 'clsx';
import MultiDropdown from 'components/MultiDropdown';

import style from './ProductFilter.module.scss';

const ProductFilter = () => {
  return (
    <div className={clsx(style['filter'])}>
      <MultiDropdown options={[]} value={[]} onChange={() => undefined} getTitle={() => ''} />
    </div>
  );
};

export default ProductFilter;
