import clsx from 'clsx';
import Button from 'components/Button';
import Card from 'components/Card';
import Text from 'components/Text';
import { memo, useCallback } from 'react';
import type { ProductResponseFull } from 'types/product';

import style from './ProductCard.module.scss';

export type ProductCardProps = {
  product: ProductResponseFull;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const handlePrimaryBtn = useCallback((id: ProductResponseFull['documentId']) => {
    void id;
  }, []);

  const handleSecondBtn = useCallback((id: ProductResponseFull['documentId']) => {
    void id;
  }, []);

  const contentSlot = useCallback(() => {
    return (
      <Text weight="bold" className={clsx(style['content-slot'])}>
        ${product.price}
      </Text>
    );
  }, [product]);

  const actionSlot = useCallback(() => {
    return (
      <div className={clsx(style['action-slot'])}>
        <Button onClick={() => handlePrimaryBtn(product.documentId)}>Buy Now</Button>
        <Button priority="secondary" onClick={() => handleSecondBtn(product.documentId)}>
          Add to Cart
        </Button>
      </div>
    );
  }, [product, handlePrimaryBtn, handleSecondBtn]);

  return (
    <article className={clsx(style['product-card'])}>
      <Card display="full" product={product} contentSlot={contentSlot} actionSlot={actionSlot} />
    </article>
  );
};

ProductCard.displayName = 'ProductCard';
export default memo(ProductCard);
