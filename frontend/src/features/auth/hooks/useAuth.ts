import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { authService } from '../services/auth.service'
import type { LoginPayload, RegisterPayload } from '../types/auth.types'

export const useAuth = () => {
  const { login, logout, token, user, isAuthed } = useAuthStore()
  const navigate = useNavigate()
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleLogin = async (payload: LoginPayload) => {
    setError('')
    setLoading(true)
    try {
      const { token } = await authService.login(payload)
      login(token)
      console.log('store updated, navigating...') // add this
      navigate('/chat')
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong'
      const axiosMsg = (err as { response?: { data?: { message?: string } } })
        ?.response?.data?.message
      setError(axiosMsg ?? message)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (payload: RegisterPayload) => {
    setError('')
    setLoading(true)
    try {
      await authService.register(payload)
      const { token } = await authService.login(payload)
      login(token)
      navigate('/chat')
    } catch (err: unknown) {
      const axiosMsg = (err as { response?: { data?: { message?: string } } })
        ?.response?.data?.message
      setError(axiosMsg ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return { handleLogin, handleRegister, handleLogout, error, loading, token, user, isAuthed }
}