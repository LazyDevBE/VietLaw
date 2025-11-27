import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { adminService } from '../../services/adminService'

function ChatHistory() {
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedChat, setSelectedChat] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    size: 10
  })
  const [error, setError] = useState(null)

  useEffect(() => {
    loadChatHistory()
  }, [pagination.currentPage, searchTerm])

  const loadChatHistory = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await adminService.getChatHistory(pagination.currentPage, pagination.size, null, searchTerm)
      setChats(data.sessions)
      setPagination(prev => ({
        ...prev,
        totalPages: data.totalPages,
        totalElements: data.totalElements
      }))
    } catch (err) {
      console.error('Failed to load chat history:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
    setPagination(prev => ({ ...prev, currentPage: 0 }))
  }

  const handleDeleteChat = async (chatId) => {
    if (!confirm('Bạn có chắc chắn muốn xóa phiên chat này?')) return
    
    try {
      await adminService.deleteChatSession(chatId)
      setChats(chats.filter(chat => chat.id !== chatId))
      if (selectedChat?.id === chatId) {
        setSelectedChat(null)
      }
    } catch (err) {
      console.error('Failed to delete chat:', err)
      alert('Lỗi khi xóa chat: ' + err.message)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải lịch sử chat...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Lỗi tải dữ liệu</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadChatHistory}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Thử lại
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Lịch Sử Chat</h1>
        <p className="text-gray-600">Xem và quản lý tất cả cuộc trò chuyện của người dùng</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm cuộc trò chuyện..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {chats.map((chat, index) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedChat(chat)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedChat?.id === chat.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-800 truncate">{chat.title}</h3>
                    <span className="text-xs text-gray-500 ml-2">
                      {chat.messageCount} tin nhắn
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{chat.user?.fullName}</p>
                  <p className="text-xs text-gray-500 mb-1">{chat.user?.email}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(chat.updatedAt).toLocaleString('vi-VN')}
                  </p>
                </motion.div>
              ))}
            </div>

            {chats.length === 0 && !loading && (
              <div className="text-center py-8">
                <p className="text-gray-500">Không tìm thấy cuộc trò chuyện nào</p>
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Trang {pagination.currentPage + 1} / {pagination.totalPages}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                      disabled={pagination.currentPage === 0}
                      className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
                    >
                      Trước
                    </button>
                    <button
                      onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                      disabled={pagination.currentPage >= pagination.totalPages - 1}
                      className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
                    >
                      Sau
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Detail */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg h-full">
            {selectedChat ? (
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{selectedChat.title}</h2>
                      <p className="text-gray-600">
                        {selectedChat.user?.fullName} ({selectedChat.user?.email})
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        Tạo: {new Date(selectedChat.createdAt).toLocaleString('vi-VN')}
                      </p>
                      <p className="text-sm text-gray-500">
                        Cập nhật: {new Date(selectedChat.updatedAt).toLocaleString('vi-VN')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="text-center text-gray-500 text-sm">
                      Chi tiết tin nhắn sẽ được hiển thị ở đây
                    </div>
                    <div className="text-center text-gray-400 text-xs">
                      Tính năng xem chi tiết tin nhắn đang được phát triển
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleDeleteChat(selectedChat.id)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Xóa Chat
                    </button>
                    <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                      Xuất File
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Chọn cuộc trò chuyện</h3>
                  <p className="text-gray-500">Chọn một cuộc trò chuyện từ danh sách để xem chi tiết</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatHistory