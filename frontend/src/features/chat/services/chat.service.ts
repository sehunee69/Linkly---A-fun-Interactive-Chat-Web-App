import api from '@/lib/axios'
import type { Message } from '@/types'

export const chatService = {
    getMessages: async (chatId: string): Promise<Message[]> => {
        const res = await api.get<Message[]>(`/chat/${chatId}/messages`)
        return res.data
    }
}
