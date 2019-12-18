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

  p.draw = function () {
    context.beginPath()
    context.rect(p.x, p.y, width, height)
    context.fillStyle = p.colour
    context.fill()
    context.closePath()
  }
}
