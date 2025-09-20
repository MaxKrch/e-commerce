import { META_STATUS } from 'constants/meta-status';

import clsx from 'clsx';
import {
  previewCardCaptionSlot,
  PreviewCardActionSlot,
  previewCardContentSlot,
} from 'components/Card/slots';
import CardList from 'components/CardList';
import CardListSkeleton from 'components/CardList/CardListSkeleton';
import Text from 'components/Text';
import useRootStore from 'context/root-store/useRootStore';
import { memo } from 'react';

import style from './RelatedProducts.module.scss';
import { observer } from 'mobx-react-lite';

const RelatedProducts = () => {
  const { productsStore } = useRootStore();

  return (
    <div className={clsx(style['container'])}>
      <Text color="primary" weight="bold" className={clsx(style['title'])}>
        Вам понравится
      </Text>
      {productsStore.status === META_STATUS.SUCCESS ? (
        <CardList
          display="preview"
          products={productsStore.products}
          captionSlot={previewCardCaptionSlot}
          contentSlot={previewCardContentSlot}
          ActionSlot={PreviewCardActionSlot}
          className={clsx(style['related-products'])}
        />
      ) : (
        <CardListSkeleton
          display="preview"
          skeletonCount={6}
          className={clsx(style['related-products'])}
        />
      )}
    </div>
  );
};

export default memo(observer(RelatedProducts));
