import { PageHeaderContext } from '@common/contexts/PageHeader';
import { useContext } from 'react';

export const usePageHeader = () => {
  const context = useContext(PageHeaderContext);
  if (!context) throw new Error('usePageHeader must be used within PageHeaderProvider');
  return context;
};
