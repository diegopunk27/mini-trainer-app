import ArrowBack from '@mui/icons-material/ArrowBack';
import { Box, IconButton, SxProps, Theme, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface PageTitleContainerProps {
  title: string;
  backButtonRoute?: string;
  sx?: SxProps<Theme>;
}

export const PageTitleContainer = ({ title, backButtonRoute, sx }: PageTitleContainerProps) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, ...sx }}>
      {backButtonRoute ? (
        <IconButton onClick={() => navigate(backButtonRoute)} aria-label="Volver">
          <ArrowBack />
        </IconButton>
      ) : null}
      <Typography variant="h5" component="h1">
        {title}
      </Typography>
    </Box>
  );
};
