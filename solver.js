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

  while (toAttempt.length) {
    const letterIndeces = toAttempt.pop()
    submit(letterIndeces)
  }
})();
