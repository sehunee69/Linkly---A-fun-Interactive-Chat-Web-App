import type { Room } from '@/types'

interface Props {
  room: Room
}

export default function Header({ room }: Props) {
  return (
    <header className="px-6 h-[60px] border-b border-border bg-bg-2 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[22px] text-accent leading-none">#</span>
        <div>
          <h2 className="text-base font-bold tracking-tight text-text">{room.name}</h2>
          <p className="font-mono text-xs text-text-3 font-light">{room.desc}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 font-mono text-xs text-text-2 bg-bg-3 px-3 py-1.5 rounded-full border border-border">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        online
      </div>
    </header>
  )
}