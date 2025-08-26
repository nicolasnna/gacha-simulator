import type { namedToastConfig } from '../toast.config'

export const rolesToastConfig: namedToastConfig = {
  'roles/getAll': {
    fulfilled: { title: 'Roles cargados' },
    rejected: {
      title: 'No se han podido obtener los roles',
      getDescription(payload) {
        return `${payload}`
      }
    },
    pending: { title: 'Cargando roles...' }
  },
  'roles/getRole': {
    fulfilled: { title: 'Rol cargado' },
    rejected: {
      title: 'No se ha podido cargar el rol',
      getDescription(payload) {
        return `${payload}`
      }
    },
    pending: { title: 'Cargando rol...' }
  },
  'roles/updatePermission': {
    fulfilled: { title: 'Permisos actualizados' },
    rejected: {
      title: 'No se ha podido actualizar el rol',
      getDescription(payload) {
        return `${payload}`
      }
    },
    pending: { title: 'Actualizando permisos...' }
  }
}
