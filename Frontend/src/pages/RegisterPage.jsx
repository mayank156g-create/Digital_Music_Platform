import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ErrorMessage from '../components/common/ErrorMessage'
import Spinner from '../components/common/Spinner'

export default function RegisterPage() {
  const { register, loading, error, clearError, isLoggedIn, isArtist } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: searchParams.get('role') === 'artist' ? 'artist' : 'user',
  })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [localError, setLocalError] = useState('')

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) navigate(isArtist ? '/studio' : '/dashboard', { replace: true })
  }, [isLoggedIn])

  useEffect(() => { clearError() }, [])

  const handleChange = (e) => {
    clearError()
    setLocalError('')
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')

    if (form.password !== confirmPassword) {
      setLocalError('Passwords do not match.')
      return
    }
    if (form.password.length < 6) {
      setLocalError('Password must be at least 6 characters.')
      return
    }

    try {
      await register(form)
      navigate(form.role === 'artist' ? '/studio' : '/dashboard', { replace: true })
    } catch {
      // error is in context
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-slide-up">
        {/* Back link */}
        <Link to="/" className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-300 text-sm mb-8">
          ← Back to home
        </Link>

        <div className="card p-8">
          <div className="text-center mb-8">
            <span className="text-4xl">🎵</span>
            <h1 className="font-display font-bold text-2xl text-zinc-100 mt-3">Create your account</h1>
            <p className="text-zinc-400 text-sm mt-1">Join SoundWave today — free forever</p>
          </div>

          {/* Role toggle */}
          <div className="flex gap-2 p-1 bg-surface rounded-xl border border-surface-border mb-6">
            {['user', 'artist'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setForm((p) => ({ ...p, role: r }))}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 capitalize
                  ${form.role === r
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                  }`}
              >
                {r === 'user' ? '🎧 Listener' : '🎙️ Artist'}
              </button>
            ))}
          </div>

          <ErrorMessage message={localError || error} />

          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-1.5">Username</label>
              <input
                name="username"
                type="text"
                required
                autoComplete="username"
                placeholder="your_username"
                value={form.username}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-1.5">Email</label>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-1.5">Password</label>
              <input
                name="password"
                type="password"
                required
                autoComplete="new-password"
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-1.5">Confirm Password</label>
              <input
                type="password"
                autoComplete="new-password"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => { setLocalError(''); setConfirmPassword(e.target.value) }}
                className="input-field"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2 py-3">
              {loading ? <Spinner size="sm" /> : 'Create account'}
            </button>
          </form>

          <p className="text-center text-zinc-500 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-400 hover:text-brand-300 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
