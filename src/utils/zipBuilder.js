import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export async function buildAndDownloadZip(files, zipName = 'converted-images') {
  const zip = new JSZip()
  for (const { folder, fileName, blob } of files) {
    if (folder) {
      zip.folder(folder).file(fileName, blob)
    } else {
      zip.file(fileName, blob)
    }
  }
  const zipBlob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } })
  saveAs(zipBlob, `${zipName}.zip`)
}

export function downloadBlob(blob, fileName) {
  saveAs(blob, fileName)
}
