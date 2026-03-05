import type { Message } from '@/types'

interface Props {
  message: Message
  showSender: boolean
  style?: React.CSSProperties
}

export default function MessageBubble({ message, showSender, style }: Props) {
  const isMine = message.isMine
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  const initial = isMine ? '?' : (message.senderId?.[0] ?? '?').toUpperCase()

  return (
    <div
      className={`flex items-end gap-2 animate-fadeUp ${isMine ? 'flex-row-reverse' : ''} ${showSender ? 'mt-3' : ''}`}
      style={style}
    >
      {!isMine && (
        showSender ? (
          <div className="w-[30px] h-[30px] rounded-lg bg-bg-4 border border-border flex items-center justify-center text-xs font-bold text-text-2 flex-shrink-0 self-end">
            {initial}
          </div>
        ) : (
          <div className="w-[30px] flex-shrink-0" />
        )
      )}

      <div className={`flex flex-col gap-1 max-w-[60%] ${isMine ? 'items-end' : ''}`}>
        {showSender && !isMine && (
          <span className="font-mono text-[11px] text-text-3 px-1 font-light">
            User {message.senderId?.slice(0, 8) ?? '?'}
          </span>
        )}
        <div
          className={`flex items-end gap-2 px-3.5 py-2.5 rounded-2xl
            ${isMine
              ? 'bg-gradient-to-br from-accent to-[#6555e0] rounded-br-sm shadow-lg shadow-accent/20'
              : 'bg-bg-3 border border-border rounded-bl-sm'
            }`}
        >
          <span className="text-sm leading-relaxed text-text break-words">{message.content}</span>
          <span className={`font-mono text-[10px] whitespace-nowrap mb-px font-light ${isMine ? 'text-white/40' : 'text-text-3'}`}>
            {time}
          </span>
        </div>
      </div>
    </div>
  )
}