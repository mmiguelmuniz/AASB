import { useState } from 'react'
import { MapPin } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { SCHOOLS } from '@/data/tournament'
import type { School } from '@/types'
import clsx from 'clsx'

const CITIES = ['All', ...Array.from(new Set(SCHOOLS.map(s => s.city))).sort()]

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

      {/* ── Header ── */}
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

      {/* ── Filters ── */}
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

      {/* ── Grid ── */}
      <div className="section-padding max-w-7xl mx-auto py-10">
        <p className="text-xs text-[var(--muted)] mb-6 font-body">
          {filtered.length} school{filtered.length !== 1 ? 's' : ''} found
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
          {filtered.map(school => (
            <SchoolCard
              key={school.id}
              school={school}
              onClick={() => setSelected(school)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-[var(--muted)]">
            <p className="text-4xl mb-3">🏫</p>
            <p className="font-heading text-xl text-[var(--navy)]">No schools found</p>
          </div>
        )}
      </div>

      {/* ── Modal ── */}
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
      className="
        group flex flex-col items-center gap-3 p-4 rounded-2xl
        bg-white border border-[var(--border)]
        hover:border-[var(--navy)] hover:shadow-lg
        transition-all duration-200 text-center cursor-pointer
      "
    >
      {/* Logo */}
      <div className="w-16 h-16 flex items-center justify-center">
        {school.logoUrl ? (
          <img
            src={school.logoUrl}
            alt={`${school.abbreviation} logo`}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
            onError={e => {
              const t = e.currentTarget
              t.style.display = 'none'
              t.nextElementSibling?.classList.remove('hidden')
            }}
          />
        ) : null}
        {/* Fallback */}
        <div className={clsx(
          'w-14 h-14 rounded-full bg-[var(--navy)] flex items-center justify-center font-display text-white text-xl',
          school.logoUrl ? 'hidden' : '',
        )}>
          {school.abbreviation.charAt(0)}
        </div>
      </div>

      {/* Name */}
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
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden animate-fade-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Top navy bar */}
        <div className="bg-[var(--navy)] p-8 flex flex-col items-center gap-4">
          <div className="w-28 h-28 flex items-center justify-center bg-white rounded-2xl p-2 shadow-lg">
            {school.logoUrl ? (
              <img
                src={school.logoUrl}
                alt={school.abbreviation}
                className="w-full h-full object-contain"
                onError={e => {
                  const t = e.currentTarget
                  t.style.display = 'none'
                  t.nextElementSibling?.classList.remove('hidden')
                }}
              />
            ) : null}
            <div className={clsx(
              'w-full h-full rounded-xl bg-[var(--navy)] flex items-center justify-center font-display text-white text-4xl',
              school.logoUrl ? 'hidden' : '',
            )}>
              {school.abbreviation.charAt(0)}
            </div>
          </div>
          <div className="text-center">
            <p className="font-display text-[var(--gold)] text-3xl tracking-wider">
              {school.abbreviation}
            </p>
            {school.mascot && (
              <p className="font-heading text-white/60 text-sm mt-1">{school.mascot}</p>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-6 space-y-3">
          <div>
            <p className="font-heading text-xs text-[var(--muted)] uppercase tracking-widest mb-1">School</p>
            <p className="font-heading font-semibold text-[var(--navy)] text-base leading-tight">
              {school.name}
            </p>
          </div>
          <div className="flex items-center gap-2 text-[var(--muted)]">
            <MapPin size={14} className="text-[var(--red)] flex-shrink-0" />
            <span className="font-body text-sm">{school.city}, Brazil</span>
          </div>
        </div>

        {/* Close */}
        <div className="px-6 pb-6">
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