import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { useChatStore } from '@/stores/chatStore'
import { disconnectSocket } from '@/lib/socket'
import { RoomList } from '@/features/chat'
import Avatar from '@/components/ui/Avatar'

export default function Sidebar() {
  const { user, logout } = useAuthStore()
  const { connected } = useChatStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    disconnectSocket()
    logout()
    navigate('/login')
  }

  const userEmail = user?.email ?? 'Anonymous'
  const userInitial = userEmail[0]

  return (
    <aside className="w-[260px] min-w-[260px] bg-bg-2 border-r border-border flex flex-col overflow-hidden">
      {/* Top */}
      <div className="px-4 py-5 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-[17px] tracking-tight">
          <span className="text-accent text-xl drop-shadow-[0_0_6px_rgba(124,106,255,1)]">⬡</span>
          <span>ChatApp</span>
        </div>
        <div className={`flex items-center gap-1.5 font-mono text-[11px] px-2 py-1 rounded-full border font-medium
          ${connected
            ? 'bg-green-500/10 text-green-400 border-green-500/20'
            : 'bg-red-500/10 text-red-400 border-red-500/20'
          }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          {connected ? 'Live' : 'Offline'}
        </div>
      </div>

      {/* Rooms */}
      <div className="flex-1 overflow-y-auto p-2">
        <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-text-3 px-2 mb-1.5">
          Rooms
        </p>
        <RoomList />
      </div>

      {/* User card */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-2.5 p-2.5 bg-bg-3 rounded-xl border border-border">
          <Avatar initial={userInitial} />
          <div className="flex-1 min-w-0">
            <span className="block text-sm font-semibold truncate text-text">{userEmail}</span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-green-400 font-light">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Online
            </span>
          </div>
          <button
            onClick={handleLogout}
            title="Sign out"
            className="text-text-3 hover:text-red-400 hover:bg-red-500/10 p-1.5 rounded-lg transition-all duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16,17 21,12 16,7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  )
}