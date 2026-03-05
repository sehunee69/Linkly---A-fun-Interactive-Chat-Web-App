import type { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function Input({ label, className = '', ...props }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-xs font-semibold tracking-widest uppercase text-text-2">
          {label}
        </label>
      )}
      <input
        className={`bg-bg-3 border border-border rounded-xl px-4 py-3 font-mono text-sm text-text outline-none transition-all duration-200
          placeholder:text-text-3
          focus:border-accent focus:shadow-[0_0_0_3px_rgba(124,106,255,0.2)]
          ${className}`}
        {...props}
      />
    </div>
  )
}