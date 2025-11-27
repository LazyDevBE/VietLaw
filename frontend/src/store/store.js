import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import chatReducer from './chatSlice'
import adminReducer from './adminSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    admin: adminReducer
  }
})
