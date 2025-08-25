import type { Grants } from '@/interfaces/grants.interface'
import { getErrorMessageAxios } from '@/utils/axios.helper'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'localhost:3000'

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const getAllRoles = createAsyncThunk(
  'roles/getAll',
  async (
    { page = 1, limit = 20 }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/roles?page=${page}&limit=${limit}`,
        config
      )
      return response.data
    } catch (err) {
      return rejectWithValue(getErrorMessageAxios(err))
    }
  }
)

export const getRole = createAsyncThunk(
  'roles/getRole',
  async (role: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/roles/${role}`, config)
      return response.data
    } catch (err) {
      return rejectWithValue(getErrorMessageAxios(err))
    }
  }
)

export const updatePermissionRole = createAsyncThunk(
  'roles/updatePermission',
  async (
    { id, permission }: { id: string; permission: Grants[] },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/roles/${id}`,
        { grants: permission },
        config
      )
      return response.data
    } catch (err) {
      return rejectWithValue(getErrorMessageAxios(err))
    }
  }
)
