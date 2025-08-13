import { RegisterSchema, type RegisterType } from '@/schemas/register.schema'
import { useAppDispatch } from '@hooks/useRedux'
import { Button, HStack, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import FieldInput from './FieldInput'
import { registerUser } from '@redux/auth'

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })
  // const { userInfo } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const onSubmit = (data: RegisterType) => {
    const { email, password } = data
    dispatch(registerUser({ email, password }))
  }

  const cleanForm = () => {
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={4}>
        <FieldInput
          register={register('name')}
          error={errors.name}
          placeholder="Nombre"
        />

        <FieldInput
          register={register('email')}
          error={errors.email}
          placeholder="Correo Electrónico"
          isRequired
        />

        <FieldInput
          register={register('password')}
          error={errors.password}
          placeholder="Contraseña"
          isPassword
          isRequired
        />

        <FieldInput
          register={register('confirmPassword')}
          error={errors.confirmPassword}
          placeholder="Repetir contraseña"
          isPassword
          isRequired
        />

        <HStack alignItems="end">
          <Button onClick={cleanForm}>Limpiar</Button>
          <Button type="submit">Registarse</Button>
        </HStack>
      </VStack>
    </form>
  )
}

export default RegisterForm
