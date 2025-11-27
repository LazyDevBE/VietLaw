import api from './api'
import { STORAGE_KEYS, USER_ROLES } from '../constants'

export const authService = {
  // Đăng nhập
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.success) {
        const { token, ...userData } = response.data.data;
        
        // Clear tất cả dữ liệu cũ trước khi set dữ liệu mới
        localStorage.clear();
        
        localStorage.setItem(STORAGE_KEYS.TOKEN, token)
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData))
        
        // Dispatch event để các component biết user đã thay đổi
        window.dispatchEvent(new CustomEvent('userChanged', { detail: userData }));
        
        return response.data;
      }
      throw new Error(response.data.message);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Đăng nhập thất bại');
    }
  },

  // Đăng ký
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.success) {
        const { token, ...userInfo } = response.data.data;
        
        // Clear tất cả dữ liệu cũ trước khi set dữ liệu mới
        localStorage.clear();
        
        localStorage.setItem(STORAGE_KEYS.TOKEN, token)
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userInfo))
        
        // Dispatch event để các component biết user đã thay đổi
        window.dispatchEvent(new CustomEvent('userChanged', { detail: userInfo }));
        
        return response.data;
      }
      throw new Error(response.data.message);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Đăng ký thất bại');
    }
  },

  // Đăng xuất
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear tất cả dữ liệu user
      localStorage.clear();
      
      // Dispatch event để các component biết user đã logout
      window.dispatchEvent(new CustomEvent('userLoggedOut'));
    }
  },

  // Kiểm tra trạng thái đăng nhập
  isAuthenticated: () => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
    const user = localStorage.getItem(STORAGE_KEYS.USER)
    return !!(token && user)
  },

  // Lấy thông tin user hiện tại
  getCurrentUser: () => {
    const user = localStorage.getItem(STORAGE_KEYS.USER)
    return user ? JSON.parse(user) : null
  },

  // Lấy token
  getToken: () => {
    return localStorage.getItem(STORAGE_KEYS.TOKEN)
  },

  // Kiểm tra quyền admin
  isAdmin: () => {
    const user = authService.getCurrentUser();
    if (!user) return false;
    
    // Kiểm tra nhiều cách khác nhau
    // 1. Kiểm tra roles array (từ backend)
    if (user.roles && Array.isArray(user.roles)) {
      return user.roles.includes(USER_ROLES.ADMIN)
    }
    
    // 2. Kiểm tra roles object array
    if (user.roles && user.roles.some) {
      return user.roles.some(role => role === USER_ROLES.ADMIN || role.name === USER_ROLES.ADMIN)
    }
    
    // 3. Kiểm tra role đơn lẻ
    if (user.role === USER_ROLES.ADMIN) {
      return true
    }
    
    // 4. Kiểm tra email admin (fallback)
    if (user.email && user.email.includes('admin')) {
      return true
    }
    
    return false;
  },

  // Đổi mật khẩu
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.post('/auth/change-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Đổi mật khẩu thất bại');
    }
  },

  // Cập nhật thông tin người dùng
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      if (response.data.success) {
        // Cập nhật localStorage
        const currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || '{}')
        const updatedUser = { ...currentUser, ...response.data.data }
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser))
        return response.data;
      }
      throw new Error(response.data.message);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Cập nhật thông tin thất bại');
    }
  }
};