import { ActionKeyEnum, ActionType } from './actions.enum'
import { ModuleKeyEnum } from './modules.enum'

export enum RoleKey {
  SuperAdmin = 'superAdmin',
  User = 'user',
  Developer = 'developer',
  Moderator = 'moderator'
}

export const ROLE_PERMISSIONS: Record<
  RoleKey,
  { module: ModuleKeyEnum; actions: ActionType[] }[]
> = {
  [RoleKey.User]: [
    {
      module: ModuleKeyEnum.Characters,
      actions: [ActionKeyEnum.READ, ActionKeyEnum.DELETE]
    },
    {
      module: ModuleKeyEnum.Gachas,
      actions: [ActionKeyEnum.READ]
    },
    {
      module: ModuleKeyEnum.Histories,
      actions: [ActionKeyEnum.READ]
    }
  ],
  [RoleKey.Moderator]: [
    { module: ModuleKeyEnum.Characters, actions: Object.values(ActionKeyEnum) },
    { module: ModuleKeyEnum.Histories, actions: Object.values(ActionKeyEnum) },
    { module: ModuleKeyEnum.Users, actions: Object.values(ActionKeyEnum) },
    {
      module: ModuleKeyEnum.Gachas,
      actions: [ActionKeyEnum.READ, ActionKeyEnum.UPDATE, ActionKeyEnum.CREATE]
    }
  ],
  [RoleKey.Developer]: [
    { module: ModuleKeyEnum.Characters, actions: Object.values(ActionKeyEnum) },
    { module: ModuleKeyEnum.Histories, actions: Object.values(ActionKeyEnum) },
    { module: ModuleKeyEnum.Users, actions: Object.values(ActionKeyEnum) },
    {
      module: ModuleKeyEnum.Gachas,
      actions: Object.values(ActionKeyEnum)
    }
  ],
  [RoleKey.SuperAdmin]: []
}
