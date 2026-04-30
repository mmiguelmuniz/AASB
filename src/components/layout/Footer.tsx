import { NavLink } from 'react-router-dom'
import { NAV_LINKS, TOURNAMENT } from '@/data/tournament'

export default function Footer() {
  return (
    <footer className="bg-[var(--navy)] text-white/70">
      <div className="section-padding max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <p className="font-display text-2xl text-white tracking-wider mb-2">
              AASB <span className="text-[var(--gold)]">2026</span>
            </p>
            <p className="text-sm leading-relaxed">
              {TOURNAMENT.name}
            </p>
            <p className="text-sm mt-1 text-[var(--gold)]">
              May 2–8, 2026 · {TOURNAMENT.location}
            </p>
            <p className="text-xs mt-3">
              Hosted by <span className="text-white font-medium">EAR</span> &amp; <span className="text-white font-medium">PACA</span>
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-heading font-semibold text-white text-sm uppercase tracking-widest mb-4">Navigation</p>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <NavLink
                    to={link.href}
                    className="text-sm hover:text-[var(--gold)] transition-colors"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="font-heading font-semibold text-white text-sm uppercase tracking-widest mb-4">Resources</p>
            <ul className="flex flex-col gap-2 text-sm">
              <li><a href="#" className="hover:text-[var(--gold)] transition-colors">AASB Athletics Constitution</a></li>
              <li><a href="#" className="hover:text-[var(--gold)] transition-colors">AASB Code of Conduct</a></li>
              <li><a href="#" className="hover:text-[var(--gold)] transition-colors">Livestream</a></li>
              <li><a href="#" className="hover:text-[var(--gold)] transition-colors">Photo Gallery</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© 2026 AASB Middle School National Tournament. All rights reserved.</p>
          <p>Association of American Schools in Brazil</p>
        </div>

        {/* Developer credits */}
        <div className="border-t border-white/5 mt-4 pt-4 flex items-center justify-center gap-2 text-xs text-white/25">
          <p>
            ⚙️ Developed by{' '}
            <span className="text-white/40 font-semibold">Miguel Muniz</span>
            {' · '}
            <span className="text-white/40">IT Team</span>
            {' · '}
            <span className="text-white/40">American School of Recife</span>
          </p>
        </div>
      </div>
    </footer>
  )
}