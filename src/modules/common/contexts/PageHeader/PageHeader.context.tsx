import { createContext, ReactNode } from 'react';

export interface PageHeaderState {
  title?: string;
  subtitle?: string;
  extra?: ReactNode;
}

export interface PageHeaderContextValue {
  header: PageHeaderState;
  setHeader: (header: PageHeaderState) => void;
}

export const PageHeaderContext = createContext<PageHeaderContextValue | null>(null);
