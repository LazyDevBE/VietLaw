import { useDispatch, useSelector } from 'react-redux'
import { setCurrentChat, setMessages } from '../../store/chatSlice'

function ChatSidebar({ collapsed, onToggle, onClose }) {
  const dispatch = useDispatch()
  const { currentChatId, chats } = useSelector((state) => state.chat)

  const handleNewChat = () => {
    dispatch(setCurrentChat(null))
    dispatch(setMessages([]))
    // Auto close sidebar on mobile after creating new chat
    if (window.innerWidth < 768) {
      onClose()
    }
  }

  const handleChatSelect = (chatId) => {
    dispatch(setCurrentChat(chatId))
    // Auto close sidebar on mobile after selecting chat
    if (window.innerWidth < 768) {
      onClose()
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      {!collapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`${
        collapsed 
          ? 'w-0 opacity-0 -translate-x-full' 
          : 'w-64 md:w-80 opacity-100 translate-x-0'
      } ${
        !collapsed ? 'fixed md:relative inset-y-0 left-0 z-50 md:z-auto' : ''
      } bg-white rounded-none md:rounded-2xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 ease-in-out`}>
        
        {/* Header */}
        <div className="p-4 md:p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 md:w-10 h-8 md:h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-5 md:w-6 h-5 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base">Cuộc Trò Chuyện</h3>
                <p className="text-indigo-100 text-xs md:text-sm">Lịch sử chat của bạn</p>
              </div>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="md:hidden w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <button
            onClick={handleNewChat}
            className="w-full bg-white text-indigo-600 py-2 md:py-3 rounded-xl font-semibold hover:bg-indigo-50 transition shadow-md flex items-center justify-center gap-2 text-sm md:text-base"
          >
            <svg className="w-4 md:w-5 h-4 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Cuộc Trò Chuyện Mới
          </button>
        </div>
        
        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-2">
          <h3 className="text-xs md:text-sm font-semibold text-gray-500 uppercase px-2 md:px-3 mb-2">Lịch Sử Chat</h3>
          {chats.length === 0 ? (
            <p className="text-gray-400 text-center py-6 md:py-8 text-xs md:text-sm">Chưa có cuộc trò chuyện nào</p>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat.id)}
                className={`p-3 md:p-4 rounded-xl cursor-pointer transition ${
                  currentChatId === chat.id 
                    ? 'bg-indigo-100 border-2 border-indigo-500' 
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <p className="font-medium truncate text-gray-800 text-sm md:text-base">{chat.title}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(chat.updatedAt).toLocaleDateString('vi-VN')}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default ChatSidebar