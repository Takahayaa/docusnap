import { useEffect, useRef, useState } from 'react'

function PreviewThumb({ pdf, pageNum }) {
  const canvasRef = useRef(null)
  const [size, setSize] = useState(null)

  useEffect(() => {
    if (!pdf) return
    let cancelled = false
    async function render() {
      try {
        const page = await pdf.getPage(pageNum)
        const viewport = page.getViewport({ scale: 0.25 })
        const canvas = canvasRef.current
        if (!canvas || cancelled) return
        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        await page.render({ canvasContext: ctx, viewport }).promise
        page.cleanup()
        canvas.toBlob((blob) => { if (blob && !cancelled) setSize(blob.size) }, 'image/png')
      } catch {}
    }
    render()
    return () => { cancelled = true }
  }, [pdf, pageNum])

  const formatSize = (b) => b < 1024 * 1024 ? `~${(b / 1024).toFixed(0)} KB` : `~${(b / (1024 * 1024)).toFixed(1)} MB`

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-full aspect-[3/4] bg-surface rounded-xl border border-hairline overflow-hidden flex items-center justify-center">
        <canvas ref={canvasRef} className="max-w-full max-h-full" />
      </div>
      <span className="text-xs text-stone">Page {pageNum}</span>
      {size && <span className="text-xs text-muted">{formatSize(size)}</span>}
    </div>
  )
}

export function PreviewGrid({ pdfFiles, getEffectiveSelection }) {
  const readyFiles = pdfFiles.filter((f) => f.status === 'ready')
  if (!readyFiles.length) return null

  return (
    <div className="space-y-4">
      {readyFiles.map((entry) => {
        const pages = getEffectiveSelection(entry.id, entry.pageCount)
        return (
          <div key={entry.id}>
            {readyFiles.length > 1 && <p className="text-sm font-semibold text-ink mb-2 truncate">{entry.file.name}</p>}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-60 overflow-y-auto">
              {pages.slice(0, 24).map((num) => (
                <PreviewThumb key={num} pdf={entry.pdf} pageNum={num} />
              ))}
              {pages.length > 24 && (
                <div className="flex items-center justify-center text-xs text-stone bg-surface rounded-xl border border-hairline aspect-[3/4]">
                  +{pages.length - 24}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
