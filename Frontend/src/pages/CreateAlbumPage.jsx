import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { musicAPI } from '../services/api'
import DashboardLayout from '../components/layout/DashboardLayout'
import ErrorMessage from '../components/common/ErrorMessage'
import Spinner from '../components/common/Spinner'

export default function CreateAlbumPage() {
  const [allSongs, setAllSongs] = useState([])
  const [songsLoading, setSongsLoading] = useState(true)
  const [songsError, setSongsError] = useState('')

  const [title, setTitle] = useState('')
  const [selected, setSelected] = useState([])  // array of music _ids

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(null)

  // Note: getAllMusics requires role=user, but artists can't call it per backend.
  // The backend authUser middleware rejects artists. We show an explanation below.
  useEffect(() => {
    musicAPI.getAllMusics()
      .then((d) => setAllSongs(d.musics || []))
      .catch((err) => setSongsError(err.message))
      .finally(() => setSongsLoading(false))
  }, [])

  const toggleSong = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(null)

    if (!title.trim()) { setError('Enter an album title.'); return }
    if (selected.length === 0) { setError('Select at least one track.'); return }

    setLoading(true)
    try {
      const data = await musicAPI.createAlbum({ title: title.trim(), musics: selected })
      setSuccess(data.album)
      setTitle('')
      setSelected([])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <Link to="/studio" className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-300 text-sm mb-6">
        ← Back to Studio
      </Link>

      <div className="mb-6">
        <h1 className="font-display font-bold text-3xl text-zinc-100">Create an Album</h1>
        <p className="text-zinc-400 mt-1">Group your uploaded tracks into a collection.</p>
      </div>

      {/* Backend constraint notice */}
      <div className="mb-5 p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-400 text-sm">
        <strong className="text-zinc-300">Backend note:</strong> The <code className="text-brand-400">/api/music</code> endpoint is restricted to role <code className="text-brand-400">user</code>. To pick tracks here, paste their MongoDB IDs manually, or the backend needs a separate artist-accessible song list endpoint.
      </div>

      <div className="max-w-xl">
        {success && (
          <div className="mb-5 p-4 rounded-xl bg-brand-950 border border-brand-700 text-brand-300 text-sm animate-fade-in">
            <p className="font-semibold">✓ Album "{success.title}" created!</p>
            <p className="text-brand-400 text-xs mt-0.5">ID: {success.id}</p>
          </div>
        )}

        <ErrorMessage message={error} />

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-5">
          <div>
            <label className="block text-zinc-300 text-sm font-medium mb-1.5">Album Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Late Night Sessions"
              className="input-field"
            />
          </div>

          {/* Track selector */}
          <div>
            <label className="block text-zinc-300 text-sm font-medium mb-1.5">
              Select Tracks * {selected.length > 0 && <span className="text-brand-400">({selected.length} selected)</span>}
            </label>

            {songsLoading ? (
              <div className="card p-6"><Spinner size="sm" /></div>
            ) : songsError ? (
              <div className="card p-4">
                <p className="text-zinc-500 text-sm mb-3">{songsError}</p>
                <p className="text-zinc-400 text-xs">Enter track IDs manually:</p>
                <input
                  type="text"
                  placeholder="Comma-separated MongoDB IDs"
                  onChange={(e) => setSelected(e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                  className="input-field mt-2"
                />
              </div>
            ) : allSongs.length === 0 ? (
              <div className="card p-4 text-zinc-500 text-sm">
                No tracks found. <Link to="/studio/upload" className="text-brand-400 hover:underline">Upload one first.</Link>
              </div>
            ) : (
              <div className="card divide-y divide-surface-border max-h-64 overflow-y-auto">
                {allSongs.map((song) => (
                  <label key={song._id} className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-surface-hover transition-colors">
                    <input
                      type="checkbox"
                      checked={selected.includes(song._id)}
                      onChange={() => toggleSong(song._id)}
                      className="accent-brand-500 w-4 h-4"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-zinc-100 text-sm font-medium truncate">{song.title}</p>
                      <p className="text-zinc-500 text-xs">{song.artist?.username}</p>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
            {loading ? <><Spinner size="sm" /> Creating…</> : '◫ Create Album'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  )
}
