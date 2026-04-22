import { ExternalLink, BookOpen, Shield, Video, Image } from 'lucide-react'
import { QUICK_LINKS } from '@/data/tournament'

const ICONS = [BookOpen, Shield, Video, Image]

export default function QuickLinksSection() {
  return (
    <section className="bg-[var(--light)] py-14">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_LINKS.map((link, i) => {
            const Icon = ICONS[i] ?? ExternalLink
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="
                  group flex flex-col items-center gap-3 p-6 rounded-2xl
                  bg-white border border-[var(--border)]
                  hover:border-[var(--red)] hover:shadow-lg hover:shadow-[var(--red)]/10
                  transition-all duration-200 text-center
                "
              >
                <div className="w-12 h-12 rounded-full bg-[var(--navy)] flex items-center justify-center group-hover:bg-[var(--red)] transition-colors duration-200">
                  <Icon size={20} className="text-[var(--gold)]" />
                </div>
                <span className="font-heading font-medium text-sm text-[var(--navy)] group-hover:text-[var(--red)] transition-colors leading-tight">
                  {link.label}
                </span>
                <ExternalLink size={12} className="text-[var(--muted)] group-hover:text-[var(--red)] transition-colors" />
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
