import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function AlbumCard({ album }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/albums/${album._id}`)}
      className="group card p-4 cursor-pointer transition-all duration-200 hover:border-zinc-600 hover:bg-surface-hover"
    >
      {/* Cover */}
      <div className="w-full aspect-square rounded-xl bg-zinc-800 group-hover:bg-zinc-700 transition-colors flex items-center justify-center mb-3">
        <span className="text-4xl">◫</span>
      </div>

      <p className="font-semibold text-sm text-zinc-100 truncate">{album.title}</p>
      <p className="text-zinc-500 text-xs truncate mt-0.5">
        {album.artist?.username || 'Unknown Artist'}
      </p>
    </div>
  )
}
