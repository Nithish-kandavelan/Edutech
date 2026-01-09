import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'

export default function ProtectedRoute({ allowed }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  if (!allowed.includes(user.role)) return <Navigate to="/login" replace />
  return <Outlet />
}
