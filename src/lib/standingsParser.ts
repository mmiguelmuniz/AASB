import { parseCsv, csvUrl, SHEET_GIDS } from '@/lib/sheetsParser'
import type { SportName } from '@/types'

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

export interface FinalStanding {
  placement: string  // '1', '2', '3', '4'
  group:     string  // 'A', 'B', 'C', 'D'
  school:    string
  A: string
  B: string
  C: string
  D: string
}

export interface SportStandings {
  sport:          SportName
  groups:         GroupStanding[]
  finalStandings: FinalStanding[]
}

function n(val: string): number | null {
  const v = parseFloat(val.trim())
  return isNaN(v) ? null : v
}

function col(row: string[], idx: number): string {
  return (row[idx] ?? '').trim()
}

function getOrCreate(groups: GroupStanding[], group: string): GroupStanding {
  let bucket = groups.find(g => g.group === group)
  if (!bucket) { bucket = { group, entries: [] }; groups.push(bucket) }
  return bucket
}

// ── FUTSAL parser ─────────────────────────────────────
export function parseFutsalCsv(csv: string, sport: SportName): SportStandings {
  const rows   = parseCsv(csv)
  const groups: GroupStanding[] = []
  let currentGroup = 'A'

  const finalStandings: FinalStanding[] = []
  let inFinal = false
  let finalCurrentGroup = 'A'
  let finalPosition = 1

  for (const row of rows) {
    const c0 = col(row, 0)
    const c1 = col(row, 1)

    // Detect Final Group Standings section — can be in col0 OR col1
    const anyTextFinal = row.join(' ')
    if (/final\s+group\s+standings/i.test(anyTextFinal)) {
      inFinal = true
      continue
    }

    if (inFinal) {
      // Format confirmed from browser:
      // col1="A"        ← group marker
      // col1="PACA"     ← 1st place
      // col1="PASB"     ← 2nd place
      // col1="OLM"      ← 3rd place
      // col1="Graded B" ← 4th place
      // col1="B"        ← next group marker
      if (!c1) continue

      // Group marker: col0="" col1="A/B/C/D"
      if (/^[A-D]$/.test(c1)) {
        // Already handled by inFinal = true above for first letter
        // For subsequent letters, just track current final group
        finalCurrentGroup = c1
        finalPosition = 1
        continue
      }

      // School entry
      if (c1.length >= 2 && finalCurrentGroup) {
        const existing = finalStandings.find(f => f.placement === String(finalPosition) && f.group === finalCurrentGroup)
        if (!existing) {
          finalStandings.push({
            placement: String(finalPosition),
            group: finalCurrentGroup,
            school: c1,
            A: '', B: '', C: '', D: '',
          })
        }
        finalPosition++
      }
      continue
    }

    const anyText = row.map(x => col([x], 0)).join(' ')
    const groupInLine = anyText.match(/\bGroup\s+([A-D])\b/i)
    if (groupInLine) {
      currentGroup = groupInLine[1].toUpperCase()
    }

    if (/^[A-D]$/.test(c0) && /^[A-D]$/.test(c1)) continue

    // Separator row: "","SCHOOL",""... → advance to next group
    if (c1.toUpperCase() === 'SCHOOL' && c0 === '') {
      const letters = ['A','B','C','D']
      const idx = letters.indexOf(currentGroup)
      if (idx >= 0 && idx < letters.length - 1) currentGroup = letters[idx + 1]
      continue
    }

    // Final Group Standings header: col0="" col1="A" (single letter)
    // This appears after all groups are done — stop reading group data
    if (c0 === '' && /^[A-D]$/.test(c1)) {
      inFinal = true
      continue
    }

    if (c0.toUpperCase() === 'POSITION') continue
    if (c1.toUpperCase() === 'SCHOOL') continue
    if (!c1 || c1.length < 2) continue
    if (c0 !== '' && !/^\d+$/.test(c0)) continue

    const entry: StandingEntry = {
      position:     n(c0),
      school:       c1,
      group:        currentGroup,
      pts:          n(col(row, 2)),
      won:          n(col(row, 3)),
      drawn:        n(col(row, 4)),
      lost:         n(col(row, 5)),
      goalsFor:     n(col(row, 6)),
      goalsAgainst: n(col(row, 7)),
      goalDiff:     n(col(row, 8)),
    }

    getOrCreate(groups, currentGroup).entries.push(entry)
  }

  for (const g of groups) {
    g.entries.sort((a, b) =>
      (b.pts ?? 0) - (a.pts ?? 0) || (b.goalDiff ?? 0) - (a.goalDiff ?? 0)
    )
    g.entries.forEach((e, i) => { if (e.position === null) e.position = i + 1 })
  }

  return { sport, groups, finalStandings }
}

// ── VOLLEYBALL parser ─────────────────────────────────
// Handles two group header formats:
// Format A (Girls VB): "A","GP","2-0",... → col0=single letter, col1=GP
// Format B (Boys VB):  "Group A","GP","2-0",... → col0="Group A", col1=GP
export function parseVolleyballCsv(csv: string, sport: SportName): SportStandings {
  const rows   = parseCsv(csv)
  const groups: GroupStanding[] = []
  let currentGroup = 'A'

  for (const row of rows) {
    const c0 = col(row, 0)
    const c1 = col(row, 1)

    // Format A: "A","GP",... (Boys VB) OR "A","",... (Girls VB)
    if (/^[A-D]$/i.test(c0) && (c1.toUpperCase() === 'GP' || c1 === '')) {
      currentGroup = c0.toUpperCase()
      continue
    }

    // Format B: "Group A","GP",...
    const grpMatch = c0.match(/^Group\s+([A-D])$/i)
    if (grpMatch && c1.toUpperCase() === 'GP') {
      currentGroup = grpMatch[1].toUpperCase()
      continue
    }

    // Round Robin
    if (/round\s*robin/i.test(c0) && c1.toUpperCase() === 'GP') {
      currentGroup = 'RR'
      continue
    }

    // Skip header/title rows
    if (!c0 || c0.length < 2) continue
    if (/^(boys|girls)\s+volleyball/i.test(c0)) continue
    if (/final\s+(group\s+)?standings/i.test(c0)) continue
    if (/^[A-D]$/.test(c0) && /^[A-D]$/.test(c1)) continue
    if (/^[A-D]$/.test(c0)) continue
    if (/^Group\s+[A-D]$/i.test(c0)) continue  // group label without GP
    if (c0.toUpperCase() === 'POSITION') continue
    if (c1.toUpperCase() === 'GP') continue  // any remaining header rows

    const entry: StandingEntry = {
      position:     null,
      school:       c0,
      group:        currentGroup,
      pts:          n(col(row, 6)),
      won:          null,
      drawn:        null,
      lost:         null,
      goalsFor:     null,
      goalsAgainst: null,
      goalDiff:     null,
      gp:           n(c1),
      setsWon:      n(col(row, 7)),
      setsLost:     n(col(row, 8)),
      ptsFor:       n(col(row, 10)),
      ptsAgainst:   n(col(row, 11)),
      place:        col(row, 13) || null,
    }

    getOrCreate(groups, currentGroup).entries.push(entry)
  }

  for (const g of groups) {
    g.entries.sort((a, b) => (b.pts ?? 0) - (a.pts ?? 0))
    g.entries.forEach((e, i) => { e.position = i + 1 })
  }

  return { sport, groups, finalStandings: [] }
}

// ── CHEERLEADING parser ───────────────────────────────
export function parseCheerCsv(csv: string): SportStandings {
  const rows   = parseCsv(csv)
  const groups: GroupStanding[] = []
  const bucket: GroupStanding = { group: 'Overall', entries: [] }
  groups.push(bucket)

  for (const row of rows) {
    const c0 = col(row, 0)
    const c1 = col(row, 1)

    const school = c1 || c0
    if (!school || school.length < 2) continue
    if (/cheerleading/i.test(school)) continue
    if (/^(order|school|standings|pts)$/i.test(school)) continue

    const isOrderNum = /^\d+$/.test(c0) || c0 === ''
    if (!isOrderNum && !c1) continue

    const entry: StandingEntry = {
      position:     n(c0) ?? null,
      school:       c1 || c0,
      group:        'Overall',
      pts:          n(col(row, 2)),
      won:          null,
      drawn:        null,
      lost:         null,
      goalsFor:     null,
      goalsAgainst: null,
      goalDiff:     null,
      place:        col(row, 3) || null,
    }

    if (entry.school && entry.school.length >= 2) {
      bucket.entries.push(entry)
    }
  }

  bucket.entries.sort((a, b) => {
    if (a.pts !== null && b.pts !== null) return (b.pts ?? 0) - (a.pts ?? 0)
    return (a.position ?? 99) - (b.position ?? 99)
  })
  bucket.entries.forEach((e, i) => { if (e.position === null) e.position = i + 1 })

  return { sport: 'Cheerleading', groups, finalStandings: [] }
}

export async function fetchCheerStandings(): Promise<SportStandings> {
  const gid = SHEET_GIDS['Cheer Standings']
  if (!gid || gid === 'REPLACE_CHEER_STANDINGS_GID') {
    return { sport: 'Cheerleading', groups: [], finalStandings: [] }
  }
  const res = await fetch(csvUrl(gid), { cache: 'no-store' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return parseCheerCsv(await res.text())
}

// ── Hardcoded Final Group Standings ─────────────────
// Boys Futsal final standings (confirmed from tournament)
const BOYS_FUTSAL_FINAL: FinalStanding[] = [
  { placement: '1', group: 'A', school: 'PACA',     A: '', B: '', C: '', D: '' },
  { placement: '2', group: 'A', school: 'PASB',     A: '', B: '', C: '', D: '' },
  { placement: '3', group: 'A', school: 'OLM',      A: '', B: '', C: '', D: '' },
  { placement: '4', group: 'A', school: 'Graded B', A: '', B: '', C: '', D: '' },
  { placement: '1', group: 'B', school: 'Graded A', A: '', B: '', C: '', D: '' },
  { placement: '2', group: 'B', school: 'Chapel',   A: '', B: '', C: '', D: '' },
  { placement: '3', group: 'B', school: 'ISC',      A: '', B: '', C: '', D: '' },
  { placement: '4', group: 'B', school: 'EAC B',    A: '', B: '', C: '', D: '' },
  { placement: '1', group: 'C', school: 'EARJ',     A: '', B: '', C: '', D: '' },
  { placement: '2', group: 'C', school: 'EAB',      A: '', B: '', C: '', D: '' },
  { placement: '3', group: 'C', school: 'EAC A',    A: '', B: '', C: '', D: '' },
  { placement: '4', group: 'C', school: 'EAR',      A: '', B: '', C: '', D: '' },
  { placement: '1', group: 'D', school: 'Nations',  A: '', B: '', C: '', D: '' },
  { placement: '2', group: 'D', school: "Sant'anna", A: '', B: '', C: '', D: '' },
  { placement: '3', group: 'D', school: 'EARJ B',   A: '', B: '', C: '', D: '' },
  { placement: '4', group: 'D', school: 'EABH',     A: '', B: '', C: '', D: '' },
]

export async function fetchFutsalStandings(
  sport: 'Boys Futsal' | 'Girls Futsal'
): Promise<SportStandings> {
  const key = sport === 'Boys Futsal' ? 'Boys Futsal Standings' : 'Girls Futsal Standings'
  const res = await fetch(csvUrl(SHEET_GIDS[key]), { cache: 'no-store' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const result = await parseFutsalCsv(await res.text(), sport)
  // Use hardcoded final standings for Boys Futsal if parser found none
  if (sport === 'Boys Futsal' && result.finalStandings.length === 0) {
    result.finalStandings.push(...BOYS_FUTSAL_FINAL)
  }
  return result
}

export async function fetchVolleyballStandings(
  sport: 'Boys Volleyball' | 'Girls Volleyball'
): Promise<SportStandings> {
  const key = sport === 'Boys Volleyball' ? 'Boys Volleyball Standings' : 'Girls Volleyball Standings'
  const res = await fetch(csvUrl(SHEET_GIDS[key]), { cache: 'no-store' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return parseVolleyballCsv(await res.text(), sport)
}