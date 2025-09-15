import clsx from 'clsx';
import Text from 'components/Text';
import React, { memo, useCallback } from 'react';
import type { Product } from 'types/product';

import style from './Card.module.scss';
import ImageGalery from './components/ImageGalery';

export type CardProps = {
  display?: 'full' | 'preview';
  product: Product;
  className?: string;
  onClick?: React.MouseEventHandler;
  captionSlot?: (product: Product) => React.ReactNode;
  contentSlot?: (product: Product) => React.ReactNode;
  actionSlot?: (id: Product['documentId']) => React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  display = 'preview',
  product,
  onClick,
  captionSlot,
  contentSlot,
  actionSlot,
  className,
}) => {
  const { images, description, documentId: id, title } = product;

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (display === 'preview' && onClick) {
      onClick(event)
    }
  }, [])

  return (
    <article className={clsx(style['card'], style[`${display}-card`], className)}>
      <div className={clsx(style['img'], style[`${display}-img`])} onClick={handleClick}>
        {display === 'full' ? (
          <ImageGalery images={images} />
        ) : (
          <img
            className={clsx(style['img__img'])}
            src={images[0].url}
            alt={title ? title.toString() : 'Card image'}
          />
        )}
      </div>
      <div className={clsx(style['body'], style[`${display}-body`])}>
        <main className={clsx(style['main'], style[`${display}-main`])} onClick={handleClick}>
          {captionSlot && (
            <div className={clsx(style[`${display}-caption-slot`])}>{captionSlot(product)}</div>
          )}
          <Text
            maxLines={2}
            tag='h3'
            weight="bold"
            color="primary"
            className={clsx(style[`${display}-title`])}
          >
            {title}
          </Text>
          <Text
            maxLines={3}
            weight="normal"
            color="secondary"
            className={clsx(style[`${display}-description`])}
          >
            {description}
          </Text>
        </main>
        <footer className={clsx(style[`${display}-footer`])}>
          <div className={clsx(style[`${display}-content-slot`])}>
            {contentSlot && contentSlot(product)}
          </div>
          <div className={clsx(style[`${display}-action-slot`])}>
            {actionSlot && actionSlot(id)}
          </div>
        </footer>
      </div>
    </article>
  );
};


export default memo(Card);
