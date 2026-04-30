import { Link } from 'react-router-dom'
import { ChevronDown, Calendar, MapPin } from 'lucide-react'
import { TOURNAMENT, SPORT_BLOCKS } from '@/data/tournament'
import Button from '@/components/ui/Button'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[var(--navy)]">

      {/* ── Layered background ── */}
      <div className="absolute inset-0 z-0">
        {/* Diagonal stripe */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg,
                #0B1E3D 0%,
                #0B1E3D 55%,
                #9e0d24 55%,
                #C8102E 100%
              )
            `,
          }}
        />
        {/* Noise/texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
        {/* Gold accent circle */}
        <div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, var(--gold) 0%, transparent 70%)' }}
        />
        {/* Top-left glow */}
        <div
          className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #4a6fa5 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Gold top bar ── */}
      <div className="absolute top-0 inset-x-0 h-1 bg-[var(--gold)] z-10" />

      {/* ── Content ── */}
      <div className="relative z-10 section-padding max-w-7xl mx-auto w-full pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <span className="h-px w-10 bg-[var(--gold)]" />
              <span className="font-heading text-[var(--gold)] text-xs tracking-[0.3em] uppercase">
                AASB · 2026
              </span>
            </div>

            {/* Main title */}
            <h1
              className="font-display text-white leading-none mb-6 animate-fade-up"
              style={{ fontSize: 'clamp(52px, 8vw, 96px)', animationDelay: '0.2s' }}
            >
              MIDDLE
              <br />
              <span className="text-[var(--gold)]">SCHOOL</span>
              <br />
              NATIONALS
            </h1>

            {/* Meta info */}
            <div
              className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-up"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="flex items-center gap-2 text-white/70">
                <Calendar size={15} className="text-[var(--gold)] flex-shrink-0" />
                <span className="font-body text-sm">May 2 – 8, 2026</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/20 self-center" />
              <div className="flex items-center gap-2 text-white/70">
                <MapPin size={15} className="text-[var(--gold)] flex-shrink-0" />
                <span className="font-body text-sm">{TOURNAMENT.location}</span>
              </div>
            </div>

            {/* Host badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 mb-10 animate-fade-up"
              style={{ animationDelay: '0.35s' }}
            >
              <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
              <span className="font-body text-xs text-white/70">
                Hosted by <span className="text-white font-semibold">EAR</span> &amp; <span className="text-white font-semibold">PACA</span>
              </span>
            </div>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-3 animate-fade-up"
              style={{ animationDelay: '0.4s' }}
            >
              <Link to="/schedule">
                <Button variant="secondary" size="lg">
                  View Schedule
                </Button>
              </Link>
              <Link to="/schools">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/40 text-white hover:bg-white hover:text-[var(--navy)]"
                >
                  Meet the Schools
                </Button>
              </Link>
            </div>
          </div>

          {/* Right — sport blocks */}
          <div className="flex flex-col gap-4 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            {SPORT_BLOCKS.map((block, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-colors group"
              >
                <p className="font-heading text-[var(--gold)] text-xs tracking-widest uppercase mb-1">
                  {block.dates}
                </p>
                <p className="font-heading font-semibold text-white text-lg mb-4">
                  {block.sports.join(' · ')}
                </p>
                <Link
                  to={block.scheduleHref}
                  className="inline-flex items-center gap-2 font-heading text-sm text-white/60 group-hover:text-[var(--gold)] transition-colors"
                >
                  Game Schedule
                  <ChevronDown size={14} className="-rotate-90" />
                </Link>
              </div>
            ))}

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              {[
                { n: '13',  label: 'Schools' },
                { n: '5',   label: 'Sports' },
                { n: '7',   label: 'Days' },
              ].map(({ n, label }) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/10 bg-white/5 py-4 text-center"
                >
                  <p className="font-display text-[var(--gold)] text-3xl leading-none">{n}</p>
                  <p className="font-body text-white/50 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/30 animate-bounce">
        <ChevronDown size={20} />
      </div>
    </section>
  )
}