import { useState, useCallback } from 'react'
import { parsePageSelection, getOddPages, getEvenPages, getAllPages } from '../utils/pageParser.js'

export function usePageSelection(pdfFiles) {
  const [selections, setSelections] = useState({})

  const getSelection = useCallback((id) => {
    return selections[id] || null
  }, [selections])

  const setPages = useCallback((id, pages) => {
    setSelections((prev) => ({ ...prev, [id]: pages }))
  }, [])

  const selectAll = useCallback((id, totalPages) => {
    setPages(id, getAllPages(totalPages))
  }, [setPages])

  const clearAll = useCallback((id) => {
    setPages(id, [])
  }, [setPages])

  const selectOdd = useCallback((id, totalPages) => {
    setPages(id, getOddPages(totalPages))
  }, [setPages])

  const selectEven = useCallback((id, totalPages) => {
    setPages(id, getEvenPages(totalPages))
  }, [setPages])

  const togglePage = useCallback((id, pageNum) => {
    setSelections((prev) => {
      const current = prev[id] || []
      const exists = current.includes(pageNum)
      const updated = exists ? current.filter((p) => p !== pageNum) : [...current, pageNum].sort((a, b) => a - b)
      return { ...prev, [id]: updated }
    })
  }, [])

  const parseRange = useCallback((id, input, totalPages) => {
    try {
      const pages = parsePageSelection(input, totalPages)
      setPages(id, pages)
      return null
    } catch (err) {
      return err.message
    }
  }, [setPages])

  const getEffectiveSelection = useCallback((id, totalPages) => {
    const sel = selections[id]
    if (sel == null) return getAllPages(totalPages)
    return sel
  }, [selections])

  return { getSelection, setPages, selectAll, clearAll, selectOdd, selectEven, togglePage, parseRange, getEffectiveSelection }
}
