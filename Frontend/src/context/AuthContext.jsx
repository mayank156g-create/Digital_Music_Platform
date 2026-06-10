import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // user: null | { id, username, email, role }
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('sw_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Persist user across page refreshes
  useEffect(() => {
    if (user) {
      localStorage.setItem('sw_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('sw_user')
    }
  }, [user])

  const clearError = useCallback(() => setError(null), [])

  const register = useCallback(async (formData) => {
    setLoading(true)
    setError(null)
    try {
      const data = await authAPI.register(formData)
      setUser(data.user)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (formData) => {
    setLoading(true)
    setError(null)
    try {
      const data = await authAPI.login(formData)
      setUser(data.user)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setLoading(true)
    try {
      await authAPI.logout()
    } catch {
      // Even if the request fails, clear local state
    } finally {
      setUser(null)
      setLoading(false)
    }
  }, [])

  const isArtist = user?.role === 'artist'
  const isUser   = user?.role === 'user'
  const isLoggedIn = Boolean(user)

  return (
    <AuthContext.Provider
      value={{ user, loading, error, clearError, register, login, logout, isArtist, isUser, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
