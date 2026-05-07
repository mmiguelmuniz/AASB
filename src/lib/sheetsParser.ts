import type { Game, SportName, GamePhase } from '@/types'

export const SHEET_ID = '16DocV3VnS8q2xjKNjGpFp_XdLVsFzF0jpOXAravsvQ0'

export const SHEET_GIDS: Record<string, string> = {
  // ── Game Schedules ──────────────────────────────
  'Games Schedule May 2-5':     '801046013',
  'Games Schedule May 5-8':     '1233264069',
  // ── Standings ───────────────────────────────────
  'Boys Futsal Standings':      '513132305',
  'Girls Futsal Standings':     '467172856',
  'Girls Volleyball Standings': '1001433234',
  'Boys Volleyball Standings':  '63920135',
  // ── Cheerleading ────────────────────────────────
  'Cheer Schedule':             '1114891054',
  'Cheer Standings':            '1923289058',
}

/** CORS-friendly CSV endpoint */
export function csvUrl(gid: string): string {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${gid}`
}

/** CORS-friendly JSON endpoint — more reliable for complex sheets */
export function jsonUrl(gid: string): string {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${gid}`
}

export async function fetchSheetAsRows(gid: string): Promise<string[][]> {
  const res = await fetch(jsonUrl(gid), { cache: 'no-store' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const raw = await res.text()
  const json = raw.replace(/^[^(]*\(/, '').replace(/\);?\s*$/, '')
  const data = JSON.parse(json)
  const table = data.table
  if (!table || !table.rows) return []

  return table.rows.map((row: { c: ({ v: unknown; f?: string } | null)[] }) =>
    (row?.c ?? []).map((cell) => {
      if (!cell || cell.v === null || cell.v === undefined) return ''
      const val = cell.f ?? cell.v
      return String(val).replace(/\n/g, ' ').trim()
    })
  )
}

// ── Date detection ────────────────────────────────────
const DATE_PATTERNS: [RegExp, string][] = [
  [/saturday.*may\s*2/i,  '2026-05-02'],
  [/sunday.*may\s*3/i,    '2026-05-03'],
  [/monday.*may\s*4/i,    '2026-05-04'],
  [/tuesday.*may\s*5/i,   '2026-05-05'],
  [/wednesday.*may\s*6/i, '2026-05-06'],
  [/thursday.*may\s*7/i,  '2026-05-07'],
  [/friday.*may\s*8/i,    '2026-05-08'],
]

function resolveDate(raw: string): string | null {
  const s = raw.replace(/\\n|\n|\r/g, ' ').replace(/\s+/g, ' ').trim()
  for (const [re, date] of DATE_PATTERNS) {
    if (re.test(s)) return date
  }
  return null
}

function resolvePhase(group: string): GamePhase {
  const g = group.toUpperCase().trim()
  if (g.includes('NATIONAL') && g.includes('FINAL')) return 'Final'
  if (g.includes('3RD PLACE')) return 'Consolation'
  if (g.includes('CONSOLATION') || g.includes(' CONS') || g.includes('CONS ') || g.startsWith('CONS')) return 'Consolation'
  if (g.includes('FINAL'))        return 'Final'
  if (g.includes('SEMI') || g.includes(' SF')) return 'Semi-Final'
  if (g.includes('QF') || g.includes('QUARTER')) return 'Quarter-Final'
  if (g.includes('PLAYOFF'))      return 'Playoff'
  return 'Group Stage'
}

const SKIP = [
  'DATE','TIME','GROUP','TEAM','BLUE GYM','RED GYM','COURT',
  'BOYS FUTSAL','GIRLS FUTSAL','BOYS VOLLEYBALL','GIRLS VOLLEYBALL',
  'SOFTBALL','CHEERLEADING','GAME','ARRIVAL','CEREMONY','MEETING',
  'COMPETITION','BOYS VBALL','GIRLS VBALL',
]

function isTeam(t: string): boolean {
  const s = t.trim()
  if (s.length < 2) return false
  if (/^\d+$/.test(s)) return false
  const u = s.toUpperCase()
  return !SKIP.some((w) => u === w || u.startsWith(w + ' '))
}

function toScore(val: string): number | null {
  const n = parseFloat(val)
  return isNaN(n) ? null : n
}

export function parseCsv(raw: string): string[][] {
  const normalized = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  const lines = normalized.split('\n')
  const rows: string[][] = []

  for (const line of lines) {
    if (!line.trim()) continue
    const normalized_line = line.replace(/\\"/g, '"')
    const row: string[] = []
    let field = ''
    let inQ = false
    let i = 0

    while (i < normalized_line.length) {
      const ch = normalized_line[i]
      if (inQ) {
        if (ch === '"') {
          if (normalized_line[i + 1] === '"') { field += '"'; i += 2; continue }
          inQ = false; i++; continue
        }
        field += ch; i++; continue
      }
      if (ch === '"') { inQ = true; i++; continue }
      if (ch === ',') { row.push(field.trim()); field = ''; i++; continue }
      field += ch; i++
    }
    row.push(field.trim())
    if (row.some(Boolean)) rows.push(row)
  }

  return rows
}

function c(row: string[], idx: number): string {
  return (row[idx] ?? '').trim()
}

export function parseScheduleCsv(csv: string, week: 1 | 2): Game[] {
  return parseScheduleRows(parseCsv(csv), week)
}

export function parseScheduleRows(rows: string[][], week: 1 | 2): Game[] {
  const games: Game[] = []
  let dateA = ''
  let dateB = ''
  let idx   = 0

  const sportA: SportName = week === 1 ? 'Boys Futsal'      : 'Girls Futsal'
  const sportB: SportName = week === 1 ? 'Girls Volleyball' : 'Boys Volleyball'

  for (const row of rows) {
    const dA = resolveDate(c(row, 0))
    if (dA) dateA = dA
    const dB = resolveDate(c(row, 15))
    if (dB) dateB = dB

    const timeA = c(row, 1)
    const timeB = c(row, 16) || c(row, 1)
    const okA   = /^\d{1,2}:\d{2}$/.test(timeA)
    const okB   = /^\d{1,2}:\d{2}$/.test(timeB)

    // ── Sport A — Blue Gym ────────────────────────────
    if (okA && dateA) {
      const g  = c(row, 2)
      const t1 = c(row, 3), t2 = c(row, 7)
      const hasX = c(row, 5).toLowerCase() === 'x'
      const s1   = hasX ? toScore(c(row, 4)) : null
      const s2   = hasX ? toScore(c(row, 6)) : null

      if (isTeam(t1) && isTeam(t2)) {
        games.push({
          id: `${sportA}-B-${dateA}-${timeA}-${idx++}`,
          sport: sportA, date: dateA, time: timeA,
          venue: 'Blue Gym', group: g, phase: resolvePhase(g),
          team1: t1, team2: t2, score1: s1, score2: s2,
        })
      }

      // ── Sport A — Red Gym ───────────────────────────
      const gR   = c(row, 9)
      const t1R  = c(row, 10), t2R = c(row, 14)
      const hasXR = c(row, 12).toLowerCase() === 'x'
      const s1R  = hasXR ? toScore(c(row, 11)) : null
      const s2R  = hasXR ? toScore(c(row, 13)) : null

      if (isTeam(t1R) && isTeam(t2R)) {
        games.push({
          id: `${sportA}-R-${dateA}-${timeA}-${idx++}`,
          sport: sportA, date: dateA, time: timeA,
          venue: 'Red Gym', group: gR, phase: resolvePhase(gR),
          team1: t1R, team2: t2R, score1: s1R, score2: s2R,
        })
      }
    }

    const useDateB = dateB || dateA
    const useTimeB = okB ? timeB : (okA ? timeA : '')

    if (useTimeB && useDateB) {
      if (week === 1) {
        // ── Girls Volleyball ─────────────────────────
        const g1   = c(row, 17), t1c1 = c(row, 18), t2c1 = c(row, 30)
        const hasXc1 = c(row, 24).toLowerCase() === 'x'
        if (isTeam(t1c1) && isTeam(t2c1)) {
          games.push({
            id: `${sportB}-C1-${useDateB}-${useTimeB}-${idx++}`,
            sport: sportB, date: useDateB, time: useTimeB,
            venue: 'Court 1', group: g1, phase: resolvePhase(g1),
            team1: t1c1, team2: t2c1,
            score1: hasXc1 ? toScore(c(row, 23)) : null,
            score2: hasXc1 ? toScore(c(row, 25)) : null,
          })
        }
        const g2   = c(row, 32), t1c2 = c(row, 33), t2c2 = c(row, 45)
        const hasXc2 = c(row, 39).toLowerCase() === 'x'
        if (isTeam(t1c2) && isTeam(t2c2)) {
          games.push({
            id: `${sportB}-C2-${useDateB}-${useTimeB}-${idx++}`,
            sport: sportB, date: useDateB, time: useTimeB,
            venue: 'Court 2', group: g2, phase: resolvePhase(g2),
            team1: t1c2, team2: t2c2,
            score1: hasXc2 ? toScore(c(row, 38)) : null,
            score2: hasXc2 ? toScore(c(row, 40)) : null,
          })
        }
      } else {
        // ── Boys Volleyball ───────────────────────────
        // Updated column map (47 cols, confirmed from browser console May 2026):
        // Court 1: time=17, group=18, team1=19, x=25, SETS1=24, SETS2=26, team2=31
        // Court 2: group=33, team1=34, x=40, SETS1=39, SETS2=41, team2=46
        const grpC1 = c(row, 18)
        const t1c1  = c(row, 19), t2c1 = c(row, 31)
        const hasXc1 = c(row, 25).toLowerCase() === 'x'
        const sets1c1 = toScore(c(row, 24)), sets2c1 = toScore(c(row, 26))
        const hasScoreC1 = hasXc1 && (sets1c1 !== null && sets1c1 > 0 || sets2c1 !== null && sets2c1 > 0)
        if (isTeam(t1c1) && isTeam(t2c1)) {
          games.push({
            id: `${sportB}-C1-${useDateB}-${useTimeB}-${idx++}`,
            sport: sportB, date: useDateB, time: useTimeB,
            venue: 'Court 1', group: grpC1 || 'Round Robin', phase: resolvePhase(grpC1),
            team1: t1c1, team2: t2c1,
            score1: hasScoreC1 ? sets1c1 : null,
            score2: hasScoreC1 ? sets2c1 : null,
          })
        }
        const grpC2 = c(row, 33)
        const t1c2  = c(row, 34), t2c2 = c(row, 46)
        const hasXc2 = c(row, 40).toLowerCase() === 'x'
        const sets1c2 = toScore(c(row, 39)), sets2c2 = toScore(c(row, 41))
        const hasScoreC2 = hasXc2 && (sets1c2 !== null && sets1c2 > 0 || sets2c2 !== null && sets2c2 > 0)
        if (isTeam(t1c2) && isTeam(t2c2)) {
          games.push({
            id: `${sportB}-C2-${useDateB}-${useTimeB}-${idx++}`,
            sport: sportB, date: useDateB, time: useTimeB,
            venue: 'Court 2', group: grpC2 || 'Round Robin', phase: resolvePhase(grpC2),
            team1: t1c2, team2: t2c2,
            score1: hasScoreC2 ? sets1c2 : null,
            score2: hasScoreC2 ? sets2c2 : null,
          })
        }
      }
    }
  }

  const seen = new Set<string>()
  return games.filter((g) => {
    const k = `${g.date}|${g.time}|${g.sport}|${g.team1}|${g.team2}|${g.venue}`
    if (seen.has(k)) return false
    seen.add(k); return true
  })
}