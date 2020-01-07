export default function GameData () {
  const gd = this
  const livesElement = document.querySelector('#lives span')
  const levelElement = document.querySelector('#level span')
  const scoreElement = document.querySelector('#score span')
  const prevScoreElement = document.querySelector('#prevscore span')

  const startLives = 3
  const startScore = 0
  const startLevel = 1

  var Lives = startLives
  var Score = startScore
  var Level = startLevel
  var PrevScore = 0

  gd.Lives = {
    get: function () { return Lives },
    add: function () { Lives++ },
    lose: function () { Lives-- },
    draw: function () { livesElement.innerText = Lives }
  }

  gd.Level = {
    get: function () { return Level },
    increase: function () { Level++ },
    draw: function () { levelElement.innerText = Level }
  }

  gd.Score = {
    get: function () { return Score },
    add: function (amount) { Score += amount },
    draw: function () {
      scoreElement.innerText = Score
      prevScoreElement.innerText = PrevScore
    }
  }

  gd.reset = function () {
    PrevScore = Score
    Lives = startLives
    Score = startScore
    Level = startLevel
  }
}
