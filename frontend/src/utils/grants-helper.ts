import type {
  ActionType,
  ModuleType
} from '@/interfaces/permissions.interfaces'
import type { ActionBoolType } from '@/schemas/permission.schema'

export const permissionsToGrantsAPI = (
  module: ModuleType,
  actionsBoolean: ActionBoolType
): { module: ModuleType; actions: ActionType[] } => {
  const entries = Object.entries(actionsBoolean)

  const actions = entries
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value)
    .map(([key]) => key as ActionType)

  return { module, actions }
}
