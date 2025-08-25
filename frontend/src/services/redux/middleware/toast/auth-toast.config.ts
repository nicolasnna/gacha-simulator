import type { namedToastConfig } from '../toast.config'

export const authToastConfigs: namedToastConfig = {
  // Auth
  'auth/login': {
    fulfilled: {
      title: '¡Login exitoso!',
      getDescription(payload) {
        return `Bienvenido ${payload.email || ''}`
      }
    },
    rejected: {
      title: 'Error de login',
      getDescription(payload) {
        return `${payload}`
      }
    }
  },
  'auth/register': {
    fulfilled: {
      title: '¡Registro completado! Ingresando a la aplicación',
      getDescription(payload) {
        return `Bienvenido ${payload.email || ''}`
      }
    },
    rejected: {
      title: 'Error al completar el registro',
      getDescription(payload) {
        return `${payload}`
      }
    }
  }
}
