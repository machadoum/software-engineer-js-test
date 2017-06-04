const fileSelector = document.getElementById( 'fileSelector' )
const imageContainer = document.getElementById( 'imageContainer' )
const debugContainer = document.getElementById( 'debugContainer' )
const generateButton = document.getElementById( 'generateButton' )
const SCALE = 1/5
const CANVAS_WIDTH = 15 // inch
const CANVAS_HEIGH = 10 // inch
const DPI = imageContainer.offsetHeight / (CANVAS_HEIGH * SCALE)

const log = (msg) => debugContainer.innerHTML += '<p>' + msg + '</p>'

const clearImageContainer = (container) => {
  while (container.hasChildNodes()) {
    container.removeChild(container.firstChild)
  }
}

const loadImage = (imageData) =>
  new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.src = imageData
  })

const showImage = (img) => {
  ctx = imageContainer.getContext("2d")
  ctx.drawImage(img, 0, 0)
  return img
}

const getImageProperties = (img) => {
  return {
    'width': img.naturalWidth / DPI,
    'height': img.naturalHeight / DPI,
    'x': 0 / DPI,
    'y': 0 / DPI
  }
}

const onSelectFile = (onSelect) =>
  fileSelector.onchange = (event) => onSelect(event.target.files[0])

const onGenerate = (onGenerate) => generateButton.onclick = onGenerate

module.exports = {
  log,
  clearImageContainer,
  showImage,
  getImageProperties,
  onSelectFile,
  onGenerate,
  loadImage,
  DPI
}
