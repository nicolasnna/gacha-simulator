export enum ActionKeyEnum {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  MANAGE = 'manage'
}

export const ACTIONS = Object.values(ActionKeyEnum)
export type ActionType = ActionKeyEnum
