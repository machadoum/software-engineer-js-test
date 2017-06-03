const readFile = require('./read-file')
const view = require('./view')

const AVAILABLE_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif']

const isValidImage = (file) => AVAILABLE_IMAGE_TYPES.includes(file.type)

view.onSelectFile((file) => {
  view.clearImageContainer(imageContainer)

  if(!file) return view.log('No file chosen')
  if(!isValidImage(file)) return view.log(`not a valid Image file : ${file.name}`)

  readFile(file)
    .then(view.showImage)
    .then((image) => {
      const imageData = {
        'width': image.naturalWidth,
        'height': image.naturalHeight
      }
      view.log( 'Loaded Image w/dimensions ' + imageData.width + ' x ' + imageData.height )
    })
})

view.onGenerate(() => view.log('GENERATE BUTTON CLICKED!! Should this do something else?'))

view.log( 'Test application ready' )
