import { PermissionEnum } from '@common/enums/permission.enum';
import { RoleEnum } from '@common/enums/role.enum';
import { createContext } from 'react';

export interface AppUser {
  id?: number;
  email?: string;
  role?: RoleEnum;
  permissions?: Array<PermissionEnum>;
}

export interface AppState {
  token?: string;
  user?: AppUser;
  onLogin: (token: string) => void;
  onLogout: () => void;
}

export const AppContext = createContext<AppState | null>(null);
