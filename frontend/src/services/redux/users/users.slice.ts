import type {
  ResponseGetAllUsersApi,
  ResponseUserDataAPI,
  User
} from '@/interfaces/user.interface'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import {
  activateUser,
  deactivateUser,
  getAllUsers,
  updateUser
} from './users.actions'
import {
  handlePromiseFulfilled,
  handlePromisePending,
  handlePromiseReject,
  updateDataState
} from './users.helper'

export interface UsersState {
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
        (state, { payload }: PayloadAction<ResponseUserDataAPI>) => {
          handlePromiseFulfilled(state)
          state.data = updateDataState(state.data, payload.data)
        }
      )
      // deactivate user
      .addCase(deactivateUser.pending, (state) => handlePromisePending(state))
      .addCase(deactivateUser.rejected, (state, { payload }) =>
        handlePromiseReject(state, payload as string)
      )
      .addCase(
        deactivateUser.fulfilled,
        (state, { payload }: PayloadAction<ResponseUserDataAPI>) => {
          handlePromiseFulfilled(state)
          state.data = updateDataState(state.data, payload.data)
        }
      )
      // activate user
      .addCase(activateUser.pending, (state) => handlePromisePending(state))
      .addCase(activateUser.rejected, (state, { payload }) =>
        handlePromiseReject(state, payload as string)
      )
      .addCase(
        activateUser.fulfilled,
        (state, { payload }: PayloadAction<ResponseUserDataAPI>) => {
          handlePromiseFulfilled(state)
          state.data = updateDataState(state.data, payload.data)
        }
      )
  }
})

export default usersSlice.reducer
