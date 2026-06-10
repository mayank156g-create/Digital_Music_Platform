import React from 'react'
import { useAuth } from '../context/AuthContext'
import DashboardLayout from '../components/layout/DashboardLayout'

export default function ProfilePage() {
  const { user, isArtist, logout } = useAuth()

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="font-display font-bold text-3xl text-zinc-100">Your Profile</h1>
        <p className="text-zinc-400 mt-1">Account details and role information.</p>
      </div>

      <div className="max-w-lg flex flex-col gap-5">
        {/* Avatar + name */}
        <div className="card p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-brand-700 flex items-center justify-center text-brand-100 text-2xl font-bold flex-shrink-0">
            {user?.username?.[0]?.toUpperCase() || '?'}
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-zinc-100">{user?.username}</h2>
            <p className="text-zinc-400 text-sm">{user?.email}</p>
            <span className={`mt-2 inline-block ${isArtist ? 'badge-artist' : 'badge-user'}`}>
              {isArtist ? '🎙️ Artist' : '🎧 Listener'}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="card p-6">
          <h3 className="font-display font-semibold text-zinc-100 mb-4">Account Details</h3>
          <dl className="space-y-3">
            <Row label="User ID"  value={user?.id} mono />
            <Row label="Username" value={user?.username} />
            <Row label="Email"    value={user?.email} />
            <Row label="Role"     value={user?.role} capitalize />
          </dl>
        </div>

        {/* Role explanation */}
        <div className="card p-6 bg-zinc-900">
          <h3 className="font-display font-semibold text-zinc-100 mb-3">
            {isArtist ? 'Artist Permissions' : 'Listener Permissions'}
          </h3>
          {isArtist ? (
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex gap-2"><span className="text-brand-400">✓</span> Upload music files</li>
              <li className="flex gap-2"><span className="text-brand-400">✓</span> Create and manage albums</li>
              <li className="flex gap-2"><span className="text-zinc-600">✗</span> Browse the listener music library (API restriction)</li>
            </ul>
          ) : (
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex gap-2"><span className="text-brand-400">✓</span> Browse the full music library</li>
              <li className="flex gap-2"><span className="text-brand-400">✓</span> Stream all tracks and albums</li>
              <li className="flex gap-2"><span className="text-zinc-600">✗</span> Upload music (artist role required)</li>
            </ul>
          )}
        </div>

        {/* Danger zone */}
        <div className="card p-6 border-red-900/50">
          <h3 className="font-display font-semibold text-zinc-100 mb-2">Sign Out</h3>
          <p className="text-zinc-500 text-sm mb-4">You'll be returned to the home page and your session will end.</p>
          <button
            onClick={logout}
            className="px-5 py-2.5 rounded-xl border border-red-800 text-red-400 hover:bg-red-950 font-semibold text-sm transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}

function Row({ label, value, mono, capitalize }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-surface-border last:border-0">
      <dt className="text-zinc-500 text-sm flex-shrink-0">{label}</dt>
      <dd className={`text-zinc-200 text-sm text-right break-all ${mono ? 'font-mono text-xs' : ''} ${capitalize ? 'capitalize' : ''}`}>
        {value || '—'}
      </dd>
    </div>
  )
}
