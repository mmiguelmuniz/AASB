/**
 * useSchedule
 *
 * Fetches game data live from the public Google Sheets via CSV export.
 * Falls back to static local data if the fetch fails.
 * Auto-refreshes every 60 seconds.
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import type { Game } from '@/types'
import { csvUrl, parseScheduleCsv, SHEET_GIDS } from '@/lib/sheetsParser'
import { FALLBACK_GAMES } from '@/data/fallbackGames'

const REFRESH_MS = 30_000  // re-fetch every 30 seconds

export type FetchStatus = 'idle' | 'loading' | 'live' | 'fallback' | 'error'

export interface UseScheduleReturn {
  games:      Game[]
  status:     FetchStatus
  lastUpdate: Date | null
  refetch:    () => void
}

async function fetchWeek(gid: string, week: 1 | 2): Promise<Game[]> {
  const res = await fetch(csvUrl(gid), { cache: 'no-store' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const csv = await res.text()
  return parseScheduleCsv(csv, week)
}

export function useSchedule(): UseScheduleReturn {
  const [games,      setGames]      = useState<Game[]>([])
  const [status,     setStatus]     = useState<FetchStatus>('idle')
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const hasLiveData = useRef(false)

  const fetchAll = useCallback(async () => {
    setStatus('loading')
    try {
      const gid1 = SHEET_GIDS['Games Schedule May 2-5']
      const gid2 = SHEET_GIDS['Games Schedule May 5-8']

      const [week1, week2] = await Promise.all([
        fetchWeek(gid1, 1),
        fetchWeek(gid2, 2),
      ])

      const all = [...week1, ...week2]

      if (all.length === 0) throw new Error('No games parsed from sheet')

      setGames(all)
      setStatus('live')
      setLastUpdate(new Date())
      hasLiveData.current = true
    } catch (err) {
      console.warn('[useSchedule] fetch failed, using fallback:', err)
      if (!hasLiveData.current) {
        setGames(FALLBACK_GAMES)
        setLastUpdate(new Date())
      }
      setStatus('fallback')
    }
  }, [])

  // Initial fetch
  useEffect(() => { fetchAll() }, [fetchAll])

  // Periodic refresh
  useEffect(() => {
    const id = setInterval(fetchAll, REFRESH_MS)
    return () => clearInterval(id)
  }, [fetchAll])

  return { games, status, lastUpdate, refetch: fetchAll }
}