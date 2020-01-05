export default (function () {
  const game = window.Game
  const canvas = game.Canvas

  const KEY_RETURN = 13
  const KEY_SHIFT = 16
  const KEY_ESCAPE = 27
  const KEY_SPACE = 32
  const KEY_LEFT_ARROW = 37
  const KEY_UP_ARROW = 38
  const KEY_RIGHT_ARROW = 39
  const KEY_DOWN_ARROW = 40
  const KEY_A = 65
  const KEY_D = 68

  // function keyUpHandler (e) {
  //   if (e.keyCode == 39) {
  //     window.Game.Paddle.moveRight()
  //   } else if (e.keyCode == 37) {
  //     game.Paddle.moveLeft()
  //   }
  // }

  function keyDownHandler (e) {
    if (e.keyCode == KEY_RIGHT_ARROW || e.keyCode == KEY_D) {
      // right arrow key pressed
      game.Paddle.moveRight()
    } else if (e.keyCode == KEY_LEFT_ARROW || e.keyCode == KEY_A) {
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
