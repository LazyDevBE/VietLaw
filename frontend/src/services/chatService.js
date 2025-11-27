import api from './api';

export const chatService = {
  // Gửi tin nhắn
  sendMessage: async (content, sessionId = null) => {
    try {
      const response = await api.post('/chat/send', {
        content,
        sessionId
      });
      return response.data.data; // Backend trả về ApiResponse với data bên trong
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi gửi tin nhắn');
    }
  },

  // Lấy danh sách chat của user
  getUserChats: async () => {
    try {
      const response = await api.get('/chat/sessions');
      return response.data.data || []; // Backend trả về ApiResponse với data bên trong
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi lấy danh sách chat');
    }
  },

  // Lấy tin nhắn của chat
  getChatMessages: async (sessionId) => {
    try {
      const response = await api.get(`/chat/sessions/${sessionId}`);
      return response.data.data.messages || []; // Backend trả về ApiResponse với data bên trong
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi lấy tin nhắn');
    }
  },

  // Lấy danh sách session (alias cho getUserChats)
  getSessions: async () => {
    try {
      const response = await api.get('/chat/sessions');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi lấy danh sách session');
    }
  },

  // Lấy chi tiết session với tin nhắn
  getSession: async (sessionId) => {
    try {
      const response = await api.get(`/chat/sessions/${sessionId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi lấy session');
    }
  },

  // Tạo session mới
  createSession: async (title) => {
    try {
      const response = await api.post('/chat/sessions', { title });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi tạo session');
    }
  },

  // Xóa session
  deleteSession: async (sessionId) => {
    try {
      const response = await api.delete(`/chat/sessions/${sessionId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi xóa session');
    }
  },

  // Cập nhật tiêu đề session
  updateSessionTitle: async (sessionId, title) => {
    try {
      const response = await api.put(`/chat/sessions/${sessionId}/title`, { title });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi cập nhật tiêu đề');
    }
  },

  // Tìm kiếm session
  searchSessions: async (keyword) => {
    try {
      const response = await api.get('/chat/sessions/search', {
        params: { keyword }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi tìm kiếm');
    }
  }
};