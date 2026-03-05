import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

interface AuthState {
  token: string | null
  user: User | null
  login: (token: string) => void
  logout: () => void
  isAuthed: () => boolean
}

const parseToken = (token: string): User | null => {
  try {
    return JSON.parse(atob(token.split('.')[1])) as User
  } catch {
    return null
  }
}

const isTokenExpired = (token: string): boolean => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 < Date.now();
    } catch {
        return true;
    }
}



export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,

      login: (token: string) => {
        set({ token, user: parseToken(token) })
      },

      logout: () => {
        set({ token: null, user: null })
      },

      isAuthed: () => {
        const token = get().token;
        if(!token) return false;
        // Used to check if token is expired
        if(isTokenExpired(token)) {
            set({ token: null, user: null})
            return false;
        } 
        return true;
      }

    }),
    {
      name: 'auth-storage',
    }
  )
)