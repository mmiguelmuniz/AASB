/**
 * Static fallback games — extracted from the xlsx snapshot.
 * Used when the Google Sheets live fetch fails.
 *
 * Week 1 (May 2-5): Boys Futsal + Girls Volleyball + Cheerleading
 * Week 2 (May 5-8): Girls Futsal + Boys Volleyball + Softball
 */

import type { Game } from '@/types'

export const FALLBACK_GAMES: Game[] = [
  // ── Saturday May 2 ─────────────────────────────────
  // Boys Futsal
  { id: 'bf-1',  sport: 'Boys Futsal',      date: '2026-05-02', time: '17:00', venue: 'Blue Gym', group: 'A', phase: 'Group Stage', team1: 'OLM',      team2: 'Graded B' },
  { id: 'bf-2',  sport: 'Boys Futsal',      date: '2026-05-02', time: '17:00', venue: 'Red Gym',  group: 'A', phase: 'Group Stage', team1: 'PASB',     team2: 'PACA' },
  { id: 'bf-3',  sport: 'Boys Futsal',      date: '2026-05-02', time: '18:30', venue: 'Blue Gym', group: 'B', phase: 'Group Stage', team1: 'EAC B',    team2: 'Graded' },
  { id: 'bf-4',  sport: 'Boys Futsal',      date: '2026-05-02', time: '18:30', venue: 'Red Gym',  group: 'B', phase: 'Group Stage', team1: 'ISC',      team2: 'Chapel' },
  { id: 'bf-5',  sport: 'Boys Futsal',      date: '2026-05-02', time: '20:00', venue: 'Blue Gym', group: 'C', phase: 'Group Stage', team1: 'EAB',      team2: 'EAC' },
  { id: 'bf-6',  sport: 'Boys Futsal',      date: '2026-05-02', time: '20:00', venue: 'Red Gym',  group: 'C', phase: 'Group Stage', team1: 'EARJ',     team2: 'EAR' },
  { id: 'bf-7',  sport: 'Boys Futsal',      date: '2026-05-02', time: '21:30', venue: 'Blue Gym', group: 'D', phase: 'Group Stage', team1: 'EARJ B',   team2: "Sant'anna" },
  { id: 'bf-8',  sport: 'Boys Futsal',      date: '2026-05-02', time: '21:30', venue: 'Red Gym',  group: 'D', phase: 'Group Stage', team1: 'EABH',     team2: 'Nations' },
  // Girls Volleyball
  { id: 'gv-1',  sport: 'Girls Volleyball', date: '2026-05-02', time: '17:00', venue: 'Court 1', group: 'A', phase: 'Group Stage', team1: 'EABH',     team2: 'EAB' },
  { id: 'gv-2',  sport: 'Girls Volleyball', date: '2026-05-02', time: '17:00', venue: 'Court 2', group: 'A', phase: 'Group Stage', team1: 'EAC',      team2: 'Chapel' },
  { id: 'gv-3',  sport: 'Girls Volleyball', date: '2026-05-02', time: '18:30', venue: 'Court 1', group: 'B', phase: 'Group Stage', team1: 'Graded',   team2: 'ISC' },
  { id: 'gv-4',  sport: 'Girls Volleyball', date: '2026-05-02', time: '18:30', venue: 'Court 2', group: 'B', phase: 'Group Stage', team1: 'PASB',     team2: 'EARJ B' },
  { id: 'gv-5',  sport: 'Girls Volleyball', date: '2026-05-02', time: '20:00', venue: 'Court 1', group: 'C', phase: 'Group Stage', team1: 'Graded B', team2: 'Nations' },
  { id: 'gv-6',  sport: 'Girls Volleyball', date: '2026-05-02', time: '20:00', venue: 'Court 2', group: 'C', phase: 'Group Stage', team1: 'EARJ',     team2: "Sant'anna" },
  { id: 'gv-7',  sport: 'Girls Volleyball', date: '2026-05-02', time: '21:30', venue: 'Court 1', group: 'D', phase: 'Group Stage', team1: 'OLM',      team2: 'EAR' },
  { id: 'gv-8',  sport: 'Girls Volleyball', date: '2026-05-02', time: '21:30', venue: 'Court 2', group: 'D', phase: 'Group Stage', team1: 'PACA',     team2: 'ISC B' },

  // ── Sunday May 3 ───────────────────────────────────
  { id: 'bf-9',  sport: 'Boys Futsal',      date: '2026-05-03', time: '08:00', venue: 'Blue Gym', group: 'A', phase: 'Group Stage', team1: 'OLM',      team2: 'PASB' },
  { id: 'bf-10', sport: 'Boys Futsal',      date: '2026-05-03', time: '08:00', venue: 'Red Gym',  group: 'A', phase: 'Group Stage', team1: 'Graded B', team2: 'PACA' },
  { id: 'bf-11', sport: 'Boys Futsal',      date: '2026-05-03', time: '09:30', venue: 'Blue Gym', group: 'B', phase: 'Group Stage', team1: 'EAC B',    team2: 'ISC' },
  { id: 'bf-12', sport: 'Boys Futsal',      date: '2026-05-03', time: '09:30', venue: 'Red Gym',  group: 'B', phase: 'Group Stage', team1: 'Graded',   team2: 'Chapel' },
  { id: 'bf-13', sport: 'Boys Futsal',      date: '2026-05-03', time: '11:00', venue: 'Blue Gym', group: 'C', phase: 'Group Stage', team1: 'EAB',      team2: 'EARJ' },
  { id: 'bf-14', sport: 'Boys Futsal',      date: '2026-05-03', time: '11:00', venue: 'Red Gym',  group: 'C', phase: 'Group Stage', team1: 'EAC',      team2: 'EAR' },
  { id: 'bf-15', sport: 'Boys Futsal',      date: '2026-05-03', time: '12:30', venue: 'Blue Gym', group: 'D', phase: 'Group Stage', team1: 'EARJ B',   team2: 'EABH' },
  { id: 'bf-16', sport: 'Boys Futsal',      date: '2026-05-03', time: '12:30', venue: 'Red Gym',  group: 'D', phase: 'Group Stage', team1: "Sant'anna", team2: 'Nations' },
  { id: 'gv-9',  sport: 'Girls Volleyball', date: '2026-05-03', time: '08:00', venue: 'Court 1', group: 'A', phase: 'Group Stage', team1: 'EABH',     team2: 'EAC' },
  { id: 'gv-10', sport: 'Girls Volleyball', date: '2026-05-03', time: '08:00', venue: 'Court 2', group: 'A', phase: 'Group Stage', team1: 'EAB',      team2: 'Chapel' },
  { id: 'gv-11', sport: 'Girls Volleyball', date: '2026-05-03', time: '09:30', venue: 'Court 1', group: 'B', phase: 'Group Stage', team1: 'Graded',   team2: 'PASB' },
  { id: 'gv-12', sport: 'Girls Volleyball', date: '2026-05-03', time: '09:30', venue: 'Court 2', group: 'B', phase: 'Group Stage', team1: 'ISC',      team2: 'EARJ B' },
  { id: 'gv-13', sport: 'Girls Volleyball', date: '2026-05-03', time: '11:00', venue: 'Court 1', group: 'C', phase: 'Group Stage', team1: 'Graded B', team2: 'EARJ' },
  { id: 'gv-14', sport: 'Girls Volleyball', date: '2026-05-03', time: '11:00', venue: 'Court 2', group: 'C', phase: 'Group Stage', team1: 'Nations',  team2: "Sant'anna" },
  { id: 'gv-15', sport: 'Girls Volleyball', date: '2026-05-03', time: '12:30', venue: 'Court 1', group: 'D', phase: 'Group Stage', team1: 'OLM',      team2: 'PACA' },
  { id: 'gv-16', sport: 'Girls Volleyball', date: '2026-05-03', time: '12:30', venue: 'Court 2', group: 'D', phase: 'Group Stage', team1: 'EAR',      team2: 'ISC B' },

  // ── Tuesday May 5 (Girls Futsal + Boys Volleyball) ─
  { id: 'gf-1',  sport: 'Girls Futsal',     date: '2026-05-05', time: '17:00', venue: 'Red Gym',  group: 'C/D', phase: 'Group Stage', team1: 'ISC',      team2: 'EARJ' },
  { id: 'gf-2',  sport: 'Girls Futsal',     date: '2026-05-05', time: '18:30', venue: 'Blue Gym', group: 'A',   phase: 'Group Stage', team1: 'Chapel',   team2: 'EAB' },
  { id: 'gf-3',  sport: 'Girls Futsal',     date: '2026-05-05', time: '18:30', venue: 'Red Gym',  group: 'A',   phase: 'Group Stage', team1: "Sant'anna", team2: 'Nations' },
  { id: 'gf-4',  sport: 'Girls Futsal',     date: '2026-05-05', time: '20:00', venue: 'Blue Gym', group: 'B',   phase: 'Group Stage', team1: 'OLM',      team2: 'EAC B' },
  { id: 'gf-5',  sport: 'Girls Futsal',     date: '2026-05-05', time: '20:00', venue: 'Red Gym',  group: 'B',   phase: 'Group Stage', team1: 'Graded',   team2: 'EAR' },
  { id: 'gf-6',  sport: 'Girls Futsal',     date: '2026-05-05', time: '21:30', venue: 'Blue Gym', group: 'C/D', phase: 'Group Stage', team1: 'Graded B', team2: 'PACA' },
  { id: 'gf-7',  sport: 'Girls Futsal',     date: '2026-05-05', time: '21:30', venue: 'Red Gym',  group: 'C/D', phase: 'Group Stage', team1: 'EAC',      team2: 'EABH' },
  // Boys Volleyball Round 1
  { id: 'bv-1',  sport: 'Boys Volleyball',  date: '2026-05-05', time: '17:00', venue: 'Court 1', group: 'Round 1', phase: 'Group Stage', team1: 'PACA',     team2: "Sant'anna" },
  { id: 'bv-2',  sport: 'Boys Volleyball',  date: '2026-05-05', time: '17:00', venue: 'Court 2', group: 'Round 1', phase: 'Group Stage', team1: 'EARJ',     team2: 'OLM' },
  { id: 'bv-3',  sport: 'Boys Volleyball',  date: '2026-05-05', time: '18:30', venue: 'Court 2', group: 'Round 1', phase: 'Group Stage', team1: 'Graded',   team2: 'EAC' },

  // ── Wednesday May 6 ────────────────────────────────
  { id: 'gf-8',  sport: 'Girls Futsal',     date: '2026-05-06', time: '08:00', venue: 'Blue Gym', group: 'A', phase: 'Group Stage', team1: 'Chapel',   team2: "Sant'anna" },
  { id: 'gf-9',  sport: 'Girls Futsal',     date: '2026-05-06', time: '08:00', venue: 'Red Gym',  group: 'A', phase: 'Group Stage', team1: 'EAB',      team2: 'Nations' },
  // Boys Volleyball Round 2
  { id: 'bv-4',  sport: 'Boys Volleyball',  date: '2026-05-06', time: '08:00', venue: 'Court 1', group: 'Round 2', phase: 'Group Stage', team1: "Sant'anna", team2: 'OLM' },
  { id: 'bv-5',  sport: 'Boys Volleyball',  date: '2026-05-06', time: '08:00', venue: 'Court 2', group: 'Round 2', phase: 'Group Stage', team1: 'PACA',     team2: 'EAC' },
]
