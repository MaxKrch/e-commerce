import clsx from 'clsx';
import { previewCardCaptionSlot, previewCardActionSlot, previewCardContentSlot } from 'components/Card/slots';
import CardList from 'components/CardList';
import Text from 'components/Text';
import { memo } from 'react';
import type { Product } from 'types/product';

import style from './RelatedProducts.module.scss';

export type RelatedProductsProps = {
  products: Product[];
};

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  return (
    <div className={clsx(style['container'])}>
      <Text color="primary" weight="bold" className={clsx(style['title'])}>
        Related products
      </Text>
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

RelatedProducts.displayName = 'RelatedProducts';
export default memo(RelatedProducts);
