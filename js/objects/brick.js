export default function Brick (x, y, colour) {
  const b = this
  const G = window.Game
  const Colours = G.Colours
  const context = G.Context

  b.height = G.Brick.height
  b.width = G.Brick.width
  b.y = y
  b.x = x
  b.colour = colour
  b.status = true

  b.draw = function () {
    if (b.status) {
      context.beginPath()
      context.rect(b.x, b.y, b.width, b.height)
      context.fillStyle = b.colour
      context.strokeStyle = Colours.White
      context.fill()
      context.stroke()
      context.closePath()
    }
  }
}
