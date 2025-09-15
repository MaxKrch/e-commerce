import clsx from "clsx";
import type { CardProps } from "./Card"
import style from './Card.module.scss'
import React from "react";

export type CardSkeletonProps = Pick<CardProps, 'display' | 'className'>
const CardSkeleton: React.FC<CardSkeletonProps> = ({ display }) => {
    return (
        <div className={clsx(style['card'], style['skeleton'], style[`${display}-card`])}>
            <div className={clsx(style['img'], style[`${display}-img`], style['skeleton-img'])} />
            <div className={clsx(style['skeleton-body'], style[`skeleton-${display}-body`])}>
                <div className={clsx(style['skeleton-title'])} />
                <div className={clsx(style['skeleton-main'], style[`skeleton-${display}-main`])}>
                    <p />
                    <p />
                    <p />
                    <p />
                </div>
                <div className={clsx(style['skeleton-footer'], style[`skeleton-${display}-footer`])} />
            </div>
        </div>
    )
}

export default React.memo(CardSkeleton);
