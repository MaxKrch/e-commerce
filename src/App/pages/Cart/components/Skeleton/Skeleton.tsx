import React from "react";
import style from './Skeleton.module.scss'
import clsx from "clsx";

const Skeleton: React.FC = () => {
    return (
        <div className={clsx(style['list'])}>
            <div className={clsx(style['list-card'])}>
                <div className={clsx(style['list-card-img'])} />
                <div className={clsx(style['list-card-content'])}>
                    <div className={clsx(style['list-card-content-title'])} />
                    <div className={clsx(style['list-card-content-description'])} />
                </div>
                <div className={clsx(style['list-card-content-button'])} />
            </div>

            <div className={clsx(style['list-card'])}>
                <div className={clsx(style['list-card-img'])} />
                <div className={clsx(style['list-card-content'])}>
                    <div className={clsx(style['list-card-content-title'])} />
                    <div className={clsx(style['list-card-content-description'])} />
                </div>
                <div className={clsx(style['list-card-content-button'])} />
            </div>

            <div className={clsx(style['summary'])}>
                <div className={clsx(style['summary-content'])} />
                <div className={clsx(style['summary-button'])} />
            </div>
        </div>
    )
}

export default Skeleton;