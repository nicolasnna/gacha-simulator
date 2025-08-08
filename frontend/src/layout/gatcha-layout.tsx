import bgGatcha from '@/assets/gacha-bg.webp'
import Navbar from '@/components/ui/navbar'
import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router'

function GatchaLayout() {
  return (
    <Box bgImage={`url(${bgGatcha})`} bgSize="cover" bgPos="center" bgAttachment="fixed">
      <Box
        background={'background.200'}
        minH="100vh"
        backdropFilter="blur(2px)"
      >
        <Navbar />
        <Outlet />
      </Box>
    </Box>
  )
}

export default GatchaLayout
