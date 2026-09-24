import { Mutation, Mutations } from '@common-interfaces/Mutation.interface';
import { useState } from 'react';
import useSWR, { SWRConfiguration, mutate as globalMutate } from 'swr';

export const useDataMutation = <ResponseType>(
  url: string,
  mutationMethods: Mutations<ResponseType>,
  mutationOptions?: SWRConfiguration,
) => {
  const [isFetchSlow, setIsFetchSlow] = useState(false);
  const { isLoading, error, data, mutate, isValidating } = useSWR<Array<ResponseType>>(
    url,
    mutationMethods.GET,
    mutationOptions ?? {
      loadingTimeout: 1500,
      errorRetryCount: 3,
      revalidateOnReconnect: true,
      revalidateOnFocus: true,
      onLoadingSlow: () => {
        setIsFetchSlow(true);
      },
    },
  );

  const handleMutation = async (
    mutationType: Mutation,
    newInput?: unknown,
    anotherEndpoint?: string,
  ) => {
    const mutationFn = mutationMethods[mutationType];
    if (!mutationFn) {
      return;
    }

    try {
      await mutationFn(newInput);
      if (anotherEndpoint) {
        await globalMutate(anotherEndpoint);
        return;
      }
      await mutate();
    } catch {
      // El caller puede mostrar un toast con useHandleError.
    }
  };

  return {
    isLoading,
    error,
    data,
    handleMutation,
    isFetchSlow,
    isValidating,
  };
};
