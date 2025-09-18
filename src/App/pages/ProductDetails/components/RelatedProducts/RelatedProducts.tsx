import clsx from 'clsx';
import { previewCardCaptionSlot, previewCardActionSlot, previewCardContentSlot } from 'components/Card/slots';
import CardList from 'components/CardList';
import Text from 'components/Text';
import { memo } from 'react';
import type { Product } from 'types/products';

import style from './RelatedProducts.module.scss';
import { META_STATUS, type MetaStatus } from 'constants/meta-status';
import CardListSkeleton from 'components/CardList/CardListSkeleton';

export type RelatedProductsProps = {
  products: Product[];
  MetaStatus: MetaStatus;
};

const RelatedProducts = ({ products, MetaStatus }: RelatedProductsProps) => {
  return (
    <div className={clsx(style['container'])}>
      <Text color="primary" weight="bold" className={clsx(style['title'])}>
        Вам понравится
      </Text>
      {MetaStatus === META_STATUS.SUCCESS
        ? (<CardList
          display="preview"
          products={products}
          captionSlot={previewCardCaptionSlot}
          contentSlot={previewCardContentSlot}
          actionSlot={previewCardActionSlot}
          className={clsx(style['related-products'])}
        />
        ) : (
          <CardListSkeleton display='preview' skeletonCount={3} className={clsx(style['related-products'])} />
        )
      }
    </div>
  );
};

export default memo(RelatedProducts);
