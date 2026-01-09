import BaseDashboardLayout from './BaseDashboardLayout.jsx'
import { useMemo } from 'react'

export default function ClientLayout() {
  const nav = useMemo(() => [
    { to: '/client', label: 'Dashboard' },
    { to: '/client/oversight', label: 'Course Oversight' },
    { to: '/client/reports', label: 'Reports' },
    { to: '/client/profile', label: 'Institution Profile' }
  ], [])
  return <BaseDashboardLayout role="client" nav={nav} />
}
