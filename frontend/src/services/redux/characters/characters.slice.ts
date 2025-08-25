import type { Character } from '@/interfaces/character.interface'
import type {
  ItemsInfoState,
  PromiseState
} from '@/interfaces/redux-state.interface'
import { createSlice } from '@reduxjs/toolkit'
import { getAllCharacters } from './characters.actions'
import {
  handlePromiseFulfilled,
  handlePromisePending,
  handlePromiseReject,
  mergeUniqueDataState
} from '@/utils/redux.helper'

export interface CharactersState {
  promise: PromiseState
  itemsInfo: ItemsInfoState
  data: Character[]
}

const initialState: CharactersState = {
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

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCharacters.pending, (s) => handlePromisePending(s.promise))
      .addCase(getAllCharacters.rejected, (s, { payload }) =>
        handlePromiseReject(s.promise, payload as string)
      )
      .addCase(getAllCharacters.fulfilled, (s, { payload }) => {
        handlePromiseFulfilled(s.promise)

        s.itemsInfo.lastItemNumber = payload.lastItemNumber
        s.itemsInfo.limit = payload.limit
        s.itemsInfo.page = payload.page
        s.itemsInfo.totalItems = payload.totalItems

        s.data = mergeUniqueDataState(s.data, payload.data)
      })
  }
})

export default charactersSlice.reducer
