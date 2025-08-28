import { getErrorMessageAxios } from '@/utils/axios.helper'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'localhost:3000'

export const getAllCharacters = createAsyncThunk(
  'characters/getAll',
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/characters?page=${page}&limit=${limit}`
      )
      return response.data
    } catch (err) {
      return rejectWithValue(getErrorMessageAxios(err))
    }
  }
)
