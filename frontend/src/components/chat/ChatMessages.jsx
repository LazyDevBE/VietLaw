import { MESSAGE_TYPES } from '../../constants'

function ChatMessages({ messages }) {
  if (messages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-16 md:w-24 h-16 md:h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 md:w-12 h-8 md:h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Bắt đầu cuộc trò chuyện</h3>
          <p className="text-gray-500 text-sm md:text-base">Đặt câu hỏi pháp lý của bạn và nhận câu trả lời ngay lập tức</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4">
      {messages.map((msg, idx) => {
        const isUser = msg.messageType === MESSAGE_TYPES.USER || msg.role === 'user'
        return (
          <div
            key={msg.id || idx}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-2 md:gap-3 max-w-xs md:max-w-2xl ${isUser ? 'flex-row-reverse' : ''}`}>
              <MessageAvatar isUser={isUser} />
              <MessageBubble message={msg} isUser={isUser} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function MessageAvatar({ isUser }) {
  return (
    <div className={`w-8 md:w-10 h-8 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
      isUser ? 'bg-indigo-600' : 'bg-gray-200'
    }`}>
      {isUser ? (
        <svg className="w-4 md:w-6 h-4 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ) : (
        <svg className="w-4 md:w-6 h-4 md:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )}
    </div>
  )
}

function MessageBubble({ message, isUser }) {
  return (
    <div
      className={`px-3 md:px-5 py-2 md:py-3 rounded-2xl text-sm md:text-base ${
        isUser
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
          : 'bg-gray-100 text-gray-800'
      }`}
    >
      <p className="leading-relaxed">{message.content}</p>
      {message.createdAt && (
        <p className={`text-xs mt-1 ${isUser ? 'text-indigo-100' : 'text-gray-500'}`}>
          {new Date(message.createdAt).toLocaleTimeString('vi-VN')}
        </p>
      )}
    </div>
  )
}

export default ChatMessages