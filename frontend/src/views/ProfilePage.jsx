import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../services/userService'
import { updateUser } from '../store/authSlice'
import Navbar from '../components/Navbar'

function ProfilePage() {
  const { user } = useSelector((state) => state.auth)
  const [name, setName] = useState(user?.name || '')
  const [avatar, setAvatar] = useState(user?.avatar || '')
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const data = await userService.updateProfile(name, avatar)
      dispatch(updateUser(data))
      setMessage('Profile updated successfully')
    } catch (err) {
      setMessage('Failed to update profile')
    }
  }

  const handleUpgrade = async () => {
    try {
      const data = await userService.upgradePlan()
      dispatch(updateUser(data))
      setMessage('Upgraded to PRO plan')
    } catch (err) {
      setMessage('Failed to upgrade plan')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Hồ Sơ Cá Nhân
          </h1>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <h2 className="text-2xl font-bold mb-2">{user?.name}</h2>
              <p className="text-gray-500 mb-4">{user?.email}</p>
              
              <div className={`inline-block px-4 py-2 rounded-full font-semibold ${
                user?.plan === 'PRO' 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}>
                {user?.plan === 'PRO' ? '⭐ PRO' : 'FREE'}
              </div>
            </div>

            {/* Edit Form */}
            <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Chỉnh Sửa Thông Tin</h3>
              
              {message && (
                <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 px-4 py-3 rounded mb-6">
                  <p className="font-medium">{message}</p>
                </div>
              )}

              <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Họ và Tên</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Avatar URL</label>
                  <input
                    type="text"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={user?.email}
                    disabled
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">Email không thể thay đổi</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-md"
                >
                  Cập Nhật Thông Tin
                </button>
              </form>
            </div>
          </div>

          {/* Plan Upgrade Section */}
          {user?.plan === 'FREE' && (
            <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Nâng Cấp Lên PRO</h3>
                  <p className="text-blue-100 mb-4">
                    Mở khóa tất cả tính năng cao cấp và trải nghiệm không giới hạn
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Chat không giới hạn
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Hỗ trợ ưu tiên
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Tính năng nâng cao
                    </li>
                  </ul>
                  <button
                    onClick={handleUpgrade}
                    className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition shadow-lg"
                  >
                    Nâng Cấp Ngay - 699.000đ/tháng
                  </button>
                </div>
                <div className="hidden md:block">
                  <img 
                    src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&h=300&fit=crop" 
                    alt="Upgrade" 
                    className="rounded-2xl shadow-2xl w-64"
                  />
                </div>
              </div>
            </div>
          )}

          {user?.plan === 'PRO' && (
            <div className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-xl p-8 text-white text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl font-bold mb-2">Bạn Đang Dùng Gói PRO!</h3>
              <p className="text-lg">Cảm ơn bạn đã tin tưởng và ủng hộ VietLaw</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
