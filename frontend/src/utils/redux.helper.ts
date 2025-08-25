import type { PromiseState } from '@/interfaces/redux-state.interface'

export const handlePromisePending = (state: PromiseState) => {
  state.error = null
  state.loading = true
  state.success = null
}
export const handlePromiseReject = (state: PromiseState, payload: string) => {
  state.error = payload
  state.loading = false
  state.success = false
}
export const handlePromiseFulfilled = (state: PromiseState) => {
  state.error = null
  state.loading = false
  state.success = true
}

interface DataWithId {
  id: string
}

export function updateIdDataState<T extends DataWithId>(
  data: Array<T>,
  newData: T
) {
  const dataListUpdated = data.map((data) =>
    data.id === newData.id ? { ...data, ...newData } : data
  )
  return dataListUpdated
}

export function mergeUniqueDataState<T extends DataWithId>(
  data: T[],
  newData: T[]
) {
  const merged = [...data, ...newData]

  const unique = Array.from(
    new Map(merged.map((item) => [item.id, item])).values()
  )

  return unique
}
