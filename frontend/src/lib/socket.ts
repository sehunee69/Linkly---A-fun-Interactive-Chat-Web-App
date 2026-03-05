import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export const getSocket = (token: string): Socket => {
  if (!socket) {
    socket = io('http://localhost:5001', {
      auth: { token },
      autoConnect: false,
    })

    socket.on('connect_error', (err) => {
        if(err.message === 'Unauthorized!') {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    })
  }
  return socket
}

export const connectSocket = (token: string): Socket => {
  const s = getSocket(token)
  if (!s.connected) s.connect()
  return s
}

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}