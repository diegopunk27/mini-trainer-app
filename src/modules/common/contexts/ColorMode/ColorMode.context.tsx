import { PaletteMode } from '@mui/material/styles';
import { createContext } from 'react';

export interface ColorModeContextValue {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextValue | null>(null);
