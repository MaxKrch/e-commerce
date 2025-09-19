import clsx from 'clsx';
import Text from 'components/Text';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import { memo, useEffect, useMemo, type FC } from 'react';

import style from './Pagination.module.scss';
import getPageNumbers from './utils/get-page-numbers';

export type PaginationProps = {
  currentPage: number;
  pageCount?: number;
  className?: string;
  visiblePageArround?: number;
  onClick: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({
  currentPage,
  pageCount,
  className,
  visiblePageArround = 2,
  onClick,
}) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  const showLeftElipses = currentPage - visiblePageArround > 2;
  const showRightElipses =
    !!pageCount && currentPage + visiblePageArround < pageCount - 1;

  const pages = useMemo(
    () => getPageNumbers(currentPage, pageCount, visiblePageArround),
    [currentPage, pageCount, visiblePageArround]
  )

  return (
    <div className={clsx(style['container'], className)}>
      <div
        onClick={() => onClick(currentPage - 1)}
        className={clsx(
          style['page'],
          style['page__prev'],
          currentPage === 1 && style['disabled']
        )}
      >
        <ArrowRightIcon className={clsx(style['page__prev-icon'])} />
      </div>
      {showLeftElipses && <div className={clsx(style['elipses'], style['elipses__prev'])}>...</div>}
      <ul className={clsx(style['list'])}>
        {pages.map((item) => (
          <li
            className={clsx(style['page'], item === currentPage && style['current'])}
            key={item}
            onClick={() => onClick(item)}
          >
            <Text view="p-18" weight="medium">
              {item}
            </Text>
          </li>
        ))}
      </ul>
      {showRightElipses && (
        <div className={clsx(style['elipses'], style['elipses__next'])}>...</div>
      )}
      <div
        onClick={() => onClick(currentPage + 1)}
        className={clsx(
          style['page'],
          style['page__next'],
          currentPage === pageCount && style['disabled']
        )}
      >
        <ArrowRightIcon className={clsx(style['page__next-icon'])} />
      </div>
    </div>
  );
};


export default memo(Pagination);
