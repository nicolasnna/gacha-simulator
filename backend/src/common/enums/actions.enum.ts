export enum ActionKey {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  MANAGE = 'manage'
}

export const ACTIONS = Object.values(ActionKey)
export type Action = ActionKey
