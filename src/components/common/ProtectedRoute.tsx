import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore, type Role } from '@/store/useAuthStore'

interface ProtectedRouteProps {
  allowedRoles?: Role[]
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore()
  const location = useLocation()

  // Development shortcut: bypass auth checks when running locally
  if (import.meta.env.DEV) {
    console.debug('[ProtectedRoute] DEV mode – auth bypass')
    return <Outlet />
  }

  // For testing UI without having hooked up backend yet, we can bypass this by commenting it out,
  // or we can just leave it active and let the user "login" using our mock forms later.
  // Right now, let's allow it to act properly.
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}
