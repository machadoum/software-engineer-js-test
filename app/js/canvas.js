const { inchesToPixels } = require('./conversion')

let canvas, ctx
let scale = 1 / 3

const initialize = (inchesWidth, inchesHeight, scaleParam = 1 / 3) => {
  scale = scaleParam
  const { width, height } = scaleDownProperties({ width: inchesWidth, height: inchesHeight })
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = inchesToPixels(width)
  canvas.height = inchesToPixels(height)
}

const scaleProperties = ({ x, y, width, height }, multiplier) => ({
  x: x * multiplier,
  y: y * multiplier,
  width: width * multiplier,
  height: height * multiplier
})
const scaleUpProperties = (obj) => scaleProperties(obj, 1 / scale)
const scaleDownProperties = (obj) => scaleProperties(obj, scale)

const clear = () =>
  ctx.clearRect(0, 0, inchesToPixels(canvas.width), inchesToPixels(canvas.height))

const renderImage = (img, properties) => {
  clear()

  const { x, y, width, height } = scaleDownProperties(properties)

  ctx.drawImage(img,
    inchesToPixels(x),
    inchesToPixels(y),
    inchesToPixels(width),
    inchesToPixels(height)
  )

  return scaleUpProperties({ x, y, width, height })
}

module.exports = {
  renderImage, clear, initialize
}
