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
    dispatch(getAllUsers({ page: 1, limit: 20 }))
    dispatch(getAllRoles({ page: 1, limit: 20 }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadMoreUsers = () => {
    if (itemsInfo.lastItemNumber !== itemsInfo.totalItems) {
      dispatch(
        getAllUsers({ page: itemsInfo.page + 1, limit: itemsInfo.limit })
      )
    }
  }

  return (
    <Container centerContent py={2} spaceY={10}>
      <HStack mt={2} flexWrap="wrap">
        <img
          src="https://emojicdn.elk.sh/👤?style=facebook"
          width={40}
          alt="usuario"
        />
        <Heading size={'4xl'} color="text" textTransform="uppercase">
          Gestión de usuarios
        </Heading>
      </HStack>

      <Tabs.Root
        defaultValue="users"
        variant="plain"
        lazyMount
        fitted
        size="md"
      >
        <Tabs.List boxSizing="content-box" w="100%">
          <Tabs.Trigger value="users" color="text" fontSize="large">
            Usuarios
          </Tabs.Trigger>
          <Tabs.Trigger value="permissions" color="text" fontSize="large">
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
          <PermissionsForm roles={roles} />
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  )
}

export default Users
