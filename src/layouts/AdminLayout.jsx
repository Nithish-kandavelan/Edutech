import BaseDashboardLayout from './BaseDashboardLayout.jsx'
import { useMemo } from 'react'

export default function AdminLayout() {
  const nav = useMemo(() => [
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/users', label: 'User Management' },
    { to: '/admin/courses', label: 'Course Management' },
    { to: '/admin/analytics', label: 'Analytics' },
    { to: '/admin/settings', label: 'System Settings' }
  ], [])
  return <BaseDashboardLayout role="admin" nav={nav} />
}
