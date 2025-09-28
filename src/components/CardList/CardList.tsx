import { appRoutes } from 'constants/app-routes';

import { clsx } from 'clsx';
import Card, { type CardProps } from 'components/Card';
import type { ActionSlot } from 'components/Card/types';
import { observer } from 'mobx-react-lite';
import { memo, useCallback, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from 'types/products';

import style from './CardList.module.scss';

type CardListProps = Pick<CardProps, 'contentSlot' | 'captionSlot' | 'className'> & {
  display?: 'preview' | 'full';
  products: Product[];
  titleSlot?: ReactNode;
  ActionSlot: ActionSlot;
};

const CardList = ({
  products = [],
  display,
  titleSlot,
  captionSlot,
  ActionSlot,
  contentSlot,
  className,
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
              ActionSlot={ActionSlot}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(observer(CardList));
