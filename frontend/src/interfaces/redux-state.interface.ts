export interface PromiseState {
  loading: boolean
  error: string | null
  success: boolean | null
}

export interface ItemsInfoState {
  totalItems: number
  lastItemNumber: number
  page: number
  limit: number
}
