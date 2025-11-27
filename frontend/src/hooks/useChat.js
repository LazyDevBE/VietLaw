import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatService } from '../services/chatService'
import { authService } from '../services/authService'
import { notificationService } from '../services/notificationService'
import { setChats, setMessages, setCurrentChat, clearChatState } from '../store/chatSlice'
import { EVENTS, LAYOUT } from '../constants'

export function useChat() {
  const [loading, setLoading] = useState(false)
  const [currentUserId, setCurrentUserId] = useState(null)
  const dispatch = useDispatch()
  const { currentChatId, chats, messages } = useSelector((state) => state.chat)

  // Initialize user and load chats
  useEffect(() => {
    const user = authService.getCurrentUser()
    const userId = user?.id || user?.userId
    
    // If user changes (login/logout/switch user), clear state and reload
    if (userId !== currentUserId) {
      dispatch(clearChatState())
      setCurrentUserId(userId)
      
      if (userId) {
        loadChats()
      }
    }
  }, [currentUserId, dispatch])

  // Load messages when current chat changes
  useEffect(() => {
    if (currentChatId) {
      loadMessages(currentChatId)
    }
  }, [currentChatId])

  // Listen for user change events
  useEffect(() => {
    const handleUserChanged = (event) => {
      const newUserId = event.detail?.id || event.detail?.userId
      if (newUserId !== currentUserId) {
        dispatch(clearChatState())
        setCurrentUserId(newUserId)
        // Load chats after a short delay to ensure token is set
        setTimeout(() => {
          loadChats()
        }, LAYOUT.CHAT_INPUT_DELAY)
      }
    }

    const handleUserLoggedOut = () => {
      dispatch(clearChatState())
      setCurrentUserId(null)
    }

    window.addEventListener(EVENTS.USER_CHANGED, handleUserChanged)
    window.addEventListener(EVENTS.USER_LOGGED_OUT, handleUserLoggedOut)
    
    return () => {
      window.removeEventListener(EVENTS.USER_CHANGED, handleUserChanged)
      window.removeEventListener(EVENTS.USER_LOGGED_OUT, handleUserLoggedOut)
    }
  }, [currentUserId, dispatch])

  // Check for user changes on each render
  useEffect(() => {
    const user = authService.getCurrentUser()
    const userId = user?.id || user?.userId
    
    if (userId && userId !== currentUserId) {
      setCurrentUserId(userId)
    }
  })

  const loadChats = async () => {
    try {
      const data = await chatService.getUserChats()
      dispatch(setChats(data))
    } catch (err) {
      console.error('Failed to load chats', err)
      notificationService.error('Không thể tải danh sách cuộc trò chuyện')
    }
  }

  const loadMessages = async (chatId) => {
    try {
      const data = await chatService.getChatMessages(chatId)
      dispatch(setMessages(data))
    } catch (err) {
      console.error('Failed to load messages', err)
      notificationService.error('Không thể tải tin nhắn')
    }
  }

  const sendMessage = async (input) => {
    if (!input.trim()) return

    setLoading(true)
    try {
      const response = await chatService.sendMessage(input, currentChatId)
      
      // If it's a new session or no current chat, set current chat
      if (response.sessionId && (!currentChatId || response.isNewSession)) {
        dispatch(setCurrentChat(response.sessionId))
      }
      
      // Add messages to current messages
      const newMessages = [
        ...messages,
        { 
          role: 'user', 
          content: response.userMessage.content,
          timestamp: response.userMessage.createdAt 
        },
        { 
          role: 'assistant', 
          content: response.aiResponse.content,
          timestamp: response.aiResponse.createdAt 
        }
      ]
      dispatch(setMessages(newMessages))
      
      loadChats() // Reload chat list
    } catch (err) {
      console.error('Failed to send message:', err)
      throw new Error(err.response?.data?.message || 'Lỗi khi gửi tin nhắn')
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    currentChatId,
    chats,
    messages,
    sendMessage,
    loadChats,
    loadMessages
  }
}