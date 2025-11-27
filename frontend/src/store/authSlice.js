import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: !!localStorage.getItem('accessToken')
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken, email, name, plan } = action.payload
      state.accessToken = accessToken
      state.refreshToken = refreshToken
      state.user = { email, name, plan }
      state.isAuthenticated = true
      
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
      
      localStorage.clear()
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    }
  }
})

export const { setCredentials, logout, updateUser } = authSlice.actions
export default authSlice.reducer
