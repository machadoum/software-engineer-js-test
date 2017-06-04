const readFile = require('./read-file')
const {
  onGenerate,
  onSelectFile,
  log,
  clearImageContainer,
  loadImage,
  showImage,
  getImageProperties,
  DPI
} = require('./view')

const AVAILABLE_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif']
const isValidImage = (file) => AVAILABLE_IMAGE_TYPES.includes(file.type)
let loadedImage = undefined
let loadedFile = undefined

const resetState = () => {
  clearImageContainer(imageContainer)
  loadedImage = undefined
  loadedFile = undefined
}

onSelectFile((file) => {
  resetState()
  if(!file) return log('No file chosen')
  if(!isValidImage(file)) return log(`not a valid Image file : ${file.name}`)

  loadedFile = file

  readFile(file)
    .then(loadImage)
    .then(showImage)
    .then((image) => {
      loadedImage = image
      log('Loaded Image w/dimensions ' + image.naturalWidth + ' x ' + image.naturalHeight)
    })
})

onGenerate(() => {
  if(!loadedImage) return log('No image loaded')

  const generatedData = Object.assign(
    { id: loadedFile.name },
    getImageProperties(loadedImage))

  log('Generated Image:' + JSON.stringify(generatedData))
})

log('Test application ready')
