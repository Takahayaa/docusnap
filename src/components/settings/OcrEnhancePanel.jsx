const OPTIONS = [
  { key: 'contrast', label: 'Increase contrast', desc: 'Makes text bolder and more distinct' },
  { key: 'sharpen', label: 'Sharpen text', desc: 'Enhances edges for cleaner OCR' },
  { key: 'noiseRemoval', label: 'Remove noise', desc: 'Smooths background speckles' },
]

function Toggle({ checked, onChange }) {
  return (
    <div className={`w-9 h-5 rounded-full transition-colors relative flex-shrink-0 cursor-pointer ${checked ? 'bg-ink' : 'bg-hairline'}`} onClick={onChange}>
      <div className={`absolute top-0.5 w-4 h-4 bg-canvas rounded-full shadow transition-transform ${checked ? 'translate-x-4' : 'translate-x-0.5'}`} />
    </div>
  )
}

export function OcrEnhancePanel({ values, onChange }) {
  return (
    <div className="space-y-3">
      {OPTIONS.map((o) => (
        <div key={o.key} className="flex items-start gap-3">
          <Toggle checked={values[o.key]} onChange={() => onChange(o.key, !values[o.key])} />
          <div>
            <div className="text-sm font-medium text-ink">{o.label}</div>
            <div className="text-xs text-stone">{o.desc}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
