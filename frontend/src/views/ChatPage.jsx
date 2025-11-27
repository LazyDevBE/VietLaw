import { useState } from 'react'
import ChatNavbar from '../components/ChatNavbar'
import ChatSidebar from '../components/chat/ChatSidebar'
import ChatHeader from '../components/chat/ChatHeader'
import ChatMessages from '../components/chat/ChatMessages'
import ChatInput from '../components/chat/ChatInput'
import NotificationContainer from '../components/NotificationContainer'
import ChatErrorBoundary from '../components/ChatErrorBoundary'
import { useChat } from '../hooks/useChat'
import { useResponsiveSidebar } from '../hooks/useResponsiveSidebar'
import { notificationService } from '../services/notificationService'

function ChatPageContent() {
  const [input, setInput] = useState('')
  const { loading, messages, sendMessage } = useChat()
  const { sidebarCollapsed, toggleSidebar, closeSidebar } = useResponsiveSidebar()

  const handleSend = async () => {
    if (!input.trim()) return

    try {
      await sendMessage(input)
      setInput('')
    } catch (err) {
      notificationService.error(`Lỗi khi gửi tin nhắn: ${err.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <ChatNavbar />
      <NotificationContainer />
      
      <div className="flex h-[calc(100vh-72px)] container mx-auto px-2 md:px-4 py-2 md:py-4 gap-2 md:gap-4 relative">
        <ChatSidebar 
          collapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
          onClose={closeSidebar}
        />

        {/* Chat Area */}
        <div className={`flex-1 bg-white rounded-none md:rounded-2xl shadow-lg flex flex-col overflow-hidden transition-all duration-300 ${
          sidebarCollapsed ? 'ml-0' : 'ml-0 md:ml-4'
        }`}>
          <ChatHeader 
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={toggleSidebar}
          />
          
          <ChatMessages messages={messages} />
          
          <ChatInput
            input={input}
            onChange={setInput}
            onSend={handleSend}
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}

function ChatPage() {
  return (
    <ChatErrorBoundary>
      <ChatPageContent />
    </ChatErrorBoundary>
  )
}

export default ChatPage
