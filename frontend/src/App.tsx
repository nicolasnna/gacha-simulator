import { ChakraProvider } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from './components/ui/toaster'
import GatchaLayout from './layout/gatcha-layout'
import Characters from './pages/Characters'
import GachaView from './pages/GachaView'
import HistoryGacha from './pages/HistoryGacha'
import Login from './pages/Login'
import Users from './pages/Users'
import { useAppDispatch } from './services/hooks/useRedux'
import { loadSession } from './services/redux/auth'
import { system } from './theme'
import './utils/axios.setup'
import { ROUTES } from './utils/routes'

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
            <Route index element={<GachaView />} />
            <Route path={ROUTES.history} element={<HistoryGacha />} />
            <Route path={ROUTES.characters} element={<Characters />} />

            <Route
              element={
                <ProtectedRoute
                  redirectTo={ROUTES.home}
                  requiredRoles={['developer', 'moderator', 'superAdmin']}
                />
              }
            >
              <Route path={ROUTES.users} element={<Users />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </ChakraProvider>
  )
}

export default App
