import { clsx } from 'clsx';
import {
  previewCardActionSlot,
  previewCardContentSlot,
  previewCardCaptionSlot,
} from 'components/Card/slots';
import CardList from 'components/CardList';
import Text from 'components/Text';
import React, { memo } from 'react';

import style from './ProductList.module.scss';
import { META_STATUS } from 'constants/meta-status';
import CardListSkeleton from 'components/CardList/CardListSkeleton';
import { observer } from 'mobx-react-lite';
import useRootStore from 'context/root-store/useRootStore';

const ProductList: React.FC = () => {
  const { productsStore } = useRootStore();

  return (
    <div className={clsx(style['container'])}>
      <div className={clsx(style['count'])}>
        <Text color="primary" weight="bold" className={clsx(style['count__title'])}>
          Найдено товаров
        </Text>
        <Text view="p-20" color="secondary" className={clsx(style['count__size'])}>
          {productsStore.countProducts}
        </Text>
      </div>
      {productsStore.status === META_STATUS.SUCCESS
        ? (
          <CardList
            display="preview"
            products={productsStore.products}
            captionSlot={previewCardCaptionSlot}
            contentSlot={previewCardContentSlot}
            actionSlot={previewCardActionSlot}
          />
        ) : (
          <CardListSkeleton skeletonCount={6} display='preview' />
        )
      }
    </div>
  );
};

export default memo(observer(ProductList));
