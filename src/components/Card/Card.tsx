import React, { memo } from 'react';
import Text from 'components/Text';
import clsx from 'clsx'
import style from './Card.module.scss'
import type { ProductResponseShort } from 'types/product';

export type CardProps = {
    display?: 'full' | 'preview',
    product: ProductResponseShort;
    className?: string,
    onClick?: React.MouseEventHandler;
    captionSlot?: React.ReactNode;
    contentSlot?: (product: ProductResponseShort) => React.ReactNode;
    actionSlot?: (id: ProductResponseShort['documentId']) => React.ReactNode;
};

const Card: React.FC<CardProps> = ({
    display = 'preview',
    product,
    onClick,
    captionSlot,
    contentSlot,
    actionSlot,
    className
}) => {
    const {
        images,
        description,
        documentId: id,
        title,
    } = product;
    return (
        <article className={clsx(style['card'], className)}>
            <div
                className={clsx(style['img'])}
                onClick={onClick}
            >
                <img
                    className={clsx(style['img__img'])}
                    src={images[0].url}
                    alt={title ? title.toString() : 'Card image'}
                />
            </div>
            <main
                className={clsx(style['body'])}
                onClick={onClick}
            >
                <div className={clsx(style['caption-slot'])}>
                    {captionSlot}
                </div>
                <Text
                    maxLines={2}
                    view='p-20'
                    weight='bold'
                    color='primary'
                    className={clsx(style['title'])}
                >
                    {title}
                </Text>
                <Text
                    maxLines={3}
                    view='p-16'
                    weight='normal'
                    color='secondary'
                >
                    {description}
                </Text>
            </main>
            <footer className={clsx(style['footer'], style[display])}>
                <div className={clsx(style['content-slot'])}>
                    {contentSlot && contentSlot(product)}
                </div>
                <div className={clsx(style['action-slot'])}>
                    {actionSlot && actionSlot(id)}
                </div>
            </footer>
        </article>
    )
};

Card.displayName = "Card"
export default memo(Card);
