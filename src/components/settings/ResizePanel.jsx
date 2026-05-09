export function ResizePanel({ settings, onChange }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-stone mb-1.5 uppercase tracking-wider">Width (px)</label>
          <input
            type="number" min={1} placeholder="Auto"
            value={settings.resizeWidth}
            onChange={(e) => onChange('resizeWidth', e.target.value)}
            className="w-full border border-hairline rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold text-stone mb-1.5 uppercase tracking-wider">Height (px)</label>
          <input
            type="number" min={1} placeholder="Auto"
            value={settings.resizeHeight}
            onChange={(e) => onChange('resizeHeight', e.target.value)}
            className="w-full border border-hairline rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
          />
        </div>
      </div>
      <label className="flex items-center gap-2.5 cursor-pointer">
        <div className={`w-9 h-5 rounded-full transition-colors relative flex-shrink-0 ${settings.preserveAspect ? 'bg-ink' : 'bg-hairline'}`}>
          <div className={`absolute top-0.5 w-4 h-4 bg-canvas rounded-full shadow transition-transform ${settings.preserveAspect ? 'translate-x-4' : 'translate-x-0.5'}`} />
          <input
            type="checkbox" checked={settings.preserveAspect}
            onChange={(e) => onChange('preserveAspect', e.target.checked)}
            className="sr-only"
          />
        </div>
        <span className="text-sm text-ink">Preserve aspect ratio</span>
      </label>
    </div>
  )
}
