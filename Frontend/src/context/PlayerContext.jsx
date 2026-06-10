import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null) // { _id, title, uri, artist }
  const [queue, setQueue] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)    // 0-100
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const audioRef = useRef(new Audio())

  useEffect(() => {
    const audio = audioRef.current
    audio.volume = volume

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }
    const onLoadedMetadata = () => setDuration(audio.duration)
    const onEnded = () => {
      setIsPlaying(false)
      setProgress(0)
      playNext()
    }

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('ended', onEnded)
    }
  }, [queue])

  const playSong = useCallback((song, songList = []) => {
    const audio = audioRef.current
    if (currentSong?._id === song._id) {
      // Toggle play/pause on same song
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        audio.play()
        setIsPlaying(true)
      }
      return
    }
    audio.src = song.uri
    audio.play()
    setCurrentSong(song)
    setIsPlaying(true)
    setProgress(0)
    if (songList.length > 0) setQueue(songList)
  }, [currentSong, isPlaying])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }, [isPlaying])

  const seek = useCallback((pct) => {
    const audio = audioRef.current
    if (audio.duration) {
      audio.currentTime = (pct / 100) * audio.duration
      setProgress(pct)
    }
  }, [])

  const changeVolume = useCallback((val) => {
    audioRef.current.volume = val
    setVolume(val)
  }, [])

  const playNext = useCallback(() => {
    if (!currentSong || queue.length === 0) return
    const idx = queue.findIndex((s) => s._id === currentSong._id)
    const next = queue[idx + 1]
    if (next) playSong(next, queue)
  }, [currentSong, queue, playSong])

  const playPrev = useCallback(() => {
    if (!currentSong || queue.length === 0) return
    const idx = queue.findIndex((s) => s._id === currentSong._id)
    const prev = queue[idx - 1]
    if (prev) playSong(prev, queue)
  }, [currentSong, queue, playSong])

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <PlayerContext.Provider
      value={{
        currentSong, isPlaying, progress, duration, volume,
        playSong, togglePlay, seek, changeVolume, playNext, playPrev, formatTime,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used inside <PlayerProvider>')
  return ctx
}
