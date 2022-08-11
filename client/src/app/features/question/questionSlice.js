import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import questionService from './questionService'

const initialState = {
  questions: [],
  question: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

export const getQuestions = createAsyncThunk('question/getQuestions', async (_, thunkApi) => {
  try {
    return await questionService.getQuestions()
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response && error.response.data

      return thunkApi.rejectWithValue(message)
    }

    const message = error.message || error.toString()

    return thunkApi.rejectWithValue(message)
  }
})

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false
      state.isError = false
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.questions = action.payload
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload || ''
      })
  },
})

export const { reset: resetQuestion } = questionSlice.actions
export default questionSlice.reducer
