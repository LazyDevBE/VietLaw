import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { authService } from '../services/authService'
import Navbar from '../components/Navbar'
import FadeInSection from '../components/FadeInSection'

function PricingPage() {
  const user = authService.getCurrentUser()
  const isAuthenticated = authService.isAuthenticated()
  
  // Chỉ có plan khi user đã đăng nhập, mặc định user mới sẽ có plan "FREE"
  const currentPlan = isAuthenticated ? (user?.plan || user?.subscription?.plan || 'FREE') : null
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <FadeInSection className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Bảng Giá Dịch Vụ
          </h2>
          <p className="text-gray-600 text-lg">Chọn gói phù hợp với nhu cầu của bạn</p>
          
          {isAuthenticated && (
            <div className="mt-6 inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg">
              <span className="text-sm font-medium">
                Gói hiện tại: <span className="font-bold">{currentPlan === 'FREE' ? 'Free' : currentPlan === 'PLUS' ? 'Plus' : 'Pro'}</span>
              </span>
            </div>
          )}
        </FadeInSection>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {/* Free Plan */}
          <FadeInSection delay={0.1}>
            <div className={`bg-white rounded-2xl shadow-lg p-6 border-2 transition flex flex-col h-full ${
              isAuthenticated && currentPlan === 'FREE' 
                ? 'border-green-500 ring-2 ring-green-200' 
                : 'border-gray-100 hover:border-indigo-200'
            }`}>
            <div className="text-center mb-4">
              {isAuthenticated && currentPlan === 'FREE' ? (
                <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold mb-3">
                  ĐANG SỬ DỤNG
                </div>
              ) : (
                <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold mb-3">
                  MIỄN PHÍ
                </div>
              )}
              <h2 className="text-2xl font-bold mb-2">Free</h2>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold">0đ</span>
                <span className="text-gray-500 text-sm">/tháng</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Dùng thử miễn phí</p>
            </div>
            
            <div className="mb-6 p-6 bg-indigo-50 rounded-xl text-center flex-grow flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-indigo-600 mb-2">30</div>
              <div className="text-sm text-gray-600">câu hỏi/tháng</div>
            </div>
            
            {isAuthenticated && currentPlan === 'FREE' ? (
              <div className="block text-center bg-green-100 text-green-700 py-2.5 rounded-lg font-semibold text-sm border-2 border-green-200">
                ✓ Gói Hiện Tại
              </div>
            ) : (
              <Link
                to={isAuthenticated ? "/chat" : "/register"}
                className="block text-center bg-gray-100 text-gray-800 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition text-sm"
              >
                {isAuthenticated ? "Chuyển Về Free" : "Bắt Đầu Miễn Phí"}
              </Link>
            )}
            </div>
          </FadeInSection>

          {/* Plus Plan */}
          <FadeInSection delay={0.2}>
            <div className={`bg-white rounded-2xl shadow-lg p-6 border-2 transition flex flex-col h-full ${
              isAuthenticated && currentPlan === 'PLUS' 
                ? 'border-green-500 ring-2 ring-green-200' 
                : 'border-indigo-500 hover:border-indigo-600'
            }`}>
            <div className="text-center mb-4">
              {isAuthenticated && currentPlan === 'PLUS' ? (
                <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold mb-3">
                  ĐANG SỬ DỤNG
                </div>
              ) : (
                <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold mb-3">
                  PHỔ BIẾN NHẤT
                </div>
              )}
              <h2 className="text-2xl font-bold mb-2">Plus</h2>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-indigo-600">299.000đ</span>
                <span className="text-gray-500 text-sm">/tháng</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Cho người dùng thường xuyên</p>
            </div>
            
            <div className="mb-6 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl text-center border-2 border-indigo-200 flex-grow flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-indigo-600 mb-2">300</div>
              <div className="text-sm text-gray-600">câu hỏi/tháng</div>
            </div>
            
            {isAuthenticated && currentPlan === 'PLUS' ? (
              <div className="block text-center bg-green-100 text-green-700 py-2.5 rounded-lg font-semibold text-sm border-2 border-green-200">
                ✓ Gói Hiện Tại
              </div>
            ) : (
              <Link
                to={isAuthenticated ? "/maintenance" : "/register"}
                className="block text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-bold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg text-sm"
              >
                {isAuthenticated ? "Nâng Cấp Plus" : "Chọn Gói Plus"}
              </Link>
            )}
            </div>
          </FadeInSection>

          {/* Pro Plan */}
          <FadeInSection delay={0.3}>
            <div className={`rounded-2xl shadow-lg p-6 relative overflow-hidden flex flex-col h-full ${
              isAuthenticated && currentPlan === 'PRO' 
                ? 'bg-white border-2 border-green-500 ring-2 ring-green-200 text-gray-800' 
                : 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white'
            }`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full -ml-10 -mb-10"></div>
              
              <div className="relative z-10 flex flex-col h-full">
              <div className="text-center mb-4">
                {isAuthenticated && currentPlan === 'PRO' ? (
                  <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold mb-3">
                    ĐANG SỬ DỤNG
                  </div>
                ) : (
                  <div className="inline-block px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold mb-3">
                    CHUYÊN NGHIỆP
                  </div>
                )}
                <h2 className="text-2xl font-bold mb-2">Pro</h2>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">699.000đ</span>
                  <span className={`text-sm ${isAuthenticated && currentPlan === 'PRO' ? 'text-gray-500' : 'text-purple-100'}`}>/tháng</span>
                </div>
                <p className={`text-xs mt-1 ${isAuthenticated && currentPlan === 'PRO' ? 'text-gray-500' : 'text-purple-100'}`}>Cho doanh nghiệp & luật sư</p>
              </div>
              
              <div className={`mb-6 p-6 backdrop-blur rounded-xl text-center border-2 flex-grow flex flex-col items-center justify-center ${
                isAuthenticated && currentPlan === 'PRO' 
                  ? 'bg-indigo-50 border-indigo-200' 
                  : 'bg-white/10 border-white/20'
              }`}>
                <div className="text-5xl font-bold mb-2">∞</div>
                <div className={`text-sm ${isAuthenticated && currentPlan === 'PRO' ? 'text-gray-600' : 'text-purple-100'}`}>Không giới hạn câu hỏi</div>
              </div>
              
              {isAuthenticated && currentPlan === 'PRO' ? (
                <div className="block text-center bg-green-100 text-green-700 py-2.5 rounded-lg font-semibold text-sm border-2 border-green-200">
                  ✓ Gói Hiện Tại
                </div>
              ) : (
                <Link
                  to={isAuthenticated ? "/maintenance" : "/register"}
                  className="block text-center bg-white text-purple-600 py-2.5 rounded-lg font-bold hover:bg-purple-50 transition shadow-lg text-sm"
                >
                  {isAuthenticated ? "Nâng Cấp Pro" : "Nâng Cấp Pro"}
                </Link>
              )}
              </div>
            </div>
          </FadeInSection>
        </div>



        {/* FAQ Section */}
        <FadeInSection delay={0.2} className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Câu Hỏi Thường Gặp</h2>
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <h3 className="font-bold text-lg mb-2">Tôi có thể hủy gói Pro bất cứ lúc nào không?</h3>
              <p className="text-gray-600">Có, bạn có thể hủy gói Pro bất cứ lúc nào mà không mất phí.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <h3 className="font-bold text-lg mb-2">Phương thức thanh toán nào được chấp nhận?</h3>
              <p className="text-gray-600">Chúng tôi chấp nhận thẻ tín dụng, thẻ ghi nợ và chuyển khoản ngân hàng.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <h3 className="font-bold text-lg mb-2">Có được dùng thử gói Pro không?</h3>
              <p className="text-gray-600">Có, chúng tôi cung cấp 7 ngày dùng thử miễn phí cho gói Pro.</p>
            </motion.div>
          </div>
        </FadeInSection>
      </div>
    </div>
  )
}

export default PricingPage
