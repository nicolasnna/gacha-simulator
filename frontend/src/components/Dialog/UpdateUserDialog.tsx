import type { User } from '@/interfaces/user.interface'
import { UserPartialSchema, type UserPartialType } from '@/schemas/user.schema'
import {
  Button,
  createListCollection,
  Dialog,
  Icon,
  Portal,
  VStack
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CloudUpload } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import FieldInput from '../Form/FieldInput'
import FieldSelect from '../Form/FieldSelect'
import { useAppDispatch } from '@/services/hooks/useRedux'
import { updateUser } from '@/services/redux/users'

interface UpdateUserDialogProps {
  data: User
}

export default function UpdateUserDialog({ data }: UpdateUserDialogProps) {
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UserPartialType>({
    resolver: zodResolver(UserPartialSchema),
    defaultValues: {
      email: data.email,
      password: '',
      role: data.role,
      name: data.name
    }
  })
  const dispatch = useAppDispatch()
  const roleColleciton = createListCollection({
    items: [
      { label: 'user', value: 'user' },
      { label: 'developer', value: 'developer' },
      { label: 'moderator', value: 'moderator' }
    ]
  })

  const onUpdate = (dataForm: UserPartialType) => {
    const dataToUpdate = new Object()
    const { name, email, password, role } = dataForm

    if (email !== data.email && email !== '')
      Object.assign(dataToUpdate, { email: email })
    if (name !== data.name) Object.assign(dataToUpdate, { name: name })
    if (password !== '') Object.assign(dataToUpdate, { password: password })
    if (role !== data.role) Object.assign(dataToUpdate, { role: role })

    if (Object.keys(dataToUpdate).length !== 0)
      dispatch(updateUser({ id: data.id as string, ...dataToUpdate }))
    console.log(dataToUpdate)
    setOpenDialog(false)
  }

  const onCancel = () => {
    setOpenDialog(false)
    reset()
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
              <Dialog.Header flexDir="column">
                <Dialog.Title>¿Desea modificar {data.email}?</Dialog.Title>
                <Dialog.Description>
                  Cambie los campos que desea modificar.
                </Dialog.Description>
              </Dialog.Header>

              <form onSubmit={handleSubmit(onUpdate)}>
                <Dialog.Body>
                  <VStack gap={4}>
                    <FieldInput
                      register={register('email')}
                      error={errors.email}
                      placeholder="Nuevo correo electrónico"
                      type="email"
                    />
                    <FieldInput
                      register={register('password')}
                      error={errors.password}
                      placeholder="Nueva contraseña"
                      isPassword
                    />

                    <FieldSelect
                      control={control}
                      values={roleColleciton}
                      name="role"
                      placeholder="Rol"
                    />

                    <FieldInput
                      register={register('name')}
                      error={errors.name}
                      placeholder="Escribir nombre"
                    />
                  </VStack>
                </Dialog.Body>

                <Dialog.Footer>
                  <Button variant="outline" onClick={onCancel}>
                    Cancelar
                  </Button>

                  <Button type="submit">Modificar</Button>
                </Dialog.Footer>
              </form>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
