import { ActionKeyEnum, ActionType } from './actions.enum'
import { ModuleKeyEnum } from './modules.enum'

export enum RoleEnum {
  SuperAdmin = 'superAdmin',
  User = 'user',
  Developer = 'developer',
  Moderator = 'moderator'
}

export const ROLE_PERMISSIONS: Record<
  RoleEnum,
  { module: ModuleKeyEnum; actions: ActionType[] }[]
> = {
  [RoleEnum.User]: [
    {
      module: ModuleKeyEnum.Characters,
      actions: [ActionKeyEnum.READ, ActionKeyEnum.DELETE]
    },
    {
      module: ModuleKeyEnum.Gachas,
      actions: [ActionKeyEnum.READ, ActionKeyEnum.CREATE]
    },
    {
      module: ModuleKeyEnum.Histories,
      actions: [ActionKeyEnum.READ]
    }
  ],
  [RoleEnum.Moderator]: [
    { module: ModuleKeyEnum.Characters, actions: Object.values(ActionKeyEnum) },
    { module: ModuleKeyEnum.Histories, actions: Object.values(ActionKeyEnum) },
    { module: ModuleKeyEnum.Users, actions: Object.values(ActionKeyEnum) },
    {
      module: ModuleKeyEnum.Gachas,
      actions: [ActionKeyEnum.READ, ActionKeyEnum.UPDATE, ActionKeyEnum.CREATE]
    }
  ],
  [RoleEnum.Developer]: [
    { module: ModuleKeyEnum.Characters, actions: Object.values(ActionKeyEnum) },
    { module: ModuleKeyEnum.Histories, actions: Object.values(ActionKeyEnum) },
    { module: ModuleKeyEnum.Users, actions: Object.values(ActionKeyEnum) },
    {
      module: ModuleKeyEnum.Gachas,
      actions: Object.values(ActionKeyEnum)
    }
  ],
  [RoleEnum.SuperAdmin]: []
}
