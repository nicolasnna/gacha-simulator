import type { LoginUserApi, RegisterUserApi } from '@/interfaces/auth.interface'
import { getErrorMessage } from '@/utils/axios.helper'
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
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData: LoginUserApi, { rejectWithValue }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/login`,
        userData,
        config
      )
      return response.data
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)
