import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { updateLanguage, updateContrast, updateUsername } from '../../store/adminSlice'

function SettingsModal({ isOpen, onClose }) {
  const { settings } = useSelector((state) => state.admin)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  
  const [showUsernameEdit, setShowUsernameEdit] = useState(false)
  const [tempUsername, setTempUsername] = useState(settings.username || user?.name || 'Admin')
  const [tempLanguage, setTempLanguage] = useState(settings.language || 'vi')
  const [tempContrast, setTempContrast] = useState(settings.contrast || 'light')

  // Reset temp values when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempUsername(settings.username || user?.name || 'Admin')
      setTempLanguage(settings.language || 'vi')
      setTempContrast(settings.contrast || 'light')
      setShowUsernameEdit(false)
    }
  }, [isOpen, settings, user])

  const handleSaveSettings = () => {
    dispatch(updateUsername(tempUsername))
    dispatch(updateLanguage(tempLanguage))
    dispatch(updateContrast(tempContrast))
    
    // Apply theme only to chat containers
    const chatContainers = document.querySelectorAll('.chat-themed')
    chatContainers.forEach(container => {
      container.setAttribute('data-theme', tempContrast)
    })
    
    onClose()
  }

  const handleCancel = () => {
    setTempUsername(settings.username || user?.name || 'Admin')
    setTempLanguage(settings.language || 'vi')
    setTempContrast(settings.contrast || 'light')
    setShowUsernameEdit(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Cài Đặt Admin</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Username Setting */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên Hiển Thị
              </label>
              {showUsernameEdit ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập tên hiển thị..."
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowUsernameEdit(false)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                    >
                      Xác nhận
                    </button>
                    <button
                      onClick={() => {
                        setShowUsernameEdit(false)
                        setTempUsername(settings.username || user?.name || 'Admin')
                      }}
                      className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400 transition"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-800">{tempUsername}</span>
                  <button
                    onClick={() => setShowUsernameEdit(true)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Chỉnh sửa
                  </button>
                </div>
              )}
            </div>

            {/* Language Setting */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngôn Ngữ Giao Diện
              </label>
              <select
                value={tempLanguage}
                onChange={(e) => setTempLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="vi">🇻🇳 Tiếng Việt</option>
                <option value="en">🇺🇸 English</option>
                <option value="zh">🇨🇳 中文</option>
              </select>
            </div>

            {/* Theme Setting */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chế Độ Giao Diện
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { 
                    value: 'light', 
                    label: 'Sáng', 
                    desc: 'Giao diện sáng',
                    icon: '☀️'
                  },
                  { 
                    value: 'dark', 
                    label: 'Tối', 
                    desc: 'Giao diện tối',
                    icon: '🌙'
                  }
                ].map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => setTempContrast(theme.value)}
                    className={`p-4 rounded-lg border-2 transition text-center ${
                      tempContrast === theme.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{theme.icon}</div>
                    <div className="font-medium text-sm">{theme.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{theme.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Xem Trước Giao Diện
              </label>
              <div className={`p-4 rounded-lg border transition-all ${
                tempContrast === 'dark' 
                  ? 'bg-gray-900 text-white border-gray-700' 
                  : 'bg-white text-gray-800 border-gray-300'
              }`}>
                <div className="text-sm font-medium mb-2">VietLaw Admin Panel</div>
                <div className="text-xs opacity-75">
                  Giao diện {tempContrast === 'dark' ? 'tối' : 'sáng'} - Áp dụng cho toàn bộ hệ thống
                </div>
                <div className={`mt-3 p-2 rounded text-xs ${
                  tempContrast === 'dark' 
                    ? 'bg-gray-800 text-gray-300' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  Sidebar, navbar, modal và tất cả components sẽ thay đổi theo
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Hủy
            </button>
            <button
              onClick={handleSaveSettings}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Lưu Cài Đặt
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default SettingsModal