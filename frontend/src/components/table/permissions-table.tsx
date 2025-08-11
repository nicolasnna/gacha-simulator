import type {
  Action,
  PermissionKeys
} from '@/interfaces/permissions.interfaces'
import type { PermissionType } from '@/schemas/permission.schema'
import { PermissionSchema } from '@/schemas/permission.schema'
import { Table } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import CheckboxField from '../form/checkbox-field'

const defaultModuleState = {
  manage: false,
  read: false,
  create: false,
  update: false,
  delete: false
}

export default function PermissionsTable() {
  const actions: Action[] = ['manage', 'read', 'create', 'update', 'delete']

  const modules = ['users', 'gachas', 'histories', 'characters']

  const permissionForm = useForm<PermissionType>({
    resolver: zodResolver(PermissionSchema),
    defaultValues: {
      users: defaultModuleState,
      gachas: defaultModuleState,
      histories: defaultModuleState,
      characters: defaultModuleState
    }
  })

  const watch = permissionForm.watch()
  useEffect(() => {
    console.table(watch)
  }, [watch])

  return (
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
              <Table.Cell key={action} textAlign="center">
                <CheckboxField
                  name={`${module}.${action}` as PermissionKeys}
                  control={permissionForm.control}
                />
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
