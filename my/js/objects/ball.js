export default function Ball () {
  const b = this
  const G = window.Game
  const Colours = G.Colours
  const canvas = G.Canvas
  const context = G.Context
  const startX = canvas.width / 2
  const startY = canvas.height - 50

  let radius = 10

  b.height = radius * 2
  b.width = radius * 2
  b.x = startX
  b.y = startY
  b.XVelocity
  b.YVelocity
  b.colour = Colours.Red
  b.status = false
  b.readyToServe = true

  b.hitTest = function (obj) {
    return !(obj.x > (b.x + b.width) || (obj.x + obj.width) < b.x ||
             obj.y > (b.y - b.height) || (obj.y - obj.height) < b.y)
  }

  b.launch = function () {
    if (b.status) return

    function randomVelocity () {
      let min = -5
      let max = 5
      return Math.floor(Math.random() * (max - min + 1)) + min
    }

    b.status = true
    b.x = startX
    b.y = startY
    b.XVelocity = randomVelocity()
    b.YVelocity = -5
  }

  b.move = function (brickWall, paddle) {
    if (b.status === false) return

    b.x += b.XVelocity
    b.y += b.YVelocity

    // check for wall hits
    if (b.x < 1) {
      b.x = 1
      b.XVelocity *= -1
    }
    if (b.x > canvas.width - b.width + 5) {
      b.x = canvas.width - b.width + 5
      b.XVelocity *= -1
    }
    if (b.y < 1) {
      b.y = 1
      b.YVelocity *= -1
    }
    if (b.y + b.height > canvas.height) {
      b.status = false
      b.y = 0
      return false
    }

    // check for paddle hit
    if (b.hitTest(paddle)) {
      debugger
      let offset = Math.round((paddle.width - (paddle.x + paddle.width - b.x + b.width / 2)) / 5)

      if (offset < 0) offset = 0

      switch (offset) {
        case 0: b.XVelocity = -6; break
        case 1: b.XVelocity = -5; break
        case 2: b.XVelocity = -4; break
        case 3: b.XVelocity = -3; break
        case 4: b.XVelocity = -2; break
        case 5: b.XVelocity = -1; break
        case 6: b.XVelocity = 1; break
        case 7: b.XVelocity = 2; break
        case 8: b.XVelocity = 3; break
        case 9: b.XVelocity = 4; break
        case 10: b.XVelocity = 5; break
        default: b.XVelocity = 6; break
      }

      b.YVelocity *= -1
      b.y = paddle.y - b.height + 1

      return true
    }

    // let hitBrick = false

    // for (i = 0; i < )

    return true
  }

  b.draw = function () {
    if (b.status) {
      context.beginPath()
      context.arc(b.x, b.y, radius, 0, Math.PI * 2)
      context.fillStyle = b.colour
      context.fill()
      context.closePath()
    }
  }
}
