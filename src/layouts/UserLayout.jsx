import BaseDashboardLayout from './BaseDashboardLayout.jsx'
import { useMemo } from 'react'

export default function UserLayout() {
  const nav = useMemo(() => [
    { to: '/user', label: 'Landing' },
    { to: '/user/dashboard', label: 'Dashboard' },
    { to: '/user/planner', label: 'Study Planner' },
    { to: '/user/materials', label: 'Materials' },
    { to: '/user/quiz', label: 'Practice & Quizzes' },
    { to: '/user/progress', label: 'Progress' },
    { to: '/user/profile', label: 'Profile' }
  ], [])
  return <BaseDashboardLayout role="user" nav={nav} />
}
