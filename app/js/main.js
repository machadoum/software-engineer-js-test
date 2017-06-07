const loadImage = require('./load-image')
const { pixelsToInches } = require('./conversion')
const { setHandlers, log, canvas } = require('./view')
const storage = require('./storage')
const resizeToCoverFullCanvas = require('./resize-full-cover')

const MOVE_STEP = 0.3
const SCALE_RATE = 0.1
const CANVAS_WIDTH = 15
const CANVAS_HEIGH = 10
const AVAILABLE_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif']

canvas.initialize(CANVAS_WIDTH, CANVAS_HEIGH)

const initialState = { img: undefined, id: undefined, x: 0, y: 0, width: 0, height: 0 }
let state = Object.assign({}, initialState)

const render = () => canvas.renderImage(state.img, state)

const setState = (newState) => {
  const partialState = Object.assign({}, state, newState)
  const resizedProperties = resizeToCoverFullCanvas(partialState, CANVAS_WIDTH, CANVAS_HEIGH)
  state = Object.assign(partialState, resizedProperties)
  render()
}

const isValidImage = (file) => AVAILABLE_IMAGE_TYPES.includes(file.type)

setHandlers({
  onSelectFile: (file) => {
    if (!file) return log('No file chosen')
    if (!isValidImage(file)) return log(`not a valid Image file : ${file.name}`)

    loadImage(file).then((img) => {
      setState({
        id: file.name,
        img,
        width: pixelsToInches(img.naturalWidth),
        height: pixelsToInches(img.naturalHeight)
      })

      log(`Loaded Image w/dimensions ${img.naturalWidth} x ${img.naturalHeight}`)
    })
  },

  onGenerate: () => {
    if (!state.img) return log('No image loaded')

    storage.record(state)

    log(`Generated Image: ${JSON.stringify(state)}`)
  },

  onLoad: () => {
    if (storage.isEmpty()) return log('No data to load')
    setState(storage.load())
  },

  onMoveLeft: () => setState({ x: state.x - MOVE_STEP }),
  onMoveRight: () => setState({ x: state.x + MOVE_STEP }),
  onMoveUp: () => setState({ y: state.y - MOVE_STEP }),
  onMoveDown: () => setState({ y: state.y + MOVE_STEP }),
  onScaleUp: () => {
    const multiplier = 1 + SCALE_RATE
    setState({
      width: state.width * multiplier,
      height: state.height * multiplier
    })
  },

  onScaleDown: () => {
    const multiplier = 1 - SCALE_RATE
    setState({
      width: state.width * multiplier,
      height: state.height * multiplier
    })
  }
})

log('Test application ready')
