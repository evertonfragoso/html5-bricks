export default function Ball () {
  const b = this
  const canvas = window.Game.Canvas
  const context = window.Game.Context

  let radius = 10

  b.startX = canvas.width / 2
  b.startY = canvas.height - 50
  b.x = b.startX
  b.y = b.startY
  b.colour = '#FF3333'

  function hitTest () {}

  b.launch = function () {}
  b.move = function () {}

  b.draw = function () {
    context.beginPath()
    context.arc(b.x, b.y, radius, 0, Math.PI * 2)
    context.fillStyle = b.colour
    context.fill()
    context.closePath()
  }
}
