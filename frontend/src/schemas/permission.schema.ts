import type {
  ActionType,
  ModuleType
} from '@/interfaces/permissions.interfaces'
import z from 'zod'

const actions: ActionType[] = ['manage', 'create', 'read', 'update', 'delete']
const modules: ModuleType[] = ['users', 'gachas', 'histories', 'characters']

export const ModuleSchema = z.object(
  Object.fromEntries(actions.map((action) => [action, z.boolean()])) as Record<
    ActionType,
    z.ZodBoolean
  >
)

export type ActionBoolType = z.infer<typeof ModuleSchema>

export const PermissionSchema = z.object(
  Object.fromEntries(modules.map((module) => [module, ModuleSchema])) as Record<
    ModuleType,
    typeof ModuleSchema
  >
)
export const PermissionWithUserIdSchema = PermissionSchema.extend({
  roleId: z.union([z.string()])
})

export type PermissionType = z.infer<typeof PermissionSchema>
export type PermissionWithUserIdType = z.infer<
  typeof PermissionWithUserIdSchema
>
