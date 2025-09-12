import clsx from "clsx"
import { memo, useCallback, type FC } from "react"
import style from './Pagination.module.scss'
import ArrowRightIcon from "components/icons/ArrowRightIcon"
import Text from "components/Text"
import getPageNumbers from "./get-page-numbers"

export type PaginationProps = {
    currentPage: number,
    pageCount?: number,
    className?: string,
    countLinks?: number,
    onClick: (page: number) => void
}

const Pagination: FC<PaginationProps> = ({
    currentPage,
    pageCount,
    className,
    countLinks = 2,
    onClick
}) => {
    if (typeof pageCount !== 'number' || pageCount <= 1) {
        return null;
    }
    const normalizedCurrentPage = Math.min(Math.max(1, currentPage), pageCount)

    const showLeftElipses = (normalizedCurrentPage - countLinks > 2);
    const showRightElipses = !!pageCount && (normalizedCurrentPage + countLinks < pageCount - 1)
    const pages = getPageNumbers(normalizedCurrentPage, pageCount, countLinks);

    const handleClick = useCallback((page: number) => {
        if (page === normalizedCurrentPage || page < 1 || (pageCount && page > pageCount)) return;
        onClick(page)
    }, [onClick, normalizedCurrentPage, pageCount])

    return (
        <div className={clsx(style['container'], className)}>
            <div
                onClick={() => handleClick(normalizedCurrentPage - 1)}
                className={clsx(
                    style['page'],
                    style['page__prev'],
                    (normalizedCurrentPage === 1) && style['disabled']
                )}>
                <ArrowRightIcon className={clsx(style['page__prev-icon'])} />
            </div>
            {showLeftElipses &&
                <div className={clsx(style['elipses'], style['elipses__prev'])}>...</div>
            }
            <ul className={clsx(style['list'])}>
                {pages.map(item => (
                    <li
                        className={clsx(
                            style['page'],
                            (item === normalizedCurrentPage) && style['current']
                        )}
                        key={item}
                        onClick={() => handleClick(item)}
                    >
                        <Text
                            view="p-18"
                            weight="medium"
                        >
                            {item}
                        </Text>
                    </li>
                ))}
            </ul>
            {showRightElipses &&
                <div className={clsx(style['elipses'], style['elipses__next'])}>...</div>
            }
            <div
                onClick={() => handleClick(normalizedCurrentPage + 1)}
                className={clsx(
                    style['page'],
                    style['page__next'],
                    (normalizedCurrentPage === pageCount) && style['disabled']
                )}>
                <ArrowRightIcon className={clsx(style['page__next-icon'])} />
            </div>
        </div>
    )
}

Pagination.displayName = "Pagination"
export default memo(Pagination);