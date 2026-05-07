import { useState, useEffect, useMemo } from 'react'
import { MapPin, X, Calendar, Trophy } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import SportBadge from '@/components/ui/SportBadge'
import { SCHOOLS } from '@/data/tournament'
import { useSchedule } from '@/hooks/useSchedule'
import type { School } from '@/types'
import clsx from 'clsx'

const CITIES = ['All', ...Array.from(new Set(SCHOOLS.map(s => s.city))).sort()]

const PHASE_STYLE: Record<string, string> = {
  'Group Stage':   'bg-slate-100 text-slate-600',
  'Consolation':   'bg-orange-100 text-orange-700',
  'Quarter-Final': 'bg-blue-100 text-blue-700',
  'Semi-Final':    'bg-purple-100 text-purple-700',
  'Final':         'bg-yellow-100 text-yellow-700 font-semibold',
  'Playoff':       'bg-pink-100 text-pink-700',
}

export default function SchoolsPage() {
  const [search,     setSearch]     = useState('')
  const [activeCity, setActiveCity] = useState('All')
  const [selected,   setSelected]   = useState<School | null>(null)

  const filtered = SCHOOLS.filter(s => {
    const q = search.toLowerCase()
    if (activeCity !== 'All' && s.city !== activeCity) return false
    if (q && !s.name.toLowerCase().includes(q) &&
             !s.abbreviation.toLowerCase().includes(q) &&
             !s.city.toLowerCase().includes(q)) return false
    return true
  })

  return (
    <div className="min-h-screen bg-[var(--light)] pt-20">
      <div className="bg-[var(--navy)] section-padding py-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="AASB Middle School 2026"
            title="Participating Schools"
            subtitle={`${SCHOOLS.length} schools competing from across Brazil.`}
            light
          />
        </div>
      </div>

      <div className="bg-white border-b border-[var(--border)] sticky top-16 z-30 shadow-sm">
        <div className="section-padding max-w-7xl mx-auto py-3 flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Search school…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-[180px] max-w-xs px-4 py-2 text-sm rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--navy)] bg-[var(--light)] font-body"
          />
          <div className="w-px h-6 bg-[var(--border)]" />
          <div className="flex gap-1.5 flex-wrap">
            {CITIES.map(city => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={clsx(
                  'px-3 py-1.5 rounded-full text-xs font-heading font-medium transition-all',
                  activeCity === city
                    ? 'bg-[var(--navy)] text-white shadow-sm'
                    : 'bg-[var(--light)] text-[var(--muted)] hover:bg-[var(--border)]',
                )}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="section-padding max-w-7xl mx-auto py-10">
        <p className="text-xs text-[var(--muted)] mb-6 font-body">
          {filtered.length} school{filtered.length !== 1 ? 's' : ''} found
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
          {filtered.map(school => (
            <SchoolCard key={school.id} school={school} onClick={() => setSelected(school)} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-24 text-[var(--muted)]">
            <p className="text-4xl mb-3">🏫</p>
            <p className="font-heading text-xl text-[var(--navy)]">No schools found</p>
          </div>
        )}
      </div>

      {selected && (
        <SchoolModal school={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}

// ── School Card ───────────────────────────────────────
function SchoolCard({ school, onClick }: { school: School; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-white border border-[var(--border)] hover:border-[var(--navy)] hover:shadow-lg transition-all duration-200 text-center cursor-pointer"
    >
      <div className="w-16 h-16 flex items-center justify-center">
        {school.logoUrl ? (
          <>
            <img
              src={school.logoUrl}
              alt={`${school.abbreviation} logo`}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
              onError={e => {
                e.currentTarget.style.display = 'none'
                const fb = e.currentTarget.nextElementSibling as HTMLElement
                if (fb) fb.classList.remove('hidden')
              }}
            />
            <div className="hidden w-14 h-14 rounded-full bg-[var(--navy)] flex items-center justify-center font-display text-white text-xl">
              {school.abbreviation.charAt(0)}
            </div>
          </>
        ) : (
          <div className="w-14 h-14 rounded-full bg-[var(--navy)] flex items-center justify-center font-display text-white text-xl">
            {school.abbreviation.charAt(0)}
          </div>
        )}
      </div>
      <div>
        <p className="font-heading font-bold text-sm text-[var(--navy)] group-hover:text-[var(--red)] transition-colors leading-tight">
          {school.abbreviation}
        </p>
        {school.mascot && (
          <p className="font-body text-xs text-[var(--muted)] mt-0.5">{school.mascot}</p>
        )}
      </div>
    </button>
  )
}

// ── School Modal ──────────────────────────────────────
function SchoolModal({ school, onClose }: { school: School; onClose: () => void }) {
  const { games } = useSchedule()
  const [tab, setTab] = useState<'info' | 'games'>('info')

  // Filter games for this school
  const schoolGames = useMemo(() => {
    const abbr = school.abbreviation.toLowerCase().trim()

    // Match team name exactly or with suffix (e.g. "EAR" matches "EAR" and "EAR B" but NOT "EARJ")
    const matchesTeam = (team: string) => {
      const t = team.toLowerCase().trim()
      return t === abbr ||                          // exact: "ear" === "ear"
             t.startsWith(abbr + ' ') ||            // with suffix: "ear b"
             t.startsWith(abbr + '-')               // with dash: "ear-b"
    }

    return games
      .filter(g => matchesTeam(g.team1) || matchesTeam(g.team2))
      .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
  }, [games, school])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const DAY_LABELS: Record<string, string> = {
    '2026-05-02': 'Sat, May 2',
    '2026-05-03': 'Sun, May 3',
    '2026-05-04': 'Mon, May 4',
    '2026-05-05': 'Tue, May 5',
    '2026-05-06': 'Wed, May 6',
    '2026-05-07': 'Thu, May 7',
    '2026-05-08': 'Fri, May 8',
  }

  // Group games by date
  const byDate = useMemo(() => {
    const map = new Map<string, typeof schoolGames>()
    for (const g of schoolGames) {
      if (!map.has(g.date)) map.set(g.date, [])
      map.get(g.date)!.push(g)
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b))
  }, [schoolGames])

  const won  = schoolGames.filter(g => {
    if (g.score1 == null || g.score2 == null) return false
    const isTeam1 = g.team1.toLowerCase().includes(school.abbreviation.toLowerCase())
    return isTeam1 ? g.score1 > g.score2 : g.score2 > g.score1
  }).length
  const played = schoolGames.filter(g => g.score1 != null).length

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-fade-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[var(--navy)] p-6 flex items-center gap-4 flex-shrink-0">
          <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center bg-white rounded-2xl p-2 shadow-lg">
            {school.logoUrl ? (
              <img src={school.logoUrl} alt={school.abbreviation} className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-display text-[var(--navy)] text-3xl">
                {school.abbreviation.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-[var(--gold)] text-2xl tracking-wider">{school.abbreviation}</p>
            <p className="font-body text-white/70 text-sm leading-tight">{school.name}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin size={11} className="text-white/40" />
              <span className="font-body text-xs text-white/50">{school.city}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors flex-shrink-0">
            <X size={20} />
          </button>
        </div>

        {/* Stats strip */}
        {played > 0 && (
          <div className="flex border-b border-[var(--border)] bg-[var(--light)] flex-shrink-0">
            <div className="flex-1 py-3 text-center border-r border-[var(--border)]">
              <p className="font-display text-2xl text-[var(--navy)]">{played}</p>
              <p className="font-body text-xs text-[var(--muted)]">Played</p>
            </div>
            <div className="flex-1 py-3 text-center border-r border-[var(--border)]">
              <p className="font-display text-2xl text-emerald-600">{won}</p>
              <p className="font-body text-xs text-[var(--muted)]">Won</p>
            </div>
            <div className="flex-1 py-3 text-center">
              <p className="font-display text-2xl text-[var(--red)]">{played - won}</p>
              <p className="font-body text-xs text-[var(--muted)]">Lost</p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-[var(--border)] flex-shrink-0">
          <button
            onClick={() => setTab('info')}
            className={clsx('flex-1 py-3 font-heading text-sm font-medium transition-colors flex items-center justify-center gap-2',
              tab === 'info' ? 'text-[var(--navy)] border-b-2 border-[var(--navy)]' : 'text-[var(--muted)]')}
          >
            <Trophy size={14} /> Info
          </button>
          <button
            onClick={() => setTab('games')}
            className={clsx('flex-1 py-3 font-heading text-sm font-medium transition-colors flex items-center justify-center gap-2',
              tab === 'games' ? 'text-[var(--navy)] border-b-2 border-[var(--navy)]' : 'text-[var(--muted)]')}
          >
            <Calendar size={14} /> Games ({schoolGames.length})
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          {tab === 'info' && (
            <div className="p-6 space-y-4">
              <div>
                <p className="font-heading text-xs text-[var(--muted)] uppercase tracking-widest mb-1">School</p>
                <p className="font-heading font-semibold text-[var(--navy)]">{school.name}</p>
              </div>
              <div>
                <p className="font-heading text-xs text-[var(--muted)] uppercase tracking-widest mb-1">City</p>
                <p className="font-body text-sm text-[var(--text)]">{school.city}, Brazil</p>
              </div>
              {school.mascot && (
                <div>
                  <p className="font-heading text-xs text-[var(--muted)] uppercase tracking-widest mb-1">Mascot</p>
                  <p className="font-body text-sm text-[var(--text)]">{school.mascot}</p>
                </div>
              )}
              <div className="pt-2">
                <button
                  onClick={() => setTab('games')}
                  className="w-full py-3 rounded-xl bg-[var(--navy)] text-white font-heading font-semibold text-sm hover:bg-[var(--navy-light)] transition-colors"
                >
                  View {schoolGames.length} Games →
                </button>
              </div>
            </div>
          )}

          {tab === 'games' && (
            <div className="p-4 space-y-4">
              {byDate.length === 0 ? (
                <div className="text-center py-10 text-[var(--muted)]">
                  <p className="text-3xl mb-2">📅</p>
                  <p className="font-heading">No games found</p>
                </div>
              ) : (
                byDate.map(([date, dayGames]) => (
                  <div key={date}>
                    <p className="font-heading font-semibold text-xs text-[var(--muted)] uppercase tracking-widest mb-2">
                      {DAY_LABELS[date] ?? date}
                    </p>
                    <div className="space-y-2">
                      {dayGames.map(game => {
                        const abbr3 = school.abbreviation.toLowerCase().trim()
                        const gt1 = game.team1.toLowerCase().trim()
                        const isTeam1 = gt1 === abbr3 || gt1.startsWith(abbr3 + ' ') || gt1.startsWith(abbr3 + '-')
                        const opponent = isTeam1 ? game.team2 : game.team1
                        const myScore = isTeam1 ? game.score1 : game.score2
                        const oppScore = isTeam1 ? game.score2 : game.score1
                        const hasScore = myScore != null && oppScore != null
                        const won = hasScore && myScore! > oppScore!
                        const lost = hasScore && myScore! < oppScore!

                        return (
                          <div key={game.id} className="bg-[var(--light)] rounded-xl px-3 py-2.5 space-y-1.5">
                            {/* Top: sport badge + time + venue */}
                            <div className="flex items-center gap-2">
                              <span className="font-heading text-xs text-[var(--red)] w-10 flex-shrink-0">{game.time}</span>
                              <SportBadge sport={game.sport} className="flex-shrink-0" />
                              <span className="font-body text-xs text-[var(--muted)] ml-auto">{game.venue}</span>
                            </div>
                            {/* Bottom: matchup + score */}
                            <div className="flex items-center gap-2 pl-12">
                              <span className="font-heading font-bold text-xs text-[var(--navy)]">
                                {school.abbreviation}
                              </span>
                              {hasScore ? (
                                <span className={clsx(
                                  'font-heading font-bold text-xs px-2 py-0.5 rounded flex-shrink-0',
                                  won ? 'bg-emerald-100 text-emerald-700' :
                                  lost ? 'bg-red-100 text-red-600' :
                                  'bg-slate-100 text-slate-600'
                                )}>
                                  {myScore} – {oppScore}
                                </span>
                              ) : (
                                <span className="text-[var(--muted)] text-xs font-body">vs</span>
                              )}
                              <span className="font-heading text-xs text-[var(--muted)] truncate">{opponent}</span>
                              <span className={clsx('text-xs px-1.5 py-0.5 rounded font-body flex-shrink-0 ml-auto', PHASE_STYLE[game.phase] ?? 'bg-slate-100 text-slate-600')}>
                                {game.phase === 'Group Stage' ? 'Group' : game.phase}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[var(--border)] flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[var(--light)] text-[var(--navy)] font-heading font-semibold text-sm hover:bg-[var(--border)] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}