import loginbg from '@/assets/login-bg.webp'
import FormLogin from '@/components/form/form-login'
import FormRegister from '@/components/form/form-register'
import { Box, Center, Heading, Link, Text } from '@chakra-ui/react'
import { useState } from 'react'

function Login() {
  const [showRegister, setShowRegister] = useState<boolean>(false)

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
          <Heading textAlign="center" size="3xl">
            {showRegister ? 'Registro' : 'Iniciar sesión'}
          </Heading>
          {showRegister ? <FormRegister /> : <FormLogin />}
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
