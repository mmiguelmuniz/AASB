import { useState, useMemo } from 'react'
import { Search, Filter } from 'lucide-react'
import { useSchedule } from '@/hooks/useSchedule'
import LiveIndicator from '@/components/ui/LiveIndicator'
import SportBadge from '@/components/ui/SportBadge'
import SectionHeader from '@/components/ui/SectionHeader'
import type { Game, SportName, GamePhase } from '@/types'
import clsx from 'clsx'

const ALL_SPORTS: SportName[] = [
  'Boys Futsal', 'Girls Futsal',
  'Boys Volleyball', 'Girls Volleyball',
  'Softball', 'Cheerleading',
]

const DAYS = [
  { label: 'Sat 2',  date: '2026-05-02' },
  { label: 'Sun 3',  date: '2026-05-03' },
  { label: 'Mon 4',  date: '2026-05-04' },
  { label: 'Tue 5',  date: '2026-05-05' },
  { label: 'Wed 6',  date: '2026-05-06' },
  { label: 'Thu 7',  date: '2026-05-07' },
  { label: 'Fri 8',  date: '2026-05-08' },
]

const DAY_FULL: Record<string, string> = {
  '2026-05-02': 'Saturday, May 2',
  '2026-05-03': 'Sunday, May 3',
  '2026-05-04': 'Monday, May 4',
  '2026-05-05': 'Tuesday, May 5',
  '2026-05-06': 'Wednesday, May 6',
  '2026-05-07': 'Thursday, May 7',
  '2026-05-08': 'Friday, May 8',
}

const PHASE_STYLE: Record<GamePhase, string> = {
  'Group Stage':   'bg-slate-100 text-slate-600',
  'Consolation':   'bg-orange-100 text-orange-700',
  'Quarter-Final': 'bg-blue-100 text-blue-700',
  'Semi-Final':    'bg-purple-100 text-purple-700',
  'Final':         'bg-yellow-100 text-yellow-700 font-semibold',
  'Playoff':       'bg-pink-100 text-pink-700',
}

export default function SchedulePage() {
  const { games, status, lastUpdate, refetch } = useSchedule()

  const [search,      setSearch]      = useState('')
  const [activeSport, setActiveSport] = useState<SportName | 'all'>('all')
  const [activeDay,   setActiveDay]   = useState<string>('all')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return games.filter((g) => {
      if (activeSport !== 'all' && g.sport !== activeSport) return false
      if (activeDay   !== 'all' && g.date  !== activeDay)   return false
      if (q && !g.team1.toLowerCase().includes(q) &&
               !g.team2.toLowerCase().includes(q) &&
               !g.sport.toLowerCase().includes(q)) return false
      return true
    })
  }, [games, activeSport, activeDay, search])

  const byDay = useMemo(() => {
    const map = new Map<string, Game[]>()
    for (const g of filtered) {
      if (!map.has(g.date)) map.set(g.date, [])
      map.get(g.date)!.push(g)
    }
    for (const [, list] of map) {
      list.sort((a, b) => a.time.localeCompare(b.time))
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b))
  }, [filtered])

  const activeSports = useMemo(
    () => ALL_SPORTS.filter((s) => games.some((g) => g.sport === s)),
    [games],
  )

  return (
    <div className="min-h-screen bg-[var(--light)] pt-20">
      <div className="bg-[var(--navy)] section-padding py-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeader
            eyebrow="May 2 – 8, 2026"
            title="Game Schedule"
            subtitle="Live results synced from the official Google Sheets — refreshed every 60 seconds."
            light
          />
          <LiveIndicator status={status} lastUpdate={lastUpdate} onRefetch={refetch} />
        </div>
      </div>

      <div className="bg-white border-b border-[var(--border)] sticky top-16 z-30 shadow-sm">
        <div className="section-padding max-w-7xl mx-auto py-3 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
            <input
              type="text"
              placeholder="Search team…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--navy)] bg-[var(--light)] font-body"
            />
          </div>
          <div className="w-px h-6 bg-[var(--border)]" />
          <div className="flex gap-1.5 flex-wrap">
            <Pill active={activeDay === 'all'} onClick={() => setActiveDay('all')}>All days</Pill>
            {DAYS.filter((d) => games.some((g) => g.date === d.date)).map((d) => (
              <Pill key={d.date} active={activeDay === d.date} onClick={() => setActiveDay(d.date)}>
                {d.label}
              </Pill>
            ))}
          </div>
          <div className="w-px h-6 bg-[var(--border)]" />
          <div className="flex gap-1.5 flex-wrap">
            <Pill active={activeSport === 'all'} onClick={() => setActiveSport('all')}>
              <Filter size={11} /> All sports
            </Pill>
            {activeSports.map((s) => (
              <Pill key={s} active={activeSport === s} onClick={() => setActiveSport(s as SportName)}>
                {s}
              </Pill>
            ))}
          </div>
        </div>
      </div>

      <div className="section-padding max-w-7xl mx-auto pt-4 pb-1">
        <p className="text-xs text-[var(--muted)] font-body">
          {filtered.length === 0 ? 'No games found' : `${filtered.length} game${filtered.length !== 1 ? 's' : ''} found`}
          {status === 'loading' && ' · Updating…'}
        </p>
      </div>

      <div className="section-padding max-w-7xl mx-auto pb-20 space-y-10">
        {byDay.length === 0 && status !== 'loading' && (
          <div className="text-center py-24 text-[var(--muted)]">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-heading text-xl text-[var(--navy)]">No games found</p>
            <p className="text-sm mt-1">Try adjusting the filters or search term.</p>
          </div>
        )}
        {byDay.map(([date, dayGames]) => (
          <DayBlock key={date} date={date} games={dayGames} />
        ))}
      </div>
    </div>
  )
}

function DayBlock({ date, games }: { date: string; games: Game[] }) {
  return (
    <section>
      <div className="flex items-center gap-4 mb-4">
        <div>
          <p className="font-display text-2xl text-[var(--navy)] leading-none">{DAY_FULL[date] ?? date}</p>
          <p className="font-body text-xs text-[var(--muted)] mt-0.5">{games.length} game{games.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex-1 h-px bg-[var(--border)]" />
      </div>
      <div className="space-y-2">
        {games.map((game) => <GameCard key={game.id} game={game} />)}
      </div>
    </section>
  )
}

function GameCard({ game }: { game: Game }) {
  const scoreText = game.scoreDisplay
    ?? (game.score1 != null && game.score2 != null ? `${game.score1} – ${game.score2}` : null)
  const winner = scoreText ? getWinner(game) : null

  return (
    <div className="bg-white rounded-xl border border-[var(--border)] px-4 py-3 flex flex-wrap items-center gap-3 hover:shadow-md transition-shadow">
      <span className="font-heading text-base font-semibold text-[var(--red)] w-12 flex-shrink-0">{game.time}</span>
      <SportBadge sport={game.sport} className="hidden sm:inline-flex" />
      <div className="flex-1 flex items-center gap-3 min-w-0">
        <span className={clsx('font-heading font-semibold text-sm truncate', winner === 1 ? 'text-[var(--navy)]' : 'text-[var(--text)]')}>
          {winner === 1 && <span className="text-[var(--gold)] mr-1">★</span>}{game.team1}
        </span>
        <div className="flex-shrink-0">
          {scoreText
            ? <span className="font-heading font-bold text-[var(--navy)] text-sm px-2 py-0.5 bg-[var(--light)] rounded">{scoreText}</span>
            : <span className="font-body text-xs text-[var(--muted)] px-2">vs</span>
          }
        </div>
        <span className={clsx('font-heading font-semibold text-sm truncate', winner === 2 ? 'text-[var(--navy)]' : 'text-[var(--text)]')}>
          {winner === 2 && <span className="text-[var(--gold)] mr-1">★</span>}{game.team2}
        </span>
      </div>
      <div className="flex items-center gap-2 ml-auto flex-shrink-0">
        <span className="font-body text-xs text-[var(--muted)]">{game.venue}</span>
        {game.group && <><span className="text-[var(--border)]">·</span><span className="font-body text-xs text-[var(--muted)]">Grp {game.group}</span></>}
        <span className={clsx('hidden sm:inline text-xs px-2 py-0.5 rounded-full font-body', PHASE_STYLE[game.phase])}>{game.phase}</span>
      </div>
    </div>
  )
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={clsx(
      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-medium transition-all',
      active ? 'bg-[var(--navy)] text-white shadow-sm' : 'bg-[var(--light)] text-[var(--muted)] hover:bg-[var(--border)] hover:text-[var(--text)]',
    )}>
      {children}
    </button>
  )
}

function getWinner(game: Game): 1 | 2 | null {
  if (game.score1 == null || game.score2 == null) return null
  if (game.score1 > game.score2) return 1
  if (game.score2 > game.score1) return 2
  return null
}
