import { useAppDispatch, useAppSelector } from '@/services/hooks/useRedux'
import { logout } from '@/services/redux/auth'
import { ROUTES } from '@/utils/routes'
import { Box, Button, Stack } from '@chakra-ui/react'
import { Link } from 'react-router'

const unusedLinkStyle = {
  color: 'white'
}

const routes = [
  { route: ROUTES.home, label: 'Gacha', permissions: '' },
  {
    route: ROUTES.history,
    label: 'Historial de tiradas',
    permissions: 'histories'
  },
  { route: ROUTES.characters, label: 'Personajes', permissions: 'characters' },
  { route: ROUTES.users, label: 'Usuarios', permissions: 'users' }
]

function Navbar() {
  const dispatch = useAppDispatch()
  const permisionUser = useAppSelector((s) => s.auth.permissions)
  const role = useAppSelector((s) => s.auth.userInfo?.role)
  const handleLogout = () => {
    dispatch(logout())
  }

  const routesWithPermissions =
    role === 'superAdmin'
      ? routes
      : routes.filter((r) =>
          permisionUser.some(
            (p) =>
              (p.module === r.permissions && p.actions.length > 0) ||
              r.permissions === ''
          )
        )

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
        {routesWithPermissions.map((route) => (
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
