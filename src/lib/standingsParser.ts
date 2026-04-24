/**
 * standingsParser.ts
 *
 * Confirmed CSV formats from browser console:
 *
 * FUTSAL (Boys & Girls):
 *   Row 0: "BOYS FUTSAL Group A POSITION","SCHOOL","PTS","WON","DRAWN","LOST","GOALS +","GOALS -","GOALS DIFF"
 *   Data:  "1","Chapel","32","18","5","5","5","5","0"
 *   Data:  "","OLM","32","18","5","5","5","5","3"   ← position blank
 *   Next group separator: "Group B","","","","","","","",""
 *   Then header again:    "POSITION","SCHOOL","","","","","","",""
 *
 * VOLLEYBALL (Boys & Girls):
 *   Row 0: "GIRLS VOLLEYBALL","","...","Final Group Standings",""
 *   Row 1: "A","GP","2-0","2-1","1-2","0-2","","SW","SL","","PF","PC","","PLACE","","A",""
 *   Data:  "EABH","","","","","","0","","","0","","","0","","","1A",""
 *   Next:  "B","GP",... (next group)
 */

import { parseCsv, csvUrl, SHEET_GIDS } from '@/lib/sheetsParser'
import type { SportName } from '@/types'

// ── Types ─────────────────────────────────────────────
export interface StandingEntry {
  position:     number | null
  school:       string
  group:        string
  pts:          number | null
  won:          number | null
  drawn:        number | null
  lost:         number | null
  goalsFor:     number | null
  goalsAgainst: number | null
  goalDiff:     number | null
  gp?:          number | null
  setsWon?:     number | null
  setsLost?:    number | null
  ptsFor?:      number | null
  ptsAgainst?:  number | null
  place?:       string | null
}

export interface GroupStanding {
  group:   string
  entries: StandingEntry[]
}

export interface SportStandings {
  sport:  SportName
  groups: GroupStanding[]
}

// ── Helpers ───────────────────────────────────────────
function n(val: string): number | null {
  const v = parseFloat(val.trim())
  return isNaN(v) ? null : v
}

function c(row: string[], idx: number): string {
  return (row[idx] ?? '').trim()
}

function getOrCreate(groups: GroupStanding[], group: string): GroupStanding {
  let bucket = groups.find(g => g.group === group)
  if (!bucket) { bucket = { group, entries: [] }; groups.push(bucket) }
  return bucket
}

// ── FUTSAL parser ─────────────────────────────────────
// Formats seen:
//   First row: "BOYS FUTSAL Group A POSITION","SCHOOL",... → extract "A"
//   Group sep: "Group B","","",... → switch group
//   Header:    "POSITION","SCHOOL",... → skip
//   Data:      "1" or "" in col0, school in col1
export function parseFutsalCsv(csv: string, sport: SportName): SportStandings {
  const rows   = parseCsv(csv)
  const groups: GroupStanding[] = []
  let currentGroup = 'A'

  for (const row of rows) {
    const col0 = c(row, 0)
    const col1 = c(row, 1)

    // ── Detect group from any cell ──────────────────
    // "BOYS FUTSAL Group A POSITION" or "Group B" etc
    const anyText = row.map(x => c([x], 0)).join(' ')
    const groupInLine = anyText.match(/\bGroup\s+([A-D])\b/i)
    if (groupInLine) {
      currentGroup = groupInLine[1].toUpperCase()
    }

    // ── Skip non-data rows ──────────────────────────
    // Summary row: "A","B","C","D"
    if (/^[A-D]$/.test(col0) && /^[A-D]$/.test(col1)) continue
    // Header row: "POSITION","SCHOOL",... or blank,"SCHOOL",...  → always skip, never advance group
    // (group was already detected from the "Group X" label row above)
    if (col1.toUpperCase() === 'SCHOOL') continue
    if (col0.toUpperCase() === 'POSITION') continue
    // Title rows without school data
    if (!col1 || col1.length < 2) continue
    // col0 must be a number or empty (position)
    if (col0 !== '' && !/^\d+$/.test(col0)) continue

    const entry: StandingEntry = {
      position:     n(col0),
      school:       col1,
      group:        currentGroup,
      pts:          n(c(row, 2)),
      won:          n(c(row, 3)),
      drawn:        n(c(row, 4)),
      lost:         n(c(row, 5)),
      goalsFor:     n(c(row, 6)),
      goalsAgainst: n(c(row, 7)),
      goalDiff:     n(c(row, 8)),
    }

    getOrCreate(groups, currentGroup).entries.push(entry)
  }

  // Sort by pts desc → goalDiff desc, assign position if missing
  for (const g of groups) {
    g.entries.sort((a, b) =>
      (b.pts ?? 0) - (a.pts ?? 0) || (b.goalDiff ?? 0) - (a.goalDiff ?? 0)
    )
    g.entries.forEach((e, i) => { if (e.position === null) e.position = i + 1 })
  }

  return { sport, groups }
}

// ── VOLLEYBALL parser ─────────────────────────────────
// Row 1: "A","GP","2-0","2-1","1-2","0-2","","SW","SL","","PF","PC","","PLACE","","A",""
// cols:   0    1    2     3     4     5    6   7    8   9   10   11  12   13   14  15  16
// Data:  "EABH","","","","","","0","","","0","","","0","","","1A",""
//         0=school 6=PTS 7=SW 8=SL 10=PF 11=PC 13=PLACE 15=finalPos
export function parseVolleyballCsv(csv: string, sport: SportName): SportStandings {
  const rows   = parseCsv(csv)
  const groups: GroupStanding[] = []
  let currentGroup = 'A'

  for (const row of rows) {
    const col0 = c(row, 0)
    const col1 = c(row, 1)

    // Group header: col0 is single letter A-D and col1 = "GP"
    if (/^[A-D]$/i.test(col0) && col1.toUpperCase() === 'GP') {
      currentGroup = col0.toUpperCase()
      continue
    }
    // Round Robin
    if (/round\s*robin/i.test(col0) && col1.toUpperCase() === 'GP') {
      currentGroup = 'RR'
      continue
    }

    // Skip title/header rows
    if (!col0 || col0.length < 2) continue
    if (/^(boys|girls)\s+volleyball/i.test(col0)) continue
    if (/final\s+(group\s+)?standings/i.test(col0)) continue
    if (/^[A-D]$/.test(col0) && /^[A-D]$/.test(col1)) continue
    if (/^[A-D]$/.test(col0)) continue  // lone group letter
    if (col0.toUpperCase() === 'POSITION') continue

    // Data row: col0 = school name
    if (col0.length < 2) continue

    const entry: StandingEntry = {
      position:     null,
      school:       col0,
      group:        currentGroup,
      pts:          n(c(row, 6)),
      won:          null,
      drawn:        null,
      lost:         null,
      goalsFor:     null,
      goalsAgainst: null,
      goalDiff:     null,
      gp:           n(col1),
      setsWon:      n(c(row, 7)),
      setsLost:     n(c(row, 8)),
      ptsFor:       n(c(row, 10)),
      ptsAgainst:   n(c(row, 11)),
      place:        c(row, 13) || null,
    }

    getOrCreate(groups, currentGroup).entries.push(entry)
  }

  // Sort by pts desc, assign position
  for (const g of groups) {
    g.entries.sort((a, b) => (b.pts ?? 0) - (a.pts ?? 0))
    g.entries.forEach((e, i) => { e.position = i + 1 })
  }

  return { sport, groups }
}

// ── Public fetch functions ────────────────────────────
export async function fetchFutsalStandings(
  sport: 'Boys Futsal' | 'Girls Futsal'
): Promise<SportStandings> {
  const key = sport === 'Boys Futsal' ? 'Boys Futsal Standings' : 'Girls Futsal Standings'
  const res = await fetch(csvUrl(SHEET_GIDS[key]), { cache: 'no-store' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return parseFutsalCsv(await res.text(), sport)
}

export async function fetchVolleyballStandings(
  sport: 'Boys Volleyball' | 'Girls Volleyball'
): Promise<SportStandings> {
  const key = sport === 'Boys Volleyball' ? 'Boys Volleyball Standings' : 'Girls Volleyball Standings'
  const res = await fetch(csvUrl(SHEET_GIDS[key]), { cache: 'no-store' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return parseVolleyballCsv(await res.text(), sport)
}