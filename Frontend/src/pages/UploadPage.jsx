import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { musicAPI } from '../services/api'
import DashboardLayout from '../components/layout/DashboardLayout'
import ErrorMessage from '../components/common/ErrorMessage'
import Spinner from '../components/common/Spinner'

export default function UploadPage() {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(null)

  const handleFile = (f) => {
    if (!f) return
    setFile(f)
    setError('')
    setSuccess(null)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) handleFile(dropped)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(null)

    if (!file) { setError('Please choose a music file.'); return }
    if (!title.trim()) { setError('Please enter a track title.'); return }

    const formData = new FormData()
    formData.append('music', file)
    formData.append('title', title.trim())

    setLoading(true)
    try {
      const data = await musicAPI.uploadMusic(formData)
      setSuccess(data.music)
      setTitle('')
      setFile(null)
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
        <h1 className="font-display font-bold text-3xl text-zinc-100">Upload a Track</h1>
        <p className="text-zinc-400 mt-1">Your file will be stored on ImageKit CDN and immediately available on the platform.</p>
      </div>

      <div className="max-w-xl">
        {/* Success banner */}
        {success && (
          <div className="mb-5 p-4 rounded-xl bg-brand-950 border border-brand-700 text-brand-300 text-sm animate-fade-in">
            <p className="font-semibold">✓ Track uploaded successfully!</p>
            <p className="text-brand-400 mt-0.5">"{success.title}" is now live on the platform.</p>
          </div>
        )}

        <ErrorMessage message={error} />

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-5">
          {/* Title */}
          <div>
            <label className="block text-zinc-300 text-sm font-medium mb-1.5">Track Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Midnight Frequencies"
              className="input-field"
            />
          </div>

          {/* File drop zone */}
          <div>
            <label className="block text-zinc-300 text-sm font-medium mb-1.5">Music File *</label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onClick={() => document.getElementById('file-input').click()}
              className={`
                relative border-2 border-dashed rounded-2xl p-10 cursor-pointer transition-all duration-200 text-center
                ${dragOver
                  ? 'border-brand-500 bg-brand-950'
                  : file
                    ? 'border-brand-600 bg-brand-950/50'
                    : 'border-surface-border hover:border-zinc-600 bg-surface-card'
                }
              `}
            >
              <input
                id="file-input"
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
              {file ? (
                <div>
                  <div className="text-4xl mb-2">🎵</div>
                  <p className="text-brand-300 font-semibold">{file.name}</p>
                  <p className="text-zinc-500 text-sm mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setFile(null) }}
                    className="mt-3 text-zinc-500 hover:text-zinc-300 text-xs underline"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-4xl mb-2">☁</div>
                  <p className="text-zinc-300 font-medium">Drop your audio file here</p>
                  <p className="text-zinc-500 text-sm mt-1">or click to browse — MP3, WAV, OGG accepted</p>
                </div>
              )}
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
            {loading ? (
              <>
                <Spinner size="sm" />
                <span>Uploading to CDN…</span>
              </>
            ) : (
              '⊕ Upload Track'
            )}
          </button>
        </form>

        {/* Note */}
        <div className="mt-6 p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-500">
          <strong className="text-zinc-400">Note:</strong> Upload may take a few seconds while ImageKit processes and stores your file. Don't close this page until you see the success message.
        </div>
      </div>
    </DashboardLayout>
  )
}
