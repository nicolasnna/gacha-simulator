import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth.slice'
import usersReducer from './users/users.slice'
import rolesReducer from './roles/roles.slice'
import charactersReducer from './characters/characters.slice'
import websocketReducer from './websocket/websocket.slice'
import { universalToastMiddleware } from './middleware/toast.middleware'

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  roles: rolesReducer,
  characters: charactersReducer,
  ws: websocketReducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(universalToastMiddleware),
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
