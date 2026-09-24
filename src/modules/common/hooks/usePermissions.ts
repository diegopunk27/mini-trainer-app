import { PermissionEnum } from '@common/enums/permission.enum';
import { RoleEnum } from '@common/enums/role.enum';
import { AppContext } from '@global-contexts/AppContext';
import { useContext } from 'react';

export const usePermissions = () => {
  const user = useContext(AppContext)?.user;
  const permissions = user?.permissions ?? [];
  const role = user?.role;

  const checkPermissions = (required: Array<PermissionEnum>): boolean =>
    required.every((permission) => permissions.includes(permission));

  const checkRoles = (required: Array<RoleEnum>): boolean =>
    role ? required.includes(role) : false;

  const hasAccess = (
    requiredPermissions: Array<PermissionEnum> = [],
    requiredRoles: Array<RoleEnum> = [],
  ) => {
    if (role === RoleEnum.ADMIN) {
      return true;
    }

    const matchesPermissions =
      requiredPermissions.length === 0 || checkPermissions(requiredPermissions);
    const matchesRoles = requiredRoles.length === 0 || checkRoles(requiredRoles);
    return matchesPermissions && matchesRoles;
  };

  return { checkPermissions, checkRoles, hasAccess };
};
