import React, { memo } from 'react';
import Text from 'components/Text';
import clsx from 'clsx'
import style from './Card.module.scss'
import type { ProductResponseShort } from 'types/product';
import ImageGalery from './components/ImageGalery';

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
        <article className={clsx(style['card'], style[`${display}-card`], className)}>
            <div
                className={clsx(style['img'], style[`${display}-img`])}
                onClick={onClick}
            >

                {display === 'full'
                    ? <ImageGalery images={images} />
                    : <img
                        className={clsx(style['img__img'])}
                        src={images[0].url}
                        alt={title ? title.toString() : 'Card image'}
                    />
                }

            </div>
            <div className={clsx(style['body'], style[`${display}-body`])}>
                <main
                    className={clsx(style['main'], style[`${display}-main`])}
                    onClick={onClick}
                >
                    <div className={clsx(style[`${display}-caption-slot`])}>
                        {captionSlot}
                    </div>
                    <Text
                        maxLines={2}
                        view='p-20'
                        weight='bold'
                        color='primary'
                        className={clsx(style[`${display}-title`])}
                    >
                        {title}
                    </Text>
                    <Text
                        maxLines={3}
                        view='p-16'
                        weight='normal'
                        color='secondary'
                        className={clsx(style[`${display}-description`])}
                    >
                        {description}
                    </Text>
                </main>
                <footer className={clsx(style[`${display}-footer`])}>
                    <div className={clsx(style[`${display}-content-slot`])}>
                        {contentSlot && contentSlot(product)}
                    </div >
                    <div className={clsx(style[`${display}-action-slot`])}>
                        {actionSlot && actionSlot(id)}
                    </div>
                </footer>
            </div>
        </article>
    )
};

Card.displayName = "Card"
export default memo(Card);
