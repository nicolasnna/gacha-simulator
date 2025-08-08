import { RegisterSchema, type RegisterType } from '@/schemas/register.schema'
import { Button, HStack, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import FieldInput from './field-input'

function FormRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = (data: RegisterType) => {
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
          error={errors.password}
          placeholder="Contraseña"
          isPassword
        />

        <FieldInput
          register={register('confirmPassword')}
          error={errors.confirmPassword}
          placeholder="Repetir contraseña"
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

export default FormRegister
