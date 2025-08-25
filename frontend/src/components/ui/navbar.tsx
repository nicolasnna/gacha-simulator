import { useAppDispatch } from '@/services/hooks/useRedux'
import { logout } from '@/services/redux/auth'
import { ROUTES } from '@/utils/routes'
import { Box, Button, Stack } from '@chakra-ui/react'
import { Link } from 'react-router'

const unusedLinkStyle = {
  color: 'white'
}

const routes = [
  { route: ROUTES.home, label: 'Gacha' },
  { route: ROUTES.history, label: 'Historial de tiradas' },
  { route: ROUTES.characters, label: 'Personajes' },
  { route: ROUTES.users, label: 'Usuarios' }
]

function Navbar() {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Box justifyContent="end" p={2}>
      <Stack
        justifyContent="end"
        px={4}
        flexDir="row"
        gap={4}
        flexWrap="wrap"
        alignItems="center"
      >
        {routes.map((route) => (
          <Link key={route.label} to={route.route} style={unusedLinkStyle}>
            {route.label}
          </Link>
        ))}
        <Button
          variant="outline"
          border="none"
          color="primary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Stack>
    </Box>
  )
}

export default Navbar
