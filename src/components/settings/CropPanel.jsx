export function CropPanel({ settings, onChange }) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2.5 cursor-pointer">
        <div className={`w-9 h-5 rounded-full transition-colors relative flex-shrink-0 ${settings.cropMargins ? 'bg-ink' : 'bg-hairline'}`}>
          <div className={`absolute top-0.5 w-4 h-4 bg-canvas rounded-full shadow transition-transform ${settings.cropMargins ? 'translate-x-4' : 'translate-x-0.5'}`} />
          <input
            type="checkbox"
            checked={settings.cropMargins}
            onChange={(e) => onChange('cropMargins', e.target.checked)}
            className="sr-only"
          />
        </div>
        <span className="text-sm font-medium text-ink">Crop white margins</span>
      </label>
      <p className="text-xs text-muted ml-12">Automatically removes surrounding white space — useful for scanned PDFs and slides.</p>
    </div>
  )
}
