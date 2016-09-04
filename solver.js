/* global Event, requestAnimationFrame */

;(function () {
  const BOARD_SIZE = 4

  const formEl = document.getElementById('bogglef')
  const answerEl = document.getElementById('answer')
  const letterEls = document.querySelectorAll('#pzl td input')

  const letters = [].map.call(letterEls, (l) => l.value.trim().toUpperCase())

  function submit (letterIndeces) {
    const word = letterIndeces.map((i) => letters[i]).join('')
    answerEl.value = word

    const submitEvent = new Event('submit')
    formEl.dispatchEvent(submitEvent)
  }

  let toAttempt = letters.map((l, i) => [i])

  function addAttempt (indeces, indexToAdd) {
    if (indeces.indexOf(indexToAdd) === -1) {
      toAttempt.push(indeces.concat(indexToAdd))
    }
  }

  function tick () {
    const indeces = toAttempt.shift()
    submit(indeces)

    const lastIndex = indeces[indeces.length - 1]

    // up
    if (lastIndex >= BOARD_SIZE) {
      // straight up
      addAttempt(indeces, lastIndex - BOARD_SIZE)
      // up and to the left
      if (lastIndex % BOARD_SIZE) {
        addAttempt(indeces, lastIndex - BOARD_SIZE - 1)
      }
      // up and to the right
      if ((lastIndex + 1) % BOARD_SIZE) {
        addAttempt(indeces, lastIndex - BOARD_SIZE + 1)
      }
    }

    // left
    if (lastIndex % BOARD_SIZE) {
      addAttempt(indeces, lastIndex - 1)
    }

    // right
    if ((lastIndex + 1) % BOARD_SIZE) {
      addAttempt(indeces, lastIndex + 1)
    }

    // down
    if (lastIndex < (BOARD_SIZE * (BOARD_SIZE - 1))) {
      // straight down
      addAttempt(indeces, lastIndex + BOARD_SIZE)
      // down and to the left
      if (lastIndex % BOARD_SIZE) {
        addAttempt(indeces, lastIndex + BOARD_SIZE - 1)
      }
      // down and to the right
      if ((lastIndex + 1) % BOARD_SIZE) {
        addAttempt(indeces, lastIndex + BOARD_SIZE + 1)
      }
    }

    if (toAttempt.length) {
      requestAnimationFrame(tick)
    }
  }

  requestAnimationFrame(tick)
})()
