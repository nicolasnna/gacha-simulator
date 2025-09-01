import type { LoginUserApi, RegisterUserApi } from '@/interfaces/auth.interface'
import { getErrorMessageAxios } from '@/utils/axios.helper'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'localhost:3000'

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterUserApi, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/register`,
        userData
      )
      setTimeout(() => {
        dispatch(getPermissions())
      }, 0)
      return response.data
    } catch (error) {
      return rejectWithValue(getErrorMessageAxios(error))
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData: LoginUserApi, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, userData)
      setTimeout(() => {
        dispatch(getPermissions())
      }, 0)
      return response.data
    } catch (error) {
      return rejectWithValue(getErrorMessageAxios(error))
    }
  }
)

export const getPermissions = createAsyncThunk(
  'auth/getPermissions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/roles/me`)
      return response.data
    } catch (err) {
      return rejectWithValue(getErrorMessageAxios(err))
    }
  }
)
