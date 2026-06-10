import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const UserLinks = [
  { to: '/dashboard', icon: '⊞', label: 'Dashboard' },
  { to: '/library',   icon: '♫', label: 'Music Library' },
  { to: '/albums',    icon: '◫', label: 'Albums' },
  { to: '/profile',   icon: '◉', label: 'Profile' },
]

const ArtistLinks = [
  { to: '/studio',        icon: '⊞', label: 'Studio' },
  { to: '/studio/upload', icon: '⊕', label: 'Upload Track' },
  { to: '/studio/albums', icon: '◫', label: 'Create Album' },
  { to: '/profile',       icon: '◉', label: 'Profile' },
]

export default function Sidebar() {
  const { user, isArtist, logout } = useAuth()
  const navigate = useNavigate()

  const links = isArtist ? ArtistLinks : UserLinks

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <aside className="hidden md:flex flex-col w-60 min-h-screen bg-surface-card border-r border-surface-border fixed top-0 left-0 z-40">
      {/* Brand */}
      <div className="px-5 h-16 flex items-center border-b border-surface-border gap-2">
        <span className="text-xl">🎵</span>
        <span className="font-display font-bold text-zinc-100">SoundWave</span>
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brand-700 flex items-center justify-center text-brand-100 font-semibold text-sm">
            {user?.username?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="min-w-0">
            <p className="text-zinc-100 font-medium text-sm truncate">{user?.username}</p>
            <span className={isArtist ? 'badge-artist' : 'badge-user'}>
              {isArtist ? 'Artist' : 'Listener'}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {links.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard' || to === '/studio'}
            className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}
          >
            <span className="text-base leading-none">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-4 border-t border-surface-border pt-4">
        <button onClick={handleLogout} className="nav-link w-full text-red-400 hover:text-red-300 hover:bg-red-950">
          <span>⎋</span> Sign out
        </button>
      </div>
    </aside>
  )
}
