import type { ResponseGetAllUsersApi, User } from '@/interfaces/user.interface'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { getAllUsers } from './users.actions'

interface UsersState {
  // Promise
  promise: {
    loading: boolean
    error: string | null
    success: boolean | null
  }
  // Items
  itemsInfo: {
    totalItems: number | null
    lastItemNumber: number | null
    page: number | null
    limit: number | null
  }
  // user data
  data: User[] | null
}

const initialState: UsersState = {
  promise: {
    loading: false,
    error: null,
    success: null
  },
  itemsInfo: {
    totalItems: null,
    lastItemNumber: null,
    page: null,
    limit: null
  },
  data: null
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.promise.error = null
        state.promise.loading = true
        state.promise.success = null
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        state.promise.error = payload as string
        state.promise.loading = false
        state.promise.success = false
      })
      .addCase(
        getAllUsers.fulfilled,
        (state, { payload }: PayloadAction<ResponseGetAllUsersApi>) => {
          state.promise.error = null
          state.promise.loading = false
          state.promise.success = true

          state.itemsInfo.lastItemNumber = payload.lastItemNumber
          state.itemsInfo.limit = payload.limit
          state.itemsInfo.page = payload.page
          state.itemsInfo.totalItems = payload.totalItems

          if (Array.isArray(state.data)) {
            const setData = new Set([...state.data, ...payload.data])
            state.data = [...setData]
          } else {
            state.data = payload.data
          }
        }
      )
  }
})

export default usersSlice.reducer
