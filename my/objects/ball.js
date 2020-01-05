export default function Ball () {
  const b = this
  const G = window.Game
  const Colours = G.Colours
  const canvas = G.Canvas
  const context = G.Context
  const startX = canvas.width / 2
  const startY = canvas.height - 50

  let radius = 10

  b.height
  b.width
  b.x = startX
  b.y = startY
  b.XVelocity = 0
  b.YVelocity = 0
  b.lives = 3
  b.score = 0
  b.colour = Colours.Red
  b.status = true

  b.hitTest = function (obj) {
    return !(obj.left > b.right || obj.right < b.left ||
             obj.top > b.bottom || obj.bottom < b.top)
  }

  b.launch = function (x, y, xVelocity, yVelocity) {
    if (b.status) return

    b.status = true
    b.x = x
    b.y = y
    b.XVelocity = xVelocity
    b.YVelocity = yVelocity
  }

  b.move = function (brickWall, paddle) {
    if (b.status) return

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
    if (b.Y < 1) {
      b.Y = 1
      b.YVelocity *= -1
    }
    if (b.Y + b.height > canvas.height) {
      b.Visible = false
      b.Y = 0
      return false
    }

    // check for paddle hit
    if (b.hitTest(paddle)) {
      // TODO
    }
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
