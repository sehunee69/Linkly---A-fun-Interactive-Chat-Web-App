import { useChatStore, ROOMS } from '@/stores/chatStore'
import type { Room } from '@/types'

export default function RoomList() {
  const { activeRoom, setActiveRoom, messages } = useChatStore()

  return (
    <nav className="flex flex-col gap-0.5">
      {ROOMS.map((room: Room) => {
        const isActive = activeRoom.id === room.id
        const unread = !isActive ? (messages[room.id]?.length ?? 0) : 0

        return (
          <button
            key={room.id}
            onClick={() => setActiveRoom(room)}
            className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-left w-full transition-all duration-150
              ${isActive
                ? 'bg-accent/10 border-accent/20 text-text'
                : 'bg-transparent border-transparent text-text-2 hover:bg-bg-3 hover:text-text'
              }`}
          >
            <span className={`font-mono text-base min-w-[14px] ${isActive ? 'text-accent' : 'text-text-3'}`}>
              #
            </span>
            <div className="flex-1 min-w-0">
              <span className="block text-sm font-semibold">{room.name}</span>
              <span className="block font-mono text-[11px] text-text-3 truncate font-light">
                {room.desc}
              </span>
            </div>
            {unread > 0 && (
              <span className="bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {unread}
              </span>
            )}
          </button>
        )
      })}
    </nav>
  )
}