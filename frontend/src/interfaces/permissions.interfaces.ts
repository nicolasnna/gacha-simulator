export type ActionType = 'manage' | 'create' | 'read' | 'update' | 'delete'
export type ModuleType = 'users' | 'gachas' | 'histories' | 'characters'

export type PermissionKeys = `${ModuleType}.${ActionType}`
