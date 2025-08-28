import { getErrorMessageAxios } from '@/utils/axios.helper'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'localhost:3000'

export const getAllUsers = createAsyncThunk(
  'users/getAll',
  async (
    { page = 1, limit = 20 }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/users?page=${page}&limit=${limit}`
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
    { rejectWithValue }
  ) => {
    const userInfoUpdated = { email, password, name, role }

    try {
      const response = await axios.patch(
        `${BACKEND_URL}/users/${id}`,
        userInfoUpdated
      )
      return response.data
    } catch (error) {
      return rejectWithValue(getErrorMessageAxios(error))
    }
  }
)

export const deactivateUser = createAsyncThunk(
  'users/deactivate',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/users/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(getErrorMessageAxios(error))
    }
  }
)

export const activateUser = createAsyncThunk(
  'users/activate',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${BACKEND_URL}/users/${id}/activate`)
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
