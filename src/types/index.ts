// ── Tournament ────────────────────────────────────────
export interface TournamentInfo {
  name: string
  edition: string
  startDate: string
  endDate: string
  location: string
  hosts: string[]
}

// ── School ────────────────────────────────────────────
export interface School {
  id: string
  abbreviation: string
  name: string
  city: string
  logoUrl?: string
  mascot?: string
  primaryColor?: string
}

// ── Sport ─────────────────────────────────────────────
export type SportName =
  | 'Boys Futsal'
  | 'Girls Futsal'
  | 'Boys Volleyball'
  | 'Girls Volleyball'
  | 'Softball'
  | 'Cheerleading'

// ── Game ─────────────────────────────────────────────
export type GamePhase =
  | 'Group Stage'
  | 'Consolation'
  | 'Quarter-Final'
  | 'Semi-Final'
  | 'Final'
  | 'Playoff'

export interface Game {
  id: string
  sport: SportName
  date: string        // e.g. "2026-05-03"
  time: string        // e.g. "09:00"
  venue: string
  group: string
  phase: GamePhase
  team1: string
  team2: string
  score1?: number | null
  score2?: number | null
  scoreDisplay?: string  // for special scores like "2(5) – 2(4)"
}

// ── Standings ─────────────────────────────────────────
export interface StandingEntry {
  position: number
  school: string
  sport: SportName
  group: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDiff: number
  points: number
}

// ── Navigation ────────────────────────────────────────
export interface NavLink {
  label: string
  href: string
}
