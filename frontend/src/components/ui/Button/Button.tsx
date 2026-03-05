import type { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  variant?: 'primary' | 'ghost'
}

export default function Button({ loading, variant = 'primary', className = '', children, disabled, ...props }: Props) {
  const base = 'flex items-center justify-center min-h-[48px] rounded-xl font-display text-[15px] font-bold tracking-tight transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-accent text-white shadow-[0_4px_20px_rgba(124,106,255,0.35)] hover:opacity-90 hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(124,106,255,0.45)] active:translate-y-0',
    ghost: 'bg-transparent text-text-2 border border-border hover:bg-bg-3 hover:text-text',
  }

  return (
    <button
      disabled={disabled ?? loading}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : children}
    </button>
  )
}