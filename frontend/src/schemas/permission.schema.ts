import type { Action, Module } from '@/interfaces/permissions.interfaces'
import z from 'zod'

const actions: Action[] = ['manage', 'create', 'read', 'update', 'delete']
const modules: Module[] = ['users', 'gachas', 'histories', 'characters']

export const ModuleSchema = z.object(
  Object.fromEntries(actions.map((action) => [action, z.boolean()])) as Record<
    Action,
    z.ZodBoolean
  >
)

export const PermissionSchema = z.object(
  Object.fromEntries(modules.map((module) => [module, ModuleSchema])) as Record<
    Module,
    typeof ModuleSchema
  >
)
export const PermissionWithUserIdSchema = PermissionSchema.extend({
  usersId: z.array(z.union([z.string(), z.int()]))
})

export type PermissionType = z.infer<typeof PermissionSchema>
export type PermissionWithUserIdType = z.infer<
  typeof PermissionWithUserIdSchema
>
