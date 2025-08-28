import bgGatcha from '@/assets/gacha-bg.webp'
import Footer from '@/components/Footer'
import Navbar from '@/components/ui/navbar'
import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router'

function GatchaLayout() {
  return (
    <Box
      bgBlendMode="multiply"
      bgColor="background.200"
      bgImage={`url(${bgGatcha})`}
      bgSize="cover"
      bgPos="center"
      bgAttachment="fixed"
      position="relative"
    >
      <Box minH="100vh" backdropFilter="blur(2px)" pb={10}>
        <Navbar />
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

export default GatchaLayout
