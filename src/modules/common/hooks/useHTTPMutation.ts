import { useCallback, useState } from 'react';
import { useErrorHandler } from './useHandleError';

export const useHTTPMutation = () => {
  const handleError = useErrorHandler();
  const [isHTTPMutateLoading, setHTTPMutateLoading] = useState(false);

  const executeHTTPCall = useCallback(
    async <T>(operation: Promise<T>, useLoading = true): Promise<T> => {
      if (useLoading) {
        setHTTPMutateLoading(true);
      }

      try {
        return await operation;
      } catch (error) {
        handleError(error);
        throw error;
      } finally {
        if (useLoading) {
          setHTTPMutateLoading(false);
        }
      }
    },
    [handleError],
  );

  return { executeHTTPCall, isHTTPMutateLoading };
};
