import { useState, useCallback } from 'react'
import { renderPage } from '../utils/pageRenderer.js'
import { canvasToBlob, getExtension } from '../utils/imageExporter.js'
import { buildFileName, sanitizeFolderName } from '../utils/fileNaming.js'

export function useConvert() {
  const [converting, setConverting] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 0, label: '' })
  const [error, setError] = useState(null)
  const [resultFiles, setResultFiles] = useState([])

  const convert = useCallback(async ({ pdfFiles, getEffectiveSelection, settings, downloadMode }) => {
    setConverting(true)
    setError(null)
    setResultFiles([])

    const ext = getExtension(settings.format)
    const allBlobs = []
    let totalPages = 0
    const readyFiles = pdfFiles.filter((f) => f.status === 'ready')
    for (const f of readyFiles) totalPages += getEffectiveSelection(f.id, f.pageCount).length

    setProgress({ current: 0, total: totalPages, label: 'Starting...' })
    let done = 0

    try {
      for (const pdfEntry of readyFiles) {
        const pages = getEffectiveSelection(pdfEntry.id, pdfEntry.pageCount)
        const folder = readyFiles.length > 1 ? sanitizeFolderName(pdfEntry.file.name) : null

        for (const pageNum of pages) {
          setProgress({ current: done, total: totalPages, label: `Converting ${pdfEntry.file.name} page ${pageNum}...` })

          const renderSettings = {
            dpi: settings.dpi,
            outputScale: settings.outputScale,
            rotationOverride: settings.rotationOverride,
            backgroundColor: settings.backgroundColor,
            colorMode: settings.colorMode,
            cropMargins: settings.cropMargins,
            ocrEnhancements: settings.ocrEnhancements,
            resizeWidth: settings.resizeWidth ? parseInt(settings.resizeWidth) : null,
            resizeHeight: settings.resizeHeight ? parseInt(settings.resizeHeight) : null,
            preserveAspect: settings.preserveAspect,
          }

          const canvas = await renderPage(pdfEntry.pdf, pageNum, renderSettings)
          const blob = await canvasToBlob(canvas, settings.format, settings.jpgQuality, settings.tiffCompression)
          const fileName = buildFileName(settings.fileNamingPattern, pdfEntry.file.name, pageNum, settings.pageNumStyle, ext)

          allBlobs.push({ folder, fileName, blob, pdfName: pdfEntry.file.name, pageNum })
          done++
          setProgress({ current: done, total: totalPages, label: `Converted ${pdfEntry.file.name} page ${pageNum}` })
        }
      }

      setResultFiles(allBlobs)
    } catch (err) {
      setError(err.message || 'Conversion failed.')
    } finally {
      setConverting(false)
    }
  }, [])

  return { convert, converting, progress, error, resultFiles }
}
