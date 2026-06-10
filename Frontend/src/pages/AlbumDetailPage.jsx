import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { musicAPI } from '../services/api'
import { usePlayer } from '../context/PlayerContext'
import DashboardLayout from '../components/layout/DashboardLayout'
import Spinner from '../components/common/Spinner'
import ErrorMessage from '../components/common/ErrorMessage'

export default function AlbumDetailPage() {
  const { albumId } = useParams()
  const { playSong, currentSong, isPlaying } = usePlayer()
  const [album, setAlbum] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const data = await musicAPI.getAlbumById(albumId)
        setAlbum(data.album)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [albumId])

  if (loading) return <DashboardLayout><div className="py-24"><Spinner /></div></DashboardLayout>
  if (error)   return <DashboardLayout><ErrorMessage message={error} /></DashboardLayout>
  if (!album)  return <DashboardLayout><p className="text-zinc-400">Album not found.</p></DashboardLayout>

  const musics = album.musics || []

  const playAll = () => {
    if (musics.length > 0) playSong(musics[0], musics)
  }

  return (
    <DashboardLayout>
      <Link to="/albums" className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-300 text-sm mb-6">
        ← Back to albums
      </Link>

      {/* Album header */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        <div className="w-40 h-40 rounded-2xl bg-zinc-800 flex items-center justify-center text-6xl flex-shrink-0">
          ◫
        </div>
        <div className="flex flex-col justify-end">
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Album</p>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-zinc-100">{album.title}</h1>
          <p className="text-zinc-400 mt-2">{album.artist?.username}</p>
          <p className="text-zinc-600 text-sm mt-1">{musics.length} track{musics.length !== 1 ? 's' : ''}</p>
          <div className="mt-4">
            <button onClick={playAll} disabled={musics.length === 0} className="btn-primary">
              ▶ Play all
            </button>
          </div>
        </div>
      </div>

      {/* Track list */}
      {musics.length === 0 ? (
        <p className="text-zinc-500">This album has no tracks yet.</p>
      ) : (
        <div className="card overflow-hidden">
          {musics.map((song, idx) => {
            const isActive = currentSong?._id === song._id
            const playing  = isActive && isPlaying
            return (
              <div
                key={song._id}
                onClick={() => playSong(song, musics)}
                className={`
                  flex items-center gap-4 px-5 py-3.5 cursor-pointer border-b border-surface-border last:border-0
                  transition-colors duration-150 group
                  ${isActive ? 'bg-brand-950' : 'hover:bg-surface-hover'}
                `}
              >
                {/* Track number / play icon */}
                <div className="w-6 flex items-center justify-center text-sm flex-shrink-0">
                  {playing ? (
                    <div className="flex items-end gap-0.5 h-4">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-0.5 bg-brand-400 rounded-full animate-pulse"
                          style={{ height: `${[60,100,40][i-1]}%`, animationDelay: `${i*0.1}s` }} />
                      ))}
                    </div>
                  ) : (
                    <span className={`${isActive ? 'text-brand-400' : 'text-zinc-500 group-hover:hidden'}`}>
                      {idx + 1}
                    </span>
                  )}
                  <svg className={`w-4 h-4 text-zinc-300 hidden ${!playing ? 'group-hover:block' : ''}`}
                    fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>

                {/* Title */}
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm truncate ${isActive ? 'text-brand-300' : 'text-zinc-100'}`}>
                    {song.title}
                  </p>
                  <p className="text-zinc-500 text-xs truncate">{song.artist?.username || album.artist?.username}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </DashboardLayout>
  )
}
