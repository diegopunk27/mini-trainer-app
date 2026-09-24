import { PaletteMode, createTheme } from '@mui/material/styles';

export interface ThemeTokens {
  bg: string;
  panel: string;
  panel2: string;
  ink: string;
  ink2: string;
  acc: string;
  accSoft: string;
  ok: string;
  okSoft: string;
  warn: string;
  warnSoft: string;
  bad: string;
  badSoft: string;
}

export const lightTokens: ThemeTokens = {
  bg: '#f5f5f5',
  panel: '#ffffff',
  panel2: '#fafbfc',
  ink: '#0e1420',
  ink2: '#59616f',
  acc: '#1565c0',
  accSoft: '#e3f2fd',
  ok: '#177f4f',
  okSoft: '#e5f4ec',
  warn: '#9a6a10',
  warnSoft: '#fbf0dc',
  bad: '#c23127',
  badSoft: '#fcecea',
};

export const darkTokens: ThemeTokens = {
  bg: '#0b0f15',
  panel: '#121821',
  panel2: '#161d27',
  ink: '#e6ebf3',
  ink2: '#98a1b0',
  acc: '#5e92f3',
  accSoft: '#13283f',
  ok: '#3fbd80',
  okSoft: '#0f2a1d',
  warn: '#d3a349',
  warnSoft: '#2b2412',
  bad: '#ef6b60',
  badSoft: '#2c1614',
};

export const getThemeTokens = (mode: PaletteMode): ThemeTokens =>
  mode === 'dark' ? darkTokens : lightTokens;

declare module '@mui/material/styles' {
  interface Palette {
    accentSoft: string;
  }
  interface PaletteOptions {
    accentSoft?: string;
  }
  interface TypeBackground {
    subtle: string;
  }
}

export const createAppTheme = (mode: PaletteMode = 'light') => {
  const tokens = getThemeTokens(mode);
  return createTheme({
    palette: {
      mode,
      primary: { main: tokens.acc },
      secondary: { main: '#6a1b9a' },
      background: { default: tokens.bg, paper: tokens.panel, subtle: tokens.panel2 },
      accentSoft: tokens.accSoft,
      text: { primary: tokens.ink, secondary: tokens.ink2 },
    },
    typography: {
      fontFamily: "'Source Sans 3', 'Source Sans Pro', sans-serif",
      h1: { fontWeight: 600 },
      h2: { fontWeight: 600 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { textTransform: 'none' },
    },
    components: {
      MuiButton: { styleOverrides: { root: { borderRadius: 8 } } },
    },
  });
};

export const appTheme = createAppTheme('light');
