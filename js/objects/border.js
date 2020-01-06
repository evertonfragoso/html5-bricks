export default function Border () {
  const b = this
  const G = window.Game
  const Colours = G.Colours
  const canvas = G.Canvas
  const context = G.Context

  let margin = 4

  b.getMargin = function () { return margin }

  b.draw = function () {
    context.beginPath()
    context.lineWidth = 2
    context.strokeStyle = Colours.White

    // top border
    context.moveTo(margin, margin)
    context.lineTo(canvas.width - margin, margin)

    // left border
    context.moveTo(margin, margin)
    context.lineTo(margin, canvas.height)

    // right border
    context.moveTo(canvas.width - margin, margin)
    context.lineTo(canvas.width - margin, canvas.height)

    context.stroke()
    context.closePath()
    context.lineWidth = 1
  }
}
