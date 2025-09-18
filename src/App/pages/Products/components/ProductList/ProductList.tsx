import { clsx } from 'clsx';
import {
  previewCardActionSlot,
  previewCardContentSlot,
  previewCardCaptionSlot,
} from 'components/Card/slots';
import CardList from 'components/CardList';
import Text from 'components/Text';
import { memo } from 'react';
import type { Product } from 'types/products';

import style from './ProductList.module.scss';
import { META_STATUS, type MetaStatus } from 'constants/meta-status';
import CardListSkeleton from 'components/CardList/CardListSkeleton';

type ProductListProps = {
  products: Product[];
  total?: number;
  MetaStatus: MetaStatus;
};

const ProductList = ({ products, total, MetaStatus }: ProductListProps) => {
  return (
    <div className={clsx(style['container'])}>
      <div className={clsx(style['count'])}>
        <Text color="primary" weight="bold" className={clsx(style['count__title'])}>
          Найдено товаров
        </Text>
        <Text view="p-20" color="secondary" className={clsx(style['count__size'])}>
          {total || products.length}
        </Text>
      </div>
      {MetaStatus === META_STATUS.SUCCESS
        ? (
          <CardList
            display="preview"
            products={products}
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


export default memo(ProductList);
