import type { User } from '@/interfaces/user.interface'
import { Table } from '@chakra-ui/react'
import DeleteUserDialog from '../Dialog/DeleteUserDialog'
import UpdateUserDialog from '../Dialog/UpdateUserDialog'

interface UsersTableProps {
  data: User[]
}

export default function UsersTable({ data }: UsersTableProps) {
  return (
    <Table.Root interactive size="sm" maxW={900}>
      <Table.Header>
        <Table.Row bg="background/60">
          <Table.ColumnHeader color="text">Email</Table.ColumnHeader>
          <Table.ColumnHeader color="text">Nombre</Table.ColumnHeader>
          <Table.ColumnHeader color="text">Activo</Table.ColumnHeader>
          <Table.ColumnHeader color="text">Rol</Table.ColumnHeader>
          <Table.ColumnHeader color="text">Permisos</Table.ColumnHeader>
          <Table.ColumnHeader color="text" textAlign="center">
            Acción
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((user) => (
          <Table.Row
            key={user.id}
            bg="bg-secondary/40"
            _hover={{ bg: 'background' }}
          >
            <Table.Cell color="text">{user.email}</Table.Cell>
            <Table.Cell color="text">{user.name}</Table.Cell>
            <Table.Cell color="text">
              {user.active?.toString() ?? 'true'}
            </Table.Cell>
            <Table.Cell color="text">{user.role}</Table.Cell>
            <Table.Cell color="text" inlineSize="300px">
              {/* {user.permissions?.join(', ')} */}
            </Table.Cell>
            <Table.Cell color="text" textAlign="center" spaceX={2}>
              {user.role !== 'superAdmin' && <DeleteUserDialog data={user} />}
              {user.role !== 'superAdmin' && <UpdateUserDialog data={user} />}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
