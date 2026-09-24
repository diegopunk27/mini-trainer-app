import HomeOutlined from '@mui/icons-material/HomeOutlined';
import { SvgIconComponent } from '@mui/icons-material';

export const DRAWER_WIDTH = 236;

export interface NavItem {
  label: string;
  path: string;
  icon: SvgIconComponent;
  key: string;
}

export const NAV_ITEMS: Array<NavItem> = [
  { key: 'home', label: 'Inicio', path: '/home', icon: HomeOutlined },
];
