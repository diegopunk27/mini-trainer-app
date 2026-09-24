import { CommandPalette } from '@common/components/CommandPalette';
import { resolvePageMeta } from '@common/constants/page-header';
import { AppActionsProvider } from '@common/contexts/AppActions';
import { PageHeaderContext, PageHeaderProvider } from '@common/contexts/PageHeader';
import { useAppActions } from '@common/hooks/useAppActions';
import Menu from '@mui/icons-material/Menu';
import Search from '@mui/icons-material/Search';
import { Box, IconButton, Typography } from '@mui/material';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BottomNav, NavBar } from '../navbar';

const AppShell = ({ children }: { children?: ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setPaletteOpen } = useAppActions();
  const headerContext = useContext(PageHeaderContext);
  const location = useLocation();
  const fallback = resolvePageMeta(location.pathname);
  const title = headerContext?.header.title || fallback.title;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setPaletteOpen]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <NavBar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          pb: { xs: 8, md: 0 },
        }}
      >
        <Box
          component="header"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1.5,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <IconButton
            sx={{ display: { md: 'none' } }}
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" sx={{ flex: 1 }}>
            {title}
          </Typography>
          <IconButton onClick={() => setPaletteOpen(true)} aria-label="Buscar">
            <Search />
          </IconButton>
        </Box>
        <Box component="main" sx={{ p: 2, flex: 1 }}>
          {children}
        </Box>
      </Box>
      <BottomNav />
      <CommandPalette />
    </Box>
  );
};

export const AppLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <AppActionsProvider>
      <PageHeaderProvider>
        <AppShell>{children}</AppShell>
      </PageHeaderProvider>
    </AppActionsProvider>
  );
};
