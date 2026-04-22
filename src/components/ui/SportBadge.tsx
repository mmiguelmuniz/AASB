import type { SportName } from '@/types'
import { SPORT_CONFIG } from '@/data/tournament'
import clsx from 'clsx'

interface Props {
  sport: SportName
  className?: string
}

export default function SportBadge({ sport, className }: Props) {
  const cfg = SPORT_CONFIG[sport]
  return (
    <span
      className={clsx('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold', className)}
      style={{ background: cfg.bg, color: cfg.color }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.color }} />
      {sport}
    </span>
  )
}
