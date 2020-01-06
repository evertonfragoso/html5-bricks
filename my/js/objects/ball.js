export default function Ball () {
  const b = this
  const G = window.Game
  const Colours = G.Colours
  const canvas = G.Canvas
  const context = G.Context
  const startX = canvas.width / 2
  const startY = canvas.height - 50

  let radius = 10
  let speed = 5

  b.height = radius * 2
  b.width = radius * 2
  b.x = startX
  b.y = startY
  b.XVelocity = 0
  b.YVelocity = 0
  b.colour = Colours.Red
  b.status = false
  b.readyToServe = true

  b.hitTest = function (obj) {
    return (b.x > obj.x && b.x < obj.x + obj.width &&
            b.y > obj.y && b.y < obj.y + obj.height)
  }

  b.launch = function () {
    if (b.status) return

    function randomVelocity () {
      let min = speed * -1
      let max = speed
      return Math.floor(Math.random() * (max - min + 1)) + min
    }

    b.status = true
    b.x = startX
    b.y = startY
    b.XVelocity = randomVelocity()
    b.YVelocity = speed * -1
  }

  b.move = function (brickWall) {
    if (b.status === false) return

    let paddle = G.Paddle

    b.x += b.XVelocity
    b.y += b.YVelocity

    // check for wall hits
    // left wall
    if (b.x < G.Border.getMargin() + radius) {
      b.x = G.Border.getMargin() + radius
      b.XVelocity *= -1
    }
    // right wall
    if (b.x > canvas.width - b.width + speed + G.Border.getMargin()) {
      b.x = canvas.width - b.width + speed
      b.XVelocity *= -1
    }
    // top wall
    if (b.y < G.Border.getMargin() + radius) {
      b.y = G.Border.getMargin() + radius
      b.YVelocity *= -1
    }
    // bottom pit
    if (b.y - b.height > canvas.height) {
      b.status = false
      return false
    }

    // check for paddle hit
    if (b.hitTest(paddle)) {
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
    context.beginPath()
    context.arc(b.x, b.y, radius, 0, Math.PI * 2)
    context.fillStyle = b.colour
    context.fill()
    context.closePath()
  }
}
