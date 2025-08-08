import Navbar from '@/components/ui/navbar'
import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router'

function GatchaLayout() {
  return (
    <Box bg="background" minH="100vh">
      <Navbar />
      <Outlet />
    </Box>
  )
}

export default GatchaLayout
