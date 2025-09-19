import clsx from 'clsx';
import Text from 'components/Text';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import { memo, useEffect, useMemo, type FC } from 'react';

import style from './Pagination.module.scss';
import getPageNumbers from './utils/get-page-numbers';
import normalizeCurrentPage from './utils/normalize-current-page';
import { observer } from 'mobx-react-lite';

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

  const normalizedCurrentPage = useMemo(
    () => normalizeCurrentPage(currentPage, pageCount),
    [currentPage, pageCount]
  )

  const showLeftElipses = normalizedCurrentPage - visiblePageArround > 2;
  const showRightElipses =
    !!pageCount && normalizedCurrentPage + visiblePageArround < pageCount - 1;

  const pages = useMemo(
    () => getPageNumbers(normalizedCurrentPage, pageCount, visiblePageArround),
    [normalizedCurrentPage, pageCount, visiblePageArround]
  )

  return (
    <div className={clsx(style['container'], className)}>
      <div
        onClick={() => onClick(normalizedCurrentPage - 1)}
        className={clsx(
          style['page'],
          style['page__prev'],
          normalizedCurrentPage === 1 && style['disabled']
        )}
      >
        <ArrowRightIcon className={clsx(style['page__prev-icon'])} />
      </div>
      {showLeftElipses && <div className={clsx(style['elipses'], style['elipses__prev'])}>...</div>}
      <ul className={clsx(style['list'])}>
        {pages.map((item) => (
          <li
            className={clsx(style['page'], item === normalizedCurrentPage && style['current'])}
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
        onClick={() => onClick(normalizedCurrentPage + 1)}
        className={clsx(
          style['page'],
          style['page__next'],
          normalizedCurrentPage === pageCount && style['disabled']
        )}
      >
        <ArrowRightIcon className={clsx(style['page__next-icon'])} />
      </div>
    </div>
  );
};


export default memo(observer(Pagination));
