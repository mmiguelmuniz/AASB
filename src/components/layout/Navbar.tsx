import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/data/tournament'
import clsx from 'clsx'

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location                = useLocation()
  const isHome                  = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [location])

  const navBg = clsx(
    'fixed top-0 inset-x-0 z-50 transition-all duration-300',
    isHome && !scrolled
      ? 'bg-transparent'
      : 'bg-[var(--navy)] shadow-lg shadow-black/20',
  )

  return (
    <header className={navBg}>
      <div className="section-padding max-w-7xl mx-auto flex items-center justify-between h-16 sm:h-18 lg:h-22 py-2">

        {/* Logo / Brand */}
        <NavLink to="/" className="flex items-center gap-2 sm:gap-3 group">
          {/* Logo — sem recorte, tamanho generoso */}
          <img
            src="/assets/photo.png"
            alt="AASB Logo"
            className="
              h-10 sm:h-12 lg:h-16
              w-auto
              object-contain
              group-hover:scale-105
              transition-transform duration-200
            "
            onError={e => {
              e.currentTarget.style.display = 'none'
              const fb = e.currentTarget.nextElementSibling as HTMLElement
              if (fb) fb.style.display = 'flex'
            }}
          />
          {/* Fallback se imagem falhar */}
          <div
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[var(--gold)] items-center justify-center font-display text-[var(--navy)] text-xl leading-none flex-shrink-0"
            style={{ display: 'none' }}
          >
            A
          </div>
          {/* Texto ao lado — visível em todos os tamanhos */}
          <div className="flex flex-col leading-tight">
            <span className="font-display text-white text-base sm:text-lg lg:text-2xl tracking-widest">
              AASB
            </span>
            <span className="font-heading text-[var(--gold)] font-light tracking-[0.15em] text-[10px] sm:text-xs uppercase">
              Middle School
            </span>
          </div>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === '/'}
              className={({ isActive }) =>
                clsx(
                  'px-4 py-2 rounded-md font-heading font-medium text-sm tracking-wide transition-colors duration-150',
                  isActive
                    ? 'bg-[var(--red)] text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={clsx(
          'md:hidden bg-[var(--navy)] border-t border-white/10 overflow-hidden transition-all duration-300',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav className="section-padding py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === '/'}
              className={({ isActive }) =>
                clsx(
                  'px-4 py-3 rounded-md font-heading font-medium tracking-wide transition-colors',
                  isActive
                    ? 'bg-[var(--red)] text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}