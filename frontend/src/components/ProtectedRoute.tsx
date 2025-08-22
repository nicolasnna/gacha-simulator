import type { RoleType } from '@/interfaces/role.interface'
import { useAppSelector } from '@/services/hooks/useRedux'
import { Navigate, Outlet, useLocation } from 'react-router'

interface ProtectedRouteProps {
  requiredRoles?: RoleType[]
  redirectTo?: string
}

export default function ProtectedRoute({
  requiredRoles,
  redirectTo = '/login'
}: ProtectedRouteProps) {
  const { userToken, userInfo } = useAppSelector((s) => s.auth)
  const location = useLocation()

  if (!userToken)
    return <Navigate to={redirectTo} state={{ from: location }} replace />

  if (!requiredRoles || requiredRoles.length === 0) return <Outlet />

  if (userInfo && requiredRoles.includes(userInfo.role)) return <Outlet />

  return <Navigate to={redirectTo} state={{ from: location }} replace />
}
