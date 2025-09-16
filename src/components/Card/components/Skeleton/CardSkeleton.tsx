import clsx from "clsx";
import type { CardProps } from "../../Card"
import style from './CardSkeleton.module.scss';
import React from "react";

export type CardSkeletonProps = Pick<CardProps, 'display' | 'className'>
const CardSkeleton: React.FC<CardSkeletonProps> = ({ display }) => {
    return (
        <div className={clsx(style['skeleton'], style[`skeleton-${display}`])}>
            <div className={clsx(style['skeleton-img'], style[`${display}-img`])} />
            <div className={clsx(style['skeleton-main'], style[`${display}-main`])}>
                <div className={clsx(style['skeleton-title'], style[`${display}-title`])} />
                <div className={clsx(style['skeleton-description'], style[`${display}-description`])}>
                    <p />
                    <p />
                    <p />
                    <p />
                </div>
                <div className={clsx(style[`skeleton-footer`], style[`${display}-footer`])} />
            </div>
        </div>
    )
}

export default React.memo(CardSkeleton);
