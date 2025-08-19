import type { ActionType, ModuleType } from './permissions.interfaces'

export interface Grants {
  module: ModuleType
  actions: ActionType[]
}
