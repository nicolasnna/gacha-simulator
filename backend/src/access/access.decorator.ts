import { ActionKeyEnum, ModuleKeyEnum, RoleEnum } from '@common/enums'
import { SetMetadata } from '@nestjs/common'

export const ROLES_KEY = 'required_roles'
export const RESOURCE_KEY = 'module_resource'
export const ACL_KEY = 'required_acl'
export const PERMISSION_KEY = 'permission'

export const RolesRequired = (...roles: RoleEnum[]) =>
  SetMetadata(ROLES_KEY, roles)
export const ModuleResource = (module: ModuleKeyEnum) =>
  SetMetadata(RESOURCE_KEY, module)
export const Action = (action: ActionKeyEnum) => SetMetadata(ACL_KEY, action)

export const Permission = (module: ModuleKeyEnum, action: ActionKeyEnum) =>
  SetMetadata(PERMISSION_KEY, { module, action })
