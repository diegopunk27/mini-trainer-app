import { themeQuartz } from 'ag-grid-community';

/**
 * AG Grid Theming API (v33+). Replaces legacy CSS class `ag-theme-quartz`.
 * Tokens stay aligned with the MUI primary palette in app-theme.ts.
 */
export const appGridTheme = themeQuartz.withParams({
  headerBackgroundColor: '#1565c0',
  headerTextColor: '#ffffff',
  backgroundColor: '#f5f5f5',
  fontFamily: "'Source Sans 3', 'Source Sans Pro', sans-serif",
  fontSize: 14,
  headerFontSize: 16,
  rowBorder: true,
});
