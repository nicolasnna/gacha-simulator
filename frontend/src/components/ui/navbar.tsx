import { Box, Stack } from '@chakra-ui/react'
import { Link } from 'react-router'

const unusedLinkStyle = {
  color: 'white'
}

function Navbar() {
  return <Box
    justifyContent="end"
    p={2}
  >
    <Stack alignItems="end" px={4}>
      <Link to='/' style={unusedLinkStyle}>Gacha</Link>
      
    </Stack>
  </Box>
}

export default Navbar
