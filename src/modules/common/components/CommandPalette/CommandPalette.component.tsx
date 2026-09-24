import { NAV_ITEMS } from '@common/constants/navbar';
import { useAppActions } from '@common/hooks/useAppActions';
import { useColorMode } from '@common/hooks/useColorMode';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import Search from '@mui/icons-material/Search';
import {
  Box,
  Dialog,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CommandPalette = () => {
  const { isPaletteOpen, setPaletteOpen } = useAppActions();
  const { mode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NAV_ITEMS;
    return NAV_ITEMS.filter((item) => item.label.toLowerCase().includes(q));
  }, [query]);

  const close = () => {
    setPaletteOpen(false);
    setQuery('');
  };

  return (
    <Dialog open={isPaletteOpen} onClose={close} fullWidth maxWidth="sm">
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1.5 }}>
        <Search fontSize="small" color="primary" />
        <TextField
          autoFocus
          variant="standard"
          placeholder="Ir a…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          slotProps={{ input: { disableUnderline: true } }}
          sx={{ flex: 1 }}
        />
      </Box>
      <List>
        {filtered.map((item) => {
          const Icon = item.icon;
          return (
            <ListItemButton
              key={item.key}
              onClick={() => {
                navigate(item.path);
                close();
              }}
            >
              <ListItemIcon>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
        <ListItemButton
          onClick={() => {
            toggleColorMode();
            close();
          }}
        >
          <ListItemIcon>
            {mode === 'dark' ? (
              <LightModeOutlined fontSize="small" />
            ) : (
              <DarkModeOutlined fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText primary={mode === 'dark' ? 'Modo claro' : 'Modo oscuro'} />
        </ListItemButton>
      </List>
    </Dialog>
  );
};
