import type { namedToastConfig } from '../toast.config'

export const charactersToastConfig: namedToastConfig = {
  'characters/getAll': {
    fulfilled: {
      title: 'Personajes obtenidos',
      getDescription(payload) {
        return `Se han cargado ${
          Array.isArray(payload.data) && payload.data.length
        } personajes`
      }
    },
    rejected: {
      title: 'No se ha logrado cargar los personajes',
      getDescription(payload) {
        return `${payload}`
      }
    },
    pending: {
      title: 'Obteniendo personajes...'
    }
  }
}
