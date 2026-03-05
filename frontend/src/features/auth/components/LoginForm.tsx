import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' })
  const { handleLogin, error, loading } = useAuth()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleLogin(form)
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
        required
        autoFocus
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={form.password}
        onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
        required
      />

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 font-mono text-sm text-red-400">
          {error}
        </div>
      )}

      <Button type="submit" loading={loading} className="mt-1">
        Sign In
      </Button>

      <p className="text-center font-mono text-sm text-text-2">
        No account?{' '}
        <Link to="/register" className="text-accent-2 hover:underline font-medium">
          Create one
        </Link>
      </p>
    </form>
  )
}