import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { SPORT_CONFIG } from '@/data/tournament'
import type { SportName } from '@/types'

const SPORTS_INFO: { sport: SportName; description: string }[] = [
  { sport: 'Boys Futsal',      description: 'Fast-paced indoor football. Group stage + knockout rounds.' },
  { sport: 'Girls Futsal',     description: 'Fast-paced indoor football. Group stage + knockout rounds.' },
  { sport: 'Boys Volleyball',  description: 'Sets system. Groups of 4 teams followed by playoffs.' },
  { sport: 'Girls Volleyball', description: 'Sets system. Groups of 4 teams followed by playoffs.' },
  { sport: 'Cheerleading',     description: 'Routine competition judged on technique, creativity and sync.' },
]

export default function SportsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="section-padding max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Competing Sports"
          title="Six Sports, One Tournament"
          subtitle="Schools compete across five disciplines over seven intense days of competition."
          className="mb-12"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SPORTS_INFO.map(({ sport, description }) => {
            const cfg = SPORT_CONFIG[sport]
            return (
              <div
                key={sport}
                className="group relative rounded-2xl border border-[var(--border)] p-6 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-default"
              >
                {/* Color stripe */}
                <div
                  className="absolute top-0 inset-x-0 h-1 rounded-t-2xl transition-all duration-300 group-hover:h-2"
                  style={{ background: cfg.color }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 mt-1"
                  style={{ background: cfg.bg }}
                >
                  {cfg.icon}
                </div>

                <h3 className="font-heading font-semibold text-[var(--navy)] text-lg mb-2">
                  {sport}
                </h3>
                <p className="font-body text-[var(--muted)] text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/schedule"
            className="inline-flex items-center gap-2 font-heading font-semibold text-[var(--red)] hover:text-[var(--navy)] transition-colors group"
          >
            See full game schedule
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}