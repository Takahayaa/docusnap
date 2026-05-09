const FORMATS = [
  { id: 'jpg', label: 'JPG', desc: 'Smaller files, photos', icon: '🖼' },
  { id: 'png', label: 'PNG', desc: 'Lossless, sharp text', icon: '🔷' },
  { id: 'tiff', label: 'TIFF', desc: 'Archival & print', icon: '📐' },
]

export function FormatSelector({ value, onChange }) {
  return (
    <div className="flex gap-3">
      {FORMATS.map((f) => (
        <button
          key={f.id}
          onClick={() => onChange(f.id)}
          className={`flex-1 px-4 py-3.5 rounded-2xl border-2 text-left transition-all ${
            value === f.id
              ? 'border-ink bg-ink text-canvas'
              : 'border-hairline bg-canvas hover:border-stone'
          }`}
        >
          <div className={`text-lg mb-1`}>{f.icon}</div>
          <div className={`font-semibold text-sm ${value === f.id ? 'text-canvas' : 'text-ink'}`}>{f.label}</div>
          <div className={`text-xs mt-0.5 ${value === f.id ? 'text-canvas/70' : 'text-stone'}`}>{f.desc}</div>
        </button>
      ))}
    </div>
  )
}
