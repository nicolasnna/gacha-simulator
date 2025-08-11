import DeleteUserDialog from '@/components/dialog/delete-user-dialog'
import { usersFake } from '@/utils/data-fake'
import { Container, Heading, HStack, Table } from '@chakra-ui/react'

function Users() {
  return (
    <Container centerContent py={2} spaceY={5}>
      <HStack mt={2} flexWrap="wrap">
        <Heading size={'4xl'} color="text">
          Gestión de usuarios
        </Heading>
      </HStack>

      <Table.Root interactive size="sm" maxW={900}>
        <Table.Header>
          <Table.Row bg="background/60" borderRadius={2}>
            <Table.ColumnHeader color="text">Usuario</Table.ColumnHeader>
            <Table.ColumnHeader color="text">Personajes</Table.ColumnHeader>
            <Table.ColumnHeader color="text">Creditos</Table.ColumnHeader>
            <Table.ColumnHeader color="text">Rol</Table.ColumnHeader>
            <Table.ColumnHeader color="text" textAlign="center">
              Acción
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {usersFake.map((user) => (
            <Table.Row key={user.id} bg="bg-secondary/40">
              <Table.Cell color="text">{user.username}</Table.Cell>
              <Table.Cell color="text">{user.uniqueCharacters}</Table.Cell>
              <Table.Cell color="text">{user.credits}</Table.Cell>
              <Table.Cell color="text">{user.role}</Table.Cell>
              <Table.Cell color="text" textAlign="center">
                {user.role !== 'admin' && <DeleteUserDialog data={user} />}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Container>
  )
}

export default Users
