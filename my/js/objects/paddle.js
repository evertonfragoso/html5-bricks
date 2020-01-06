export default function Paddle () {
  const p = this
  const G = window.Game
  const Colours = G.Colours
  const canvas = G.Canvas
  const context = G.Context
  const height = 10
  const width = 75
  const startX = (canvas.width - width) / 2
  const startY = canvas.height - (height * 2)

  let margin = G.Border.getMargin()

  p.x = startX
  p.y = startY
  p.colour = Colours.White

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
    if (posX >= margin) {
      if (posX < canvas.width - width - margin) p.x = posX
      else p.x = canvas.width - width - margin
    } else if (posX < margin) p.x = margin + 1
  }

  p.draw = function () {
    context.beginPath()
    context.rect(p.x, p.y, width, height)
    context.fillStyle = p.colour
    context.fill()
    context.closePath()
  }
}
