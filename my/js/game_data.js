export default function GameData () {
  const gd = this
  const livesElement = document.querySelector('#lives span')
  const scoreElement = document.querySelector('#score span')

  const startLives = 3
  const startScore = 0

  var Lives = startLives
  var Score = startScore

  gd.Lives = {
    get: function () { return Lives },
    add: function () { Lives++ },
    lose: function () { Lives-- },
    draw: function () { livesElement.innerHTML = Lives }
  }

  gd.Score = {
    get: function () { return Score },
    add: function (amount) { Score += amount },
    draw: function () { scoreElement.innerHTML = Score }
  }

  gd.reset = function () {
    Lives = startLives
    Score = startScore
  }
}
