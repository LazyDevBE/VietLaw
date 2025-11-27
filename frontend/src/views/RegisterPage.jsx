import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { authService } from '../services/authService'
import Navbar from '../components/Navbar'
import FloatingLabelInput from '../components/FloatingLabelInput'
import EmailInput from '../components/EmailInput'
import PhoneInput from '../components/PhoneInput'

function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailValidation, setEmailValidation] = useState({ isValid: true })
  const [phoneValidation, setPhoneValidation] = useState({ isValid: true })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Kiểm tra validation trước khi submit
    if (!emailValidation.isValid) {
      setError('Vui lòng nhập email hợp lệ')
      return
    }

    if (!phoneValidation.isValid) {
      setError('Vui lòng nhập số điện thoại hợp lệ')
      return
    }

    setLoading(true)

    try {
      const response = await authService.register({
        fullName,
        email,
        password,
        phoneNumber
      })
      if (response.success) {
        navigate('/chat')
      }
    } catch (err) {
      setError(err.message || 'Đăng ký thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <Navbar />
      
      <div className="flex items-center justify-center py-12 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Left Side - Form */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 lg:p-12 order-2 md:order-1 flex flex-col justify-center"
          >
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Đăng Ký Tài Khoản</h2>
              <p className="text-gray-600">Tạo tài khoản để bắt đầu sử dụng</p>
            </div>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6">
                <p className="font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <FloatingLabelInput
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                label="Họ và tên"
                required
              />

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
                label="Mật khẩu (tối thiểu 6 ký tự)"
                minLength={6}
                required
              />

              <PhoneInput
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onValidation={setPhoneValidation}
                label="Số điện thoại"
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
                    Đang đăng ký...
                  </div>
                ) : (
                  'Đăng Ký Ngay'
                )}
              </button>
            </form>

            <div className="mt-6 text-center space-y-3">
              <p className="text-gray-600 text-sm">
                Đã có tài khoản?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Đăng nhập
                </Link>
              </p>
              <Link to="/" className="text-gray-500 hover:text-gray-700 block text-sm">
                ← Quay về trang chủ
              </Link>
            </div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block bg-gradient-to-br from-indigo-600 to-blue-700 p-12 text-white order-1 md:order-2"
          >
            <div className="h-full flex flex-col justify-center">
              <h2 className="text-4xl font-bold mb-6">Tham Gia Cùng Chúng Tôi!</h2>
              <p className="text-blue-100 text-lg mb-8">
                Trải nghiệm dịch vụ tư vấn pháp lý AI miễn phí ngay hôm nay
              </p>
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&h=400&fit=crop" 
                alt="Register illustration" 
                className="rounded-xl shadow-lg"
              />
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</div>
                  <span>Miễn phí 100%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</div>
                  <span>Không cần thẻ tín dụng</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</div>
                  <span>Truy cập ngay lập tức</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default RegisterPage
