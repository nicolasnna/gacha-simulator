import loginbg from '@/assets/login-bg.webp'
import LoginForm from '@/components/Form/LoginForm'
import RegisterForm from '@/components/Form/RegisterForm'
import { useAppSelector } from '@/services/hooks/useRedux'
import { Box, Center, Heading, Link, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { Navigate, useLocation } from 'react-router'

function Login() {
  const [showRegister, setShowRegister] = useState<boolean>(false)

  const location = useLocation()
  const { userToken, userInfo } = useAppSelector((s) => s.auth)

  // Si ya está autenticado, redirigir automáticamente
  if (userToken && userInfo) {
    const from = location.state?.from?.pathname || '/'
    return <Navigate to={from} replace />
  }

  return (
    <Box
      bgImage={`url(${loginbg})`}
      bgSize="cover"
      bgPos="center"
      minH="100vh"
      bgAttachment="fixed"
    >
      <Center minH="100vh">
        <Box
          bg="rgba(255,255,255, 0.35)"
          p={6}
          spaceY={3}
          borderRadius={10}
          minW={320}
          backdropFilter="blur(4px)"
        >
          <Heading
            textAlign="center"
            size="3xl"
            fontWeight="bold"
            textTransform="uppercase"
          >
            {showRegister ? 'Registro' : 'Iniciar sesión'}
          </Heading>
          {showRegister ? <RegisterForm /> : <LoginForm />}
          <Link onClick={() => setShowRegister(!showRegister)}>
            <Text fontSize="sm">
              {showRegister
                ? '¿Tienes cuenta? Ingresa aquí'
                : '¿No tienes cuenta? Registrate aquí'}
            </Text>
          </Link>
        </Box>
      </Center>
    </Box>
  )
}

export default Login
