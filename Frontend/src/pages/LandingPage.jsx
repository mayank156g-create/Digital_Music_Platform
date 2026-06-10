import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'

const features = [
  {
    icon: '🎵',
    title: 'Unlimited Listening',
    desc: 'Stream every track in the library instantly. No ads, no interruptions — just music.',
  },
  {
    icon: '🎙️',
    title: 'Artist Uploads',
    desc: 'Artists upload directly to the platform. Your music goes live in minutes via ImageKit CDN.',
  },
  {
    icon: '💿',
    title: 'Album Collections',
    desc: 'Organize tracks into albums. Browse by artist, discover full collections, play seamlessly.',
  },
  {
    icon: '🔒',
    title: 'Role-Based Access',
    desc: 'Listeners hear, artists create. Clean separation keeps the platform simple and purposeful.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-24 px-4 max-w-5xl mx-auto text-center">
        <p className="text-brand-400 font-semibold text-sm tracking-widest uppercase mb-4">
          Music platform
        </p>
        <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-zinc-100 leading-tight mb-6">
          Where sound
          <br />
          <span className="text-brand-400">finds its home</span>
        </h1>
        <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          SoundWave connects listeners with independent artists. Stream tracks,
          explore albums, and if you create — share your sound with the world.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/register" className="btn-primary text-base px-7 py-3">
            Start listening free
          </Link>
          <Link to="/register?role=artist" className="btn-secondary text-base px-7 py-3">
            I'm an artist →
          </Link>
        </div>

        {/* Hero visual */}
        <div className="mt-16 relative">
          <div className="card p-6 max-w-md mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-brand-800 flex items-center justify-center text-2xl animate-pulse-slow">
                ♪
              </div>
              <div className="flex-1 text-left">
                <p className="text-zinc-100 font-semibold">Now Playing</p>
                <p className="text-zinc-400 text-sm">Midnight Frequencies</p>
              </div>
              <div className="flex items-end gap-0.5 h-6">
                {[60, 100, 40, 80, 60].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-brand-400 rounded-full animate-pulse"
                    style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
            {/* Fake progress bar */}
            <div className="w-full h-1 bg-surface-hover rounded-full overflow-hidden">
              <div className="h-full w-3/5 bg-brand-400 rounded-full" />
            </div>
            <div className="flex justify-between text-zinc-500 text-xs mt-1">
              <span>1:42</span><span>2:58</span>
            </div>
          </div>
          {/* Decorative blobs */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 border-t border-surface-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-zinc-500 text-sm uppercase tracking-widest mb-2">What you get</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-zinc-100 text-center mb-12">
            Built for listeners and artists alike
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div key={f.title} className="card p-6 hover:border-zinc-600 transition-colors">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-display font-semibold text-zinc-100 mb-2">{f.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 border-t border-surface-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-zinc-100 mb-4">
            Ready to tune in?
          </h2>
          <p className="text-zinc-400 mb-8">
            Create a free account and access the full music library today.
          </p>
          <Link to="/register" className="btn-primary text-base px-8 py-3">
            Create free account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-border py-8 px-4 text-center text-zinc-600 text-sm">
        <span>🎵 SoundWave — Portfolio Project</span>
      </footer>
    </div>
  )
}
