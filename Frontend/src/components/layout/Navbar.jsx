import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { isLoggedIn, isArtist, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-surface-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🎵</span>
          <span className="font-display font-bold text-lg text-zinc-100">SoundWave</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-2">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="btn-ghost">Sign in</Link>
              <Link to="/register" className="btn-primary">Get started</Link>
            </>
          ) : (
            <>
              <Link to={isArtist ? '/studio' : '/dashboard'} className="btn-ghost">
                {isArtist ? 'Studio' : 'Dashboard'}
              </Link>
              {!isArtist && <Link to="/library" className="btn-ghost">Library</Link>}
              <button onClick={handleLogout} className="btn-secondary">Sign out</button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 text-zinc-400"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-surface-border bg-surface px-4 py-4 flex flex-col gap-2">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="btn-ghost justify-center" onClick={() => setMenuOpen(false)}>Sign in</Link>
              <Link to="/register" className="btn-primary justify-center" onClick={() => setMenuOpen(false)}>Get started</Link>
            </>
          ) : (
            <>
              <Link to={isArtist ? '/studio' : '/dashboard'} className="btn-ghost justify-center" onClick={() => setMenuOpen(false)}>
                {isArtist ? 'Studio' : 'Dashboard'}
              </Link>
              {!isArtist && <Link to="/library" className="btn-ghost justify-center" onClick={() => setMenuOpen(false)}>Library</Link>}
              <button onClick={handleLogout} className="btn-secondary justify-center">Sign out</button>
            </>
          )}
        </div>
      )}
    </header>
  )
}
