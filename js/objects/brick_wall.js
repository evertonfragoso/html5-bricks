import Brick from './brick.js'

export default function BrickWall (x, y, brickWidth, brickHeight, rows, columns) {
  const b = this
  const G = window.Game
  const canvas = G.Canvas
  const Colours = G.Colours

  let brickWall = []
  let totalBricks = rows * columns
  let bricksToClear = totalBricks
  let colour
  let YSpacing = 5
  let XSpacing = ((canvas.width - x) - (columns * brickWidth)) / columns

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
        default: colour = Colours.White; break
      }

      let brickY = (y + r * (brickHeight + 1)) + (YSpacing * r)

      // Columns
      brickWall[r] = []
      for (let c = 0; c < columns; c++) {
        let brickX = (x + c * brickWidth)
        if (c > 0 && c < columns) brickX += XSpacing * c
        brickWall[r][c] = new Brick(brickX, brickY, brickWidth, brickHeight, colour)
      }
    }
  }

  b.rows = function () { return rows }
  b.columns = function () { return columns }
  b.wall = function () { return brickWall }
  b.bricksToClear = function () { return bricksToClear }
  b.hitBrick = function (row, col) {
    brickWall[row][col].status = false
    bricksToClear--
  }

  b.draw = function () {
    if (bricksToClear == totalBricks) Wall()

    for (let r in brickWall) {
      for (let c in brickWall[r]) {
        brickWall[r][c].draw()
      }
    }
  }
}
