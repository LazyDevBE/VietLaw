import api from './api'

export const adminService = {
  // Lấy thống kê dashboard
  getDashboardStats: async () => {
    try {
      const response = await api.get('/admin/dashboard')
      return response.data.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi lấy thống kê dashboard')
    }
  },

  // Lấy danh sách users
  getUsers: async (page = 0, size = 10, search = '') => {
    try {
      const params = { page, size }
      if (search) params.search = search
      
      const response = await api.get('/admin/users', { params })
      
      return response.data.data
    } catch (error) {
      console.error('AdminService.getUsers - Error:', error)
      throw new Error(error.response?.data?.message || 'Lỗi khi lấy danh sách người dùng')
    }
  },

  // Lấy chi tiết user
  getUserDetail: async (userId) => {
    try {
      const response = await api.get(`/admin/users/${userId}`)
      return response.data.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi lấy thông tin người dùng')
    }
  },

  // Cập nhật trạng thái user
  updateUserStatus: async (userId, isActive) => {
    try {
      const response = await api.put(`/admin/users/${userId}/status`, { isActive })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi cập nhật trạng thái người dùng')
    }
  },

  // Cập nhật thông tin user
  updateUser: async (userId, userData) => {
    try {
      const response = await api.put(`/admin/users/${userId}`, userData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi cập nhật thông tin người dùng')
    }
  },

  // Lấy lịch sử chat
  getChatHistory: async (page = 0, size = 10, userId = null, search = '') => {
    try {
      const params = { page, size }
      if (userId) params.userId = userId
      if (search) params.search = search
      
      const response = await api.get('/admin/chat-history', { params })
      return response.data.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi lấy lịch sử chat')
    }
  },

  // Lấy analytics
  getAnalytics: async (days = 30) => {
    try {
      const response = await api.get('/admin/analytics', { params: { days } })
      return response.data.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi lấy phân tích')
    }
  },

  // Xóa chat session
  deleteChatSession: async (sessionId) => {
    try {
      const response = await api.delete(`/admin/chat-sessions/${sessionId}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi xóa phiên chat')
    }
  }
}