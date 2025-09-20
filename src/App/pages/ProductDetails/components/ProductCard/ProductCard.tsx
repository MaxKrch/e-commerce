import { META_STATUS, type MetaStatus } from 'constants/meta-status';

import clsx from 'clsx';
import Card, { CardSkeleton } from 'components/Card';
import { observer } from 'mobx-react-lite';
import React from 'react';
import type { Product } from 'types/products';

import style from './ProductCard.module.scss';
import ActionSlot from './slots/ActionSlot';
import ContentSlot from './slots/ContentSlot';

export type ProductCardProps = {
  product: Product | null;
  status: MetaStatus;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, status }) => {
  return (
    <article className={clsx(style['product-card'])}>
      {status === META_STATUS.PENDING || !product ? (
        <CardSkeleton display="full" />
      ) : (
        <Card
          display="full"
          product={product}
          contentSlot={() => <ContentSlot product={product} />}
          ActionSlot={ActionSlot}
        />
      )}
    </article>
  );
};

export default observer(ProductCard);
