export default (function () {
  const gc = this
  const game = window.Game
  const canvas = game.Canvas

  // function keyUpHandler (e) {
  //   if (e.keyCode == 39) {
  //     window.Game.Paddle.moveRight()
  //   } else if (e.keyCode == 37) {
  //     game.Paddle.moveLeft()
  //   }
  // }

  function keyDownHandler (e) {
    if (e.keyCode == 39) {
      game.Paddle.moveRight()
    } else if (e.keyCode == 37) {
      game.Paddle.moveLeft()
    }
  }

  function mouseMoveHandler (e) {
    var posX = e.clientX - (game.Paddle.width / 2)
    var relativeX = posX - canvas.offsetLeft
    if (relativeX >= 0 || relativeX < canvas.width) {
      game.Paddle.moveTo(relativeX)
    }
  }

  document.addEventListener('keydown', keyDownHandler, false)
  // document.addEventListener('keyup', keyUpHandler, false)
  document.addEventListener('mousemove', mouseMoveHandler, false)
})()
