export default (function () {
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
      // right arrow key pressed
      game.Paddle.moveRight()
    } else if (e.keyCode == 37) {
      // left arrow key pressed
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

  function touchStartHandler (e) {
    if (e.targetTouches.length > 1) {
      e.preventDefault()
    }

    for (var i = 0; i < e.targetTouches.length; i++) {
      processMove(e.targetTouches[i])
    }
  }

  function touchMoveHandler (e) {
    e.preventDefault()

    for (var i = 0; i < e.targetTouches.length; i++) {
      processMove(e.targetTouches[i])
    }
  }

  function processMove (target) {
    var posX = target.clientX - (game.Paddle.width / 2)
    var relativeX = posX - canvas.offsetLeft
    if (relativeX >= 0 || relativeX < canvas.width) {
      game.Paddle.moveTo(relativeX)
    }
  }

  // Keyboard listeners
  document.addEventListener('keydown', keyDownHandler, false)
  // document.addEventListener('keyup', keyUpHandler, false)

  // Mouse listeners
  canvas.addEventListener('mousemove', mouseMoveHandler, false)

  // Touch listeners
  canvas.addEventListener('touchstart', touchStartHandler, false)
  canvas.addEventListener('touchmove', touchMoveHandler, false)
})()
