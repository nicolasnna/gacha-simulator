import { createSlice } from '@reduxjs/toolkit'
import type { Socket } from 'socket.io-client'

export interface WebsocketState {
  socket: Socket | null
}

const initialState: WebsocketState = {
  socket: null
}

const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    saveWs: (state, { payload }) => {
      state.socket = payload
    }
  }
})
export const { saveWs } = websocketSlice.actions
export default websocketSlice.reducer
