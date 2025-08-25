import type {
  ItemsInfoState,
  PromiseState
} from '@/interfaces/redux-state.interface'
import type { ResponseGetAllRoleApi, Role } from '@/interfaces/role.interface'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { getAllRoles, getRole, updatePermissionRole } from './roles.actions'
import {
  handlePromiseFulfilled,
  handlePromisePending,
  handlePromiseReject,
  mergeUniqueDataState,
  updateIdDataState
} from '@/utils/redux.helper'

export interface RoleState {
  promise: PromiseState
  itemsInfo: ItemsInfoState
  data: Role[]
}

const initialState: RoleState = {
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

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all roles
    builder
      .addCase(getAllRoles.pending, (state) =>
        handlePromisePending(state.promise)
      )
      .addCase(getAllRoles.rejected, (state, { payload }) =>
        handlePromiseReject(state.promise, payload as string)
      )
      .addCase(
        getAllRoles.fulfilled,
        (state, { payload }: PayloadAction<ResponseGetAllRoleApi>) => {
          handlePromiseFulfilled(state.promise)

          state.itemsInfo.lastItemNumber = payload.lastItemNumber
          state.itemsInfo.limit = payload.limit
          state.itemsInfo.page = payload.page
          state.itemsInfo.totalItems = payload.totalItems

          state.data = mergeUniqueDataState(state.data, payload.data)
        }
      )
      // Get role
      .addCase(getRole.pending, (state) => handlePromisePending(state.promise))
      .addCase(getRole.rejected, (state, { payload }) =>
        handlePromiseReject(state.promise, payload as string)
      )
      .addCase(
        getRole.fulfilled,
        (state, { payload }: PayloadAction<{ data: Role }>) => {
          handlePromiseFulfilled(state.promise)
          state.data = mergeUniqueDataState(state.data, [payload.data])
        }
      )
      // Update role
      .addCase(updatePermissionRole.pending, (state) =>
        handlePromisePending(state.promise)
      )
      .addCase(updatePermissionRole.rejected, (state, { payload }) =>
        handlePromiseReject(state.promise, payload as string)
      )
      .addCase(
        updatePermissionRole.fulfilled,
        (state, { payload }: PayloadAction<{ data: Role }>) => {
          handlePromiseFulfilled(state.promise)
          state.data = updateIdDataState(state.data, payload.data)
        }
      )
  }
})

export default rolesSlice.reducer
