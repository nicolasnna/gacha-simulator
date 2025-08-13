import type { RegisterUserApi } from '@/interfaces/auth.interface'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'localhost:3000'

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterUserApi, { rejectWithValue }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/register`,
        userData,
        config
      )
      return response.data
    } catch (error) {
      if (!axios.isAxiosError(error))
        return rejectWithValue('An unexpected error ocurred')

      if (error.response && error.response.data?.message)
        return rejectWithValue(error.response.data?.message)

      return rejectWithValue(error.message)
    }
  }
)
