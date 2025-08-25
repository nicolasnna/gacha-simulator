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

import type {
  ItemsInfoState,
  PromiseState
} from '@/interfaces/redux-state.interface'
import {
  handlePromiseFulfilled,
  handlePromisePending,
  handlePromiseReject,
  mergeUniqueDataState,
  updateIdDataState
} from '@/utils/redux.helper'

export interface UsersState {
  promise: PromiseState
  itemsInfo: ItemsInfoState
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
    limit: 20
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
      .addCase(getAllUsers.pending, (state) =>
        handlePromisePending(state.promise)
      )
      .addCase(getAllUsers.rejected, (state, { payload }) =>
        handlePromiseReject(state.promise, payload as string)
      )
      .addCase(
        getAllUsers.fulfilled,
        (state, { payload }: PayloadAction<ResponseGetAllUsersApi>) => {
          handlePromiseFulfilled(state.promise)

          state.itemsInfo.lastItemNumber = payload.lastItemNumber
          state.itemsInfo.limit = payload.limit
          state.itemsInfo.page = payload.page
          state.itemsInfo.totalItems = payload.totalItems

          state.data = mergeUniqueDataState(state.data, payload.data)
        }
      )
      // Update user
      .addCase(updateUser.pending, (state) =>
        handlePromisePending(state.promise)
      )
      .addCase(updateUser.rejected, (state, { payload }) =>
        handlePromiseReject(state.promise, payload as string)
      )
      .addCase(
        updateUser.fulfilled,
        (state, { payload }: PayloadAction<ResponseUserDataAPI>) => {
          handlePromiseFulfilled(state.promise)
          state.data = updateIdDataState(state.data, payload.data)
        }
      )
      // deactivate user
      .addCase(deactivateUser.pending, (state) =>
        handlePromisePending(state.promise)
      )
      .addCase(deactivateUser.rejected, (state, { payload }) =>
        handlePromiseReject(state.promise, payload as string)
      )
      .addCase(
        deactivateUser.fulfilled,
        (state, { payload }: PayloadAction<ResponseUserDataAPI>) => {
          handlePromiseFulfilled(state.promise)
          state.data = updateIdDataState(state.data, payload.data)
        }
      )
      // activate user
      .addCase(activateUser.pending, (state) =>
        handlePromisePending(state.promise)
      )
      .addCase(activateUser.rejected, (state, { payload }) =>
        handlePromiseReject(state.promise, payload as string)
      )
      .addCase(
        activateUser.fulfilled,
        (state, { payload }: PayloadAction<ResponseUserDataAPI>) => {
          handlePromiseFulfilled(state.promise)
          state.data = updateIdDataState(state.data, payload.data)
        }
      )
  }
})

export default usersSlice.reducer
