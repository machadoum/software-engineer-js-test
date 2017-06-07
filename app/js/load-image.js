const createImage = (imageData) =>
  new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.src = imageData
  })

const readFileData = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (event) => resolve(event.target.result)
    reader.readAsDataURL(file)
  })

module.exports = (file) => readFileData(file).then(createImage)
