
import { clsx } from 'clsx';
import { CardSkeleton } from 'components/Card';
import React from 'react';

import style from './CardList.module.scss';

type CardListSkeletonProps = {
    display?: 'preview' | 'full';
    skeletonCount?: number;
    className?: string;
};

const CardList: React.FC<CardListSkeletonProps> = ({
    display = 'preview',
    skeletonCount = 6,
    className
}) => {

    return (
        <div className={clsx(style['container'], className)}>
            <ul className={clsx(style['list'])}>
                {Array(skeletonCount).fill('').map((item, index) => item + index).map(item => (
                    <li key={item}>
                        <CardSkeleton display={display} />
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default React.memo(CardList);