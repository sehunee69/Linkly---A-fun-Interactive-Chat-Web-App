import api from '@/lib/axios'
import type { LoginPayload, RegisterPayload, AuthResponse } from '../types/auth.types'

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>('/auth/login', payload)
    return res.data
  },

  register: async (payload: RegisterPayload): Promise<void> => {
    await api.post('/auth/register', payload)
  },
}