import { DRAWER_WIDTH, NAV_ITEMS } from '@common/constants/navbar';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export const NavBar = ({
  mobileOpen,
  onMobileClose,
}: {
  mobileOpen: boolean;
  onMobileClose: () => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const content = (
    <List>
      {NAV_ITEMS.map((item) => {
        const selected = location.pathname.startsWith(item.path);
        const Icon = item.icon;
        return (
          <ListItemButton
            key={item.key}
            selected={selected}
            onClick={() => {
              navigate(item.path);
              onMobileClose();
            }}
          >
            <ListItemIcon>
              <Icon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        );
      })}
    </List>
  );

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
        open
      >
        {content}
      </Drawer>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        sx={{ display: { md: 'none' }, '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}
      >
        {content}
      </Drawer>
    </>
  );
};
