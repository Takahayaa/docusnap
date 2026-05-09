import { useState } from 'react'

const defaults = {
  format: 'png',
  dpi: 150,
  outputScale: 1,
  jpgQuality: 85,
  tiffCompression: 'lzw',
  backgroundColor: 'white',
  colorMode: 'rgb',
  rotationOverride: null,
  cropMargins: false,
  resizeWidth: '',
  resizeHeight: '',
  preserveAspect: true,
  fileNamingPattern: '{pdf-name}-page-{001}',
  pageNumStyle: '001',
  ocrEnhancements: {
    contrast: false,
    sharpen: false,
    noiseRemoval: false,
  },
}

export function useConversionSettings() {
  const [settings, setSettings] = useState(defaults)

  const update = (key, value) => setSettings((prev) => ({ ...prev, [key]: value }))
  const updateOcr = (key, value) => setSettings((prev) => ({ ...prev, ocrEnhancements: { ...prev.ocrEnhancements, [key]: value } }))

  return { settings, update, updateOcr }
}
