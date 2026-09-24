import { useEffect } from 'react';
import useSWR from 'swr';
import { useErrorHandler } from './useHandleError';

export const NO_PATH_ERROR = 'Path is required';
export const NO_FUNCTION_FETCHER_ERROR = 'Fetcher must be a function that returns a promise';

export const useFetch = <T>(
  path: (() => string | null) | string | null,
  fetcher: () => Promise<T>,
  reload = false,
  revalidateOnMount?: boolean,
  enabled = true,
  revalidateInterval = 3,
) => {
  if (path === null) {
    throw new Error(NO_PATH_ERROR);
  }

  if (typeof fetcher !== 'function') {
    throw new Error(NO_FUNCTION_FETCHER_ERROR);
  }

  const handleError = useErrorHandler();
  const actualPath = enabled ? (typeof path === 'function' ? path() : path) : null;

  const { data, error, isLoading, mutate, isValidating } = useSWR<T>(actualPath, fetcher, {
    revalidateIfStale: reload,
    revalidateOnFocus: reload,
    revalidateOnReconnect: reload,
    revalidateOnMount,
    refreshInterval: revalidateInterval ? revalidateInterval * 60 * 1000 : undefined,
  });

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error, handleError]);

  return { data, error, mutate, isLoading, isValidating };
};
