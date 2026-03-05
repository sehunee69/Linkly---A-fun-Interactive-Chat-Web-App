import { useEffect, useRef } from 'react'
import { Socket } from 'socket.io-client'
import { connectSocket, disconnectSocket } from '@/lib/socket'
import { useChatStore } from '@/stores/chatStore'
import { useAuthStore } from '@/stores/authStore'
import type { Message } from '@/types'

export const useSocket = () => {
  const { token } = useAuthStore()
  const { addMessage, setConnected, activeRoom } = useChatStore()
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (!token) return

    const socket = connectSocket(token)
    socketRef.current = socket

    socket.on('connect', () => setConnected(true))
    socket.on('disconnect', () => setConnected(false))
    socket.on('message', (msg: Message) => addMessage(msg))

    socket.emit('join', activeRoom.id)

    return () => {
      disconnectSocket()
    }
  }, [token])

  useEffect(() => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('join', activeRoom.id)
    }
  }, [activeRoom.id])

  const sendMessage = (chatId: string, content: string) => {
    socketRef.current?.emit('message', { chatId, content })
  }

  return { sendMessage, socket: socketRef.current }
}