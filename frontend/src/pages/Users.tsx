import type { User } from '@/interfaces/user.interface'
import { usersFake } from '@/utils/data-fake'
import {
  Button,
  Container,
  Dialog,
  Heading,
  Highlight,
  HStack,
  Icon,
  Portal,
  Table,
  Text
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'

interface openDialog {
  openDelete: boolean
}

function Users() {
  const [openDialog, setOpenDialog] = useState<openDialog>({
    openDelete: false
  })
  const [userSelected, setUserSelected] = useState<User | null>()

  const Highlights = [
    {
      label: 'Personajes adquiridos:',
      value: userSelected?.uniqueCharacters ?? 0
    },
    { label: 'Créditos restantes:', value: userSelected?.credits ?? 0 },
    { label: 'Rol:', value: userSelected?.role ?? '' }
  ]

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
                {user.role !== 'admin' && (
                  <Icon
                    size="md"
                    cursor="pointer"
                    _hover={{ color: 'primary' }}
                    onClick={() => {
                      setUserSelected(user)
                      setOpenDialog(() => ({ openDelete: true }))
                    }}
                  >
                    <FaTrashAlt />
                  </Icon>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Dialog.Root
        open={openDialog.openDelete}
        onOpenChange={(e) => setOpenDialog({ openDelete: e.open })}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>
                  ¿Desea eliminar {userSelected?.username}?
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                {Highlights.map((h) => (
                  <Text>
                    <Highlight
                      query={h.label}
                      styles={{ fontWeight: 'semibold' }}
                    >
                      {`${h.label} ${h.value}`}
                    </Highlight>
                  </Text>
                ))}
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancelar</Button>
                </Dialog.ActionTrigger>
                <Button>Eliminar</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Container>
  )
}

export default Users
