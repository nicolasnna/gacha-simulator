import { ChakraProvider } from '@chakra-ui/react'
import { Route, Routes } from 'react-router'
import GatchaLayout from './layout/gatcha-layout'
import Gatcha from './pages/Gatcha'
import { system } from './theme'
import { ROUTES } from './utils/routes'

function App() {
  return (
    <ChakraProvider value={system}>
      <Routes>
        <Route element={<GatchaLayout/>}>
          <Route index element={<Gatcha/>} />
          <Route path={ROUTES.history} />
        </Route>
      </Routes>
    </ChakraProvider>
  )
}

export default App
