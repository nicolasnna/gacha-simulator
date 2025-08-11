import type { User } from '@/interfaces/user.interface'
import { Button, Dialog, Icon, Portal } from '@chakra-ui/react'
import { CloudUpload } from 'lucide-react'
import { useState } from 'react'

interface UpdateUserDialogProps {
  data: User
}

export default function UpdateUserDialog({ data }: UpdateUserDialogProps) {
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const highlights = [
    {}
  ]

  const onUpdate = () => {
    console.log('Modificado: ' + data.username)
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
        <CloudUpload />
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
                <Dialog.Title>¿Desea modificar {data.username}?</Dialog.Title>
              </Dialog.Header>

              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancelar</Button>
                </Dialog.ActionTrigger>
                <Button onClick={onUpdate}>Modificar</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
