import type { User } from '@/interfaces/user.interface'
import type { UsersState } from './users.slice'

export const handlePromisePending = (state: UsersState) => {
  state.promise.error = null
  state.promise.loading = true
  state.promise.success = null
}
export const handlePromiseReject = (state: UsersState, payload: string) => {
  state.promise.error = payload
  state.promise.loading = false
  state.promise.success = false
}
export const handlePromiseFulfilled = (state: UsersState) => {
  state.promise.error = null
  state.promise.loading = false
  state.promise.success = true
}

export const updateDataState = (data: User[], newData: User) => {
  const userListUpdated = data.map((user) =>
    user.id === newData.id ? { ...user, ...newData } : user
  )
  return userListUpdated
}
