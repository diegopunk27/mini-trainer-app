import { ReactNode, useCallback, useMemo, useState } from 'react';
import { PageHeaderContext, PageHeaderState } from './PageHeader.context';

export const PageHeaderProvider = ({ children }: { children: ReactNode }) => {
  const [header, setHeaderState] = useState<PageHeaderState>({});
  const setHeader = useCallback((next: PageHeaderState) => setHeaderState(next), []);
  const value = useMemo(() => ({ header, setHeader }), [header, setHeader]);
  return <PageHeaderContext.Provider value={value}>{children}</PageHeaderContext.Provider>;
};
