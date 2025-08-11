import UsersTable from '@/components/table/users-table'
import { usersFake } from '@/utils/data-fake'
import { Container, Heading, HStack, Tabs } from '@chakra-ui/react'

function Users() {
  return (
    <Container centerContent py={2} spaceY={5}>
      <HStack mt={2} flexWrap="wrap">
        <Heading size={'4xl'} color="text">
          Gestión de usuarios
        </Heading>
      </HStack>

      <Tabs.Root defaultValue="users" variant="plain">
        <Tabs.List >
          <Tabs.Trigger value="users" color="text">Usuarios</Tabs.Trigger>
          <Tabs.Trigger value="permissions" color="text">Permisos</Tabs.Trigger>
          <Tabs.Indicator rounded="md" bg='bg-secondary'/>
        </Tabs.List>
        <Tabs.Content value="users">
          <UsersTable data={usersFake} />
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  )
}

export default Users