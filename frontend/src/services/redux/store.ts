import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth.slice'
import usersReducer from './users/users.slice'
import rolesReducer from './roles/roles.slice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    roles: rolesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
