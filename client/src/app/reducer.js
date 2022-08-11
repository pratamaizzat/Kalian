import { combineReducers } from '@reduxjs/toolkit'
import questionReducer from './features/question/questionSlice'

const rootReducer = combineReducers({
  question: questionReducer,
})

export default rootReducer
