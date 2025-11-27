import { Link } from 'react-router-dom'
import { authService } from '../services/authService'
import Logo from './Logo'
import ChatNavbar from './ChatNavbar'
import { useState } from 'react'

function Navbar() {
  const isAuthenticated = authService.isAuthenticated()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Nếu user đã đăng nhập, sử dụng ChatNavbar
  if (isAuthenticated) {
    return <ChatNavbar />
  }

  // Nếu chưa đăng nhập, hiển thị navbar thông thường
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center group">
            <Logo className="w-9 h-9 md:w-11 md:h-11 transition-transform" />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold text-gray-800 leading-tight">
                VietLaw
              </span>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-6 items-center">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition text-sm">
              Trang Chủ
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-indigo-600 font-medium transition text-sm">
              Giới Thiệu
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-indigo-600 font-medium transition text-sm">
              Bảng Giá
            </Link>
            
            <Link 
              to="/login" 
              className="text-gray-600 hover:text-indigo-600 font-medium transition text-sm"
            >
              Đăng Nhập
            </Link>
            <Link 
              to="/register" 
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition font-medium text-sm shadow-sm"
            >
              Đăng Ký
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-indigo-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-indigo-600 font-medium transition text-sm py-2">
                Trang Chủ
              </Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-indigo-600 font-medium transition text-sm py-2">
                Giới Thiệu
              </Link>
              <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-indigo-600 font-medium transition text-sm py-2">
                Bảng Giá
              </Link>
              
              <Link 
                to="/login" 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-gray-600 hover:text-indigo-600 font-medium transition text-sm py-2"
              >
                Đăng Nhập
              </Link>
              <Link 
                to="/register" 
                onClick={() => setMobileMenuOpen(false)}
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition font-medium text-sm shadow-sm text-center"
              >
                Đăng Ký
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
