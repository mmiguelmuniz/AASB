import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { SCHOOLS } from '@/data/tournament'

export default function SchoolsPreviewSection() {
  const trackRef = useRef<HTMLDivElement>(null)

  // Duplicate schools for seamless infinite loop
  const doubled = [...SCHOOLS, ...SCHOOLS]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let pos = 0
    let raf: number
    const speed = 0.5 // px per frame

    const animate = () => {
      pos += speed
      // Reset when we've scrolled exactly one set of schools
      const half = track.scrollWidth / 2
      if (pos >= half) pos = 0
      track.style.transform = `translateX(-${pos}px)`
      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)

    // Pause on hover
    const pause = () => cancelAnimationFrame(raf)
    const resume = () => { raf = requestAnimationFrame(animate) }
    track.addEventListener('mouseenter', pause)
    track.addEventListener('mouseleave', resume)

    return () => {
      cancelAnimationFrame(raf)
      track.removeEventListener('mouseenter', pause)
      track.removeEventListener('mouseleave', resume)
    }
  }, [])

  return (
    <section className="py-20 bg-[var(--navy)] overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="Participating Schools"
            title="Meet the Teams"
            subtitle={`${SCHOOLS.length} schools competing from across Brazil.`}
            light
          />
          <Link
            to="/schools"
            className="flex-shrink-0 inline-flex items-center gap-2 font-heading font-semibold text-[var(--gold)] hover:text-white transition-colors group"
          >
            All schools
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ── Carousel ── */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--navy), transparent)' }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--navy), transparent)' }} />

        {/* Track */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-4 w-max"
            style={{ willChange: 'transform' }}
          >
            {doubled.map((school, i) => (
              <Link
                key={`${school.id}-${i}`}
                to="/schools"
                className="
                  group flex-shrink-0 flex flex-col items-center gap-3
                  w-32 p-4 rounded-2xl
                  border border-white/10 bg-white/5
                  hover:bg-white/15 hover:border-[var(--gold)]/50
                  transition-all duration-200
                "
              >
                {/* Logo */}
                <div className="w-16 h-16 flex items-center justify-center">
                  {school.logoUrl ? (
                    <>
                      <img
                        src={school.logoUrl}
                        alt={school.abbreviation}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          const fb = e.currentTarget.nextElementSibling as HTMLElement
                          if (fb) fb.style.display = 'flex'
                        }}
                      />
                      <div
                        className="w-12 h-12 rounded-full bg-white/10 border border-white/20 items-center justify-center font-display text-white text-lg"
                        style={{ display: 'none' }}
                      >
                        {school.abbreviation.charAt(0)}
                      </div>
                    </>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-display text-white text-lg">
                      {school.abbreviation.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Name */}
                <span className="font-heading text-xs text-white/70 group-hover:text-white transition-colors text-center leading-tight">
                  {school.abbreviation}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── See all CTA ── */}
      <div className="section-padding max-w-7xl mx-auto mt-10 flex justify-center">
        <Link
          to="/schools"
          className="
            inline-flex items-center gap-2
            px-6 py-3 rounded-full
            border border-white/20 bg-white/5
            hover:bg-white/10 hover:border-[var(--gold)]/40
            font-heading text-sm text-white/70 hover:text-white
            transition-all duration-200 group
          "
        >
          View all {SCHOOLS.length} participating schools
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  )
}