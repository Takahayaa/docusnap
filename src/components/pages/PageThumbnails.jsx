import { useEffect, useRef, useState } from 'react'

function Thumbnail({ pdf, pageNum, selected, onToggle }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !rendered) renderThumb() },
      { threshold: 0.1 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [pdf, pageNum, rendered])

  async function renderThumb() {
    if (!pdf || !canvasRef.current) return
    try {
      const page = await pdf.getPage(pageNum)
      const viewport = page.getViewport({ scale: 0.3 })
      const canvas = canvasRef.current
      canvas.width = viewport.width
      canvas.height = viewport.height
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      await page.render({ canvasContext: ctx, viewport }).promise
      page.cleanup()
      setRendered(true)
    } catch {}
  }

  return (
    <div
      ref={containerRef}
      onClick={() => onToggle(pageNum)}
      className={`relative cursor-pointer rounded-xl border-2 transition-all ${
        selected ? 'border-brand shadow-card' : 'border-hairline hover:border-stone'
      }`}
    >
      <div className="w-full aspect-[3/4] bg-surface flex items-center justify-center overflow-hidden rounded-[10px]">
        <canvas ref={canvasRef} className="max-w-full max-h-full" />
        {!rendered && <div className="absolute inset-0 flex items-center justify-center text-xs text-muted">…</div>}
      </div>
      <div className="flex items-center justify-between px-1 py-0.5">
        <span className="text-xs text-stone">p{pageNum}</span>
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggle(pageNum)}
          onClick={(e) => e.stopPropagation()}
          className="w-3.5 h-3.5 accent-brand"
          aria-label={`Select page ${pageNum}`}
        />
      </div>
      {selected && (
        <div className="absolute top-1 left-1 w-4 h-4 bg-brand rounded-full flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-canvas" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
  )
}

export function PageThumbnails({ pdf, pageCount, selectedPages, onToggle }) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-64 overflow-y-auto p-1">
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((num) => (
        <Thumbnail
          key={num}
          pdf={pdf}
          pageNum={num}
          selected={selectedPages.includes(num)}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}
