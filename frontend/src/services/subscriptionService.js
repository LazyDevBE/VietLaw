import api from './api';

export const subscriptionService = {
  // Lấy thông tin subscription
  getSubscriptionInfo: async () => {
    try {
      const response = await api.get('/subscription/info');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi lấy thông tin subscription');
    }
  },

  // Nâng cấp subscription
  upgradeSubscription: async (plan) => {
    try {
      const response = await api.post(`/subscription/upgrade/${plan}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi nâng cấp subscription');
    }
  }
};