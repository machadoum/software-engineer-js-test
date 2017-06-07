const recordedStateStack = []

module.exports = {
  record: (value) => recordedStateStack.push(value),
  load: () => recordedStateStack.pop(),
  isEmpty: () => !recordedStateStack.length
}
