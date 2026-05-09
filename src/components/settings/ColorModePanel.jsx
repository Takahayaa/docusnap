const MODES = [
  { id: 'rgb', label: 'RGB', desc: 'Full color' },
  { id: 'grayscale', label: 'Grayscale', desc: 'Shades of gray' },
  { id: 'bw', label: 'B&W', desc: 'Threshold at 50%' },
]

export function ColorModePanel({ value, onChange }) {
  return (
    <div className="flex gap-2">
      {MODES.map((m) => (
        <button
          key={m.id}
          onClick={() => onChange(m.id)}
          className={`flex-1 px-3 py-2.5 text-left rounded-xl border-2 transition-all ${
            value === m.id ? 'border-ink bg-ink' : 'border-hairline hover:border-stone'
          }`}
        >
          <div className={`font-semibold text-sm ${value === m.id ? 'text-canvas' : 'text-ink'}`}>{m.label}</div>
          <div className={`text-xs mt-0.5 ${value === m.id ? 'text-canvas/70' : 'text-stone'}`}>{m.desc}</div>
        </button>
      ))}
    </div>
  )
}
