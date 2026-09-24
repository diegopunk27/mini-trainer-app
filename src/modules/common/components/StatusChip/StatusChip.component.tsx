import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getThemeTokens } from '@theme/app-theme';

export type StatusTone = 'CONFIRMED' | 'DRAFT' | 'CANCELLED' | 'OK' | 'LOW' | 'OUT' | 'OFF';

export const StatusChip = ({ tone, label }: { tone: StatusTone; label: string }) => {
  const theme = useTheme();
  const tokens = getThemeTokens(theme.palette.mode);
  const colors: Record<StatusTone, { bg: string; fg: string }> = {
    CONFIRMED: { bg: tokens.okSoft, fg: tokens.ok },
    DRAFT: { bg: tokens.warnSoft, fg: tokens.warn },
    CANCELLED: { bg: tokens.badSoft, fg: tokens.bad },
    OK: { bg: tokens.okSoft, fg: tokens.ok },
    LOW: { bg: tokens.warnSoft, fg: tokens.warn },
    OUT: { bg: tokens.badSoft, fg: tokens.bad },
    OFF: { bg: tokens.panel2, fg: tokens.ink2 },
  };
  const { bg, fg } = colors[tone];
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        px: 1,
        py: '2px',
        borderRadius: 999,
        fontSize: 11.5,
        fontWeight: 600,
        backgroundColor: bg,
        color: fg,
      }}
    >
      {label}
    </Box>
  );
};
