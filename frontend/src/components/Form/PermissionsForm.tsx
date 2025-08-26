import type {
  ActionType,
  ModuleType,
  PermissionKeys
} from '@/interfaces/permissions.interfaces'
import type { Role } from '@/interfaces/role.interface'
import type {
  ActionBoolType,
  PermissionWithUserIdType
} from '@/schemas/permission.schema'
import { PermissionWithUserIdSchema } from '@/schemas/permission.schema'
import {
  Button,
  createListCollection,
  HStack,
  Table,
  VStack
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import CheckboxField from './CheckboxField'
import FieldSelect from './FieldSelect'
import { useCallback, useEffect } from 'react'
import { permissionsToGrantsAPI } from '@/utils/grants-helper'
import { useAppDispatch, useAppSelector } from '@/services/hooks/useRedux'
import { updatePermissionRole } from '@/services/redux/roles'

const defaultPermissions = {
  manage: false,
  create: false,
  read: false,
  update: false,
  delete: false
}

interface PermissionFormProps {
  roles: Role[]
}

export default function PermissionsForm({ roles }: PermissionFormProps) {
  const actions: ActionType[] = ['manage', 'read', 'create', 'update', 'delete']
  const modules: ModuleType[] = ['users', 'gachas', 'histories', 'characters']
  const dispatch = useAppDispatch()
  const rolesList = createListCollection({
    items: roles.map((role) => ({
      label: role.label,
      value: role.key
    }))
  })
  const isLoading = useAppSelector((s) => s.roles.promise.loading)

  const { handleSubmit, reset, watch, control, setValue } =
    useForm<PermissionWithUserIdType>({
      resolver: zodResolver(PermissionWithUserIdSchema),
      defaultValues: {
        roleId: '',
        users: defaultPermissions,
        gachas: defaultPermissions,
        histories: defaultPermissions,
        characters: defaultPermissions
      }
    })

  const roleSelected: Array<string> | string = watch('roleId')

  const handleDefautPermissions = useCallback(() => {
    const roleFind = roles.find(
      (role) => role.key === roleSelected || role.key === roleSelected[0]
    )
    if (roleFind) {
      reset({
        roleId: roleFind.key,
        users: defaultPermissions,
        gachas: { ...defaultPermissions },
        histories: { ...defaultPermissions },
        characters: { ...defaultPermissions }
      })
      for (const module of roleFind.grants) {
        module.actions.forEach((action) =>
          setValue(`${module.module}.${action}`, true)
        )
      }
    } else {
      reset({
        roleId: '',
        users: { ...defaultPermissions },
        gachas: { ...defaultPermissions },
        histories: { ...defaultPermissions },
        characters: { ...defaultPermissions }
      })
    }
  }, [roleSelected, roles, reset, setValue])

  useEffect(() => {
    handleDefautPermissions()
  }, [handleDefautPermissions])

  const onSubmit = (data: PermissionWithUserIdType) => {
    const entries = Object.entries(data).filter(([key]) => key !== 'roleId')
    const grants = entries.map(([key, boolValues]) =>
      permissionsToGrantsAPI(key as ModuleType, boolValues as ActionBoolType)
    )
    const roleFind = roles.find((role) => role.key === data.roleId)
    if (roleFind) {
      dispatch(
        updatePermissionRole({
          id: roleFind.id,
          permission: grants
        })
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={3}>
        <FieldSelect
          control={control}
          name="roleId"
          placeholder="Rol"
          values={rolesList}
        />

        <Table.Root interactive size="md" maxW={900}>
          <Table.Header>
            <Table.Row bg="background/60" borderRadius={10}>
              <Table.ColumnHeader color="text">Módulo</Table.ColumnHeader>
              {actions.map((act) => (
                <Table.ColumnHeader key={act} color="text">
                  {act}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {modules.map((module) => (
              <Table.Row
                key={module}
                bg="bg-secondary/40"
                _hover={{ bg: 'background' }}
              >
                <Table.Cell color="text">{module}</Table.Cell>
                {actions.map((action) => (
                  <Table.Cell key={action}>
                    <CheckboxField
                      name={`${module}.${action}` as PermissionKeys}
                      control={control}
                    />
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <HStack alignSelf="end">
          <Button
            bg="transparent"
            border="2px solid"
            borderColor="primary"
            onClick={handleDefautPermissions}
          >
            Predeterminado
          </Button>
          <Button type="submit" bg="primary" disabled={isLoading}>
            Actualizar
          </Button>
        </HStack>
      </VStack>
    </form>
  )
}
