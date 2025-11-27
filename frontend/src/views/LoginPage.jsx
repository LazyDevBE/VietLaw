import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { authService } from '../services/authService'
import Navbar from '../components/Navbar'
import FloatingLabelInput from '../components/FloatingLabelInput'
import EmailInput from '../components/EmailInput'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailValidation, setEmailValidation] = useState({ isValid: true })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Kiểm tra email validation trước khi submit
    if (!emailValidation.isValid) {
      setError('Vui lòng nhập email hợp lệ')
      return
    }

    setLoading(true)

    try {
      const response = await authService.login({ email, password })
      if (response.success) {
        navigate('/chat')
      }
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      
      <div className="flex items-center justify-center py-12 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Left Side - Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-white"
          >
            <div className="h-full flex flex-col justify-center">
              <h2 className="text-4xl font-bold mb-6">Chào Mừng Trở Lại!</h2>
              <p className="text-blue-100 text-lg mb-8">
                Đăng nhập để tiếp tục sử dụng trợ lý pháp lý AI của bạn
              </p>
              <img 
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&h=400&fit=crop" 
                alt="Login illustration" 
                className="rounded-xl shadow-lg"
              />
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-12"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Đăng Nhập</h2>
              <p className="text-gray-600">Nhập thông tin để truy cập tài khoản</p>
            </div>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6">
                <p className="font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <EmailInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onValidation={setEmailValidation}
                label="Email"
                required
              />

              <FloatingLabelInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Mật Khẩu"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Đang đăng nhập...
                  </div>
                ) : (
                  'Đăng Nhập'
                )}
              </button>
            </form>

            <div className="mt-8 text-center space-y-4">
              <p className="text-gray-600">
                Chưa có tài khoản?{' '}
                <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Đăng ký ngay
                </Link>
              </p>
              <Link to="/" className="text-gray-500 hover:text-gray-700 block text-sm">
                ← Quay về trang chủ
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage
