import { Field, Input } from '@chakra-ui/react'
import type { HTMLInputTypeAttribute } from 'react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

interface FieldUsernameProps {
  register: UseFormRegisterReturn<string>
  error?: FieldError
  placeholder?: string
  isPassword?: boolean
  type?: HTMLInputTypeAttribute
  isRequired?: boolean
}

function FieldInput({
  register,
  error,
  placeholder,
  isPassword,
  type,
  isRequired
}: FieldUsernameProps) {
  return (
    <Field.Root invalid={!!error}>
      <Input
        {...register}
        placeholder={placeholder}
        variant="subtle"
        type={isPassword ? 'password' : type || 'text'}
        required={isRequired}
      />
      {error && <Field.ErrorText>{error.message}</Field.ErrorText>}
    </Field.Root>
  )
}

export default FieldInput
