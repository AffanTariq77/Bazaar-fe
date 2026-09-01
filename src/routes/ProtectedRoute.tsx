import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store'
import type { Role } from '../types/user'

interface ProtectedRouteProps {
  roles?: Role[]
}

export function ProtectedRoute({ roles }: ProtectedRouteProps) {
  const { user, accessToken } = useAuthStore()

  if (!accessToken || !user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />

  return <Outlet />
}
