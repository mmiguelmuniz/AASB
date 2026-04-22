import { Link } from 'react-router-dom'
import { Info, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function InfoBannerSection() {
  return (
    <section className="py-14 bg-[var(--light)]">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="rounded-3xl bg-[var(--red)] relative overflow-hidden">
          {/* Decoration */}
          <div
            className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10"
            style={{
              background: 'linear-gradient(135deg, transparent 0%, var(--gold) 100%)',
            }}
          />
          <div
            className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full opacity-20"
            style={{ background: 'var(--gold)' }}
          />

          <div className="relative p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Info size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-2xl mb-1">
                  Need more information?
                </h3>
                <p className="font-body text-white/80 text-sm max-w-md leading-relaxed">
                  Find details about the venue, camp schedule, transportation, code of conduct, and everything else you need for the tournament.
                </p>
              </div>
            </div>

            <Link to="/info" className="flex-shrink-0">
              <Button
                variant="secondary"
                size="lg"
                className="whitespace-nowrap"
              >
                Tournament Info
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
