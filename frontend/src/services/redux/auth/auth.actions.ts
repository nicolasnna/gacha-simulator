import type { LoginUserApi, RegisterUserApi } from '@/interfaces/auth.interface'
import { getErrorMessageAxios } from '@/utils/axios.helper'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'localhost:3000'

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterUserApi, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/register`,
        userData
      )
      return response.data
    } catch (error) {
      return rejectWithValue(getErrorMessageAxios(error))
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData: LoginUserApi, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, userData)
      return response.data
    } catch (error) {
      return rejectWithValue(getErrorMessageAxios(error))
    }
  }
)
