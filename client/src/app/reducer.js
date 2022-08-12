import { combineReducers } from '@reduxjs/toolkit'
import questionReducer from './features/question/questionSlice'
import authReducer from './features/auth/authSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  question: questionReducer,
})

export default rootReducer
