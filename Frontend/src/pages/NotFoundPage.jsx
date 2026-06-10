import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function NotFoundPage() {
  const { isLoggedIn, isArtist } = useAuth()
  const home = isLoggedIn ? (isArtist ? '/studio' : '/dashboard') : '/'

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        <div className="text-8xl mb-6">🎵</div>
        <h1 className="font-display font-bold text-5xl text-zinc-100 mb-3">404</h1>
        <p className="text-zinc-400 text-lg mb-8">This track doesn't exist.</p>
        <Link to={home} className="btn-primary">
          ← Back home
        </Link>
      </div>
    </div>
  )
}
