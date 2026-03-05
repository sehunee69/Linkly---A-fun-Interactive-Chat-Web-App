import { useEffect } from 'react'
import { useChatStore } from '@/stores/chatStore'
import { useAuthStore } from '@/stores/authStore'
import { chatService } from '../services/chat.service'

export const useMessages = (chatId: string) => {
  const messages = useChatStore((s) => s.messages[chatId] ?? []);
  const setMessages = useChatStore((s) => s.setMessages);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await chatService.getMessages(chatId);
        setMessages(chatId, history);
      } catch (err) {
        console.log('Failed to fetch messages: ', err);
      }
    }
    fetchHistory();
  }, [chatId]);

  const messagesWithOwnership = messages.map((msg) => ({
    ...msg,
    isMine: msg.senderId === user?.id || msg.isMine,
  }))

  return { messages: messagesWithOwnership }
}
