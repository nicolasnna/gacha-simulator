import { ChakraProvider } from '@chakra-ui/react'
import { Route, Routes } from 'react-router'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from './components/ui/toaster'
import GatchaLayout from './layout/gatcha-layout'
import Characters from './pages/Characters'
import Gatcha from './pages/Gatcha'
import HistoryGacha from './pages/HistoryGacha'
import Login from './pages/Login'
import Users from './pages/Users'
import { system } from './theme'
import { ROUTES } from './utils/routes'
import { useAppDispatch } from './services/hooks/useRedux'
import { useEffect } from 'react'
import { loadSession } from './services/redux/auth'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadSession())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ChakraProvider value={system}>
      <Toaster />
      <Routes>
        <Route path={ROUTES.login} element={<Login />} />
        <Route element={<ProtectedRoute redirectTo={ROUTES.login} />}>
          <Route path="/" element={<GatchaLayout />}>
            <Route index element={<Gatcha />} />
            <Route path={ROUTES.history} element={<HistoryGacha />} />
            <Route path={ROUTES.characters} element={<Characters />} />
            <Route path={ROUTES.users} element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </ChakraProvider>
  )
}

export default App
