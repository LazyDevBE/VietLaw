import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentChatId: null,
  chats: [],
  messages: []
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChatId = action.payload
    },
    setChats: (state, action) => {
      state.chats = action.payload
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    clearChatState: (state) => {
      state.currentChatId = null
      state.chats = []
      state.messages = []
    }
  }
})

export const { setCurrentChat, setChats, setMessages, addMessage, clearChatState } = chatSlice.actions
export default chatSlice.reducer
