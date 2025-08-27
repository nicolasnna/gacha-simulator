import { getErrorMessageAxios } from '@/utils/axios.helper'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { RootState } from '../store'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'localhost:3000'

export const getAllUsers = createAsyncThunk(
  'users/getAll',
  async (
    { page = 1, limit = 20 }: { page: number; limit: number },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState
      const token: string = state.auth.userToken || ''

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.get(
        `${BACKEND_URL}/users?page=${page}&limit=${limit}`,
        config
      )
      return response.data
    } catch (error) {
      return rejectWithValue(getErrorMessageAxios(error))
    }
  }
)

interface UpdateUserAPI {
  id: string
  email?: string
  password?: string
  name?: string
  role?: string
}
export const updateUser = createAsyncThunk(
  'users/update',
  async (
    { id, email, password, name, role }: UpdateUserAPI,
    { rejectWithValue, getState }
  ) => {
    const state = getState() as RootState
    const token: string = state.auth.userToken || ''

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const userInfoUpdated = { email, password, name, role }

    try {
      const response = await axios.patch(
        `${BACKEND_URL}/users/${id}`,
        userInfoUpdated,
        config
      )
      return response.data
    } catch (error) {
      return rejectWithValue(getErrorMessageAxios(error))
    }
  }
)

export const deactivateUser = createAsyncThunk(
  'users/deactivate',
  async (id: string, { rejectWithValue, getState }) => {
    const state = getState() as RootState
    const token: string = state.auth.userToken || ''

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await axios.delete(`${BACKEND_URL}/users/${id}`, config)
      return response.data
    } catch (error) {
      return rejectWithValue(getErrorMessageAxios(error))
    }
  }
)

export const activateUser = createAsyncThunk(
  'users/activate',
  async (id: string, { rejectWithValue, getState }) => {
    const state = getState() as RootState
    const token: string = state.auth.userToken || ''

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/users/${id}/activate`,
        config
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
