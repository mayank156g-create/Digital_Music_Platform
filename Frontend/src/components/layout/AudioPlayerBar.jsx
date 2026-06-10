import React from 'react'
import { usePlayer } from '../../context/PlayerContext'

export default function AudioPlayerBar() {
  const {
    currentSong, isPlaying, progress, duration, volume,
    togglePlay, seek, changeVolume, playNext, playPrev, formatTime,
  } = usePlayer()

  if (!currentSong) return null

  const currentTime = duration ? (progress / 100) * duration : 0

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface-card/95 backdrop-blur-lg border-t border-surface-border px-4 py-3 animate-slide-up">
      <div className="max-w-7xl mx-auto flex items-center gap-4">

        {/* Song info */}
        <div className="flex items-center gap-3 w-48 min-w-0 flex-shrink-0">
          <div className="w-10 h-10 rounded-lg bg-brand-900 flex items-center justify-center flex-shrink-0">
            <span className={isPlaying ? 'animate-spin-slow text-brand-400 text-lg' : 'text-brand-400 text-lg'}>♪</span>
          </div>
          <div className="min-w-0">
            <p className="text-zinc-100 font-medium text-sm truncate">{currentSong.title}</p>
            <p className="text-zinc-500 text-xs truncate">
              {currentSong.artist?.username || 'Unknown Artist'}
            </p>
          </div>
        </div>

        {/* Controls + progress */}
        <div className="flex-1 flex flex-col gap-1.5 items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={playPrev}
              className="text-zinc-400 hover:text-zinc-100 transition-colors p-1"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
              </svg>
            </button>

            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-brand-500 hover:bg-brand-400 flex items-center justify-center transition-colors flex-shrink-0"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            <button
              onClick={playNext}
              className="text-zinc-400 hover:text-zinc-100 transition-colors p-1"
              aria-label="Next"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zm2.5-6 6-4.12v8.24L8.5 12zM16 6h2v12h-2z"/>
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full flex items-center gap-2 max-w-lg">
            <span className="text-zinc-500 text-xs w-8 text-right flex-shrink-0">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => seek(Number(e.target.value))}
              className="flex-1"
              aria-label="Seek"
            />
            <span className="text-zinc-500 text-xs w-8 flex-shrink-0">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume */}
        <div className="hidden sm:flex items-center gap-2 w-28 flex-shrink-0">
          <svg className="w-4 h-4 text-zinc-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => changeVolume(Number(e.target.value))}
            className="w-20"
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  )
}
