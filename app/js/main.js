const loadImage = require('./load-image')
const { pixelsToInches } = require('./conversion')
const {
  onGenerate,
  onSelectFile,
  onMoveLeft,
  onMoveRight,
  onMoveUp,
  onMoveDown,
  onScaleUp,
  onScaleDown,
  onLoad,
  log,
  canvas
} = require('./view')

const MOVE_STEP = 0.3
const SCALE_STEP = 0.1
const AVAILABLE_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif']
const isValidImage = (file) => AVAILABLE_IMAGE_TYPES.includes(file.type)
let loadedImage = undefined
let loadedFile = undefined
const initialStore = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
}
let store = Object.assign({}, initialStore)
let savedData = undefined

const resetState = () => {
  canvas.clear()
  loadedImage = undefined
  loadedFile = undefined

  store = Object.assign({}, initialStore)
}

onSelectFile((file) => {
  resetState()
  if(!file) return log('No file chosen')
  if(!isValidImage(file)) return log(`not a valid Image file : ${file.name}`)

  loadedFile = file

  loadImage(file).then((img) => {
    loadedImage = img
    store.width = pixelsToInches(img.naturalWidth)
    store.height = pixelsToInches(img.naturalHeight)
    store = canvas.renderImage(img, store)

    log('Loaded Image w/dimensions ' + img.naturalWidth + ' x ' + img.naturalHeight)
  })
})

onGenerate(() => {
  if(!loadedImage) return log('No image loaded')

  savedData = Object.assign({ id: loadedFile.name }, store)

  log('Generated Image:' + JSON.stringify(savedData))
})

onLoad(() => {
  if(!savedData) return log('No data to load')
  store = Object.assign({}, savedData)
  store = canvas.renderImage(loadedImage, store)
})

onMoveLeft(() => {
  store.x = store.x - MOVE_STEP
  store = canvas.renderImage(loadedImage, store)
})

onMoveRight(() => {
  store.x = store.x + MOVE_STEP
  store = canvas.renderImage(loadedImage, store)
})

onMoveUp(() => {
  store.y = store.y - MOVE_STEP
  store = canvas.renderImage(loadedImage, store)
})

onMoveDown(() => {
  store.y = store.y + MOVE_STEP
  store = canvas.renderImage(loadedImage, store)
})

onScaleUp(() => {
  store.width = store.width + store.width * SCALE_STEP
  store.height = store.height + store.height * SCALE_STEP
  store = canvas.renderImage(loadedImage, store)
})

onScaleDown(() => {
  store.width = store.width - store.width * SCALE_STEP
  store.height = store.height - store.height * SCALE_STEP
  store = canvas.renderImage(loadedImage, store)
})

log('Test application ready')
