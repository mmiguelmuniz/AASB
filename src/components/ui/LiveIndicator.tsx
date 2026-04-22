import { RefreshCw, Wifi, WifiOff, Clock } from 'lucide-react'
import type { FetchStatus } from '@/hooks/useSchedule'
import clsx from 'clsx'

interface Props {
  status:     FetchStatus
  lastUpdate: Date | null
  onRefetch:  () => void
}

export default function LiveIndicator({ status, lastUpdate, onRefetch }: Props) {
  const isLive     = status === 'live'
  const isFallback = status === 'fallback'
  const isLoading  = status === 'loading'

  const timeAgo = lastUpdate
    ? formatTimeAgo(lastUpdate)
    : null

  return (
    <div className={clsx(
      'flex items-center gap-3 px-4 py-2 rounded-full text-xs font-heading font-medium border',
      isLive     && 'bg-emerald-50  border-emerald-200 text-emerald-700',
      isFallback && 'bg-amber-50    border-amber-200   text-amber-700',
      isLoading  && 'bg-slate-50    border-slate-200   text-slate-500',
      status === 'idle' && 'bg-slate-50 border-slate-200 text-slate-400',
    )}>
      {/* Status dot / icon */}
      {isLive && (
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <Wifi size={12} />
          Live data
        </span>
      )}
      {isFallback && (
        <span className="flex items-center gap-1.5">
          <WifiOff size={12} />
          Offline — showing cached data
        </span>
      )}
      {isLoading && (
        <span className="flex items-center gap-1.5">
          <RefreshCw size={12} className="animate-spin" />
          Updating…
        </span>
      )}

      {/* Last updated */}
      {timeAgo && !isLoading && (
        <span className="flex items-center gap-1 opacity-60">
          <Clock size={10} />
          {timeAgo}
        </span>
      )}

      {/* Manual refresh button */}
      <button
        onClick={onRefetch}
        disabled={isLoading}
        className="ml-1 hover:opacity-70 disabled:opacity-30 transition-opacity"
        title="Refresh now"
      >
        <RefreshCw size={11} className={clsx(isLoading && 'animate-spin')} />
      </button>
    </div>
  )
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 10)  return 'just now'
  if (seconds < 60)  return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60)  return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  return `${hours}h ago`
}
