export default function GameData () {
  const gd = this
  const livesElement = document.querySelector('#lives span')
  const scoreElement = document.querySelector('#score span')

  var Lives = 3
  var Score = 0

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
}
