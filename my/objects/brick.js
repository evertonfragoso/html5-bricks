export default function Brick (x, y, colour) {
  const b = this
  const context = window.Game.Context

  b.height = window.Game.BrickHeight
  b.width = window.Game.BrickWidth
  b.y = y
  b.x = x
  b.colour = colour
  b.status = true

  b.draw = function () {
    if (b.status) {
      context.beginPath()
      context.rect(b.x, b.y, b.width, b.height)
      context.fillStyle = b.colour
      context.strokeStyle = '#FFFFFF'
      context.fill()
      context.stroke()
      context.closePath()
    }
  }
}
