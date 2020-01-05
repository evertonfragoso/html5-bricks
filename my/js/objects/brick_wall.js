import Brick from './brick.js'

export default function BrickWall (x, y, rows, columns) {
  const b = this
  const G = window.Game
  const Colours = G.Colours
  const brickHeight = G.Brick.height
  const brickWidth = G.Brick.width

  let brickWall = []
  let colour
  let Yspacing = 5
  let Xspacing = 10

  function Wall () {
    // Rows
    for (let r = 0; r < rows; r++) {
      switch (r) {
        case 0: colour = Colours.Red; break
        case 1: colour = Colours.Orange; break
        case 2: colour = Colours.Yellow; break
        case 3: colour = Colours.Green; break
        case 4: colour = Colours.Blue; break
        case 5: colour = Colours.Indigo; break
        case 6: colour = Colours.Violet; break
      }

      let brickY = (y + r * (brickHeight + 1)) + (Yspacing * r)

      // Columns
      brickWall[r] = []
      for (let c = 0; c < columns; c++) {
        let brickX = (x + c * brickWidth)
        if (c > 0 && c < columns) brickX += Xspacing * c
        brickWall[r][c] = new Brick(brickX, brickY, colour)
      }
    }
  }

  b.draw = function () {
    Wall()
    for (let r in brickWall) {
      for (let c in brickWall[r]) {
        brickWall[r][c].draw()
      }
    }
  }
}
