import { downloadBlob } from '../../utils/zipBuilder.js'
import { buildAndDownloadZip } from '../../utils/zipBuilder.js'

export function DownloadArea({ resultFiles, settings }) {
  if (!resultFiles.length) return null
  const totalCount = resultFiles.length

  async function handleZip() {
    const pdfNames = [...new Set(resultFiles.map((f) => f.pdfName))]
    const useFolder = pdfNames.length > 1
    const zipName = useFolder ? 'converted-images' : resultFiles[0].pdfName.replace(/\.pdf$/i, '')
    await buildAndDownloadZip(resultFiles.map((f) => ({ ...f, folder: useFolder ? f.folder : null })), zipName)
  }

  return (
    <div className="bg-success-light border border-success/20 rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-success rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-canvas" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-semibold text-ink">{totalCount} image{totalCount > 1 ? 's' : ''} ready to download</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {totalCount > 1 && (
          <button onClick={handleZip} className="btn-primary">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download ZIP
          </button>
        )}
        {totalCount <= 10 && resultFiles.map((f) => (
          <button
            key={`${f.pdfName}-${f.pageNum}`}
            onClick={() => downloadBlob(f.blob, f.fileName)}
            className="btn-secondary text-xs"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {f.fileName}
          </button>
        ))}
        {totalCount > 10 && (
          <p className="text-sm text-slate">Use the ZIP download to get all {totalCount} images.</p>
        )}
      </div>
    </div>
  )
}
