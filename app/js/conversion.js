const DPI = 96 // It should be calculated

module.exports = {
  inchesToPixels: (inches) => inches * DPI,
  pixelsToInches: (pixels) => pixels / DPI
}
