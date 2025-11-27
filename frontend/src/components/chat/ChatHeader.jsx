function ChatHeader({ sidebarCollapsed, onToggleSidebar }) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Toggle button for mobile and desktop */}
          <button
            onClick={onToggleSidebar}
            className="w-8 md:w-10 h-8 md:h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors group"
            title={sidebarCollapsed ? "Mở lịch sử chat" : "Đóng lịch sử chat"}
          >
            {sidebarCollapsed ? (
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            )}
          </button>
          <div>
            <h2 className="text-xl md:text-2xl font-bold">Trợ Lý Pháp Lý AI</h2>
            <p className="text-blue-100 text-xs md:text-sm mt-1">Hỏi bất cứ điều gì về pháp luật</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader