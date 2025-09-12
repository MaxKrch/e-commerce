import clsx from "clsx"
import { memo, type FC } from "react"
import style from './Pagination.module.scss'

export type PaginationProps = {
    start?: number,
    size?: number,
    page: number,
    className?: string,
    onClick: (page: number) => void
}

const Pagination: FC<PaginationProps> = ({
    start = 1,
    size = 9,
    page,
    className,
    onClick
}) => {
    const pages: number[] = [];

    for (let i = start; i < start + size; i += 1) {
        pages.push(i)
    }

    return (
        <ul>
            {pages.map(item => (
                <li
                    className={clsx(
                        style['page'],
                        (item === page) && style['current'],
                        className
                    )}
                    key={item}
                    onClick={() => onClick(item)}
                >
                    {item}
                </li>
            ))}
        </ul>
    )
}

Pagination.displayName = "Pagination"
export default memo(Pagination);