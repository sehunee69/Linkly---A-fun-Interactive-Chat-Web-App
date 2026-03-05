import { useEffect, useRef } from 'react'
import { useMessages } from '../hooks/useMessages'
import MessageBubble from './MessageBubble'
import type { Room } from '@/types'

interface Props {
  room: Room
}

export default function MessageList({ room }: Props) {
  const { messages } = useMessages(room.id)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-2 animate-fadeIn">
        <div className="font-mono text-5xl text-border-bright mb-2">#</div>
        <p className="text-lg font-bold text-text-2">Welcome to #{room.name}</p>
        <p className="font-mono text-sm text-text-3 font-light text-center max-w-xs">
          {room.desc} — be the first to say something
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      {messages.map((msg, i) => {
        const showSender = i === 0 || messages[i - 1].senderId !== msg.senderId
        return (
          <MessageBubble
            key={msg._id ?? i}
            message={msg}
            showSender={showSender}
            style={{ animationDelay: `${Math.min(i * 0.02, 0.3)}s` }}
          />
        )
      })}
      <div ref={bottomRef} />
    </div>
  )
}