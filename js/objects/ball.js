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

  b.setSpeed = function (newSpeed) { speed = newSpeed }

  b.hitTest = function (obj) {
    var x = b.x + radius
    var y = b.y + radius
    return (x > obj.x && x < obj.x + obj.width &&
            y > obj.y && y < obj.y + obj.height)
  }

  b.launch = function () {
    if (b.status) return

    var v = [-1, 1]
    var rand = v[Math.floor(Math.random() * v.length)]

    b.status = true
    b.x = startX
    b.y = startY
    b.XVelocity = speed * rand
    b.YVelocity = speed * -1
  }

  b.move = function () {
    if (b.status === false) return

    let paddle = G.Paddle
    let brickWall = G.BrickWall

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
    // divide it into segments that will determine the angle of the bounce
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

    let hitBrick = false

    for (let r = 0; r < brickWall.rows(); r++) {
      if (!hitBrick) {
        for (let c = 0; c < brickWall.columns(); c++) {
          let wall = brickWall.wall()
          let brick = wall[r][c]
          if (brick.status) {
            if (b.hitTest(brick)) {
              brickWall.hitBrick(r, c)
              G.Data.Score.add(brickWall.rows() - r)
              b.YVelocity *= -1
              hitBrick = true
              break
            }
          }
        }
      }
    }

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
