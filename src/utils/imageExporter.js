import UTIF from 'utif2'

export async function canvasToBlob(canvas, format, quality, tiffCompression = 'lzw') {
  if (format === 'jpg') {
    return canvasToBlobNative(canvas, 'image/jpeg', quality / 100)
  }
  if (format === 'png') {
    return canvasToBlobNative(canvas, 'image/png')
  }
  if (format === 'tiff') {
    return canvasToTiff(canvas, tiffCompression)
  }
  throw new Error(`Unsupported format: ${format}`)
}

function canvasToBlobNative(canvas, mimeType, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('Failed to convert canvas to blob'))
    }, mimeType, quality)
  })
}

function canvasToTiff(canvas, compression) {
  const ctx = canvas.getContext('2d')
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const rgbaData = imageData.data

  const compressionMap = {
    none: 1,
    lzw: 5,
    zip: 8,
  }
  const comp = compressionMap[compression] ?? 5

  const ifd = {
    t256: [canvas.width],
    t257: [canvas.height],
    t258: [8, 8, 8, 8],
    t259: [comp],
    t262: [2],
    t277: [4],
    t284: [1],
  }
  const tiffBuffer = UTIF.encodeImage(rgbaData, canvas.width, canvas.height, ifd)
  return new Blob([tiffBuffer], { type: 'image/tiff' })
}

export function getExtension(format) {
  return format === 'jpg' ? 'jpg' : format === 'png' ? 'png' : 'tiff'
}
