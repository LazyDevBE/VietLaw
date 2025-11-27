import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  settings: {
    language: localStorage.getItem('adminLanguage') || 'vi',
    contrast: localStorage.getItem('adminContrast') || 'light',
    username: localStorage.getItem('adminUsername') || ''
  },
  preferences: {
    sidebarCollapsed: localStorage.getItem('adminSidebarCollapsed') === 'true',
    theme: localStorage.getItem('adminTheme') || 'light',
    notifications: localStorage.getItem('adminNotifications') !== 'false'
  }
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    updateLanguage: (state, action) => {
      state.settings.language = action.payload
      localStorage.setItem('adminLanguage', action.payload)
    },
    updateContrast: (state, action) => {
      state.settings.contrast = action.payload
      localStorage.setItem('adminContrast', action.payload)
      // Apply theme only to chat containers
      const chatContainers = document.querySelectorAll('.chat-themed')
      chatContainers.forEach(container => {
        container.setAttribute('data-theme', action.payload)
      })
    },
    updateUsername: (state, action) => {
      state.settings.username = action.payload
      localStorage.setItem('adminUsername', action.payload)
    },
    toggleSidebar: (state) => {
      state.preferences.sidebarCollapsed = !state.preferences.sidebarCollapsed
      localStorage.setItem('adminSidebarCollapsed', state.preferences.sidebarCollapsed.toString())
    },
    updateTheme: (state, action) => {
      state.preferences.theme = action.payload
      localStorage.setItem('adminTheme', action.payload)
    },
    toggleNotifications: (state) => {
      state.preferences.notifications = !state.preferences.notifications
      localStorage.setItem('adminNotifications', state.preferences.notifications.toString())
    },
    resetSettings: (state) => {
      state.settings = {
        language: 'vi',
        contrast: 'light',
        username: ''
      }
      state.preferences = {
        sidebarCollapsed: false,
        theme: 'light',
        notifications: true
      }
      // Clear localStorage
      localStorage.removeItem('adminLanguage')
      localStorage.removeItem('adminContrast')
      localStorage.removeItem('adminUsername')
      localStorage.removeItem('adminSidebarCollapsed')
      localStorage.removeItem('adminTheme')
      localStorage.removeItem('adminNotifications')
      // Reset chat theme attributes
      const chatContainers = document.querySelectorAll('.chat-themed')
      chatContainers.forEach(container => {
        container.setAttribute('data-theme', 'light')
      })
    }
  }
})

export const {
  updateLanguage,
  updateContrast,
  updateUsername,
  toggleSidebar,
  updateTheme,
  toggleNotifications,
  resetSettings
} = adminSlice.actions

export default adminSlice.reducer