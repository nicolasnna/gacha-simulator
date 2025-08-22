import type { Middleware } from '@reduxjs/toolkit'
import { toastConfigs } from './toast.config'
import { toaster } from '@/components/ui/toaster'

interface Action {
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

export const universalToastMiddleware: Middleware =
  () => (next) => (action) => {
    const result = next(action)

    const typedAction = action as Action
    const actionType = typedAction.type
    let baseType = ''

    const isPending = actionType.endsWith('/pending')
    const isFulfilled = actionType.endsWith('/fulfilled')
    const isRejected = actionType.endsWith('/rejected')

    if (isPending) {
      baseType = actionType.replace('/pending', '')
    } else if (isFulfilled) {
      baseType = actionType.replace('/fulfilled', '')
    } else if (isRejected) {
      baseType = actionType.replace('/rejected', '')
    }

    const config = toastConfigs[baseType]
    if (!config) return result

    if (isPending && config.pending) {
      toaster.create({
        title: config.pending.title || 'Cargando...',
        description: config.pending.description || undefined,
        type: 'info',
        duration: 2000
      })
    }

    if (isRejected && config.rejected) {
      toaster.create({
        title: config.rejected.title || 'Solicitud cancelada',
        description: config.rejected.getDescription
          ? config.rejected.getDescription(typedAction.payload)
          : config.rejected.description || undefined,
        type: 'error',
        duration: 3000
      })
    }

    if (isFulfilled && config.fulfilled) {
      const description = config.fulfilled.getDescription
        ? config.fulfilled.getDescription(typedAction.payload)
        : config.fulfilled.description || undefined
      toaster.success({
        title: config.fulfilled.title,
        description,
        duration: 3500
      })
    }

    return result
  }
