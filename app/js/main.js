const loadImage = require('./load-image')
const { pixelsToInches } = require('./conversion')
const { setHandlers, log, canvas } = require('./view')

const MOVE_STEP = 0.3
const SCALE_RATE = 0.1
const AVAILABLE_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif']

const initialState = { img: undefined, id: undefined, x: 0, y: 0, width: 0, height: 0 }
let state = Object.assign({}, initialState)
let savedData = undefined

const setState = (newState) => {
  state = Object.assign({}, state, newState)
  render()
}

const render = () => {
  const newState = canvas.renderImage(state.img, state)
  state = Object.assign({}, state, newState)
}

const isValidImage = (file) => AVAILABLE_IMAGE_TYPES.includes(file.type)

setHandlers({
  onSelectFile: (file) => {
    if(!file) return log('No file chosen')
    if(!isValidImage(file)) return log(`not a valid Image file : ${file.name}`)

    loadImage(file).then((img) => {
      setState({
        id: file.name,
        img,
        width: pixelsToInches(img.naturalWidth),
        height: pixelsToInches(img.naturalHeight)
      })

      log('Loaded Image w/dimensions ' + img.naturalWidth + ' x ' + img.naturalHeight)
    })
  },

  onGenerate: () => {
    if(!state.img) return log('No image loaded')

    savedData = Object.assign({}, state)

    log('Generated Image:' + JSON.stringify(savedData))
  },

  onLoad: () => {
    if(!savedData) return log('No data to load')
    setState(savedData)
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
