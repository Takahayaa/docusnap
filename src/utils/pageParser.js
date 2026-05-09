export function parsePageSelection(input, totalPages) {
  if (!input || !input.trim()) return []
  const parts = input.split(',')
  const pages = new Set()
  for (const part of parts) {
    const trimmed = part.trim()
    if (!trimmed) continue
    const rangeMatch = trimmed.match(/^(\d+)\s*-\s*(\d+)$/)
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1], 10)
      const end = parseInt(rangeMatch[2], 10)
      if (start < 1 || end > totalPages || start > end) {
        throw new Error(`Invalid range "${trimmed}". Pages must be between 1 and ${totalPages}.`)
      }
      for (let i = start; i <= end; i++) pages.add(i)
    } else {
      const num = parseInt(trimmed, 10)
      if (isNaN(num) || num < 1 || num > totalPages) {
        throw new Error(`Page ${trimmed} does not exist in this PDF (total: ${totalPages}).`)
      }
      pages.add(num)
    }
  }
  return Array.from(pages).sort((a, b) => a - b)
}

export function getOddPages(totalPages) {
  return Array.from({ length: Math.ceil(totalPages / 2) }, (_, i) => i * 2 + 1)
}

export function getEvenPages(totalPages) {
  const pages = []
  for (let i = 2; i <= totalPages; i += 2) pages.push(i)
  return pages
}

export function getAllPages(totalPages) {
  return Array.from({ length: totalPages }, (_, i) => i + 1)
}
