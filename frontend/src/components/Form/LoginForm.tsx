import { LoginSchema, type LoginType } from '@/schemas/login.schema'
import { Button, HStack, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import FieldInput from './FieldInput'
import { useAppDispatch, useAppSelector } from '@hooks/useRedux'
import { loginUser } from '@redux/auth'
import { useEffect } from 'react'
import { toaster } from '../ui/toaster'

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const { loading, success, userInfo } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const onSubmit = (data: LoginType) => {
    dispatch(loginUser(data))
  }

  useEffect(() => {
    if (success) {
      toaster.success({
        description: `Usuario ${userInfo?.email} rol: ${userInfo?.role} ingresado correctamente`,
        duration: 4000
      })
      reset()
    }
  }, [success, reset, userInfo?.email, userInfo?.role])

  const cleanForm = () => {
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={4}>
        <FieldInput
          register={register('email')}
          error={errors.email}
          placeholder="Correo electrónico"
        />

        <FieldInput
          register={register('password')}
          error={errors.password}
          placeholder="Contraseña"
          isPassword
        />

        <HStack alignItems="end">
          <Button onClick={cleanForm}>Limpiar</Button>
          <Button type="submit" disabled={loading}>
            Ingresar
          </Button>
        </HStack>
      </VStack>
    </form>
  )
}

export default LoginForm
