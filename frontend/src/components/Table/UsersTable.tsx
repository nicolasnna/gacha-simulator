import type { User } from '@/interfaces/user.interface'
import { Table } from '@chakra-ui/react'
import StateUserDialog from '../Dialog/StateUserDialog'
import UpdateUserDialog from '../Dialog/UpdateUserDialog'
import type { Role } from '@/interfaces/role.interface'
import { getArrayPermission } from '@/utils/transform.helper'

interface UsersTableProps {
  users: User[]
  roles: Role[]
}

export default function UsersTable({ users, roles }: UsersTableProps) {
  return (
    <Table.Root interactive size="sm" maxW={900}>
      <Table.Header>
        <Table.Row bg="background/60">
          <Table.ColumnHeader color="text">Email</Table.ColumnHeader>
          <Table.ColumnHeader color="text">Nombre</Table.ColumnHeader>
          <Table.ColumnHeader color="text">Estado</Table.ColumnHeader>
          <Table.ColumnHeader color="text">Rol</Table.ColumnHeader>
          <Table.ColumnHeader color="text">Permisos</Table.ColumnHeader>
          <Table.ColumnHeader color="text" textAlign="center">
            Acción
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users.map((user) => (
          <Table.Row
            key={user.id}
            bg="bg-secondary/40"
            _hover={{ bg: 'background' }}
          >
            <Table.Cell color="text">{user.email}</Table.Cell>
            <Table.Cell color="text">{user.name}</Table.Cell>
            <Table.Cell color="text">
              {user.active ? 'Activado' : 'Desactivado'}
            </Table.Cell>
            <Table.Cell color="text">{user.role}</Table.Cell>
            <Table.Cell color="text" inlineSize="300px">
              {getArrayPermission(roles, user.role).join(', ')}
            </Table.Cell>
            <Table.Cell color="text" textAlign="center" spaceX={2}>
              {user.role !== 'superAdmin' && <StateUserDialog data={user} />}
              {user.role !== 'superAdmin' && (
                <UpdateUserDialog dataUser={user} roles={roles} />
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
