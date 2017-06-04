const readFile = require('./read-file')
const {
  onGenerate,
  onSelectFile,
  log,
  clearImageContainer,
  loadImage,
  showImage
} = require('./view')

const AVAILABLE_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif']
const isValidImage = (file) => AVAILABLE_IMAGE_TYPES.includes(file.type)

onSelectFile((file) => {
  clearImageContainer(imageContainer)

  if(!file) return log('No file chosen')
  if(!isValidImage(file)) return log(`not a valid Image file : ${file.name}`)

  readFile(file)
    .then(loadImage)
    .then(showImage)
    .then((image) => {
      const imageData = {
        'width': image.naturalWidth,
        'height': image.naturalHeight
      }
      log( 'Loaded Image w/dimensions ' + imageData.width + ' x ' + imageData.height )
    })
})

onGenerate(() => log('GENERATE BUTTON CLICKED!! Should this do something else?'))

log( 'Test application ready' )
