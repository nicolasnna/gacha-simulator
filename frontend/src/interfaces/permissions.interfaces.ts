export type Action = 'manage' | 'create' | 'read' | 'update' | 'delete'
export type Module = 'users' | 'gachas' | 'histories' | 'characters'

export type PermissionKeys = `${Module}.${Action}`
