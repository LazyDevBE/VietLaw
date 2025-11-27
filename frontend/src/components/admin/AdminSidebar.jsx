import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSidebar } from '../../store/adminSlice'

function AdminSidebar({ activeTab, setActiveTab }) {
  const { preferences } = useSelector((state) => state.admin)
  const dispatch = useDispatch()
  const [expandedSections, setExpandedSections] = useState({
    management: true,
    system: false,
    reports: false,
    settings: false
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const menuSections = [
    {
      id: 'management',
      title: 'Quản Lý',
      icon: '👥',
      items: [
        { id: 'dashboard', name: 'Tổng Quan', icon: '📊', badge: null },
        { id: 'users', name: 'Người Dùng', icon: '👤', badge: '1,250' },
        { id: 'chats', name: 'Lịch Sử Chat', icon: '💬', badge: '8.4K' },
        { id: 'sources', name: 'Nguồn Thông Tin', icon: '📚', badge: '156' }
      ]
    },
    {
      id: 'system',
      title: 'Hệ Thống',
      icon: '⚙️',
      items: [
        { id: 'analytics', name: 'Phân Tích', icon: '📈', badge: null },
        { id: 'logs', name: 'Nhật Ký', icon: '📋', badge: 'new' },
        { id: 'backup', name: 'Sao Lưu', icon: '💾', badge: null },
        { id: 'security', name: 'Bảo Mật', icon: '🔒', badge: null }
      ]
    },
    {
      id: 'reports',
      title: 'Báo Cáo',
      icon: '📊',
      items: [
        { id: 'usage-report', name: 'Báo Cáo Sử Dụng', icon: '📋', badge: null },
        { id: 'user-report', name: 'Báo Cáo Người Dùng', icon: '👥', badge: null },
        { id: 'performance', name: 'Hiệu Suất', icon: '⚡', badge: null },
        { id: 'export', name: 'Xuất Dữ Liệu', icon: '📤', badge: null }
      ]
    },
    {
      id: 'settings',
      title: 'Cài Đặt',
      icon: '🔧',
      items: [
        { id: 'general-settings', name: 'Cài Đặt Chung', icon: '⚙️', badge: null },
        { id: 'permissions', name: 'Phân Quyền', icon: '🔐', badge: null },
        { id: 'notifications', name: 'Thông Báo', icon: '🔔', badge: '3' },
        { id: 'maintenance', name: 'Bảo Trì', icon: '🔧', badge: null }
      ]
    }
  ]

  const handleItemClick = (itemId) => {
    setActiveTab(itemId)
  }

  return (
    <div className={`bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ${
      preferences.sidebarCollapsed ? 'w-16' : 'w-72'
    }`}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!preferences.sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Admin Panel</h2>
                <p className="text-xs text-gray-500">Quản trị hệ thống</p>
              </div>
            </div>
          )}
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <svg 
              className={`w-5 h-5 text-gray-600 transition-transform ${
                preferences.sidebarCollapsed ? 'rotate-180' : ''
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="p-4 space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto">
        {menuSections.map((section) => (
          <div key={section.id} className="mb-4">
            {/* Section Header */}
            {!preferences.sidebarCollapsed && (
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition"
              >
                <div className="flex items-center gap-2">
                  <span>{section.icon}</span>
                  <span>{section.title}</span>
                </div>
                <svg 
                  className={`w-4 h-4 transition-transform ${
                    expandedSections[section.id] ? 'rotate-90' : ''
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Section Items */}
            <AnimatePresence>
              {(expandedSections[section.id] || preferences.sidebarCollapsed) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1 mt-2"
                >
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition group ${
                        activeTab === item.id
                          ? 'bg-blue-100 text-blue-700 font-semibold shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                      }`}
                      title={preferences.sidebarCollapsed ? item.name : ''}
                    >
                      <span className="text-lg flex-shrink-0">{item.icon}</span>
                      {!preferences.sidebarCollapsed && (
                        <>
                          <span className="flex-1">{item.name}</span>
                          {item.badge && (
                            <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                              item.badge === 'new' 
                                ? 'bg-green-100 text-green-700'
                                : activeTab === item.id
                                ? 'bg-blue-200 text-blue-800'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      {!preferences.sidebarCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Cần hỗ trợ?</p>
              <p className="text-xs text-gray-600">Liên hệ IT Support</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminSidebar