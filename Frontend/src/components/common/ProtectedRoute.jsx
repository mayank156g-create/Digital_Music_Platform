import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

/**
 * Requires any authenticated user (user OR artist).
 * Redirects to /login if not logged in.
 */
export function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}

/**
 * Requires role === "artist".
 * Redirects to /dashboard if logged in but wrong role.
 */
export function ArtistRoute({ children }) {
  const { isLoggedIn, isArtist } = useAuth()
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  if (!isArtist) {
    return <Navigate to="/dashboard" replace />
  }
  return children
}

/**
 * Requires role === "user".
 * Redirects to /studio if artist tries to access user-only pages.
 */
export function UserRoute({ children }) {
  const { isLoggedIn, isUser } = useAuth()
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  if (!isUser) {
    return <Navigate to="/studio" replace />
  }
  return children
}
