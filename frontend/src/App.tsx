import { Provider } from '@/components/ui/provider'
import { Box, Button } from '@chakra-ui/react'

function App() {
  return (
    <Provider>
      <Box p={4}>
        <Button colorScheme="blue">Hola Chakra</Button>
      </Box>
    </Provider>
  )
}

export default App
