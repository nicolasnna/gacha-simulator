import { ROUTES } from '@/utils/routes'
import { Box, Stack } from '@chakra-ui/react'
import { Link } from 'react-router'

const unusedLinkStyle = {
  color: 'white'
}

const routes = [
  { route: ROUTES.home, label: 'Gacha' },
  { route: ROUTES.history, label: 'Historial de tiradas' },
  { route: ROUTES.characters, label: 'Personajes' },
  { route: ROUTES.users, label: 'Usuarios'}
]

function Navbar() {
  return (
    <Box justifyContent="end" p={2}>
      <Stack justifyContent="end" px={4} flexDir="row" gap={4} flexWrap='wrap'>
        {routes.map((route) => (
          <Link key={route.label} to={route.route} style={unusedLinkStyle}>
            {route.label}
          </Link>
        ))}
      </Stack>
    </Box>
  )
}

export default Navbar
