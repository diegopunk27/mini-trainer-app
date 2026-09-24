import { COLOR_MODE_STORAGE_KEY } from '@common/constants/storage';
import { createAppTheme } from '@theme/app-theme';
import { PaletteMode, ThemeProvider } from '@mui/material/styles';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import { ColorModeContext } from './ColorMode.context';

const readStoredMode = (): PaletteMode => {
  const stored = localStorage.getItem(COLOR_MODE_STORAGE_KEY);
  return stored === 'dark' ? 'dark' : 'light';
};

export const ColorModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>(readStoredMode);
  const toggleColorMode = useCallback(() => {
    setMode((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(COLOR_MODE_STORAGE_KEY, next);
      return next;
    });
  }, []);
  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const value = useMemo(() => ({ mode, toggleColorMode }), [mode, toggleColorMode]);

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
