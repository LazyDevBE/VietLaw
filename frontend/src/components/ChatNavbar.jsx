import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { authService } from '../services/authService'
import { clearChatState } from '../store/chatSlice'
import Logo from './Logo'
import UserAvatar from './UserAvatar'
import UserSettingsModal from './UserSettingsModal'

function ChatNavbar() {
  const user = authService.getCurrentUser()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [displayNameUpdate, setDisplayNameUpdate] = useState(0) // Force re-render

  const handleLogout = async () => {
    try {
      // Clear Redux store trước khi logout
      dispatch(clearChatState())
      await authService.logout()
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
      // Vẫn clear Redux store và navigate ngay cả khi có lỗi
      dispatch(clearChatState())
      navigate('/')
    }
  }

  const displayName = useMemo(() => {
    // Kiểm tra localStorage trước (cho trường hợp user đã custom tên)
    const savedName = localStorage.getItem('userDisplayName')
    if (savedName && savedName.trim()) {
      return savedName
    }
    
    // Sau đó mới dùng thông tin từ database
    if (user?.fullName && user.fullName.trim()) {
      return user.fullName
    }
    if (user?.username && user.username !== user.email && user.username.trim()) {
      return user.username
    }
    
    // Cuối cùng fallback
    if (user?.email) {
      return user.email.split('@')[0]
    }
    
    return 'User'
  }, [user, displayNameUpdate])

  const handleOpenSettings = () => {
    setSettingsModalOpen(true)
    setDropdownOpen(false)
  }

  // Apply user chat theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('userChatTheme') || 'light'
    const chatContainers = document.querySelectorAll('.chat-themed')
    chatContainers.forEach(container => {
      container.setAttribute('data-theme', savedTheme)
    })
  }, [])

  // Listen for display name changes
  useEffect(() => {
    const handleDisplayNameChange = () => {
      setDisplayNameUpdate(prev => prev + 1)
    }
    
    window.addEventListener('userDisplayNameChanged', handleDisplayNameChange)
    return () => window.removeEventListener('userDisplayNameChanged', handleDisplayNameChange)
  }, [])



  // Check if user is admin
  const isAdmin = authService.isAdmin()

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo và Title */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <Logo className="w-8 h-8 transition-transform group-hover:scale-105" />
              <span className="text-xl font-bold text-gray-800">VietLaw</span>
            </Link>
            <div className="hidden md:block w-px h-6 bg-gray-300"></div>
            <div className="hidden md:flex items-center gap-2">
              <h1 className="text-lg font-semibold text-gray-700">
                Trợ Lý Pháp Lý AI
              </h1>
              <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Online
              </div>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {/* Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-50 transition font-medium text-sm"
              >
                Trang Chủ
              </Link>
              <Link
                to="/chat"
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-50 transition font-medium text-sm"
              >
                Chat AI
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-50 transition font-medium text-sm"
              >
                Giới Thiệu
              </Link>
              <Link
                to="/pricing"
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-50 transition font-medium text-sm"
              >
                Bảng Giá
              </Link>
            </div>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition group"
              >
                {/* Avatar */}
                <UserAvatar size="md" />
                
                {/* User Info */}
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-800 leading-tight">
                    {displayName}
                  </p>
                  <p className="text-xs text-gray-500 leading-tight">
                    {user?.email}
                  </p>
                </div>

                {/* Dropdown Arrow */}
                <svg 
                  className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                  >
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <UserAvatar size="lg" />
                        <div>
                          <p className="font-semibold text-gray-800">{displayName}</p>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {/* Settings */}
                      <button
                        onClick={handleOpenSettings}
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition w-full text-left"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Cài Đặt
                      </button>

                      {/* Admin Link */}
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-red-700 hover:bg-red-50 transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Quản Trị
                        </Link>
                      )}

                      {/* Mobile Navigation Links */}
                      <div className="lg:hidden border-t border-gray-100 mt-2 pt-2">
                        <Link
                          to="/"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          Trang Chủ
                        </Link>

                        <Link
                          to="/chat"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                          Chat AI
                        </Link>


                        <Link
                          to="/about"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Giới Thiệu
                        </Link>

                        <Link
                          to="/pricing"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          Bảng Giá
                        </Link>
                      </div>

                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition w-full text-left"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Đăng Xuất
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {dropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setDropdownOpen(false)}
        />
      )}

      {/* Keyboard support */}
      {dropdownOpen && (
        <div
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setDropdownOpen(false)
            }
          }}
          className="sr-only"
          tabIndex={0}
          autoFocus
        />
      )}

      {/* User Settings Modal */}
      <UserSettingsModal 
        isOpen={settingsModalOpen} 
        onClose={() => setSettingsModalOpen(false)} 
      />
    </nav>
  )
}

export default ChatNavbar