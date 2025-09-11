import React, { memo } from 'react';
import Text from '../Text';
import cn from 'classnames'
import style from './Card.module.css'

export type CardProps = {
    /** Дополнительный classname */
    className?: string,
    /** URL изображения */
    image: string;
    /** Слот над заголовком */
    captionSlot?: React.ReactNode;
    /** Заголовок карточки */
    title: React.ReactNode;
    /** Описание карточки */
    subtitle: React.ReactNode;
    /** Содержимое карточки (футер/боковая часть), может быть пустым */
    contentSlot?: React.ReactNode;
    /** Клик на карточку */
    onClick?: React.MouseEventHandler;
    /** Слот для действия */
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
    return(
        <article
            className={cn(style['card'], className)} 
            onClick={onClick}
        >
            <div className={cn(style['card-img__container'])}>
                <img
                    className={cn(style['card-img__img'])} 
                    src={image} 
                    alt={title ? title.toString() : 'Card image'} 
                />
            </div>
 
            <div className={cn(style['card-body'])}>
                <main className={cn(style['card-content'])}>
                    {captionSlot &&
                        <div className={cn(style['card-caption'])}>
                            {captionSlot}
                        </div>
                    }
                    <Text
                        maxLines={2}
                        view='p-20'
                        weight='bold'
                        color='primary' 
                        className={cn(style['card-title'])}
                    >
                        {title}
                    </Text>
                    <Text 
                        maxLines={3} 
                        view='p-16'
                        weight='normal'
                        color='secondary'
                        className={cn(style['card-subtitle'])}
                    >
                        {subtitle}
                    </Text>
                </main>
                <footer className={cn(style['card-footer'])}>
                    <div className={cn(style['card-footer__content'])}>
                        {contentSlot}
                    </div>
                    <div className={cn(style['card-footer__action'])}>
                        {actionSlot} 
                    </div>               
                </footer>
            </div>
        </article>
    )
};

Card.displayName = "Card"
export default memo(Card);
