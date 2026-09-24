import { createContext } from 'react';

export interface AppActionsContextValue {
  isPaletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
}

export const AppActionsContext = createContext<AppActionsContextValue | null>(null);
