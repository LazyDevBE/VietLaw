import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { authService } from '../services/authService'
import Navbar from '../components/Navbar'
import FadeInSection from '../components/FadeInSection'

// CSS for typing animation
const typingAnimation = `
  @keyframes typing {
    0% { width: 0 }
    100% { width: 100% }
  }
  
  @keyframes blink {
    0%, 50% { border-color: transparent }
    51%, 100% { border-color: #3b82f6 }
  }
  
  .typing-text {
    overflow: hidden;
    border-right: 2px solid #3b82f6;
    white-space: nowrap;
    animation: typing 3s steps(40, end), blink 0.75s step-end infinite;
  }
`

function HomePage() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    const isLoggedIn = authService.isAuthenticated()
    if (isLoggedIn) {
      navigate('/chat')
    } else {
      navigate('/register')
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: typingAnimation }} />
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center md:text-left"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-5 leading-tight">
                <span className="typing-text">Trợ Lý Pháp Lý AI</span>
              </h1>
              <p className="text-base md:text-lg mb-6 md:mb-7 text-indigo-50 leading-relaxed">
                Giải đáp mọi thắc mắc pháp lý của bạn nhanh chóng, chính xác với công nghệ AI tiên tiến
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                
                <button 
                  onClick={handleGetStarted}
                  className="bg-white text-indigo-600 px-6 md:px-7 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition shadow-md text-sm"
                >
                  Bắt Đầu Miễn Phí
                </button>
                <Link to="/about" className="border-2 border-white px-6 md:px-7 py-3 rounded-lg font-semibold hover:bg-white/10 transition text-sm">
                  Tìm Hiểu Thêm
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="relative">
                {/* Chat Interface Mockup */}
                <div className="bg-white rounded-lg shadow-xl p-4 max-w-md mx-auto">
                  {/* Chat Header */}
                  <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">VietLaw AI</div>
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Đang online
                      </div>
                    </div>
                  </div>
                  
                  {/* Chat Messages */}
                  <div className="py-4 space-y-3">
                    {/* User Message */}
                    <div className="flex justify-end">
                      <div className="bg-indigo-500 text-white px-3 py-2 rounded-lg text-sm max-w-xs">
                        Tôi muốn hỏi về quyền lợi của người lao động
                      </div>
                    </div>
                    
                    {/* AI Response */}
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm max-w-xs">
                        <div className="mb-1">Theo Bộ luật Lao động 2019, người lao động có các quyền cơ bản sau:</div>
                        <div className="text-xs text-gray-600">• Quyền được làm việc...</div>
                      </div>
                    </div>
                    
                    {/* AI Typing Indicator */}
                    <div className="flex justify-start">
                      <div className="bg-gray-100 px-3 py-2 rounded-lg">
                        <div className="flex items-center gap-1">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                          <span className="text-xs text-gray-500 ml-2">AI đang trả lời...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chat Input */}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Nhập câu hỏi của bạn..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50"
                        disabled
                      />
                      <button className="bg-indigo-500 text-white px-3 py-2 rounded-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <FadeInSection>
        <section className="py-8 md:py-10 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-indigo-600 mb-1">10K+</div>
                <div className="text-gray-600 text-xs md:text-sm">Người Dùng</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-indigo-600 mb-1">50K+</div>
                <div className="text-gray-600 text-xs md:text-sm">Câu Hỏi</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-indigo-600 mb-1">98%</div>
                <div className="text-gray-600 text-xs md:text-sm">Hài Lòng</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-indigo-600 mb-1">24/7</div>
                <div className="text-gray-600 text-xs md:text-sm">Hỗ Trợ</div>
              </motion.div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Features */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <FadeInSection className="text-center mb-8 md:mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">Tính Năng Nổi Bật</h2>
            <p className="text-gray-600 text-sm md:text-base">Giải pháp pháp lý toàn diện cho mọi nhu cầu của bạn</p>
          </FadeInSection>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            <FadeInSection delay={0.1}>
              <div className="bg-white p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition h-full">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-50 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Trò Chuyện AI</h3>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                Tương tác với trợ lý AI thông minh, nhận câu trả lời pháp lý tức thì và chính xác
              </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="bg-white p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition h-full">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-green-50 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Tra cứu văn bản luật</h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Tra cứu hàng ngàn văn bản pháp luật, điều khoản và quy định được cập nhật liên tục
                </p>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <div className="bg-white p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition sm:col-span-2 lg:col-span-1 h-full">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-purple-50 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Tư vấn pháp lý</h3>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                Cung cấp câu trả lời ngắn gọn, rõ ràng giúp người dùng dễ dàng
                tiếp cận và hiểu rõ thông tin quan trọng
              </p>
            </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <FadeInSection delay={0.2}>
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">Cách Sử Dụng</h2>
            <p className="text-gray-600 text-sm md:text-base">Chỉ 3 bước đơn giản để bắt đầu</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-3 md:mb-4 shadow-md">
                1
              </div>
              <h3 className="text-base md:text-lg font-bold mb-2">Đăng Ký Tài Khoản</h3>
              <p className="text-gray-600 text-xs md:text-sm">Tạo tài khoản miễn phí chỉ trong vài giây</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-3 md:mb-4 shadow-md">
                2
              </div>
              <h3 className="text-base md:text-lg font-bold mb-2">Đặt Câu Hỏi</h3>
              <p className="text-gray-600 text-xs md:text-sm">Nhập câu hỏi pháp lý của bạn vào chat</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-3 md:mb-4 shadow-md">
                3
              </div>
              <h3 className="text-base md:text-lg font-bold mb-2">Nhận Giải Đáp</h3>
              <p className="text-gray-600 text-xs md:text-sm">Nhận câu trả lời chi tiết và chính xác ngay lập tức</p>
            </div>
          </div>
        </div>
      </section>
    </FadeInSection>
      {/* Testimonials */}
      <FadeInSection delay={0.2}>
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">Khách Hàng Nói Gì</h2>
            <p className="text-gray-600 text-sm md:text-base">Phản hồi từ người dùng thực tế</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            <div className="bg-gray-50 p-5 md:p-6 rounded-xl border border-gray-100">
              <div className="flex items-center mb-3 md:mb-4">
                <img 
                  src="https://i.pravatar.cc/100?img=1" 
                  alt="User" 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="font-bold text-sm">Nguyễn Văn Hòa</div>
                  <div className="text-xs text-gray-500">Doanh nhân</div>
                </div>
              </div>
              <p className="text-gray-600 text-xs md:text-sm italic leading-relaxed">
                "VietLaw giúp tôi hiểu rõ các vấn đề pháp lý trong kinh doanh. Rất hữu ích và tiện lợi!"
              </p>
              <div className="flex text-yellow-400 mt-3 text-sm">
                ★★★★★
              </div>
            </div>

            <div className="bg-gray-50 p-5 md:p-6 rounded-xl border border-gray-100">
              <div className="flex items-center mb-3 md:mb-4">
                <img 
                  src="https://i.pravatar.cc/100?img=5" 
                  alt="User" 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="font-bold text-sm">Trần Thị Xuân</div>
                  <div className="text-xs text-gray-500">Luật sư</div>
                </div>
              </div>
              <p className="text-gray-600 text-xs md:text-sm italic leading-relaxed">
                "Công cụ tuyệt vời để tra cứu nhanh các văn bản pháp luật. Tiết kiệm rất nhiều thời gian!"
              </p>
              <div className="flex text-yellow-400 mt-3 text-sm">
                ★★★★★
              </div>
            </div>

            <div className="bg-gray-50 p-5 md:p-6 rounded-xl border border-gray-100 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-3 md:mb-4">
                <img 
                  src="https://i.pravatar.cc/100?img=8" 
                  alt="User" 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="font-bold text-sm">Lê Văn Đạt</div>
                  <div className="text-xs text-gray-500">Sinh viên</div>
                </div>
              </div>
              <p className="text-gray-600 text-xs md:text-sm italic leading-relaxed">
                "Giao diện thân thiện, dễ sử dụng. AI trả lời rất nhanh và chính xác. Rất hài lòng!"
              </p>
              <div className="flex text-yellow-400 mt-3 text-sm">
                ★★★★★
              </div>
            </div>
          </div>
        </div>
      </section>
      </FadeInSection>
      {/* CTA Section */}
      <FadeInSection delay={0.1}>
      <section className="py-12 md:py-16 bg-indigo-500 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Sẵn Sàng Bắt Đầu?</h2>
          <p className="text-base md:text-lg mb-5 md:mb-6 text-indigo-100">
            Tham gia cùng hàng ngàn người dùng đang tin tưởng VietLaw
          </p>
          <button 
            onClick={handleGetStarted}
            className="inline-block bg-white text-indigo-600 px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition shadow-md text-sm md:text-base"
          >
            Đăng Ký Miễn Phí Ngay
          </button>
        </div>
      </section>
        </FadeInSection>

      {/* Contact Section */}
      <FadeInSection>
        <section className="py-16 md:py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10 md:mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Liên Hệ Với Chúng Tôi</h2>
                <p className="text-gray-600 text-sm md:text-base">Có câu hỏi? Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Contact Info */}
                <FadeInSection delay={0.1}>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                          <p className="text-gray-600 text-sm">support@vietlaw.vn</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">Điện thoại</h4>
                          <p className="text-gray-600 text-sm">+84 123 456 789</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">Địa chỉ</h4>
                          <p className="text-gray-600 text-sm">123 Đường Phạm Ngũ Lão, Quận Gò Vấp</p>
                          <p className="text-gray-600 text-sm">TP. Hồ Chí Minh, Việt Nam</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeInSection>

                {/* Contact Form */}
                <FadeInSection delay={0.2}>
                  <div className="bg-white rounded-xl shadow-md p-6 md:p-8 hover:shadow-lg transition">
                    <form className="space-y-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2 text-sm">Họ và tên</label>
                        <input
                          type="text"
                          placeholder="Nguyễn Văn A"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2 text-sm">Email</label>
                        <input
                          type="email"
                          placeholder="example@email.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2 text-sm">Tin nhắn</label>
                        <textarea
                          rows="4"
                          placeholder="Nội dung tin nhắn..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition shadow-lg"
                      >
                        Gửi Tin Nhắn
                      </button>
                    </form>
                  </div>
                </FadeInSection>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 md:py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 max-w-5xl mx-auto">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-white text-base md:text-lg font-bold mb-2 md:mb-3">VietLaw</h3>
              <p className="text-xs md:text-sm leading-relaxed">Trợ lý pháp lý AI thông minh, đáng tin cậy cho mọi người</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2 md:mb-3 text-xs md:text-sm">Sản Phẩm</h4>
              <ul className="space-y-2 text-xs md:text-sm">
                <li><Link to="/chat" className="hover:text-white transition">Chat AI</Link></li>
                <li><Link to="/law" className="hover:text-white transition">Tra cứu văn bản pháp luật</Link></li>
            </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2 md:mb-3 text-xs md:text-sm">Công Ty</h4>
              <ul className="space-y-2 text-xs md:text-sm">
                <li><Link to="/about" className="hover:text-white transition">Về Chúng Tôi</Link></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-semibold mb-2 md:mb-3 text-xs md:text-sm">Theo Dõi</h4>
              <div className="flex gap-3 md:gap-4 text-xs md:text-sm">
                <a href="#" className="hover:text-white transition">Facebook</a>
                <a href="#" className="hover:text-white transition">Twitter</a>
                <a href="#" className="hover:text-white transition">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-4 md:pt-6 text-center text-xs md:text-sm">
            <p>&copy; 2024 VietLaw. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </>
  )
}

export default HomePage
