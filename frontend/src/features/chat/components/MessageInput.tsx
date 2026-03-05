import { useState, useRef } from 'react'
import { useChatStore } from '@/stores/chatStore'
import { useAuthStore } from '@/stores/authStore'

interface Props {
  onSend: (chatId: string, content: string) => void
}

export default function MessageInput({ onSend }: Props) {
  const [input, setInput] = useState('')
  const { activeRoom, connected, addMessage } = useChatStore()
  const { user } = useAuthStore()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Optimistic update
    addMessage({
      _id: Date.now().toString(),
      chatId: activeRoom.id,
      senderId: user?.id ?? 'me',
      content: input.trim(),
      createdAt: new Date().toISOString(),
      isMine: true,
    })

    onSend(activeRoom.id, input.trim())
    setInput('')
    inputRef.current?.focus()
  }

  return (
    <div className="px-6 pb-5 pt-4 border-t border-border bg-bg-2 flex-shrink-0">
      <form
        onSubmit={handleSubmit}
        className={`flex items-center gap-2.5 bg-bg-3 border rounded-2xl px-4 py-1 transition-all duration-200
          ${connected ? 'border-border focus-within:border-accent focus-within:shadow-[0_0_0_3px_rgba(124,106,255,0.2)]' : 'border-red-500/30'}`}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={connected ? `Message #${activeRoom.name}` : 'Reconnecting...'}
          maxLength={500}
          autoFocus
          className="flex-1 bg-transparent border-none outline-none font-display text-sm text-text py-2.5 placeholder:text-text-3"
        />
        <button
          type="submit"
          disabled={!input.trim() || !connected}
          className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white transition-all duration-150
            hover:opacity-85 hover:scale-105 active:scale-100 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 flex-shrink-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22,2 15,22 11,13 2,9" />
          </svg>
        </button>
      </form>
      {!connected && (
        <p className="font-mono text-xs text-red-400 text-center mt-2 animate-pulse">
          Reconnecting to server...
        </p>
      )}
    </div>
  )
}