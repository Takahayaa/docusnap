const PATTERNS = [
  '{pdf-name}-page-{001}',
  '{pdf-name}-{page}',
  'page-{001}',
]

const NUM_STYLES = ['1', '01', '001']

export function FileNamingPanel({ settings, onChange }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="section-label">Filename Pattern</label>
        <div className="space-y-1.5 mb-3">
          {PATTERNS.map((p) => (
            <button
              key={p}
              onClick={() => onChange('fileNamingPattern', p)}
              className={`block w-full text-left text-sm px-4 py-2.5 rounded-xl border-2 transition-all font-mono ${
                settings.fileNamingPattern === p
                  ? 'border-ink bg-ink text-canvas'
                  : 'border-hairline hover:border-stone text-ink'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <input
          value={settings.fileNamingPattern}
          onChange={(e) => onChange('fileNamingPattern', e.target.value)}
          placeholder="Custom pattern…"
          className="w-full text-sm border border-hairline rounded-xl px-4 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
        />
        <p className="text-xs text-muted mt-2">
          Variables: <code className="bg-surface px-1.5 py-0.5 rounded-md font-mono">{'{pdf-name}'}</code>{' '}
          <code className="bg-surface px-1.5 py-0.5 rounded-md font-mono">{'{page}'}</code>{' '}
          <code className="bg-surface px-1.5 py-0.5 rounded-md font-mono">{'{001}'}</code>
        </p>
      </div>
      <div>
        <label className="section-label">Page Number Format</label>
        <div className="flex gap-2">
          {NUM_STYLES.map((s) => (
            <button
              key={s}
              onClick={() => onChange('pageNumStyle', s)}
              className={`pill-toggle flex-1 font-mono ${settings.pageNumStyle === s ? 'pill-toggle-active' : 'pill-toggle-inactive'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
