import type { TournamentInfo, School, NavLink, SportName } from '@/types'

// ── Tournament meta ───────────────────────────────────
export const TOURNAMENT: TournamentInfo = {
  name: 'AASB Middle School National Tournament',
  edition: '2026',
  startDate: '2026-05-02',
  endDate: '2026-05-08',
  location: 'NR — Brasília, Brazil',
  hosts: ['EAR', 'PACA'],
}

// ── Navigation links ──────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: 'Home',      href: '/' },
  { label: 'Schools',   href: '/schools' },
  { label: 'Schedule',  href: '/schedule' },
  { label: 'Standings', href: '/standings' },
  { label: 'Info',      href: '/info' },
]

// ── Sport colors & icons ──────────────────────────────
export const SPORT_CONFIG: Record<SportName, { color: string; bg: string; icon: string }> = {
  'Boys Futsal':       { color: '#40b8e8', bg: 'rgba(64,184,232,0.12)',  icon: '⚽' },
  'Girls Futsal':      { color: '#e040e8', bg: 'rgba(224,64,232,0.12)', icon: '⚽' },
  'Boys Volleyball':   { color: '#5ce8a0', bg: 'rgba(92,232,160,0.12)', icon: '🏐' },
  'Girls Volleyball':  { color: '#ff7a5c', bg: 'rgba(255,122,92,0.12)', icon: '🏐' },
  'Softball':          { color: '#F4C430', bg: 'rgba(244,196,48,0.12)', icon: '🥎' },
  'Cheerleading':      { color: '#ff4d8f', bg: 'rgba(255,77,143,0.12)', icon: '📣' },
}

// ── Participating schools ─────────────────────────────
// TODO: Update with actual Middle School participants for May 2026
export const SCHOOLS: School[] = [
  { id: 'ear',      abbreviation: 'EAR',      name: 'American School of Recife',           city: 'Recife',        mascot: 'Eagles' },
  { id: 'paca',     abbreviation: 'PACA',     name: 'Pan American Christian Academy',      city: 'São Paulo',     mascot: 'Warriors' },
  { id: 'eab',      abbreviation: 'EAB',      name: 'American School of Brasília',         city: 'Brasília',      mascot: 'Bulls' },
  { id: 'earj',     abbreviation: 'EARJ',     name: 'American School of Rio de Janeiro',   city: 'Rio de Janeiro',mascot: 'Panthers' },
  { id: 'eac',      abbreviation: 'EAC',      name: 'American School of Campinas',         city: 'Campinas',      mascot: 'Giants' },
  { id: 'eabh',     abbreviation: 'EABH',     name: 'American School of Belo Horizonte',   city: 'Belo Horizonte',mascot: '' },
  { id: 'chapel',   abbreviation: 'CHAPEL',   name: 'The International School of Brazil',  city: 'Brasília',      mascot: 'Trojans' },
  { id: 'graded',   abbreviation: 'GRADED',   name: 'The American School of São Paulo',    city: 'São Paulo',     mascot: '' },
  { id: 'isc',      abbreviation: 'ISC',      name: 'International School of Curitiba',    city: 'Curitiba',      mascot: 'Wildcats' },
  { id: 'nations',  abbreviation: 'NATIONS',  name: 'The School of Nations',               city: 'Brasília',      mascot: 'Cougars' },
  { id: 'olm',      abbreviation: 'OLM',      name: 'Our Lady of Mercy American School',   city: 'São Paulo',     mascot: 'Lancers' },
  { id: 'pasb',     abbreviation: 'PASB',     name: 'Pan American School of Bahia',        city: 'Salvador',      mascot: 'Panthers' },
  { id: 'paspoa',   abbreviation: 'PASPOA',   name: 'Pan American School of Porto Alegre', city: 'Porto Alegre',  mascot: 'Huskies' },
  { id: 'santanna', abbreviation: "SANT'ANNA", name: 'International School',               city: 'São Paulo',     mascot: 'Wolves' },
]

// ── Quick links (home page buttons) ──────────────────
export const QUICK_LINKS = [
  { label: 'AASB Athletics Constitution', href: '#', external: true },
  { label: 'AASB Code of Conduct',        href: '#', external: true },
  { label: 'Livestream',                  href: '#', external: true },
  { label: 'Photo Gallery',               href: '#', external: true },
]

// ── Tournament phases / sports blocks ────────────────
export const SPORT_BLOCKS = [
  {
    dates: 'May 2 – 5, 2026',
    sports: ['Boys Futsal', 'Girls Volleyball', 'Cheerleading'],
    scheduleHref: '/schedule?week=1',
  },
  {
    dates: 'May 5 – 8, 2026',
    sports: ['Girls Futsal', 'Boys Volleyball', 'Softball'],
    scheduleHref: '/schedule?week=2',
  },
]
