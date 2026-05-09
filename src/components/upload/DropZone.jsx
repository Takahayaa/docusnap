import { useRef, useState } from 'react'

export function DropZone({ onFiles }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    const files = Array.from(e.dataTransfer.files).filter((f) => f.name.toLowerCase().endsWith('.pdf') || f.type === 'application/pdf')
    if (files.length) onFiles(files)
  }

  function handleChange(e) {
    const files = Array.from(e.target.files)
    if (files.length) onFiles(files)
    e.target.value = ''
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      aria-label="Upload PDF files"
      className={`rounded-3xl border-2 border-dashed p-14 text-center cursor-pointer transition-all duration-200 ${
        dragging
          ? 'border-brand bg-brand-light scale-[1.01]'
          : 'border-hairline hover:border-stone hover:bg-surface'
      }`}
    >
      <div className="flex flex-col items-center gap-4 pointer-events-none">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${dragging ? 'bg-brand text-canvas' : 'bg-surface text-slate'}`}>
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <div>
          <p className="text-xl font-semibold text-ink">Drop PDF files here</p>
          <p className="text-sm text-slate mt-1">or click to browse from your device</p>
        </div>
        <div className="flex gap-2">
          {['JPG', 'PNG', 'TIFF'].map((fmt) => (
            <span key={fmt} className="px-3 py-1 text-xs font-semibold rounded-full bg-surface border border-hairline text-stone">{fmt}</span>
          ))}
        </div>
        <p className="text-xs text-muted">Supports single or multiple PDFs · Password-protected files supported</p>
      </div>
      <input ref={inputRef} type="file" accept=".pdf,application/pdf" multiple className="hidden" onChange={handleChange} />
    </div>
  )
}
