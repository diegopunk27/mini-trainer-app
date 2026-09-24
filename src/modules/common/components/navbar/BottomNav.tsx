import { NAV_ITEMS } from '@common/constants/navbar';
import { Box, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      component="nav"
      aria-label="Secciones"
      sx={{
        display: { xs: 'grid', md: 'none' },
        gridTemplateColumns: `repeat(${NAV_ITEMS.length}, 1fr)`,
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 35,
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        pb: 'env(safe-area-inset-bottom)',
      }}
    >
      {NAV_ITEMS.map((item) => {
        const selected = location.pathname.startsWith(item.path);
        const Icon = item.icon;
        return (
          <Button
            key={item.key}
            onClick={() => navigate(item.path)}
            sx={{
              flexDirection: 'column',
              height: 58,
              borderRadius: 0,
              color: selected ? 'primary.main' : 'text.secondary',
              fontSize: 10.5,
            }}
          >
            <Icon fontSize="small" />
            {item.label}
          </Button>
        );
      })}
    </Box>
  );
};
