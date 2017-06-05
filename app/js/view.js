const fileSelector = document.getElementById('file-selector')
const debugContainer = document.getElementById('debug-container')
const generateButton = document.getElementById('generate')
const loadButton = document.getElementById('load')
const moveLeftButton = document.getElementById('move-left')
const moveRightButton = document.getElementById('move-right')
const moveUpButton = document.getElementById('move-up')
const moveDownButton = document.getElementById('move-down')
const scaleUpButton = document.getElementById('scale-up')
const scaleDownButton = document.getElementById('scale-down')

const log = (msg) => debugContainer.innerHTML += '<p>' + msg + '</p>'

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
  onSelectFile,
  onGenerate,
  onMoveLeft,
  onMoveRight,
  onMoveUp,
  onMoveDown,
  onScaleUp,
  onScaleDown,
  onLoad,
  canvas: require('./canvas')
}
