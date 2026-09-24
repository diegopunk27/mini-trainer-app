import { Theme } from '@mui/material/styles';
import { SystemStyleObject } from '@mui/system';

export const getInteractiveRowSx = ({
  highlighted = false,
}: { highlighted?: boolean } = {}): SystemStyleObject<Theme> => ({
  bgcolor: highlighted ? 'accentSoft' : 'transparent',
  boxShadow: (theme) => (highlighted ? `inset 2px 0 0 0 ${theme.palette.primary.main}` : 'none'),
  '&:hover': {
    bgcolor: 'accentSoft',
    boxShadow: (theme) => `inset 2px 0 0 0 ${theme.palette.primary.main}`,
  },
});
