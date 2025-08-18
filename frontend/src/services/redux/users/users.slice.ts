import type {
  ResponseGetAllUsersApi,
  ResponseUpdateUser,
  User
} from '@/interfaces/user.interface'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { getAllUsers, updateUser } from './users.actions'

interface UsersState {
  // Promise
  promise: {
    loading: boolean
    error: string | null
    success: boolean | null
  }
  // Items
  itemsInfo: {
    totalItems: number
    lastItemNumber: number
    page: number
    limit: number
  }
  // user data
  data: User[]
}

const initialState: UsersState = {
  promise: {
    loading: false,
    error: null,
    success: null
  },
  itemsInfo: {
    totalItems: 0,
    lastItemNumber: 0,
    page: 0,
    limit: 5
  },
  data: []
}

const handlePromisePending = (state: UsersState) => {
  state.promise.error = null
  state.promise.loading = true
  state.promise.success = null
}
const handlePromiseReject = (state: UsersState, payload: string) => {
  state.promise.error = payload
  state.promise.loading = false
  state.promise.success = false
}
const handlePromiseFulfilled = (state: UsersState) => {
  state.promise.error = null
  state.promise.loading = false
  state.promise.success = true
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Get All users
      .addCase(getAllUsers.pending, (state) => handlePromisePending(state))
      .addCase(getAllUsers.rejected, (state, { payload }) =>
        handlePromiseReject(state, payload as string)
      )
      .addCase(
        getAllUsers.fulfilled,
        (state, { payload }: PayloadAction<ResponseGetAllUsersApi>) => {
          handlePromiseFulfilled(state)

          state.itemsInfo.lastItemNumber = payload.lastItemNumber
          state.itemsInfo.limit = payload.limit
          state.itemsInfo.page = payload.page
          state.itemsInfo.totalItems = payload.totalItems

          const merged = [...state.data, ...payload.data]

          const unique = Array.from(
            new Map(merged.map((item) => [item.id, item])).values()
          )

          state.data = unique
        }
      )
      // Update user
      .addCase(updateUser.pending, (state) => handlePromisePending(state))
      .addCase(updateUser.rejected, (state, { payload }) =>
        handlePromiseReject(state, payload as string)
      )
      .addCase(
        updateUser.fulfilled,
        (state, { payload }: PayloadAction<ResponseUpdateUser>) => {
          handlePromiseFulfilled(state)
          const userListUpdated = state.data.map((user) =>
            user.id === payload.data.id ? { ...user, ...payload.data } : user
          )
          state.data = userListUpdated
        }
      )
  }
})

export default usersSlice.reducer
