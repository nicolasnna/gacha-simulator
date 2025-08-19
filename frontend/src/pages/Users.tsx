import PermissionsForm from '@/components/Form/PermissionsForm'
import UsersTable from '@/components/Table/UsersTable'
import { useAppDispatch, useAppSelector } from '@/services/hooks/useRedux'
import { getAllRoles } from '@/services/redux/roles'
import { getAllUsers } from '@/services/redux/users'
import {
  Button,
  Container,
  Heading,
  HStack,
  Tabs,
  Text
} from '@chakra-ui/react'
import { useEffect } from 'react'

function Users() {
  const { data, itemsInfo } = useAppSelector((state) => state.users)
  const roles = useAppSelector((state) => state.roles.data)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllUsers({ page: 1, limit: 3 }))
    dispatch(getAllRoles({ page: 1, limit: 20 }))
  }, [dispatch])

  const loadMoreUsers = () => {
    if (itemsInfo.lastItemNumber !== itemsInfo.totalItems) {
      dispatch(
        getAllUsers({ page: itemsInfo.page + 1, limit: itemsInfo.limit })
      )
    }
  }

  return (
    <Container centerContent py={2} spaceY={5}>
      <HStack mt={2} flexWrap="wrap">
        <Heading size={'4xl'} color="text">
          Gestión de usuarios
        </Heading>
      </HStack>

      <Tabs.Root defaultValue="users" variant="plain">
        <Tabs.List>
          <Tabs.Trigger value="users" color="text">
            Usuarios
          </Tabs.Trigger>
          <Tabs.Trigger value="permissions" color="text">
            Permisos
          </Tabs.Trigger>
          <Tabs.Indicator rounded="md" bg="bg-secondary" />
        </Tabs.List>
        <Tabs.Content value="users" spaceY={2}>
          <UsersTable users={data} roles={roles} />
          <HStack justifyContent="end">
            <Text color="white">
              Usuarios {itemsInfo.lastItemNumber} de {itemsInfo.totalItems}
            </Text>
            <Button
              bg="primary"
              onClick={loadMoreUsers}
              disabled={itemsInfo.lastItemNumber === itemsInfo.totalItems}
            >
              Ver más
            </Button>
          </HStack>
        </Tabs.Content>
        <Tabs.Content value="permissions">
          <PermissionsForm />
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  )
}

export default Users
