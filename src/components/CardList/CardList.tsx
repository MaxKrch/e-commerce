import { appRoutes } from 'constants/app-routes';

import { clsx } from 'clsx';
import Card, { type CardProps } from 'components/Card';
import { memo, useCallback, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from 'types/products';

import style from './CardList.module.scss';
import { observer } from 'mobx-react-lite';

type CardListProps = Pick<CardProps, 'contentSlot' | 'actionSlot' | 'captionSlot' | 'className'> & {
  display?: 'preview' | 'full';
  products: Product[];
  titleSlot?: ReactNode;
};

const CardList = ({
  products = [],
  display,
  titleSlot,
  captionSlot,
  actionSlot,
  contentSlot,
  className
}: CardListProps) => {
  const navigate = useNavigate();

  const handleCartClick = useCallback(
    (id: Product['documentId']) => {
      navigate(`${appRoutes.products.details.create(id)}`);
    },
    [navigate]
  );

  return (
    <div className={clsx(style['container'], className)}>
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


export default memo(observer(CardList));
