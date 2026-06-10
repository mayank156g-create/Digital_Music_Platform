import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import DashboardLayout from '../components/layout/DashboardLayout'

const actions = [
  {
    to: '/studio/upload',
    icon: '⊕',
    label: 'Upload a Track',
    desc: 'Add a new music file to the platform via ImageKit.',
    color: 'border-brand-700 bg-brand-950 hover:bg-brand-900',
    badge: 'bg-brand-800 text-brand-300',
  },
  {
    to: '/studio/albums',
    icon: '◫',
    label: 'Create an Album',
    desc: 'Group your uploaded tracks into a named album.',
    color: 'border-zinc-700 bg-surface-card hover:bg-surface-hover',
    badge: 'bg-zinc-800 text-zinc-300',
  },
  {
    to: '/profile',
    icon: '◉',
    label: 'View Profile',
    desc: 'See your artist information and account details.',
    color: 'border-zinc-700 bg-surface-card hover:bg-surface-hover',
    badge: 'bg-zinc-800 text-zinc-300',
  },
]

export default function StudioPage() {
  const { user } = useAuth()

  return (
    <DashboardLayout>
      <div className="mb-8">
        <span className="badge-artist mb-3 inline-block">Artist Studio</span>
        <h1 className="font-display font-bold text-3xl text-zinc-100">
          Welcome, <span className="text-brand-400">{user?.username}</span>
        </h1>
        <p className="text-zinc-400 mt-1">
          This is your creative hub. Upload tracks, create albums, and manage your music.
        </p>
      </div>

      {/* Action cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {actions.map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className={`card p-6 border transition-all duration-200 ${a.color}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4 ${a.badge}`}>
              {a.icon}
            </div>
            <h3 className="font-display font-semibold text-zinc-100 mb-1">{a.label}</h3>
            <p className="text-zinc-500 text-sm">{a.desc}</p>
          </Link>
        ))}
      </div>

      {/* API info panel */}
      <div className="card p-6">
        <h2 className="font-display font-semibold text-zinc-100 mb-4">Platform Notes</h2>
        <ul className="space-y-3 text-sm text-zinc-400">
          <li className="flex items-start gap-2">
            <span className="text-brand-400 mt-0.5">→</span>
            <span>Music files are uploaded to <strong className="text-zinc-300">ImageKit CDN</strong>. Supported formats depend on the backend ImageKit configuration.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-400 mt-0.5">→</span>
            <span>Only users with role <strong className="text-zinc-300">artist</strong> can upload tracks or create albums. Listeners cannot access this section.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-400 mt-0.5">→</span>
            <span>To create an album, upload your tracks first, then select them by title when creating the album.</span>
          </li>
        </ul>
      </div>
    </DashboardLayout>
  )
}
