import Navbar from '../components/Navbar'

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Về VietLaw</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Mission */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Sứ Mệnh Của Chúng Tôi
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                VietLaw được tạo ra với mục tiêu làm cho thông tin pháp lý trở nên dễ tiếp cận 
                với mọi người thông qua sức mạnh của công nghệ AI.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Chúng tôi tin rằng việc hiểu biết về pháp luật nên đơn giản và có sẵn cho tất cả mọi người, 
                không phân biệt trình độ hay hoàn cảnh.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop" 
                alt="Mission" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* What We Offer */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Dịch Vụ Của Chúng Tôi
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Hỗ Trợ 24/7</h3>
                <p className="text-gray-600 text-sm">Trợ lý AI luôn sẵn sàng</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Chính Xác</h3>
                <p className="text-gray-600 text-sm">Thông tin được cập nhật</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Đa Dạng</h3>
                <p className="text-gray-600 text-sm">Hàng ngàn văn bản luật</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Nhanh Chóng</h3>
                <p className="text-gray-600 text-sm">Phản hồi tức thì</p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 mb-20">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Cách Hoạt Động
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">Đăng Ký</h3>
                <p className="text-gray-600">Tạo tài khoản miễn phí trong vài giây</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">Đặt Câu Hỏi</h3>
                <p className="text-gray-600">Chat với AI về bất kỳ vấn đề pháp lý nào</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">Nhận Giải Đáp</h3>
                <p className="text-gray-600">Nhận câu trả lời chi tiết ngay lập tức</p>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Đội Ngũ Của Chúng Tôi
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <img 
                  src="https://cdn.lazi.vn/storage/uploads/users/avatar/1587962225_1585288013_anonymous_512.png" 
                  alt="Team member" 
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="font-bold text-lg">Nguyễn Hồ Quang Khải</h3>
                <p className="text-gray-500">Lead Developer</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <img 
                  src="https://cdn.lazi.vn/storage/uploads/users/avatar/1587962225_1585288013_anonymous_512.png" 
                  alt="Team member" 
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="font-bold text-lg">Trần Vân Phi</h3>
                <p className="text-gray-500">Backend Developer</p>
              </div>

              

              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <img 
                  src="https://cdn.lazi.vn/storage/uploads/users/avatar/1587962225_1585288013_anonymous_512.png" 
                  alt="Team member" 
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="font-bold text-lg">Lữ Vân Chuẩn</h3>
                <p className="text-gray-500">Frontend Developer</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">Liên Hệ Với Chúng Tôi</h2>
            <p className="text-xl text-blue-100 mb-8">
              Có câu hỏi hoặc phản hồi? Chúng tôi luôn sẵn sàng lắng nghe!
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:support@vietlaw.com" 
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@vietlaw.com
              </a>
              <a 
                href="tel:+84123456789" 
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +84 123 456 789
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
