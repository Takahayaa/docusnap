export function formatPageNumber(num, style) {
  if (style === '001') return String(num).padStart(3, '0')
  if (style === '01') return String(num).padStart(2, '0')
  return String(num)
}

export function buildFileName(pattern, pdfName, pageNum, pageNumStyle, ext) {
  const baseName = pdfName.replace(/\.pdf$/i, '')
  const formattedPage = formatPageNumber(pageNum, pageNumStyle)
  const result = pattern
    .replace(/\{pdf-name\}/g, baseName)
    .replace(/\{custom-name\}/g, baseName)
    .replace(/\{001\}/g, String(pageNum).padStart(3, '0'))
    .replace(/\{01\}/g, String(pageNum).padStart(2, '0'))
    .replace(/\{1\}/g, String(pageNum))
    .replace(/\{page\}/g, formattedPage)
  return `${result}.${ext}`
}

export function sanitizeFolderName(name) {
  return name.replace(/\.pdf$/i, '').replace(/[^a-zA-Z0-9_\-. ]/g, '_').trim() || 'output'
}
