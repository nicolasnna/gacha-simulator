import type { PermissionKeys } from '@/interfaces/permissions.interfaces'
import type { PermissionWithUserIdType } from '@/schemas/permission.schema'
import { Checkbox, Field } from '@chakra-ui/react'
import { Controller, type Control } from 'react-hook-form'

interface CheckboxFieldProps {
  name: PermissionKeys
  control: Control<PermissionWithUserIdType>
}

export default function CheckboxField({ name, control }: CheckboxFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field.Root alignItems="center">
          <Checkbox.Root
            colorPalette="pink"
            checked={field.value}
            onCheckedChange={({ checked }) => field.onChange(checked)}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control cursor="pointer" />
          </Checkbox.Root>
        </Field.Root>
      )}
    />
  )
}
