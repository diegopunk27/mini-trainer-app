import { Box, CircularProgress } from '@mui/material';

export const FullScreenSpinner = () => (
  <Box
    sx={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'rgba(255, 255, 255, 0.6)',
      zIndex: 1300,
    }}
  >
    <CircularProgress color="primary" />
  </Box>
);
