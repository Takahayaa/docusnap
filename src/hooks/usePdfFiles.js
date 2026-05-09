import { useState, useCallback } from 'react'
import { loadPdf } from '../utils/pdfLoader.js'

export function usePdfFiles() {
  const [pdfFiles, setPdfFiles] = useState([])

  const addFiles = useCallback(async (files) => {
    const newEntries = []
    for (const file of files) {
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        newEntries.push({ id: crypto.randomUUID(), file, error: 'Not a valid PDF file.', status: 'error' })
        continue
      }
      newEntries.push({ id: crypto.randomUUID(), file, status: 'loading', pageCount: 0, pdf: null, passwordRequired: false, error: null })
    }
    setPdfFiles((prev) => [...prev, ...newEntries])

    for (const entry of newEntries) {
      if (entry.status === 'error') continue
      await loadEntry(entry, '')
    }
  }, [])

  const loadEntry = useCallback(async (entry, password) => {
    setPdfFiles((prev) => prev.map((e) => e.id === entry.id ? { ...e, status: 'loading', error: null } : e))
    try {
      const pdf = await loadPdf(entry.file, password)
      setPdfFiles((prev) => prev.map((e) => e.id === entry.id ? { ...e, status: 'ready', pdf, pageCount: pdf.numPages, passwordRequired: false, error: null } : e))
    } catch (err) {
      if (err?.name === 'PasswordException' || err?.message?.includes('password')) {
        const needsPassword = err?.code === 1
        setPdfFiles((prev) => prev.map((e) => e.id === entry.id ? { ...e, status: needsPassword ? 'needs-password' : 'wrong-password', passwordRequired: true, error: needsPassword ? null : 'Incorrect password. Try again.' } : e))
      } else {
        setPdfFiles((prev) => prev.map((e) => e.id === entry.id ? { ...e, status: 'error', error: err.message || 'Failed to load PDF.' } : e))
      }
    }
  }, [])

  const submitPassword = useCallback(async (id, password) => {
    const entry = pdfFiles.find((e) => e.id === id)
    if (entry) await loadEntry(entry, password)
  }, [pdfFiles, loadEntry])

  const removeFile = useCallback((id) => {
    setPdfFiles((prev) => prev.filter((e) => e.id !== id))
  }, [])

  return { pdfFiles, addFiles, submitPassword, removeFile }
}
