import React, { useEffect, useState, useMemo } from 'react'
import { musicAPI } from '../services/api'
import DashboardLayout from '../components/layout/DashboardLayout'
import SongCard from '../components/music/SongCard'
import SearchBar from '../components/music/SearchBar'
import Spinner from '../components/common/Spinner'
import ErrorMessage from '../components/common/ErrorMessage'
import EmptyState from '../components/common/EmptyState'

export default function LibraryPage() {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('default') // 'default' | 'title' | 'artist'

  const fetchSongs = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await musicAPI.getAllMusics()
      setSongs(data.musics || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSongs() }, [])

  const filtered = useMemo(() => {
    let list = [...songs]

    // Search by title or artist name
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.artist?.username?.toLowerCase().includes(q)
      )
    }

    // Sort
    if (sortBy === 'title') list.sort((a, b) => a.title.localeCompare(b.title))
    if (sortBy === 'artist') list.sort((a, b) => (a.artist?.username || '').localeCompare(b.artist?.username || ''))

    return list
  }, [songs, query, sortBy])

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="font-display font-bold text-3xl text-zinc-100">Music Library</h1>
        <p className="text-zinc-400 mt-1">{songs.length} tracks available to stream</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search by title or artist…"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input-field sm:w-44"
        >
          <option value="default">Sort: Default</option>
          <option value="title">Sort: Title A–Z</option>
          <option value="artist">Sort: Artist A–Z</option>
        </select>
      </div>

      {/* Results count */}
      {query && (
        <p className="text-zinc-500 text-sm mb-4">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &quot;{query}&quot;
        </p>
      )}

      {/* Grid */}
      {loading ? (
        <div className="py-24"><Spinner /></div>
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchSongs} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={query ? '🔍' : '🎵'}
          title={query ? 'No matching tracks' : 'Library is empty'}
          description={
            query
              ? `No tracks match "${query}". Try a different search.`
              : 'No music has been uploaded yet.'
          }
          action={
            query ? (
              <button onClick={() => setQuery('')} className="btn-secondary">Clear search</button>
            ) : null
          }
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filtered.map((song) => (
            <SongCard key={song._id} song={song} allSongs={filtered} />
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
