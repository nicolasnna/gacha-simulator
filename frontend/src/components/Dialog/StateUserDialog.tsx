import type { User } from '@/interfaces/user.interface'
import { useAppDispatch } from '@/services/hooks/useRedux'
import { activateUser, deactivateUser } from '@/services/redux/users'
import { Button, Dialog, Highlight, Icon, Portal, Text } from '@chakra-ui/react'
import { Power, PowerOff } from 'lucide-react'
import { useState } from 'react'

interface StateUserDialogProps {
  data: User
}

export default function StateUserDialog({ data }: StateUserDialogProps) {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const highlights = [
    {
      label: 'Correo electrónico:',
      value: data.email
    },
    { label: 'Nombre:', value: data.name },
    { label: 'Rol:', value: data.role }
  ]

  const changeState = () => {
    dispatch(data.active ? deactivateUser(data.id) : activateUser(data.id))
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
        {data.active ? <PowerOff /> : <Power />}
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
                <Dialog.Title>
                  ¿Desea {data.active ? 'desactivar' : 'activar'} {data.email}?
                </Dialog.Title>
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
                <Button onClick={changeState}>
                  {data.active ? 'Desactivar' : 'Activar'}
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
