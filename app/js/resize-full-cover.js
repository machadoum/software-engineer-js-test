module.exports = (parameters, totalWidth, totalHeigh) => {
  let { x, y, width, height } = parameters
  const aspectRatio = width / height

  if (width < totalWidth) {
    width = totalWidth
    height = width / aspectRatio
  }

  if (height < totalHeigh) {
    height = totalHeigh
    width = height * aspectRatio
  }

  if (x > 0) x = 0
  if (y > 0) y = 0

  if (width - totalWidth < -x) x = totalWidth - width
  if (height - totalHeigh < -y) y = totalHeigh - height

  return { x, y, width: Number(width.toFixed(4)), height: Number(height.toFixed(4)) }
}
