export interface User {
  id: string
  email: string
}

export interface Message {
  _id: string
  chatId: string
  senderId: string
  content: string
  createdAt: string
  isMine?: boolean
}

export interface Room {
  id: string
  name: string
  desc: string
}