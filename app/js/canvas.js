const { inchesToPixels } = require('./conversion')

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const CANVAS_SCALE = 1 / 3
const CANVAS_WIDTH = 15 * CANVAS_SCALE
const CANVAS_HEIGH = 10 * CANVAS_SCALE

canvas.width = inchesToPixels(CANVAS_WIDTH)
canvas.height = inchesToPixels(CANVAS_HEIGH)

const scaleObjectValues = (obj, scale) => {
  const scaledObject = {}
  Object.keys(obj).forEach((key) => { scaledObject[key] = obj[key] * scale })
  return scaledObject
}

const scaleUpProperties = (obj) => scaleObjectValues(obj, 1 / CANVAS_SCALE)
const scaleDownProperties = (obj) => scaleObjectValues(obj, CANVAS_SCALE)

const scaleImageToCoverFullCanvas = (parameters) => {
  let { x, y, width, height } = parameters
  const aspectRatio = width / height

  if (width < CANVAS_WIDTH) {
    width = CANVAS_WIDTH
    height = width / aspectRatio
  }

  if (height < CANVAS_HEIGH) {
    height = CANVAS_HEIGH
    width = height * aspectRatio
  }

  if (x > 0) x = 0
  if (y > 0) y = 0

  if (width - CANVAS_WIDTH < -x) x = CANVAS_WIDTH - width
  if (height - CANVAS_HEIGH < -y) y = CANVAS_HEIGH - height

  return { x, y, width, height }
}

const clear = () =>
  ctx.clearRect(0, 0, inchesToPixels(CANVAS_WIDTH), inchesToPixels(CANVAS_HEIGH))

const renderImage = (img, properties) => {
  clear()

  const { x, y, width, height } =
    scaleImageToCoverFullCanvas(scaleDownProperties(properties))

  ctx.drawImage(img,
    inchesToPixels(x),
    inchesToPixels(y),
    inchesToPixels(width),
    inchesToPixels(height)
  )

  return scaleUpProperties({ x, y, width, height })
}

module.exports = {
  renderImage, clear
}
