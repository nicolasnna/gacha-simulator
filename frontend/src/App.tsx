import { ChakraProvider } from '@chakra-ui/react'
import { Route, Routes } from 'react-router'
import GatchaLayout from './layout/gatcha-layout'
import Gatcha from './pages/Gatcha'
import { system } from './theme'
import { ROUTES } from './utils/routes'
import Login from './pages/Login'
import HistoryGacha from './pages/HistoryGacha'
import Characters from './pages/Characters'

function App() {
  return (
    <ChakraProvider value={system}>
      <Routes>
        <Route path={ROUTES.login} element={<Login />} />
        <Route path="/" element={<GatchaLayout />}>
          <Route index element={<Gatcha />} />
          <Route path={ROUTES.history} element={<HistoryGacha />} />
          <Route path={ROUTES.characters} element={<Characters />} />
        </Route>
      </Routes>
    </ChakraProvider>
  )
}

export default App
