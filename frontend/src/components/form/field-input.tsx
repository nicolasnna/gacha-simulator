import { Field, Input } from '@chakra-ui/react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

interface FieldUsernameProps {
  register: UseFormRegisterReturn<'username' | 'password' | 'confirmPassword'>
  error?: FieldError
  placeholder?: string
  isPassword?: boolean
}

function FieldInput({
  register,
  error,
  placeholder,
  isPassword
}: FieldUsernameProps) {
  return (
    <Field.Root invalid={!!error}>
      <Input
        {...register}
        placeholder={placeholder}
        variant="subtle"
        type={isPassword ? 'password' : 'text'}
      />
      {error && <Field.ErrorText>{error.message}</Field.ErrorText>}
    </Field.Root>
  )
}

export default FieldInput
