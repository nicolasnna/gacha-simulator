import type { namedToastConfig } from '../toast.config'

export const usersToastConfig: namedToastConfig = {
  'users/getAll': {
    fulfilled: {
      title: 'Usuarios obtenidos',
      getDescription(payload) {
        return `Se han cargado ${
          Array.isArray(payload.data) && payload.data.length
        } usuarios`
      }
    },
    rejected: {
      title: 'No se ha logrado obtener los usuarios',
      getDescription(payload) {
        return `${payload}`
      }
    },
    pending: {
      title: 'Obteniendo usuarios'
    }
  },
  'users/update': {
    fulfilled: {
      title: 'Usuario actualizado',
      getDescription(payload) {
        return `${payload.data.email}`
      }
    },
    rejected: {
      title: 'Error al actualizar usuario',
      getDescription(payload) {
        return `${payload}`
      }
    }
  },
  'users/activate': {
    fulfilled: {
      title: 'Usuario activado',
      getDescription(payload) {
        return `${payload.data.email}`
      }
    },
    rejected: {
      title: 'Error al activar el usuario',
      getDescription(payload) {
        return `${payload}`
      }
    }
  },
  'users/deactivate': {
    fulfilled: {
      title: 'Usuario desactivado',
      getDescription(payload) {
        return `${payload.data.email}`
      }
    },
    rejected: {
      title: 'Error al desactivar el usuario',
      getDescription(payload) {
        return `${payload}`
      }
    }
  }
}
