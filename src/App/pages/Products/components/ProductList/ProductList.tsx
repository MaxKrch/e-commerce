import { clsx } from 'clsx';
import {
  previewCardActionSlot,
  previewCardContentSlot,
  previewCardCaptionSlot,
} from 'components/Card/slots';
import CardList from 'components/CardList';
import Text from 'components/Text';
import { memo } from 'react';
import type { Product } from 'types/product';

import style from './ProductList.module.scss';

type ProductListProps = {
  products: Product[];
  total?: number;
};

const ProductList = ({ products, total }: ProductListProps) => {
  return (
    <div className={clsx(style['container'])}>
      <div className={clsx(style['count'])}>
        <Text color="primary" weight="bold" className={clsx(style['count__title'])}>
          Total products
        </Text>
        <Text view="p-20" color="secondary" className={clsx(style['count__size'])}>
          {total || products.length}
        </Text>
      </div>
      <CardList
        display="preview"
        products={products}
        captionSlot={previewCardCaptionSlot}
        contentSlot={previewCardContentSlot}
        actionSlot={previewCardActionSlot}
      />
    </div>
  );
};

ProductList.displayName = 'ProductList';
export default memo(ProductList);
