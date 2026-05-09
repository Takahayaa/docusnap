const OPTIONS = [
  { value: null, label: 'Original' },
  { value: 0, label: '0°' },
  { value: 90, label: '90°' },
  { value: 180, label: '180°' },
  { value: 270, label: '270°' },
]

export function RotationPanel({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {OPTIONS.map((o) => (
        <button
          key={String(o.value)}
          onClick={() => onChange(o.value)}
          className={`pill-toggle ${value === o.value ? 'pill-toggle-active' : 'pill-toggle-inactive'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
