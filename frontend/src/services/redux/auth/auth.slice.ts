import type { PromiseState } from '@/interfaces/redux-state.interface'
import type { RoleType } from '@/interfaces/role.interface'
import {
  handlePromiseFulfilled,
  handlePromisePending,
  handlePromiseReject
} from '@/utils/redux.helper'
import { createSlice } from '@reduxjs/toolkit'
import { loginUser, registerUser } from './auth.actions'

export interface AuthState {
  promise: PromiseState
  userInfo: {
    email: string
    role: RoleType
  } | null
  userToken: string | null
}

const initialState: AuthState = {
  promise: {
    loading: false,
    error: null,
    success: null
  },
  userInfo: null,
  userToken: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null
      state.promise.success = null
      state.userToken = null
      state.promise.error = null
      sessionStorage.clear()
    },
    loadSession: (state) => {
      state.userToken = sessionStorage.getItem('access_token') || null
      const infoStorage = sessionStorage.getItem('info')
      state.userInfo = infoStorage ? JSON.parse(infoStorage) : null
    }
  },
  extraReducers: (builder) => {
    builder
      //Register
      .addCase(registerUser.pending, (s) => handlePromisePending(s.promise))
      .addCase(registerUser.fulfilled, (s, { payload }) => {
        handlePromiseFulfilled(s.promise)
        const { access_token, ...result } = payload
        s.userToken = access_token
        s.userInfo = result
        sessionStorage.setItem('access_token', access_token)
        sessionStorage.setItem('info', JSON.stringify(result))
      })
      .addCase(registerUser.rejected, (s, { payload }) =>
        handlePromiseReject(s.promise, payload as string)
      )
      //Login
      .addCase(loginUser.pending, (s) => handlePromisePending(s.promise))
      .addCase(loginUser.fulfilled, (s, { payload }) => {
        handlePromiseFulfilled(s.promise)
        const { access_token, ...result } = payload
        s.userToken = access_token
        s.userInfo = result
        sessionStorage.setItem('access_token', access_token)
        sessionStorage.setItem('info', JSON.stringify(result))
      })
      .addCase(loginUser.rejected, (s, { payload }) =>
        handlePromiseReject(s.promise, payload as string)
      )
  }
})

export const { logout, loadSession } = authSlice.actions
export default authSlice.reducer
