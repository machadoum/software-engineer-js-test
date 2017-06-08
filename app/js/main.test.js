jest.mock('./canvas.js')
jest.mock('./view.js')
jest.mock('./load-image')
jest.useFakeTimers()
const view = require('./view')
let handlers
view.setHandlers.mockImplementation((params) => { handlers = params })

require('./main')
const loadImage = require('./load-image')

const file = { name: 'testFile', type: 'image/jpeg' }
const img = { naturalWidth: 2000, naturalHeight: 2500 }

describe('when application initialize', () => {
  it('initialize Canvas with 15 x 10', () =>
    expect(view.canvas.initialize).lastCalledWith(15, 10)
  )

  it('logs application intialized', () => {
    expect(view.log).lastCalledWith('Test application ready')
  })
})

describe('photo-editor', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('onSelectFile calls log when no file selected', () => {
    handlers.onSelectFile(undefined)
    expect(view.log).lastCalledWith('No file chosen')
  })

  describe('when has empty state', () => {
    it('onGenerate calls logs', () => {
      handlers.onGenerate()
      expect(view.log).lastCalledWith('No image loaded')
    })

    it('onSelectFile calls logs', () => {
      handlers.onSelectFile()
      expect(view.log).lastCalledWith('No file chosen')
    })

    it('does not move', () => {
      handlers.onMoveRight()
      expect(view.canvas.renderImage).lastCalledWith(
        undefined,
        expect.objectContaining({ x: 0, y: 0 })
      )
    })
  })

  describe('when has file', () => {
    it('onSelectFile calls log when no file selected', () => {
      const testFile = Object.assign({}, file, { type: 'invalidType' })
      handlers.onSelectFile(testFile)
      expect(view.log).lastCalledWith('not a valid Image file: testFile')
    })
  })

  describe('when a Big valid image is selected', () => {
    let loadImagePromise
    beforeEach(() => {
      loadImagePromise = Promise.resolve(img)
      loadImage.mockImplementation(() => loadImagePromise)
      handlers.onSelectFile(file)
    })

    it('calls render with image and selected file when file selected', () =>
      loadImagePromise.then(() =>
        expect(view.canvas.renderImage).lastCalledWith(
          img,
          expect.objectContaining({ id: 'testFile' })
        ))
    )

    it('improves x when onMoveLeft called', () =>
      loadImagePromise.then(() => {
        handlers.onMoveLeft()
        expect(view.canvas.renderImage).lastCalledWith(
          img,
          expect.objectContaining({ x: -0.3 }
        ))
      })
    )

    it('improves x when onMoveRight called', () =>
      loadImagePromise.then(() => {
        handlers.onMoveLeft()
        handlers.onMoveRight()

        expect(view.canvas.renderImage).lastCalledWith(
          img,
          expect.objectContaining({ x: 0 }
        ))
      })
    )

    it('improves y when onMoveUp called', () =>
      loadImagePromise.then(() => {
        handlers.onMoveUp()
        expect(view.canvas.renderImage).lastCalledWith(
          img,
          expect.objectContaining({ y: -0.3 }
        ))
      })
    )

    it('improves y when onMoveDown called', () =>
      loadImagePromise.then(() => {
        handlers.onMoveUp()
        handlers.onMoveDown()

        expect(view.canvas.renderImage).lastCalledWith(
          img,
          expect.objectContaining({ y: 0 }
        ))
      })
    )

    it('scale width and height when onScaleUp called', () =>
      loadImagePromise.then(() => {
        handlers.onScaleUp()

        expect(view.canvas.renderImage).lastCalledWith(
          img,
          expect.objectContaining({ width: 22.9166, height: 28.6459 }
        ))
      })
    )

    it('scale width and height when onScaleUp called', () =>
      loadImagePromise.then(() => {
        handlers.onScaleUp()
        handlers.onScaleDown()

        expect(view.canvas.renderImage).lastCalledWith(
          img,
          expect.objectContaining({ width: 20.6249, height: 25.7813 }
        ))
      })
    )
  })
})
