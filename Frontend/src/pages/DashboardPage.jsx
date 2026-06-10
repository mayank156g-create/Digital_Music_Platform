import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { musicAPI } from '../services/api'
import DashboardLayout from '../components/layout/DashboardLayout'
import Spinner from '../components/common/Spinner'
import ErrorMessage from '../components/common/ErrorMessage'
import SongCard from '../components/music/SongCard'

export default function DashboardPage() {
  const { user } = useAuth()
  const [recentSongs, setRecentSongs] = useState([])
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const [songsData, albumsData] = await Promise.all([
          musicAPI.getAllMusics(),
          musicAPI.getAllAlbums(),
        ])
        setRecentSongs(songsData.musics?.slice(0, 6) || [])
        setAlbums(albumsData.albums?.slice(0, 4) || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <DashboardLayout>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-zinc-100">
          Good {getGreeting()}, <span className="text-brand-400">{user?.username}</span> 👋
        </h1>
        <p className="text-zinc-400 mt-1">Here's what's playing on SoundWave today.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
        <StatCard label="Total Tracks" value={recentSongs.length + (loading ? '…' : '')} icon="🎵" />
        <StatCard label="Albums"       value={albums.length + (loading ? '…' : '')}     icon="💿" />
        <StatCard label="Your Role"    value="Listener" icon="🎧" className="col-span-2 sm:col-span-1" />
      </div>

      {/* Recent songs */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-xl text-zinc-100">Recent Tracks</h2>
          <Link to="/library" className="text-brand-400 hover:text-brand-300 text-sm font-medium">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="py-16"><Spinner /></div>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : recentSongs.length === 0 ? (
          <p className="text-zinc-500 text-sm">No tracks yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {recentSongs.map((song) => (
              <SongCard key={song._id} song={song} allSongs={recentSongs} />
            ))}
          </div>
        )}
      </section>

      {/* Albums preview */}
      {albums.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-xl text-zinc-100">Albums</h2>
            <Link to="/albums" className="text-brand-400 hover:text-brand-300 text-sm font-medium">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {albums.map((album) => (
              <Link
                key={album._id}
                to={`/albums/${album._id}`}
                className="card p-4 hover:border-zinc-600 hover:bg-surface-hover transition-all"
              >
                <div className="w-full aspect-square rounded-xl bg-zinc-800 flex items-center justify-center mb-3 text-3xl">◫</div>
                <p className="font-semibold text-sm text-zinc-100 truncate">{album.title}</p>
                <p className="text-zinc-500 text-xs truncate">{album.artist?.username}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </DashboardLayout>
  )
}

function StatCard({ label, value, icon, className = '' }) {
  return (
    <div className={`card p-5 ${className}`}>
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-2xl font-display font-bold text-zinc-100">{value || '—'}</p>
      <p className="text-zinc-500 text-sm">{label}</p>
    </div>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}
