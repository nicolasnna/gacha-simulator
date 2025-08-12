import type {
  Action,
  PermissionKeys
} from '@/interfaces/permissions.interfaces'
import type { Role } from '@/interfaces/role.interface'
import type { PermissionWithUserIdType } from '@/schemas/permission.schema'
import { PermissionWithUserIdSchema } from '@/schemas/permission.schema'
import { usersFake } from '@/utils/data-fake'
import {
  Button,
  createListCollection,
  HStack,
  Table,
  VStack
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import CheckboxField from './checkbox-field'
import UsersIdSelect from './users-id-select'

const defaultPermissions = {
  manage: false,
  create: false,
  read: false,
  update: false,
  delete: false
}

export default function PermissionsForm() {
  const actions: Action[] = ['manage', 'read', 'create', 'update', 'delete']
  const usersList = createListCollection({
    items: usersFake.map((user) => ({
      label: user.username,
      value: user.id,
      role: user.role
    }))
  })

  const modules = ['users', 'gachas', 'histories', 'characters']
  const uniqueRoles: Role[] = [
    'superAdmin',
    'moderador',
    'developer',
    'usuarioGeneral'
  ]

  const permissionForm = useForm<PermissionWithUserIdType>({
    resolver: zodResolver(PermissionWithUserIdSchema),
    defaultValues: {
      usersId: [],
      users: defaultPermissions,
      gachas: defaultPermissions,
      histories: defaultPermissions,
      characters: defaultPermissions
    }
  })

  const cleanPermissions = () => {
    permissionForm.reset()
  }

  return (
    <form onSubmit={permissionForm.handleSubmit((data) => console.log(data))}>
      <VStack gap={3}>
        <UsersIdSelect
          control={permissionForm.control}
          users={usersList}
          roles={uniqueRoles}
          isMultiple
        />

        <Table.Root interactive size="md" maxW={900}>
          <Table.Header>
            <Table.Row bg="background/60" borderRadius={10}>
              <Table.ColumnHeader color="text">Módulo</Table.ColumnHeader>
              {actions.map((act) => (
                <Table.ColumnHeader key={act} color="text">
                  {act}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {modules.map((module) => (
              <Table.Row
                key={module}
                bg="bg-secondary/40"
                _hover={{ bg: 'background' }}
              >
                <Table.Cell color="text">{module}</Table.Cell>
                {actions.map((action) => (
                  <Table.Cell key={action} textAlign="center">
                    <CheckboxField
                      name={`${module}.${action}` as PermissionKeys}
                      control={permissionForm.control}
                    />
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <HStack alignSelf="end">
          <Button
            bg="transparent"
            border="2px solid"
            borderColor="primary"
            onClick={cleanPermissions}
          >
            Predeterminado
          </Button>
          <Button type="submit" bg="primary">
            Actualizar
          </Button>
        </HStack>
      </VStack>
    </form>
  )
}
