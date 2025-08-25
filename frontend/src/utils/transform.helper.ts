import type { Role } from '@/interfaces/role.interface'

export const getArrayPermission = (roles: Role[], roleFilter: string) => {
  const filteredGrants = roles.find((role) => roleFilter === role.key)?.grants
  if (!filteredGrants) return []

  let permissions: string[] = []

  for (const grant of filteredGrants) {
    if (grant.actions.length === 5) {
      permissions.push(`${grant.module}:all`)
    } else {
      const permission = grant.actions.map(
        (action) => `${grant.module}:${action}`
      )
      permissions = [...permissions, ...permission]
    }
  }

  return permissions
}
