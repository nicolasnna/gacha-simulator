import { Action, ActionKey } from './actions.enum'
import { ModuleKey } from './modules.enum'

export enum RoleKey {
  SuperAdmin = 'superAdmin',
  User = 'usuarioGeneral',
  Developer = 'developer',
  Moderator = 'moderador'
}

export const ROLE_PERMISSIONS: Record<
  RoleKey,
  { module: ModuleKey; actions: Action[] }[]
> = {
  [RoleKey.User]: [
    {
      module: ModuleKey.Characters,
      actions: [ActionKey.READ, ActionKey.DELETE]
    },
    {
      module: ModuleKey.Gachas,
      actions: [ActionKey.READ]
    },
    {
      module: ModuleKey.Histories,
      actions: [ActionKey.READ]
    }
  ],
  [RoleKey.Moderator]: [
    { module: ModuleKey.Characters, actions: Object.values(ActionKey) },
    { module: ModuleKey.Histories, actions: Object.values(ActionKey) },
    { module: ModuleKey.Users, actions: Object.values(ActionKey) },
    {
      module: ModuleKey.Gachas,
      actions: [ActionKey.READ, ActionKey.UPDATE, ActionKey.CREATE]
    }
  ],
  [RoleKey.Developer]: [
    { module: ModuleKey.Characters, actions: Object.values(ActionKey) },
    { module: ModuleKey.Histories, actions: Object.values(ActionKey) },
    { module: ModuleKey.Users, actions: Object.values(ActionKey) },
    {
      module: ModuleKey.Gachas,
      actions: Object.values(ActionKey)
    }
  ],
  [RoleKey.SuperAdmin]: []
}
