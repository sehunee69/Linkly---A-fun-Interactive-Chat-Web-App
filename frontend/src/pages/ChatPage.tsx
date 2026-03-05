import { useChatStore } from '../stores/chatStore.ts'
import { useSocket, MessageList, MessageInput } from '@/features/chat'
import Sidebar from '../components/layout/Sidebar.tsx'
import Header from '../components/layout/Header.tsx'

export default function ChatPage() {
  const { activeRoom } = useChatStore()
  const { sendMessage } = useSocket()

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header room={activeRoom} />
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col">
          <MessageList room={activeRoom} />
        </div>
        <MessageInput onSend={sendMessage} />
      </main>
    </div>
  )
}