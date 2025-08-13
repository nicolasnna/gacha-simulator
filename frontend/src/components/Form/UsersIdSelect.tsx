import type { Role } from '@/interfaces/role.interface'
import type { PermissionWithUserIdType } from '@/schemas/permission.schema'
import { Field, Portal, Select, type ListCollection } from '@chakra-ui/react'
import { Controller, type Control } from 'react-hook-form'

interface UsersIdSelectProps {
  control: Control<PermissionWithUserIdType>
  users: ListCollection
  roles: Role[]
  isMultiple?: boolean
}

export default function UsersIdSelect({
  control,
  users,
  roles,
  isMultiple
}: UsersIdSelectProps) {
  return (
    <Field.Root>
      <Field.Label color="text">Seleccionar usuarios a modificar</Field.Label>
      <Controller
        control={control}
        name="usersId"
        render={({ field }) => (
          <Select.Root
            multiple={isMultiple}
            name={field.name}
            value={field.value as string[]}
            size="md"
            onValueChange={({ value }) => field.onChange(value)}
            onInteractOutside={() => field.onBlur()}
            collection={users}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger cursor="pointer">
                <Select.ValueText placeholder="Usuarios" color="text" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.ClearTrigger color="primary" />
                <Select.Indicator color="primary" />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {roles.map((role) => (
                    <Select.ItemGroup key={role}>
                      <Select.ItemGroupLabel bg="bg-secondary/90" color="white">
                        {role}
                      </Select.ItemGroupLabel>
                      {users.items.map(
                        (user) =>
                          role === user.role && (
                            <Select.Item
                              item={user}
                              key={user.value}
                              cursor="pointer"
                            >
                              {user.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          )
                      )}
                    </Select.ItemGroup>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        )}
      />
    </Field.Root>
  )
}
