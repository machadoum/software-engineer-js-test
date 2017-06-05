const fileSelector = document.getElementById('fileSelector')
const imageContainer = document.getElementById('imageContainer')
const ctx = imageContainer.getContext("2d")
const debugContainer = document.getElementById('debugContainer')
const generateButton = document.getElementById('generateButton')
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

imageContainer.width = inchesToPixels(CANVAS_WIDTH)
imageContainer.height = inchesToPixels(CANVAS_HEIGH)


const log = (msg) => debugContainer.innerHTML += '<p>' + msg + '</p>'

const clearImageContainer = () => {
  ctx.clearRect(0, 0, imageContainer.width, imageContainer.height)
}

const loadImage = (imageData) =>
  new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.src = imageData
  })

const showImage = (img, {x, y, width, height} = {}) => {
  clearImageContainer()

  ctx.drawImage(img,
    inchesToPixels(x) * SCALE,
    inchesToPixels(y) * SCALE,
    inchesToPixels(width) * SCALE,
    inchesToPixels(height) * SCALE
  )
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

module.exports = {
  log,
  clearImageContainer,
  showImage,
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
}
