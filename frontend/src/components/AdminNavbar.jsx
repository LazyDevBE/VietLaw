import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { authService } from '../services/authService'
import Logo from './Logo'
import UserAvatar from './UserAvatar'

function AdminNavbar() {
  const user = authService.getCurrentUser()
  const settings = { contrast: 'light' } // Default settings
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // Apply theme setting only to chat containers
  useEffect(() => {
    const theme = settings.contrast || 'light'
    const chatContainers = document.querySelectorAll('.chat-themed')
    chatContainers.forEach(container => {
      container.setAttribute('data-theme', theme)
    })
  }, [settings.contrast])

  const handleLogout = async () => {
    try {
      await authService.logout()
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
      navigate('/')
    }
  }

  const getUserDisplayName = () => {
    if (user?.fullName) return user.fullName
    if (user?.name) return user.name
    if (user?.email) return user.email.split('@')[0]
    return 'Admin'
  }

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
                Quản Trị Hệ Thống
              </h1>
              <div className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                Admin
              </div>
            </div>
          </div>

          {/* Admin Menu */}
          <div className="flex items-center gap-4">

            {/* Admin Dropdown */}
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
                    {getUserDisplayName()}
                  </p>
                  <p className="text-xs text-red-600 leading-tight font-medium">
                    Quản Trị Viên
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
                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                  >
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <UserAvatar size="lg" />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{getUserDisplayName()}</p>
                          <p className="text-sm text-red-600 font-medium">Quản Trị Viên</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {/* Back to Chat */}
                      <Link
                        to="/chat"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Về Chat
                      </Link>

                      {/* Logout */}
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


    </nav>
  )
}

export default AdminNavbar