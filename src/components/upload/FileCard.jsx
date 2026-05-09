function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function FileCard({ entry, onRemove, onPasswordSubmit }) {
  const { file, status, pageCount, error } = entry

  const statusBadge = () => {
    if (status === 'loading') return <span className="text-xs bg-accent-light text-accent px-2.5 py-1 rounded-full font-medium">Loading…</span>
    if (status === 'ready') return <span className="text-xs bg-success-light text-success px-2.5 py-1 rounded-full font-medium">{pageCount} pages</span>
    if (status === 'needs-password' || status === 'wrong-password') return <span className="text-xs bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full font-medium border border-amber-200">Password required</span>
    if (status === 'error') return <span className="text-xs bg-error-light text-error px-2.5 py-1 rounded-full font-medium">Error</span>
    return null
  }

  return (
    <div className="flex items-start gap-3 p-4 bg-canvas border border-hairline rounded-2xl">
      <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-brand-light rounded-xl">
        <svg className="w-4 h-4 text-brand" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-ink truncate">{file.name}</p>
        <p className="text-xs text-stone">{formatBytes(file.size)}</p>
        <div className="mt-1.5">{statusBadge()}</div>
        {error && <p className="text-xs text-error mt-1">{error}</p>}
        {(status === 'needs-password' || status === 'wrong-password') && (
          <PasswordInput onSubmit={(pw) => onPasswordSubmit(entry.id, pw)} error={status === 'wrong-password' ? error : null} />
        )}
      </div>
      <button onClick={() => onRemove(entry.id)} aria-label="Remove file" className="text-muted hover:text-error transition-colors mt-0.5">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

function PasswordInput({ onSubmit, error }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(e.target.password.value) }} className="mt-2 flex gap-2">
      <input
        name="password"
        type="password"
        placeholder="Enter PDF password"
        autoComplete="off"
        className="text-xs border border-hairline rounded-xl px-3 py-1.5 flex-1 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
      />
      <button type="submit" className="btn-brand text-xs px-4 py-1.5">Unlock</button>
    </form>
  )
}
