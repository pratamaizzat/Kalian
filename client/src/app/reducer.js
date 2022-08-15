import { combineReducers } from '@reduxjs/toolkit'
import questionReducer from './features/question/questionSlice'
import authReducer from './features/auth/authSlice'
import postReducer from './features/post/postSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  question: questionReducer,
  post: postReducer,
})

export default rootReducer
