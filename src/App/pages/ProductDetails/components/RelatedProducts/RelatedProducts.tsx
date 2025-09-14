import clsx from 'clsx';
import previewCardActionSlot from 'components/Card/slots/previewCardActionSlot';
import previewCardContentSlot from 'components/Card/slots/previewCardContentSlot';
import CardList from 'components/CardList';
import Text from 'components/Text';
import { memo } from 'react';
import type { ProductResponseShort } from 'types/product';

import style from './RelatedProducts.module.scss';

export type RelatedProductsProps = {
  products: ProductResponseShort[];
};

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  return (
    <div className={clsx(style['container'])}>
      <Text color="primary" weight="bold" className={clsx(style['title'])}>
        Related Items
      </Text>
      <CardList
        display="preview"
        products={products}
        contentSlot={previewCardContentSlot}
        actionSlot={previewCardActionSlot}
      />
    </div>
  );
};

RelatedProducts.displayName = 'RelatedProducts';
export default memo(RelatedProducts);
