export function applyBackground(ctx, width, height, bgColor) {
  if (bgColor === 'transparent') return
  ctx.save()
  ctx.globalCompositeOperation = 'destination-over'
  ctx.fillStyle = bgColor === 'white' ? '#ffffff' : bgColor === 'black' ? '#000000' : bgColor
  ctx.fillRect(0, 0, width, height)
  ctx.restore()
}

export function applyRotation(srcCanvas, degrees) {
  if (!degrees || degrees % 360 === 0) return srcCanvas
  const rad = (degrees * Math.PI) / 180
  const swap = degrees === 90 || degrees === 270
  const w = swap ? srcCanvas.height : srcCanvas.width
  const h = swap ? srcCanvas.width : srcCanvas.height
  const dst = document.createElement('canvas')
  dst.width = w
  dst.height = h
  const ctx = dst.getContext('2d')
  ctx.translate(w / 2, h / 2)
  ctx.rotate(rad)
  ctx.drawImage(srcCanvas, -srcCanvas.width / 2, -srcCanvas.height / 2)
  return dst
}

export function applyColorMode(canvas, mode) {
  if (mode === 'rgb') return canvas
  const ctx = canvas.getContext('2d')
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data
  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
    if (mode === 'grayscale') {
      data[i] = data[i + 1] = data[i + 2] = gray
    } else if (mode === 'bw') {
      const bw = gray > 128 ? 255 : 0
      data[i] = data[i + 1] = data[i + 2] = bw
    }
  }
  ctx.putImageData(imageData, 0, 0)
  return canvas
}

export function applyContrast(canvas, factor) {
  const ctx = canvas.getContext('2d')
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data
  const f = (259 * (factor + 255)) / (255 * (259 - factor))
  for (let i = 0; i < data.length; i += 4) {
    data[i] = clamp(f * (data[i] - 128) + 128)
    data[i + 1] = clamp(f * (data[i + 1] - 128) + 128)
    data[i + 2] = clamp(f * (data[i + 2] - 128) + 128)
  }
  ctx.putImageData(imageData, 0, 0)
  return canvas
}

export function applySharpen(canvas) {
  const kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0]
  return applyConvolution(canvas, kernel)
}

export function applyNoiseRemoval(canvas) {
  const kernel = [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9]
  return applyConvolution(canvas, kernel)
}

function applyConvolution(canvas, kernel) {
  const ctx = canvas.getContext('2d')
  const src = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const dst = ctx.createImageData(src)
  const w = src.width
  const h = src.height
  const d = src.data
  const o = dst.data
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      let r = 0, g = 0, b = 0
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const idx = ((y + ky) * w + (x + kx)) * 4
          const k = kernel[(ky + 1) * 3 + (kx + 1)]
          r += d[idx] * k
          g += d[idx + 1] * k
          b += d[idx + 2] * k
        }
      }
      const i = (y * w + x) * 4
      o[i] = clamp(r)
      o[i + 1] = clamp(g)
      o[i + 2] = clamp(b)
      o[i + 3] = d[i + 3]
    }
  }
  ctx.putImageData(dst, 0, 0)
  return canvas
}

export function applyCropMargins(canvas) {
  const ctx = canvas.getContext('2d')
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const { top, left, bottom, right } = findContentBounds(imageData)
  if (top === 0 && left === 0 && bottom === canvas.height - 1 && right === canvas.width - 1) return canvas
  const w = right - left + 1
  const h = bottom - top + 1
  const cropped = document.createElement('canvas')
  cropped.width = w
  cropped.height = h
  cropped.getContext('2d').drawImage(canvas, left, top, w, h, 0, 0, w, h)
  return cropped
}

function findContentBounds(imageData) {
  const { width, height, data } = imageData
  let top = 0, bottom = height - 1, left = 0, right = width - 1
  const isWhite = (i) => data[i] > 250 && data[i + 1] > 250 && data[i + 2] > 250
  outer: for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!isWhite((y * width + x) * 4)) { top = y; break outer }
    }
  }
  outer: for (let y = height - 1; y >= top; y--) {
    for (let x = 0; x < width; x++) {
      if (!isWhite((y * width + x) * 4)) { bottom = y; break outer }
    }
  }
  outer: for (let x = 0; x < width; x++) {
    for (let y = top; y <= bottom; y++) {
      if (!isWhite((y * width + x) * 4)) { left = x; break outer }
    }
  }
  outer: for (let x = width - 1; x >= left; x--) {
    for (let y = top; y <= bottom; y++) {
      if (!isWhite((y * width + x) * 4)) { right = x; break outer }
    }
  }
  return { top, left, bottom, right }
}

export function applyResize(canvas, targetWidth, targetHeight, preserveAspect) {
  if (!targetWidth && !targetHeight) return canvas
  let w = targetWidth || canvas.width
  let h = targetHeight || canvas.height
  if (preserveAspect) {
    const ratio = canvas.width / canvas.height
    if (targetWidth && !targetHeight) h = Math.round(targetWidth / ratio)
    else if (targetHeight && !targetWidth) w = Math.round(targetHeight * ratio)
    else {
      const scaleW = targetWidth / canvas.width
      const scaleH = targetHeight / canvas.height
      const scale = Math.min(scaleW, scaleH)
      w = Math.round(canvas.width * scale)
      h = Math.round(canvas.height * scale)
    }
  }
  const dst = document.createElement('canvas')
  dst.width = w
  dst.height = h
  dst.getContext('2d').drawImage(canvas, 0, 0, w, h)
  return dst
}

function clamp(v) {
  return Math.max(0, Math.min(255, Math.round(v)))
}
