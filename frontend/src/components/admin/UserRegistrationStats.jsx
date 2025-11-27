import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { adminService } from '../../services/adminService'

function UserRegistrationStats() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalSessions: 0,
    totalMessages: 0,
    newUsersLast30Days: 0,
    newSessionsLast7Days: 0,
    topActiveUsers: [],
    registrationsByDate: {},
    sessionsByDate: {}
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadDashboardStats()
  }, [])

  const loadDashboardStats = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await adminService.getDashboardStats()
      setStats(data)
    } catch (err) {
      console.error('Failed to load dashboard stats:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Tổng Người Dùng',
      value: stats.totalUsers,
      icon: '👥',
      color: 'bg-indigo-500',
      textColor: 'text-indigo-600',
      description: `${stats.activeUsers} đang hoạt động`
    },
    {
      title: 'Tổng Phiên Chat',
      value: stats.totalSessions,
      icon: '💬',
      color: 'bg-green-500',
      textColor: 'text-green-600',
      description: `${stats.newSessionsLast7Days} trong 7 ngày qua`
    },
    {
      title: 'Tổng Tin Nhắn',
      value: stats.totalMessages,
      icon: '📨',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      description: 'Tất cả tin nhắn'
    },
    {
      title: 'Người Dùng Mới',
      value: stats.newUsersLast30Days,
      icon: '📈',
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      description: 'Trong 30 ngày qua'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thống kê...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Lỗi tải dữ liệu</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadDashboardStats}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Thử lại
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Tổng Quan Hệ Thống</h1>
        <p className="text-gray-600">Thống kê người dùng và hoạt động hệ thống</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                {card.icon}
              </div>
              <div className={`text-2xl font-bold ${card.textColor}`}>
                {card.value.toLocaleString()}
              </div>
            </div>
            <h3 className="text-gray-600 font-medium">{card.title}</h3>
            {card.description && (
              <p className="text-xs text-gray-500 mt-1">{card.description}</p>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Người Dùng Hoạt Động Nhất</h3>
          <div className="space-y-4">
            {stats.topActiveUsers && stats.topActiveUsers.length > 0 ? (
              stats.topActiveUsers.map((user, index) => (
                <div key={user.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-orange-500' : 'bg-indigo-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{user.fullName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">{user.sessionCount}</p>
                    <p className="text-xs text-gray-500">phiên chat</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Chưa có dữ liệu</p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Biểu Đồ Đăng Ký</h3>
            <button
              onClick={loadDashboardStats}
              className="text-indigo-600 hover:text-indigo-700 transition"
              title="Làm mới dữ liệu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Người dùng hoạt động</span>
              <span className="font-bold text-green-600">{stats.activeUsers.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Phiên chat tuần này</span>
              <span className="font-bold text-indigo-600">{stats.newSessionsLast7Days.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Đăng ký 30 ngày</span>
              <span className="font-bold text-purple-600">{stats.newUsersLast30Days.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tổng tin nhắn</span>
              <span className="font-bold text-yellow-600">{stats.totalMessages.toLocaleString()}</span>
            </div>
          </div>
          
          {/* Simple chart representation */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Đăng ký gần đây</h4>
            <div className="space-y-2">
              {Object.entries(stats.registrationsByDate || {})
                .slice(-7)
                .map(([date, count]) => (
                  <div key={date} className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-20">{new Date(date).toLocaleDateString('vi-VN')}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-500 h-2 rounded-full" 
                        style={{ width: `${Math.min((count / Math.max(...Object.values(stats.registrationsByDate || {}))) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-gray-700 w-8">{count}</span>
                  </div>
                ))
              }
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default UserRegistrationStats