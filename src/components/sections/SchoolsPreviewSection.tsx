import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { SCHOOLS } from '@/data/tournament'

export default function SchoolsPreviewSection() {
  // Show first 8 schools as a teaser
  const preview = SCHOOLS.slice(0, 8)

  return (
    <section className="py-20 bg-[var(--navy)]">
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

        {/* School grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {preview.map((school) => (
            <Link
              key={school.id}
              to="/schools"
              className="
                group flex flex-col items-center gap-2 p-4 rounded-xl
                border border-white/10 bg-white/5
                hover:bg-white/10 hover:border-[var(--gold)]/40
                transition-all duration-200
              "
            >
              {/* Logo placeholder — replace with <img> when logos are available */}
              <div
                className="
                  w-12 h-12 rounded-full
                  bg-gradient-to-br from-white/20 to-white/5
                  border border-white/20
                  flex items-center justify-center
                  font-display text-white text-lg leading-none
                  group-hover:border-[var(--gold)]/60 transition-colors
                "
              >
                {school.abbreviation.charAt(0)}
              </div>
              <span className="font-heading text-xs text-white/70 group-hover:text-white transition-colors text-center leading-tight">
                {school.abbreviation}
              </span>
            </Link>
          ))}
        </div>

        {/* More indicator */}
        {SCHOOLS.length > 8 && (
          <div className="mt-6 flex justify-center">
            <Link
              to="/schools"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors font-heading text-sm text-white/70 hover:text-white"
            >
              +{SCHOOLS.length - 8} more schools
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
