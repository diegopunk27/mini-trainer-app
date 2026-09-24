import { AppActionsContext } from '@common/contexts/AppActions';
import { useContext } from 'react';

export const useAppActions = () => {
  const context = useContext(AppActionsContext);
  if (!context) throw new Error('useAppActions must be used within AppActionsProvider');
  return context;
};
