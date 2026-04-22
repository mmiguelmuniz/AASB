import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import SchoolsPage from '@/pages/SchoolsPage'
import SchedulePage from '@/pages/SchedulePage'
import StandingsPage from '@/pages/StandingsPage'
import InfoPage from '@/pages/InfoPage'
import NotFoundPage from '@/pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index            element={<HomePage />} />
        <Route path="schools"   element={<SchoolsPage />} />
        <Route path="schedule"  element={<SchedulePage />} />
        <Route path="standings" element={<StandingsPage />} />
        <Route path="info"      element={<InfoPage />} />
        <Route path="*"         element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
