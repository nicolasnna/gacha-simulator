import Gatcha from './pages/Gatcha'
import { system } from './theme'
import { Box, ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider value={system}>
      <Box bg="background" minH="100vh">
        <Gatcha/>

      </Box>
    </ChakraProvider>
  )
}

export default App
