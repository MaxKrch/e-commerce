import { appRoutes } from 'constants/app-routes';

import { clsx } from 'clsx';
import Card, { type CardProps } from 'components/Card';
import { memo, useCallback, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProductResponseShort } from 'types/product';

import style from './CardList.module.scss';

type CardListProps = Pick<CardProps, 'contentSlot' | 'actionSlot' | 'captionSlot'> & {
  display?: 'preview' | 'full';
  products: ProductResponseShort[];
  titleSlot?: ReactNode;
};

const CardList = ({
  products,
  display,
  titleSlot,
  captionSlot,
  actionSlot,
  contentSlot,
}: CardListProps) => {
  const navigate = useNavigate();

  const handleCartClick = useCallback(
    (id: ProductResponseShort['documentId']) => {
      navigate(`${appRoutes.products.details.create(id)}`);
    },
    [navigate]
  );

  return (
    <div className={clsx(style['container'])}>
      {titleSlot}
      <ul className={clsx(style['list'])}>
        {products.map((product) => (
          <li key={product.documentId}>
            <Card
              display={display}
              className={clsx(style['card'])}
              product={product}
              onClick={() => handleCartClick(product.documentId)}
              captionSlot={captionSlot}
              contentSlot={contentSlot}
              actionSlot={actionSlot}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

CardList.displayName = 'cardList';
export default memo(CardList);
