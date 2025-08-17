import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { loginUser, registerUser } from './auth.actions'
import type { ResponseAuthApi } from '@/interfaces/auth.interface'
import type { Role } from '@/interfaces/role.interface'

interface AuthState {
  loading: boolean
  userInfo: {
    email: string
    role: Role
  } | null
  userToken: string | null
  error: string | null
  success: boolean | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getErrorMessagePayload = (action: any): string => {
  if (action.payload && typeof action.payload === 'string')
    return action.payload

  if (action.error?.message) return action.error.message

  return 'Error desconocido'
}

// Helpers
const handlePending = (state: AuthState) => {
  state.loading = true
  state.error = null
  state.success = null
}

const handleFulfilled = (
  state: AuthState,
  { payload }: PayloadAction<ResponseAuthApi>
) => {
  state.loading = false
  state.success = true
  const { access_token, ...result } = payload
  state.userToken = access_token
  state.userInfo = result
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleRejected = (state: AuthState, action: any) => {
  state.loading = false
  state.success = false
  state.error = getErrorMessagePayload(action)
}

const initialState: AuthState = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null
      state.success = null
      state.userToken = null
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      //Register
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleFulfilled)
      .addCase(registerUser.rejected, handleRejected)
      //Login
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, handleFulfilled)
      .addCase(loginUser.rejected, handleRejected)
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
