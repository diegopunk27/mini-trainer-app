import { Box, Skeleton } from '@mui/material';

export const RouteFallback = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 0.5 }} aria-busy="true">
      <Skeleton variant="rounded" height={28} width={220} />
      <Skeleton variant="rounded" height={18} width={160} />
      <Skeleton variant="rounded" height={120} />
    </Box>
  );
};
