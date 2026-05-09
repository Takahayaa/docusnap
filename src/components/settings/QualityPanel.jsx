const DPI_OPTIONS = [72, 150, 300, 600]
const SCALE_OPTIONS = [1, 2, 3]
const TIFF_COMPRESSIONS = ['none', 'lzw', 'zip']

function PillGroup({ options, value, onChange, format = (v) => v }) {
  return (
    <div className="flex gap-2">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`pill-toggle flex-1 ${value === o ? 'pill-toggle-active' : 'pill-toggle-inactive'}`}
        >
          {format(o)}
        </button>
      ))}
    </div>
  )
}

export function QualityPanel({ settings, onChange }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="section-label">Resolution (DPI)</label>
        <PillGroup options={DPI_OPTIONS} value={settings.dpi} onChange={(v) => onChange('dpi', v)} />
        <p className="text-xs text-muted mt-2">Higher DPI = larger files, sharper output. 150 is web-ready; 300 for print.</p>
      </div>

      <div>
        <label className="section-label">Output Scale</label>
        <PillGroup options={SCALE_OPTIONS} value={settings.outputScale} onChange={(v) => onChange('outputScale', v)} format={(v) => `${v}×`} />
      </div>

      {settings.format === 'jpg' && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="section-label mb-0">JPG Quality</label>
            <span className="text-sm font-semibold text-ink">{settings.jpgQuality}%</span>
          </div>
          <input
            type="range" min={60} max={100} value={settings.jpgQuality}
            onChange={(e) => onChange('jpgQuality', parseInt(e.target.value))}
            className="w-full accent-brand h-1.5"
            style={{ accentColor: '#e8440a' }}
          />
          <div className="flex justify-between text-xs text-muted mt-1">
            <span>60% — smaller</span><span>100% — lossless</span>
          </div>
        </div>
      )}

      {settings.format === 'tiff' && (
        <div>
          <label className="section-label">TIFF Compression</label>
          <PillGroup options={TIFF_COMPRESSIONS} value={settings.tiffCompression} onChange={(v) => onChange('tiffCompression', v)} format={(v) => v.toUpperCase()} />
        </div>
      )}
    </div>
  )
}
