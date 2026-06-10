import React, { useEffect, useState } from 'react'
import { musicAPI } from '../services/api'
import DashboardLayout from '../components/layout/DashboardLayout'
import AlbumCard from '../components/music/AlbumCard'
import SearchBar from '../components/music/SearchBar'
import Spinner from '../components/common/Spinner'
import ErrorMessage from '../components/common/ErrorMessage'
import EmptyState from '../components/common/EmptyState'

export default function AlbumsPage() {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  const fetchAlbums = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await musicAPI.getAllAlbums()
      setAlbums(data.albums || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAlbums() }, [])

  const filtered = albums.filter((a) => {
    const q = query.toLowerCase()
    return a.title.toLowerCase().includes(q) || a.artist?.username?.toLowerCase().includes(q)
  })

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="font-display font-bold text-3xl text-zinc-100">Albums</h1>
        <p className="text-zinc-400 mt-1">{albums.length} album{albums.length !== 1 ? 's' : ''} in the collection</p>
      </div>

      <div className="mb-6">
        <SearchBar value={query} onChange={setQuery} placeholder="Search albums or artists…" />
      </div>

      {loading ? (
        <div className="py-24"><Spinner /></div>
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchAlbums} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={query ? '🔍' : '💿'}
          title={query ? 'No matching albums' : 'No albums yet'}
          description={query ? `No albums match "${query}".` : 'Albums will appear here once artists create them.'}
          action={query ? <button onClick={() => setQuery('')} className="btn-secondary">Clear search</button> : null}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((album) => (
            <AlbumCard key={album._id} album={album} />
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
