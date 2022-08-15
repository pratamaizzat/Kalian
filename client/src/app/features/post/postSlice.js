import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import postService from './postService'

const initialState = {
  posts: [],
  post: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

export const getPosts = createAsyncThunk('post/getPosts', async (_, thunkApi) => {
  try {
    return await postService.getPosts()
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response && error.response.data

      return thunkApi.rejectWithValue(message)
    }

    const message = error.message || error.toString()

    return thunkApi.rejectWithValue(message)
  }
})

export const createPost = createAsyncThunk('post/createPost', async (dto, thunkApi) => {
  try {
    return await postService.createPost(dto)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response && error.response.data

      return thunkApi.rejectWithValue(message)
    }

    const message = error.message || error.toString()

    return thunkApi.rejectWithValue(message)
  }
})

const postSlice = createSlice({
  name: 'post',
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
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = action.payload
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload || ''
      })

      .addCase(createPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = [action.payload, ...state.posts]
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload || ''
      })
  },
})

export const { reset: resetPost } = postSlice.actions
export default postSlice.reducer
