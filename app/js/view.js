const setHandlers = (handlersObjs) => {
  const fileSelector = document.getElementById('file-selector')
  const generateButton = document.getElementById('generate')
  const loadButton = document.getElementById('load')
  const moveLeftButton = document.getElementById('move-left')
  const moveRightButton = document.getElementById('move-right')
  const moveUpButton = document.getElementById('move-up')
  const moveDownButton = document.getElementById('move-down')
  const scaleUpButton = document.getElementById('scale-up')
  const scaleDownButton = document.getElementById('scale-down')

  fileSelector.onchange = (event) => handlersObjs.onSelectFile((event.target.files[0]))
  generateButton.onclick = handlersObjs.onGenerate
  moveLeftButton.onclick = handlersObjs.onMoveLeft
  moveRightButton.onclick = handlersObjs.onMoveRight
  moveUpButton.onclick = handlersObjs.onMoveUp
  moveDownButton.onclick = handlersObjs.onMoveDown
  scaleUpButton.onclick = handlersObjs.onScaleUp
  scaleDownButton.onclick = handlersObjs.onScaleDown
  loadButton.onclick = handlersObjs.onLoad
}

const debugContainer = document.getElementById('debug-container')

const log = (msg) => { debugContainer.innerHTML += `<p>${msg}</p>` }

module.exports = {
  setHandlers,
  log,
  canvas: require('./canvas')
}
