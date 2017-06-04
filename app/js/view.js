const fileSelector = document.getElementById( 'fileSelector' )
const imageContainer = document.getElementById( 'imageContainer' )
const debugContainer = document.getElementById( 'debugContainer' )
const generateButton = document.getElementById( 'generateButton' )

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

const onSelectFile = (onSelect) =>
  fileSelector.onchange = (event) => onSelect(event.target.files[0])

const onGenerate = (onGenerate) => generateButton.onclick = onGenerate

module.exports = {
  log,
  clearImageContainer,
  showImage,
  onSelectFile,
  onGenerate,
  loadImage,
  DPI
}
