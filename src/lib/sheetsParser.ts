import type { Game, SportName, GamePhase } from '@/types'

export const SHEET_ID = '1VNomje-0_TvX-3dHDTsPGm-qWvPtNo5K61x9dz1loTA'

// ⚠️ Each key MUST have the correct gid from the URL when that tab is open
// e.g. https://docs.google.com/spreadsheets/d/.../edit#gid=XXXXXXX
export const SHEET_GIDS: Record<string, string> = {
  // ── Game Schedules ──────────────────────────────
  'Games Schedule May 2-5':    '137797463',
  'Games Schedule May 5-8':    '1840893406',
  // ── Standings ───────────────────────────────────
  'Boys Futsal Standings':     '754907321',
  'Girls Volleyball Standings':'1750726555',
  'Girls Futsal Standings':    '1354386285',
  'Boys Volleyball Standings': '1845559618',
  // ── Cheerleading ────────────────────────────────
  'Cheer Schedule':            '1114891054',
  'Cheer Standings':           '208776201',
}

/** CORS-friendly endpoint — gviz/tq has Access-Control-Allow-Origin: * */
export function csvUrl(gid: string): string {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${gid}`
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
  if (g.includes('FINAL'))        return 'Final'
  if (g.includes('SEMI') || g.includes(' SF')) return 'Semi-Final'
  if (g.includes('QF') || g.includes('QUARTER')) return 'Quarter-Final'
  if (g.includes('CONSOLATION'))  return 'Consolation'
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

/** Convert score string to number or null */
function toScore(val: string): number | null {
  const n = parseFloat(val)
  return isNaN(n) ? null : n
}

// ── RFC-4180 CSV parser ───────────────────────────────
export function parseCsv(raw: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQ = false
  let i = 0
  const s = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

  while (i < s.length) {
    const ch = s[i]
    if (inQ) {
      if (ch === '"') {
        if (s[i + 1] === '"') { field += '"'; i += 2; continue }
        inQ = false; i++; continue
      }
      if (ch === '\n' || (ch === '\\' && s[i + 1] === 'n')) {
        field += ' '; i += (ch === '\\' ? 2 : 1); continue
      }
      field += ch; i++; continue
    }
    if (ch === '"')  { inQ = true; i++; continue }
    if (ch === ',')  { row.push(field.trim()); field = ''; i++; continue }
    if (ch === '\n') { row.push(field.trim()); rows.push(row); row = []; field = ''; i++; continue }
    field += ch; i++
  }
  row.push(field.trim())
  if (row.some(Boolean)) rows.push(row)
  return rows
}

function c(row: string[], idx: number): string {
  return (row[idx] ?? '').trim()
}

// ── Main parser ───────────────────────────────────────
// Column map (0-indexed), confirmed from xlsx inspection:
//
// Sport A (Boys Futsal wk1 / Girls Futsal wk2):
//   Blue Gym → group=2, team1=3, score1=4, score2=6, team2=7
//   Red Gym  → group=9, team1=10, score1=11, score2=13, team2=14
//
// Sport B (Girls Volleyball wk1 / Boys Volleyball wk2):
//   Court 1  → group=17, team1=18, sets1=23, sets2=25, team2=30
//   Court 2  → group=32, team1=33, sets1=38, sets2=40, team2=45
//
// IMPORTANT: col19 is volleyball TOTAL POINTS (not futsal score!)
// Never read col19 as a futsal score.

export function parseScheduleCsv(csv: string, week: 1 | 2): Game[] {
  const rows  = parseCsv(csv)
  const games: Game[] = []
  let dateA = ''
  let dateB = ''
  let idx   = 0

  const sportA: SportName = week === 1 ? 'Boys Futsal'      : 'Girls Futsal'
  const sportB: SportName = week === 1 ? 'Girls Volleyball' : 'Boys Volleyball'

  for (const row of rows) {
    // Track current dates for each half of the sheet
    const dA = resolveDate(c(row, 0))
    if (dA) dateA = dA
    const dB = resolveDate(c(row, 15))
    if (dB) dateB = dB

    const timeA = c(row, 1)
    const timeB = c(row, 16)
    const okA   = /^\d{1,2}:\d{2}$/.test(timeA)
    const okB   = /^\d{1,2}:\d{2}$/.test(timeB)

    // ── Sport A — Blue Gym ────────────────────────────
    // cols: group=2, team1=3, score1=4, [x=5], score2=6, team2=7
    if (okA && dateA) {
      const g  = c(row, 2)
      const t1 = c(row, 3), t2 = c(row, 7)
      // Only read score if col5 is 'x' — confirms it's a score row
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
      // cols: group=9, team1=10, score1=11, [x=12], score2=13, team2=14
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

    // ── Sport B — Court 1 ─────────────────────────────
    // cols: group=17, team1=18, [T=19 IGNORE], sets1=23, [x=24], sets2=25, team2=30
    const useDateB = dateB || dateA
    const useTimeB = okB ? timeB : (okA ? timeA : '')

    if (useTimeB && useDateB) {
      const g1     = c(row, 17)
      const t1c1   = c(row, 18), t2c1 = c(row, 30)
      const hasXc1 = c(row, 24).toLowerCase() === 'x'
      const sw1c1  = hasXc1 ? toScore(c(row, 23)) : null
      const sw2c1  = hasXc1 ? toScore(c(row, 25)) : null

      if (isTeam(t1c1) && isTeam(t2c1)) {
        games.push({
          id: `${sportB}-C1-${useDateB}-${useTimeB}-${idx++}`,
          sport: sportB, date: useDateB, time: useTimeB,
          venue: 'Court 1', group: g1, phase: resolvePhase(g1),
          team1: t1c1, team2: t2c1, score1: sw1c1, score2: sw2c1,
        })
      }

      // ── Sport B — Court 2 ───────────────────────────
      // cols: group=32, team1=33, sets1=38, [x=39], sets2=40, team2=45
      const g2     = c(row, 32)
      const t1c2   = c(row, 33), t2c2 = c(row, 45)
      const hasXc2 = c(row, 39).toLowerCase() === 'x'
      const sw1c2  = hasXc2 ? toScore(c(row, 38)) : null
      const sw2c2  = hasXc2 ? toScore(c(row, 40)) : null

      if (isTeam(t1c2) && isTeam(t2c2)) {
        games.push({
          id: `${sportB}-C2-${useDateB}-${useTimeB}-${idx++}`,
          sport: sportB, date: useDateB, time: useTimeB,
          venue: 'Court 2', group: g2, phase: resolvePhase(g2),
          team1: t1c2, team2: t2c2, score1: sw1c2, score2: sw2c2,
        })
      }
    }
  }

  // Deduplicate by exact key
  const seen = new Set<string>()
  return games.filter((g) => {
    const k = `${g.date}|${g.time}|${g.sport}|${g.team1}|${g.team2}|${g.venue}`
    if (seen.has(k)) return false
    seen.add(k); return true
  })
}