import type { User } from '@/interfaces/user.interface'
import { Button, Dialog, Highlight, Icon, Portal, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'

interface DeleteUserDialogProps {
  data: User
}

export default function DeleteUserDialog({ data }: DeleteUserDialogProps) {
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const highlights = [
    {
      label: 'Personajes adquiridos:',
      value: data.uniqueCharacters
    },
    { label: 'Créditos restantes:', value: data.credits },
    { label: 'Rol:', value: data.role }
  ]

  const onDelete = () => {
    console.log('Borrado: ' + data.username)
    setOpenDialog(false)
  }

  return (
    <>
      <Icon
        size="md"
        cursor="pointer"
        _hover={{ color: 'primary' }}
        onClick={() => setOpenDialog(true)}
      >
        <FaTrashAlt />
      </Icon>

      <Dialog.Root
        lazyMount
        open={openDialog}
        onOpenChange={(e) => setOpenDialog(e.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>¿Desea eliminar {data.username}?</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                {highlights.map((h) => (
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
                <Button onClick={onDelete}>Eliminar</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
