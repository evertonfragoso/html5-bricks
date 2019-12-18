export default function Paddle () {
  const p = this
  const canvas = window.Game.Canvas
  const context = window.Game.Context
  const height = 10
  const width = 75
  const startX = (canvas.width - width) / 2
  const startY = canvas.height - (height * 2)

  p.x = startX
  p.y = startY
  p.colour = '#F3F3F3'

  p.height = height
  p.width = width

  p.moveLeft = function () {
    p.x -= (canvas.width * 0.05)
    if (p.x < 1) p.x = 1
  }

  p.moveRight = function () {
    p.x += (canvas.width * 0.05)
    if ((p.x + width) > canvas.width) {
      p.x = canvas.width - width
    }
  }

  p.moveTo = function (posX) {
    if (posX >= 0) {
      if (posX < canvas.width - width) p.x = posX
      else p.x = canvas.width - width
    } else if (posX < 0) p.x = 0
  }

  p.draw = function () {
    context.beginPath()
    context.rect(p.x, p.y, width, height)
    context.fillStyle = p.colour
    context.fill()
    context.closePath()
  }
}
