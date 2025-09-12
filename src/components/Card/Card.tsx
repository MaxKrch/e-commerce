import React, { memo } from 'react';
import Text from 'components/Text';
import cn from 'clsx'
import style from './Card.module.scss'

export type CardProps = {
    image: string;
    title: React.ReactNode;
    subtitle: React.ReactNode;
    className?: string,
    captionSlot?: React.ReactNode;
    contentSlot?: React.ReactNode;
    onClick?: React.MouseEventHandler;
    actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
    image,
    captionSlot,
    title,
    subtitle,
    contentSlot,
    onClick,
    actionSlot,
    className
}) => {
    return (
        <article
            className={cn(style['card'], className)}
            onClick={onClick}
        >
            <div className={cn(style['img'])}>
                <img
                    className={cn(style['img__img'])}
                    src={image}
                    alt={title ? title.toString() : 'Card image'}
                />
            </div>
            <main className={cn(style['body'])}>
                {captionSlot &&
                    <div className={cn(style['caption'])}>
                        {captionSlot}
                    </div>
                }
                <Text
                    maxLines={2}
                    view='p-20'
                    weight='bold'
                    color='primary'
                    className={cn(style['title'])}
                >
                    {title}
                </Text>
                <Text
                    maxLines={3}
                    view='p-16'
                    weight='normal'
                    color='secondary'
                    className={cn(style['subtitle'])}
                >
                    {subtitle}
                </Text>
            </main>
            <footer className={cn(style['footer'])}>
                <div className={cn(style['footer__content'])}>
                    {contentSlot}
                </div>
                <div className={cn(style['footer__action'])}>
                    {actionSlot}
                </div>
            </footer>
        </article>
    )
};

Card.displayName = "Card"
export default memo(Card);
