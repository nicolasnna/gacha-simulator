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
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
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
