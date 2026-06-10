import React from 'react'
import { usePlayer } from '../../context/PlayerContext'

export default function SongCard({ song, allSongs = [] }) {
  const { playSong, currentSong, isPlaying } = usePlayer()

  const isActive = currentSong?._id === song._id
  const isCurrentlyPlaying = isActive && isPlaying

  return (
    <div
      onClick={() => playSong(song, allSongs)}
      className={`
        group card p-4 cursor-pointer transition-all duration-200 hover:border-brand-700
        ${isActive ? 'border-brand-600 bg-brand-950' : 'hover:bg-surface-hover'}
      `}
    >
      {/* Album art placeholder */}
      <div className={`
        w-full aspect-square rounded-xl mb-3 flex items-center justify-center
        ${isActive ? 'bg-brand-800' : 'bg-surface-hover group-hover:bg-zinc-700'}
        transition-colors duration-200 relative overflow-hidden
      `}>
        <span className={`text-4xl transition-all duration-300 ${isCurrentlyPlaying ? 'animate-pulse-slow scale-110' : 'scale-100'}`}>
          ♪
        </span>
        {/* Play overlay */}
        <div className={`
          absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl
          transition-opacity duration-200
          ${isCurrentlyPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
        `}>
          {isCurrentlyPlaying ? (
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="min-w-0">
        <p className={`font-semibold text-sm truncate ${isActive ? 'text-brand-300' : 'text-zinc-100'}`}>
          {song.title}
        </p>
        <p className="text-zinc-500 text-xs truncate mt-0.5">
          {song.artist?.username || 'Unknown Artist'}
        </p>
      </div>

      {/* Now playing indicator */}
      {isCurrentlyPlaying && (
        <div className="flex items-end gap-0.5 mt-2 h-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1 bg-brand-400 rounded-full animate-pulse"
              style={{
                height: `${[60, 100, 40, 80][i - 1]}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
