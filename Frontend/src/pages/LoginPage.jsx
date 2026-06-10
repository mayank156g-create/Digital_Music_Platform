import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ErrorMessage from '../components/common/ErrorMessage'
import Spinner from '../components/common/Spinner'

export default function LoginPage() {
  const { login, loading, error, clearError, isLoggedIn, isArtist } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [form, setForm] = useState({ username: '', password: '' })

  // Where to redirect after login
  const from = location.state?.from?.pathname

  useEffect(() => {
    if (isLoggedIn) navigate(isArtist ? '/studio' : '/dashboard', { replace: true })
  }, [isLoggedIn])

  useEffect(() => { clearError() }, [])

  const handleChange = (e) => {
    clearError()
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await login(form)
      const dest = from || (data.user.role === 'artist' ? '/studio' : '/dashboard')
      navigate(dest, { replace: true })
    } catch {
      // error is in context
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-slide-up">
        <Link to="/" className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-300 text-sm mb-8">
          ← Back to home
        </Link>

        <div className="card p-8">
          <div className="text-center mb-8">
            <span className="text-4xl">🎵</span>
            <h1 className="font-display font-bold text-2xl text-zinc-100 mt-3">Welcome back</h1>
            <p className="text-zinc-400 text-sm mt-1">Sign in to your SoundWave account</p>
          </div>

          <ErrorMessage message={error} />

          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-1.5">Username or Email</label>
              <input
                name="username"
                type="text"
                required
                autoComplete="username"
                placeholder="your_username or email"
                value={form.username}
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
                autoComplete="current-password"
                placeholder="Your password"
                value={form.password}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2 py-3">
              {loading ? <Spinner size="sm" /> : 'Sign in'}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-5 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
            <p className="text-zinc-500 text-xs text-center">
              <span className="font-medium text-zinc-400">Testing?</span> Register an account with role
              &quot;Listener&quot; or &quot;Artist&quot; to explore both views.
            </p>
          </div>

          <p className="text-center text-zinc-500 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-brand-400 hover:text-brand-300 font-medium">Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
