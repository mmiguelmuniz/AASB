/**
 * useStandings
 *
 * Fetches all 4 sport standings from Google Sheets in parallel.
 * Same pattern as useSchedule: live data with fallback, refreshes every 60s.
 */

import { useState, useEffect, useCallback } from 'react'
import {
  fetchFutsalStandings,
  fetchVolleyballStandings,
  type SportStandings,
} from '@/lib/standingsParser'

const REFRESH_MS = 60_000

export type StandingsStatus = 'idle' | 'loading' | 'live' | 'fallback'

export interface UseStandingsReturn {
  standings:  SportStandings[]
  status:     StandingsStatus
  lastUpdate: Date | null
  refetch:    () => void
}

export function useStandings(): UseStandingsReturn {
  const [standings,  setStandings]  = useState<SportStandings[]>([])
  const [status,     setStatus]     = useState<StandingsStatus>('idle')
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchAll = useCallback(async () => {
    setStatus('loading')
    try {
      const results = await Promise.all([
        fetchFutsalStandings('Boys Futsal'),
        fetchFutsalStandings('Girls Futsal'),
        fetchVolleyballStandings('Girls Volleyball'),
        fetchVolleyballStandings('Boys Volleyball'),
      ])
      setStandings(results)
      setStatus('live')
      setLastUpdate(new Date())
    } catch (err) {
      console.warn('[useStandings] fetch failed:', err)
      setStatus('fallback')
      if (lastUpdate === null) setLastUpdate(new Date())
    }
  }, [lastUpdate])

  useEffect(() => { fetchAll() }, [fetchAll])
  useEffect(() => {
    const id = setInterval(fetchAll, REFRESH_MS)
    return () => clearInterval(id)
  }, [fetchAll])

  return { standings, status, lastUpdate, refetch: fetchAll }
}