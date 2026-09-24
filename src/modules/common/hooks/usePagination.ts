import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';

export const usePagination = (initialTotalRows = 1, initialLimit = 10) => {
  const [totalRows, setTotalRows] = useState(initialTotalRows);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);

  const totalPages = Math.max(1, Math.ceil(totalRows / limit));

  const updateCurrentPage = useCallback(
    (newPage: number): void => {
      setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
    },
    [totalPages],
  );

  const onPageChange = useCallback(
    (_event: ChangeEvent<unknown>, newPage: number): void => {
      updateCurrentPage(newPage);
    },
    [updateCurrentPage],
  );

  const resetPagination = useCallback((newLimit?: number): void => {
    if (newLimit !== undefined) {
      setLimit(newLimit);
    }
    setCurrentPage(1);
  }, []);

  const handleLimitPerPageChange = useCallback((event: SelectChangeEvent<number>): void => {
    const newLimit = Number(event.target.value);
    setLimit(newLimit);
    setCurrentPage(1);
  }, []);

  return {
    totalRows,
    setTotalRows,
    currentPage,
    totalPages,
    onPageChange,
    resetPagination,
    setLimit,
    limit,
    handleLimitPerPageChange,
  };
};
