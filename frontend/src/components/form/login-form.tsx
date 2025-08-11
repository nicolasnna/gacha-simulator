import { LoginSchema, type LoginType } from '@/schemas/login.schema'
import { Button, HStack, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import FieldInput from './field-input'

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = (data: LoginType) => {
    console.log(data)
  }

  const cleanForm = () => {
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={4}>
        <FieldInput
          register={register('username')}
          error={errors.username}
          placeholder="Usuario"
        />

        <FieldInput
          register={register('password')}
          error={errors.username}
          placeholder="Contraseña"
          isPassword
        />

        <HStack alignItems="end">
          <Button onClick={cleanForm}>Limpiar</Button>
          <Button type="submit">Ingresar</Button>
        </HStack>
      </VStack>
    </form>
  )
}

export default LoginForm
