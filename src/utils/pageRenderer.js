import { applyBackground, applyRotation, applyColorMode, applyContrast, applySharpen, applyNoiseRemoval, applyCropMargins, applyResize } from './imageProcessor.js'

export async function renderPage(pdf, pageNumber, settings) {
  const {
    dpi = 150,
    outputScale = 1,
    rotationOverride = null,
    backgroundColor = 'white',
    colorMode = 'rgb',
    cropMargins = false,
    ocrEnhancements = {},
    resizeWidth = null,
    resizeHeight = null,
    preserveAspect = true,
  } = settings

  const page = await pdf.getPage(pageNumber)
  const pdfRotation = page.rotate || 0
  const userRotation = rotationOverride !== null ? rotationOverride : pdfRotation
  const baseScale = (dpi / 72) * outputScale
  const viewport = page.getViewport({ scale: baseScale, rotation: userRotation })

  const canvas = document.createElement('canvas')
  canvas.width = Math.round(viewport.width)
  canvas.height = Math.round(viewport.height)
  const ctx = canvas.getContext('2d')

  if (backgroundColor !== 'transparent') {
    ctx.fillStyle = backgroundColor === 'white' ? '#ffffff' : backgroundColor === 'black' ? '#000000' : backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  await page.render({ canvasContext: ctx, viewport }).promise
  page.cleanup()

  let result = canvas

  if (colorMode !== 'rgb') result = applyColorMode(result, colorMode)
  if (ocrEnhancements.contrast) result = applyContrast(result, 50)
  if (ocrEnhancements.sharpen) result = applySharpen(result)
  if (ocrEnhancements.noiseRemoval) result = applyNoiseRemoval(result)
  if (cropMargins) result = applyCropMargins(result)
  if (resizeWidth || resizeHeight) result = applyResize(result, resizeWidth, resizeHeight, preserveAspect)

  return result
}
