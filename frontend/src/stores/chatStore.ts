import { create } from 'zustand'
import type { Message, Room } from '@/types'

export const ROOMS: Room[] = [
  { id: 'general', name: 'general', desc: 'Open to everyone' },
  { id: 'random', name: 'random', desc: 'Anything goes' },
  { id: 'dev', name: 'dev', desc: 'Tech & code talk' },
  { id: 'design', name: 'design', desc: 'UI/UX discussions' },
]

interface ChatState {
  activeRoom: Room
  messages: Record<string, Message[]>
  connected: boolean
  setActiveRoom: (room: Room) => void
  addMessage: (message: Message) => void
  setConnected: (connected: boolean) => void
  setMessages: (chatId: string, messages: Message[]) => void
}

export const useChatStore = create<ChatState>()((set) => ({
  activeRoom: ROOMS[0],
  messages: {},
  connected: false,

  setActiveRoom: (room) => set({ activeRoom: room }),

  addMessage: (message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [message.chatId]: [...(state.messages[message.chatId] ?? []), message],
      },
    })),

    setMessages: (chatId: string, messages: Message[]) =>
      set((state) => ({
        messages: {
          ...state.messages,
        [chatId]: messages,
        },
      })),

  setConnected: (connected) => set({ connected }),
}))