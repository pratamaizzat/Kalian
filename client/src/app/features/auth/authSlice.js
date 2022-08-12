import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import authService from './authService'

let user = null

if (typeof window !== 'undefined') {
  user = JSON.parse(localStorage.getItem('user_guest') || 'null')
}

const initialState = {
  user: user || null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

export const signin = createAsyncThunk('auth/signin', async (dto, thunkApi) => {
  try {
    return await authService.signin(dto)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response && error.response.data

      return thunkApi.rejectWithValue(message)
    }

    const message = error.message || error.toString()

    return thunkApi.rejectWithValue(message)
  }
})

const authSLice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false
      state.isError = false
      state.isLoading = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload || ''
      })
  },
})

export const { reset: resetAuth } = authSLice.actions
export default authSLice.reducer
