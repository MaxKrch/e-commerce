import clsx from "clsx"
import { memo, useCallback, type FC } from "react"
import style from './Pagination.module.scss'
import ArrowRightIcon from "components/icons/ArrowRightIcon"
import Text from "components/Text"
import getPages from "./get-pages"

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

    const showLeftElipses = (currentPage - countLinks > 1);
    const showRightElipses = !!pageCount && (currentPage + countLinks < pageCount)
    const pages = getPages(currentPage, pageCount, countLinks);

    const handleClick = useCallback((page: number) => {
        if (page === currentPage || page < 1 || (pageCount && page > pageCount)) return;
        onClick(page)
    }, [onClick, currentPage, pageCount])

    return (
        <div className={clsx(style['container'], className)}>
            <div
                onClick={() => handleClick(currentPage - 1)}
                className={clsx(
                    style['page'],
                    style['page__prev'],
                    (currentPage === 1) && style['disabled']
                )}>
                <ArrowRightIcon className={clsx(style['page__prev-icon'])} />
            </div>
            {showLeftElipses &&
                <div className={clsx(style['elipses'])}>...</div>
            }
            <ul className={clsx(style['list'])}>
                {pages.map(item => (
                    <li
                        className={clsx(
                            style['page'],
                            (item === currentPage) && style['current']
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
                <div className={clsx(style['elipses'])}>...</div>
            }
            <div
                onClick={() => handleClick(currentPage + 1)}
                className={clsx(
                    style['page'],
                    style['page__next'],
                    (currentPage === pageCount) && style['disabled']
                )}>
                <ArrowRightIcon className={clsx(style['page__next-icon'])} />
            </div>
        </div>
    )
}

Pagination.displayName = "Pagination"
export default memo(Pagination);