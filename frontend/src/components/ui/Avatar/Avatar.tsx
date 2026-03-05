interface Props {
  initial: string
  size?: 'sm' | 'md'
  className?: string
}

export default function Avatar({ initial, size = 'md', className = '' }: Props) {
  const sizes = {
    sm: 'w-[30px] h-[30px] text-xs rounded-lg',
    md: 'w-8 h-8 text-sm rounded-lg',
  }

  return (
    <div className={`${sizes[size]} bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center font-bold text-white flex-shrink-0 ${className}`}>
      {initial.toUpperCase()}
    </div>
  )
}