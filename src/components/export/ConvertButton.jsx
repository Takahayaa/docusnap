export function ConvertButton({ onConvert, converting, progress, disabled }) {
  const pct = progress.total > 0 ? Math.round((progress.current / progress.total) * 100) : 0

  return (
    <div className="space-y-4">
      <button
        onClick={onConvert}
        disabled={disabled || converting}
        className="btn-brand w-full py-4 text-base"
      >
        {converting ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Converting…
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Convert & Download
          </>
        )}
      </button>
      {converting && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate truncate">{progress.label}</span>
            <span className="text-ink font-semibold ml-2 flex-shrink-0">{pct}%</span>
          </div>
          <div className="w-full bg-surface rounded-full h-1.5 overflow-hidden">
            <div className="bg-brand h-1.5 rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}
    </div>
  )
}
