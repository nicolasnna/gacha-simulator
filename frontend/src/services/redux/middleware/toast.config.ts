import {
  authToastConfigs,
  charactersToastConfig,
  usersToastConfig
} from './toast'

export interface ToastConfig {
  pending?: {
    title?: string
    description?: string
  }
  fulfilled?: {
    title?: string
    description?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getDescription?: (payload: any) => string
  }
  rejected?: {
    title?: string
    description?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getDescription?: (payload: any) => string
  }
}

export type namedToastConfig = Record<string, ToastConfig>

export const toastConfigs: namedToastConfig = {
  ...authToastConfigs,
  ...charactersToastConfig,
  ...usersToastConfig
}
