function ChatInput({ input, onChange, onSend, loading, disabled }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading && !disabled) {
      onSend()
    }
  }

  return (
    <div className="border-t bg-gray-50 p-3 md:p-6">
      <div className="flex gap-2 md:gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập câu hỏi của bạn..."
          className="flex-1 px-3 md:px-5 py-2 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm md:text-base"
          disabled={loading || disabled}
        />
        <SendButton 
          onClick={onSend}
          loading={loading}
          disabled={disabled || !input.trim()}
        />
      </div>
    </div>
  )
}

function SendButton({ onClick, loading, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 md:px-8 py-2 md:py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md flex items-center gap-1 md:gap-2 text-sm md:text-base"
    >
      {loading ? (
        <>
          <LoadingSpinner />
          <span className="hidden md:inline">Đang gửi...</span>
        </>
      ) : (
        <>
          <SendIcon />
          <span className="hidden md:inline">Gửi</span>
        </>
      )}
    </button>
  )
}

function LoadingSpinner() {
  return (
    <svg className="animate-spin h-4 md:h-5 w-4 md:w-5" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  )
}

function SendIcon() {
  return (
    <svg className="w-4 md:w-5 h-4 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  )
}

export default ChatInput