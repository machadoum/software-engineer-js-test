module.exports = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (event) => resolve(event.target.result)
    reader.readAsDataURL(file)
  })
