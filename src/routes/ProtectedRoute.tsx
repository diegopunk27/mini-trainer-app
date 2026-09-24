import { FullScreenSpinner } from '@common-components/FullScreenSpinner';
import { PermissionEnum } from '@common/enums/permission.enum';
import { RoleEnum } from '@common/enums/role.enum';
import { usePermissions } from '@common-hooks/usePermissions';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export interface ProtectedRouteProps {
  children: ReactNode;
  permissions?: Array<PermissionEnum>;
  roles?: Array<RoleEnum>;
  redirectTo?: string;
}

export const ProtectedRoute = ({
  children,
  permissions = [],
  roles = [],
  redirectTo = '/home',
}: ProtectedRouteProps) => {
  const { hasAccess } = usePermissions();

  if (hasAccess === undefined) {
    return <FullScreenSpinner />;
  }

  return hasAccess(permissions, roles) ? <>{children}</> : <Navigate to={redirectTo} replace />;
};
