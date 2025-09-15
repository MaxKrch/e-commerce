import clsx from 'clsx';
import { previewCardCaptionSlot, previewCardActionSlot, previewCardContentSlot } from 'components/Card/slots';
import CardList from 'components/CardList';
import Text from 'components/Text';
import { memo } from 'react';
import type { Product } from 'types/product';

import style from './RelatedProducts.module.scss';
import { REQUEST_STATUS, type RequestStatus } from 'constants/request-status';
import CardListSkeleton from 'components/CardList/CardListSkeleton';

export type RelatedProductsProps = {
  products: Product[];
  requestStatus: RequestStatus;
};

const RelatedProducts = ({ products, requestStatus }: RelatedProductsProps) => {
  return (
    <div className={clsx(style['container'])}>
      <Text color="primary" weight="bold" className={clsx(style['title'])}>
        Related products
      </Text>
      {requestStatus === REQUEST_STATUS.SUCCESS
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
