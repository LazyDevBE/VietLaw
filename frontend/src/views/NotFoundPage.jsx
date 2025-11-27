import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import Logo from '../components/Logo'

function NotFoundPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleGoHome = () => {
    navigate(isAuthenticated ? '/chat' : '/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex justify-center mb-6">
            <Logo className="w-16 h-16 mx-auto opacity-75" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            VietLaw
          </h1>
        </motion.div>

        {/* 404 Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          {/* 404 Number */}
          <div className="mb-8">
            <h2 className="text-8xl md:text-9xl font-bold text-gray-200 mb-4">
              404
            </h2>
            
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Trang Không Tồn Tại
            </h3>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển. 
              Hãy kiểm tra lại URL hoặc quay về trang chủ.
            </p>
          </div>

          {/* Suggestions */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Có thể bạn đang tìm:
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                to={isAuthenticated ? "/chat" : "/"}
                className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition group"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition">
                    {isAuthenticated ? 'Chat AI' : 'Trang Chủ'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {isAuthenticated ? 'Trò chuyện với AI pháp lý' : 'Khám phá VietLaw'}
                  </p>
                </div>
              </Link>

              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition group"
                >
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800 group-hover:text-green-600 transition">
                      Hồ Sơ
                    </p>
                    <p className="text-sm text-gray-600">
                      Quản lý tài khoản
                    </p>
                  </div>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition group"
                >
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800 group-hover:text-green-600 transition">
                      Đăng Nhập
                    </p>
                    <p className="text-sm text-gray-600">
                      Truy cập tài khoản
                    </p>
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoBack}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Quay Lại
            </button>
            
            <button
              onClick={handleGoHome}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {isAuthenticated ? 'Về Chat' : 'Về Trang Chủ'}
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500 text-sm">
            © 2024 VietLaw. Tất cả quyền được bảo lưu.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFoundPage