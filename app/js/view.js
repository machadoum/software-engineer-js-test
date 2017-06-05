const fileSelector = document.getElementById('file-selector')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d")
const debugContainer = document.getElementById('debug-container')
const generateButton = document.getElementById('generate')
const loadButton = document.getElementById('load')
const moveLeftButton = document.getElementById('move-left')
const moveRightButton = document.getElementById('move-right')
const moveUpButton = document.getElementById('move-up')
const moveDownButton = document.getElementById('move-down')
const scaleUpButton = document.getElementById('scale-up')
const scaleDownButton = document.getElementById('scale-down')

const SCALE = 1/3
const CANVAS_WIDTH = 15 * SCALE // inch
const CANVAS_HEIGH = 10 * SCALE // inch
const DPI = 96

const inchesToPixels = (inches) => inches * DPI
const pixelsToInches = (pixels) => pixels / DPI

canvas.width = inchesToPixels(CANVAS_WIDTH)
canvas.height = inchesToPixels(CANVAS_HEIGH)

const log = (msg) => debugContainer.innerHTML += '<p>' + msg + '</p>'

const clear = () => {
  ctx.clearRect(0, 0, inchesToPixels(CANVAS_WIDTH), inchesToPixels(CANVAS_HEIGH))
}

const loadImage = (imageData) =>
  new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.src = imageData
  })

const scaleDownProperties = ({ x, y, width, height }) => ({
  x: x * SCALE,
  y: y * SCALE,
  width: width * SCALE,
  height: height * SCALE,
})

const scaleUPProperties = ({ x, y, width, height }) => ({
  x: x / SCALE,
  y: y / SCALE,
  width: width / SCALE,
  height: height / SCALE,
})
const scaleImageToCoverFullCanvas = ({ x, y, width, height }) => {
  const aspectRatio = width / height

  if(width < CANVAS_WIDTH) {
    width = CANVAS_WIDTH
    height = width / aspectRatio
  }

  if(height < CANVAS_HEIGH) {
    height = CANVAS_HEIGH
    width = height * aspectRatio
  }

  if (x > 0) x = 0
  if (y > 0) y = 0

  if (width - CANVAS_WIDTH < -x) x = CANVAS_WIDTH - width
  if (height - CANVAS_HEIGH < -y) y = CANVAS_HEIGH - height

  return { x, y, width, height }
}

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

  return scaleUPProperties({ x, y, width, height })
}

const onSelectFile = (onSelect) =>
  fileSelector.onchange = (event) => onSelect(event.target.files[0])

const onGenerate = (onGenerate) => generateButton.onclick = onGenerate
const onMoveLeft = (onClick) => moveLeftButton.onclick = onClick
const onMoveRight = (onClick) => moveRightButton.onclick = onClick
const onMoveUp = (onClick) => moveUpButton.onclick = onClick
const onMoveDown = (onClick) => moveDownButton.onclick = onClick
const onScaleUp = (onClick) => scaleUpButton.onclick = onClick
const onScaleDown = (onClick) => scaleDownButton.onclick = onClick
const onLoad = (onClick) => loadButton.onclick = onClick

module.exports = {
  log,
  clear,
  renderImage,
  onSelectFile,
  onGenerate,
  loadImage,
  onMoveLeft,
  onMoveRight,
  onMoveUp,
  onMoveDown,
  onScaleUp,
  onScaleDown,
  inchesToPixels,
  pixelsToInches,
  onLoad
}
