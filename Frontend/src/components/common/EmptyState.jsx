import React from 'react'

export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center animate-fade-in">
      <div className="text-5xl">{icon || '🎵'}</div>
      <div>
        <p className="text-zinc-200 font-semibold text-lg">{title}</p>
        {description && <p className="text-zinc-500 text-sm mt-1 max-w-xs">{description}</p>}
      </div>
      {action}
    </div>
  )
}
