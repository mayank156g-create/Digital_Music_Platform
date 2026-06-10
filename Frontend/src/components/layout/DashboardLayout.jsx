import React from 'react'
import Sidebar from './Sidebar'
import AudioPlayerBar from './AudioPlayerBar'
import { useAuth } from '../../context/AuthContext'

export default function DashboardLayout({ children }) {
  const { isArtist } = useAuth()

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <main className="md:ml-60 min-h-screen flex flex-col pb-24">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-2 px-4 h-14 border-b border-surface-border bg-surface-card sticky top-0 z-30">
          <span className="text-xl">🎵</span>
          <span className="font-display font-bold text-zinc-100">SoundWave</span>
          <div className="ml-auto">
            <span className={isArtist ? 'badge-artist' : 'badge-user'}>
              {isArtist ? 'Artist' : 'Listener'}
            </span>
          </div>
        </div>

        <div className="flex-1 p-6 animate-fade-in">
          {children}
        </div>
      </main>
      <AudioPlayerBar />
    </div>
  )
}
