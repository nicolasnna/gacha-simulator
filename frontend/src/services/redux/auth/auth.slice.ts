import { createSlice } from '@reduxjs/toolkit'
import { registerUser } from './auth.actions'
import type { ResponseRegisterUserApi } from '@/interfaces/auth.interface'

interface AuthState {
  loading: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userInfo: Record<string, any>
  userToken: string | null
  error: string | null
  success: boolean | null
}

const initialState: AuthState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = null
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.success = true
        const { access_token, ...result } = payload as ResponseRegisterUserApi
        state.userToken = access_token
        state.userInfo = result
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false
        state.success = false
        state.error = payload as string
      })
  }
})

export default authSlice.reducer
