import { Field, Select, type ListCollection } from '@chakra-ui/react'
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues
} from 'react-hook-form'

interface FieldSelectProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>
  control: Control<TFieldValues>
  values: ListCollection
  label?: string
  isMultiple?: boolean
  placeholder?: string
}

export default function FieldSelect<TFieldValues extends FieldValues>({
  name,
  control,
  values,
  label,
  isMultiple = false,
  placeholder
}: FieldSelectProps<TFieldValues>) {
  return (
    <Field.Root>
      {label && <Field.Label>{label}</Field.Label>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select.Root
            multiple={isMultiple}
            name={field.name}
            size="md"
            value={field.value ? [field.value] : []}
            onValueChange={({ value }) => field.onChange(value)}
            onBlur={field.onBlur}
            collection={values}
            defaultValue={field.value}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger cursor="pointer">
                <Select.ValueText placeholder={placeholder} />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.ClearTrigger color="primary" />
                <Select.Indicator color="primary" />
              </Select.IndicatorGroup>
            </Select.Control>
            <Select.Positioner>
              <Select.Content>
                {values.items.map((value) => (
                  <Select.Item item={value} key={value.value} cursor="pointer">
                    {value.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Select.Root>
        )}
      />
    </Field.Root>
  )
}
