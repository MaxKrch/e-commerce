import Pagination from 'components/Pagination';
import normalizeCurrentPage from 'components/Pagination/utils/normalize-current-page';
import useRootStore from 'context/root-store/useRootStore';
import useQueryParams from 'hooks/useQueryParams';
import { observer } from 'mobx-react-lite';
import type React from 'react';
import { useCallback, useEffect, useMemo } from 'react';

const ProductPagination: React.FC = () => {
  const { queryParams, setQueryParams } = useQueryParams();
  const { productsStore } = useRootStore();
  const pagination = productsStore.pagination;
  const { pageCount, total } = productsStore.pagination || {};

  const currentPage = useMemo(
    () => normalizeCurrentPage(Number(queryParams.page ?? 1), pageCount),
    [queryParams.page]
  );

  useEffect(() => {
    if (pageCount && pageCount < currentPage) {
      setQueryParams({ page: pageCount });
    }
  }, [pageCount, queryParams.page]);

  const handleClick = useCallback(
    (page: number) => {
      if (page !== currentPage) {
        setQueryParams({ page });
      }
    },
    [pagination]
  );

  if (!pageCount || total === 0) {
    return null;
  }

  return <Pagination currentPage={currentPage} onClick={handleClick} pageCount={pageCount} />;
};

export default observer(ProductPagination);
