const PRESETS = [
  { id: 'white', label: 'White', color: '#ffffff' },
  { id: 'black', label: 'Black', color: '#000000' },
  { id: 'transparent', label: 'Transparent', color: null },
]

export function BackgroundPanel({ value, onChange, format }) {
  const isCustom = !PRESETS.find((p) => p.id === value)

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {PRESETS.map((p) => (
        (p.id !== 'transparent' || format === 'png') && (
          <button
            key={p.id}
            onClick={() => onChange(p.id)}
            className={`pill-toggle flex items-center gap-2 ${value === p.id ? 'pill-toggle-active' : 'pill-toggle-inactive'}`}
          >
            <span
              className="w-4 h-4 rounded-full border border-hairline inline-block flex-shrink-0"
              style={{ background: p.color ?? 'repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 8px 8px' }}
            />
            {p.label}
          </button>
        )
      ))}
      <label className="flex items-center gap-2 cursor-pointer pill-toggle border border-hairline hover:border-stone">
        <input
          type="color"
          value={isCustom ? value : '#ffcc00'}
          onChange={(e) => onChange(e.target.value)}
          className="w-4 h-4 rounded cursor-pointer border-0 bg-transparent p-0"
          title="Custom color"
        />
        <span className="text-sm text-slate">Custom</span>
      </label>
    </div>
  )
}
