import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { authService } from '../services/authService'

function UserSettingsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  // Profile settings
  const [displayName, setDisplayName] = useState('')
  

  
  // Password change
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const user = authService.getCurrentUser()

  useEffect(() => {
    if (isOpen) {
      // Load current user's display name - prioritize user data from database
      const currentDisplayName = user?.fullName || user?.username || localStorage.getItem('userDisplayName') || ''
      setDisplayName(currentDisplayName)
      setMessage({ type: '', text: '' })
    }
  }, [isOpen])

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  const handleSaveProfile = async () => {
    try {
      setLoading(true)
      
      // Update profile in database via API
      await authService.updateProfile({
        fullName: displayName,
        username: displayName // Also update username
      })
      
      // Also save to localStorage for immediate UI update
      localStorage.setItem('userDisplayName', displayName)
      
      showMessage('success', 'Thông tin đã được lưu thành công!')
      
      // Trigger navbar update by dispatching a custom event
      window.dispatchEvent(new CustomEvent('userDisplayNameChanged'))
    } catch (error) {
      console.error('Error saving profile:', error)
      showMessage('error', 'Lỗi khi lưu thông tin: ' + error.message)
    } finally {
      setLoading(false)
    }
  }



  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage('error', 'Mật khẩu xác nhận không khớp!')
      return
    }

    if (passwordData.newPassword.length < 6) {
      showMessage('error', 'Mật khẩu mới phải có ít nhất 6 ký tự!')
      return
    }

    try {
      setLoading(true)
      
      await authService.changePassword(passwordData.currentPassword, passwordData.newPassword)
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      
      showMessage('success', 'Đổi mật khẩu thành công!')
    } catch (error) {
      console.error('Password change error:', error)
      showMessage('error', 'Lỗi khi đổi mật khẩu: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'profile', name: 'Thông Tin', icon: '👤' },
    { id: 'password', name: 'Mật Khẩu', icon: '🔒' }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Cài Đặt Tài Khoản</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Message */}
          {message.text && (
            <div className={`mx-6 mt-4 p-3 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          <div className="flex">
            {/* Sidebar */}
            <div className="w-48 bg-gray-50 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition ${
                      activeTab === tab.id
                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto max-h-[60vh]">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông Tin Cá Nhân</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tên hiển thị
                        </label>
                        
                        {/* Display Name Input - Using controlled approach like simple modal */}
                        <input
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Nhập tên hiển thị của bạn"
                          autoComplete="off"
                          spellCheck="false"
                        />

                        <div className="text-xs text-gray-500 mt-1">
                          Nhập tên hiển thị mới và click "Lưu thay đổi"
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={user?.email || ''}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Email không thể thay đổi</p>
                      </div>
                    </div>

                    <button
                      onClick={handleSaveProfile}
                      disabled={loading}
                      className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"
                    >
                      {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'password' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Đổi Mật Khẩu</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mật khẩu hiện tại
                        </label>
                        <input
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Nhập mật khẩu hiện tại"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mật khẩu mới
                        </label>
                        <input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Xác nhận mật khẩu mới
                        </label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Nhập lại mật khẩu mới"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleChangePassword}
                      disabled={loading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                      className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 transition"
                    >
                      {loading ? 'Đang đổi...' : 'Đổi mật khẩu'}
                    </button>
                  </div>
                </div>
              )}


            </div>
          </div>
      </motion.div>
    </div>
  )
}

export default UserSettingsModal