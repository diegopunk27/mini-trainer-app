import { ReactNode, useMemo, useState } from 'react';
import { AppActionsContext } from './AppActions.context';

export const AppActionsProvider = ({ children }: { children: ReactNode }) => {
  const [isPaletteOpen, setPaletteOpen] = useState(false);
  const value = useMemo(() => ({ isPaletteOpen, setPaletteOpen }), [isPaletteOpen]);
  return <AppActionsContext.Provider value={value}>{children}</AppActionsContext.Provider>;
};
