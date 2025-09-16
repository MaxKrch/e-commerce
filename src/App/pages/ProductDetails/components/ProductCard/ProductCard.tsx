import clsx from 'clsx';
import Button from 'components/Button';
import Card, { CardSkeleton } from 'components/Card';
import Text from 'components/Text';
import React from 'react';
import type { Product } from 'types/product';

import style from './ProductCard.module.scss';
import { REQUEST_STATUS, type RequestStatus } from 'constants/request-status';

export type ProductCardProps = {
  product: Product | null;
  requestStatus: RequestStatus;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, requestStatus }) => {
  const handlePrimaryBtn = (id: Product['documentId']) => {
    void id;
  }

  const handleSecondBtn = (id: Product['documentId']) => {
    void id;
  }

  const contentSlot = () => {
    return (
      <Text weight="bold" className={clsx(style['content-slot'])}>
        ${product?.price}
      </Text>
    );
  }

  const actionSlot = () => {
    return (
      <>
        {product && (
          <div className={clsx(style['action-slot'])}>
            <Button onClick={() => handlePrimaryBtn(product.documentId)}>Купить сразу</Button>
            <Button priority="secondary" onClick={() => handleSecondBtn(product.documentId)}>
              В корзину
            </Button>
          </div>
        )}
      </>
    );
  }

  return (
    <article className={clsx(style['product-card'])}>
      {(requestStatus === REQUEST_STATUS.PENDING || !product)
        ? <CardSkeleton display='full' />
        : <Card display="full" product={product} contentSlot={contentSlot} actionSlot={actionSlot} />
      }
    </article>
  );
};


export default React.memo(ProductCard);
