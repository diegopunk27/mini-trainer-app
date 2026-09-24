import { DependencyList, useEffect } from 'react';

export const useDebouncedEffect = (
  effect: () => void,
  cleanup: () => void,
  deps: DependencyList,
  delay: number,
): void => {
  useEffect(() => {
    const handler = setTimeout(effect, delay);
    return () => {
      clearTimeout(handler);
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]);
};
