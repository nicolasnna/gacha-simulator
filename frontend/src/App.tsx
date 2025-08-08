import { ChakraProvider } from '@chakra-ui/react'
import { Route, Routes } from 'react-router'
import GatchaLayout from './layout/gatcha-layout'
import Gatcha from './pages/Gatcha'
import { system } from './theme'
import { ROUTES } from './utils/routes'
import Login from './pages/Login'

function App() {
  return (
    <ChakraProvider value={system}>
      <Routes>
        <Route path={ROUTES.login} element={<Login/>}/>
        <Route path='/' element={<GatchaLayout/>}>
          <Route index element={<Gatcha/>} />
          <Route path={ROUTES.history} />
          <Route path={ROUTES.characters} />
        </Route>
      </Routes>
    </ChakraProvider>
  )
}

export default App
