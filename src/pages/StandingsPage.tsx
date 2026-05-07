import { useState } from 'react'
import { useStandings } from '@/hooks/useStandings'
import LiveIndicator from '@/components/ui/LiveIndicator'
import SectionHeader from '@/components/ui/SectionHeader'
import type { SportStandings, StandingEntry } from '@/lib/standingsParser'
import type { SportName } from '@/types'
import { SPORT_CONFIG } from '@/data/tournament'
import clsx from 'clsx'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

const SPORT_TABS: SportName[] = [
  'Boys Futsal', 'Girls Futsal',
  'Girls Volleyball', 'Boys Volleyball',
  'Cheerleading',
]

export default function StandingsPage() {
  const { standings, status, lastUpdate, refetch } = useStandings()
  const [activeSport, setActiveSport] = useState<SportName>('Boys Futsal')
  const current = standings.find((s) => s.sport === activeSport)

  return (
    <div className="min-h-screen bg-[var(--light)] pt-20">
      <div className="bg-[var(--navy)] section-padding py-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeader eyebrow="Live Standings" title="Group Standings"
            subtitle="Updated automatically from the official Google Sheets." light />
          <LiveIndicator status={status} lastUpdate={lastUpdate} onRefetch={refetch} />
        </div>
      </div>

      <div className="bg-white border-b border-[var(--border)] sticky top-16 z-30 shadow-sm">
        <div className="section-padding max-w-7xl mx-auto">
          <div className="flex gap-1 overflow-x-auto py-3">
            {SPORT_TABS.map((sport) => {
              const cfg = SPORT_CONFIG[sport]
              const isActive = sport === activeSport
              return (
                <button key={sport} onClick={() => setActiveSport(sport)}
                  className={clsx(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-heading font-medium whitespace-nowrap transition-all',
                    isActive ? 'text-white shadow-sm' : 'text-[var(--muted)] hover:text-[var(--text)] bg-[var(--light)]',
                  )}
                  style={isActive ? { background: cfg.color } : undefined}
                >
                  <span>{cfg.icon}</span>{sport}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="section-padding max-w-7xl mx-auto py-10">
        {status === 'loading' && !current && (
          <div className="flex justify-center py-24">
            <LoadingSpinner size="lg" label="Loading standings…" />
          </div>
        )}

        {status === 'fallback' && !current && (
          <div className="text-center py-24">
            <p className="text-4xl mb-3">📡</p>
            <p className="font-heading text-xl text-[var(--navy)] mb-2">Could not connect to Google Sheets</p>
            <p className="text-sm text-[var(--muted)]">Check your connection and try refreshing.</p>
          </div>
        )}

        {current && <SportStandingsView standing={current} />}

        {!current && status === 'live' && (
          <div className="text-center py-24 text-[var(--muted)]">
            <p className="text-4xl mb-3">📊</p>
            <p className="font-heading text-xl text-[var(--navy)]">No standings yet</p>
            <p className="text-sm mt-1">Results will appear here once games begin.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function SportStandingsView({ standing }: { standing: SportStandings }) {
  const cfg      = SPORT_CONFIG[standing.sport]
  const isFutsal = standing.sport.includes('Futsal')

  return (
    <div className="space-y-8">

            {/* Final Group Standings — Boys Futsal (hardcoded) */}
      {standing.sport === 'Boys Futsal' && (
        <FinalGroupStandingsTable
          title="Final Group Standings"
          accentColor={cfg.color}
          rows={[
            { place: '1st', A: 'PACA',     B: 'Graded A', C: 'EARJ',  D: 'Nations'   },
            { place: '2nd', A: 'PASB',     B: 'Chapel',   C: 'EAB',   D: "Sant'anna"  },
            { place: '3rd', A: 'OLM',      B: 'ISC',      C: 'EAC A', D: 'EARJ B'    },
            { place: '4th', A: 'Graded B', B: 'EAC B',    C: 'EAR',   D: 'EABH'      },
          ]}
        />
      )}

      {/* Final Group Standings — Girls Volleyball (hardcoded) */}
      {standing.sport === 'Girls Volleyball' && (
        <FinalGroupStandingsTable
          title="Final Group Standings"
          accentColor={cfg.color}
          rows={[
            { place: '1st', A: 'EABH',    B: 'ISC Blue', C: 'EARJ A',   D: 'OLM'       },
            { place: '2nd', A: 'Chapel',  B: 'PASB',     C: "Sant'anna", D: 'PACA'      },
            { place: '3rd', A: 'EAC',     B: 'Graded A', C: 'Nations',   D: 'EAR'       },
            { place: '4th', A: 'EAB',     B: 'EARJ B',   C: 'Graded B',  D: 'ISC White' },
          ]}
        />
      )}

      {standing.groups.map((group) => (
        <div key={group.group}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-display text-white text-lg"
              style={{ background: cfg.color }}>
              {group.group === 'Overall' ? '🏆' : group.group}
            </div>
            <h3 className="font-heading font-bold text-[var(--navy)] text-xl">
              {group.group === 'RR' ? 'Round Robin'
                : group.group === 'Overall' ? 'Cheerleading Routine Competition'
                : `Group ${group.group}`}
            </h3>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm table-fixed">
                <thead>
                  <tr className="bg-[var(--light)] border-b border-[var(--border)]">
                    <th className="text-left px-4 py-3 font-heading text-xs text-[var(--muted)] uppercase tracking-wider w-8">#</th>
                    <th className="text-left px-4 py-3 font-heading text-xs text-[var(--muted)] uppercase tracking-wider">School</th>
                    <th className="text-center px-3 py-3 font-heading text-xs text-[var(--muted)] uppercase tracking-wider">Pts</th>
                    {isFutsal ? (
                      <>
                        <th className="text-center px-3 py-3 font-heading text-xs text-[var(--muted)] uppercase tracking-wider">W</th>
                        <th className="text-center px-3 py-3 font-heading text-xs text-[var(--muted)] uppercase tracking-wider">D</th>
                        <th className="text-center px-3 py-3 font-heading text-xs text-[var(--muted)] uppercase tracking-wider">L</th>
                        <th className="text-center px-3 py-3 font-heading text-xs text-[var(--muted)] uppercase tracking-wider hidden sm:table-cell">GF</th>
                        <th className="text-center px-3 py-3 font-heading text-xs text-[var(--muted)] uppercase tracking-wider hidden sm:table-cell">GA</th>
                        <th className="text-center px-3 py-3 font-heading text-xs text-[var(--muted)] uppercase tracking-wider">GD</th>
                      </>
                    ) : standing.sport === 'Cheerleading' ? (
                      <th className="text-center px-3 py-3 font-heading text-xs text-[var(--muted)] uppercase tracking-wider">Standing</th>
                    ) : (
                      <>
                        <th className="text-center px-3 py-3 font-heading text-xs text-[var(--muted)] uppercase tracking-wider">GP</th>
                        <th className="text-center px-3 py-3 font-heading text-xs text-[var(--muted)] uppercase tracking-wider">SW</th>
                        <th className="text-center px-3 py-3 font-heading text-xs text-[var(--muted)] uppercase tracking-wider">SL</th>
                        <th className="text-center px-3 py-3 font-heading text-xs text-[var(--muted)] uppercase tracking-wider hidden sm:table-cell">PF</th>
                        <th className="text-center px-3 py-3 font-heading text-xs text-[var(--muted)] uppercase tracking-wider hidden sm:table-cell">PA</th>
                        <th className="text-center px-3 py-3 font-heading text-xs text-[var(--muted)] uppercase tracking-wider hidden sm:table-cell">Pos</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {group.entries.map((entry, i) => (
                    <StandingRow key={entry.school + i} entry={entry} position={i + 1}
                      isFutsal={isFutsal} accentColor={cfg.color} total={group.entries.length}
                      sport={standing.sport} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function StandingRow({ entry, position, isFutsal, accentColor, total, sport }: {
  entry: StandingEntry; position: number; isFutsal: boolean; accentColor: string; total: number; sport: string
}) {
  const isTop2 = position <= 2
  const isLast = position === total

  return (
    <tr className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--light)] transition-colors">
      <td className="px-4 py-3">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-heading font-bold"
          style={isTop2 ? { background: accentColor, color: 'white' }
            : { background: 'var(--light)', color: isLast ? 'var(--muted)' : 'var(--muted)' }}>
          {position}
        </div>
      </td>
      <td className="px-4 py-3">
        <span className={clsx('font-heading font-semibold', isTop2 ? 'text-[var(--navy)]' : 'text-[var(--text)]')}>
          {entry.school}
        </span>
      </td>
      <td className="px-3 py-3 text-center">
        <span className={clsx('font-heading font-bold text-base', isTop2 ? 'text-[var(--navy)]' : 'text-[var(--text)]')}>
          {entry.pts ?? '—'}
        </span>
      </td>
      {isFutsal ? (
        <>
          <td className="px-3 py-3 text-center font-body text-sm">{entry.won ?? '—'}</td>
          <td className="px-3 py-3 text-center font-body text-sm text-[var(--muted)]">{entry.drawn ?? '—'}</td>
          <td className="px-3 py-3 text-center font-body text-sm">{entry.lost ?? '—'}</td>
          <td className="px-3 py-3 text-center font-body text-sm text-[var(--muted)] hidden sm:table-cell">{entry.goalsFor ?? '—'}</td>
          <td className="px-3 py-3 text-center font-body text-sm text-[var(--muted)] hidden sm:table-cell">{entry.goalsAgainst ?? '—'}</td>
          <td className="px-3 py-3 text-center font-body text-sm font-semibold"><GoalDiff value={entry.goalDiff} /></td>
        </>
      ) : sport === 'Cheerleading' ? (
        <td className="px-3 py-3 text-center">
          {entry.place
            ? <span className="font-heading text-xs font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">{entry.place}</span>
            : <span className="text-[var(--muted)]">—</span>}
        </td>
      ) : (
        <>
          <td className="px-3 py-3 text-center font-body text-sm text-[var(--muted)]">{entry.gp ?? '—'}</td>
          <td className="px-3 py-3 text-center font-body text-sm">{entry.setsWon ?? '—'}</td>
          <td className="px-3 py-3 text-center font-body text-sm">{entry.setsLost ?? '—'}</td>
          <td className="px-3 py-3 text-center font-body text-sm text-[var(--muted)] hidden sm:table-cell">{entry.ptsFor ?? '—'}</td>
          <td className="px-3 py-3 text-center font-body text-sm text-[var(--muted)] hidden sm:table-cell">{entry.ptsAgainst ?? '—'}</td>
          <td className="px-3 py-3 text-center hidden sm:table-cell">
            {entry.place
              ? <span className="font-heading text-xs font-bold px-2 py-0.5 rounded-full bg-[var(--light)] text-[var(--navy)]">{entry.place}</span>
              : <span className="text-[var(--muted)]">—</span>}
          </td>
        </>
      )}
    </tr>
  )
}

function FinalGroupStandingsTable({ title, accentColor, rows }: {
  title: string
  accentColor: string
  rows: { place: string; A: string; B: string; C: string; D: string }[]
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
          style={{ background: accentColor }}>🏆</div>
        <h3 className="font-heading font-bold text-[var(--navy)] text-xl">{title}</h3>
        <div className="flex-1 h-px bg-[var(--border)]" />
      </div>
      <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--light)] border-b border-[var(--border)]">
                <th className="text-left px-4 py-3 font-heading text-xs text-[var(--muted)] uppercase tracking-wider w-20">Place</th>
                {['A','B','C','D'].map(g => (
                  <th key={g} className="text-center px-4 py-3 font-heading text-xs text-[var(--muted)] uppercase tracking-wider">
                    Group {g}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.place} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--light)] transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-heading font-bold text-sm text-[var(--navy)]">{row.place}</span>
                  </td>
                  {['A','B','C','D'].map(g => (
                    <td key={g} className="px-4 py-3 text-center">
                      <span className={clsx('font-heading text-sm', i < 2 ? 'font-semibold text-[var(--navy)]' : 'text-[var(--text)]')}>
                        {i < 2 && row[g as 'A'|'B'|'C'|'D'] ? '⭐ ' : ''}{row[g as 'A'|'B'|'C'|'D'] || '—'}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function GoalDiff({ value }: { value: number | null }) {
  if (value === null) return <span className="text-[var(--muted)]">—</span>
  if (value > 0) return <span className="text-emerald-600">+{value}</span>
  if (value < 0) return <span className="text-red-500">{value}</span>
  return <span className="text-[var(--muted)]">0</span>
}