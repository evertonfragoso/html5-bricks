// Config
import './game_namespace.js'
import './game_init.js'
import Colours from './game_colours.js'

// Controls
import './game_controls.js'

// Game Objects
import Ball from './objects/ball.js'
import Border from './objects/border.js'
import BrickWall from './objects/brick_wall.js'
import Paddle from './objects/paddle.js'

// Game Data
import GameData from './game_data.js'
import Levels from './game_levels.js'

let G = window.Game
G.Colours = Colours
G.Data = new GameData()

let brickRows
let brickColumns
let rowHeight
let columnWidth
let wallMargin

function startLevel () {
  brickRows = Levels[G.Data.Level.get()].brickRows
  brickColumns = Levels[G.Data.Level.get()].brickColumns
  rowHeight = Levels[G.Data.Level.get()].rowHeight
  columnWidth = Levels[G.Data.Level.get()].columnWidth
  wallMargin = (G.Canvas.width - (brickColumns * columnWidth)) / brickColumns
}

function startObjects () {
  G.Ball = new Ball()
  G.Border = new Border()
  G.Paddle = new Paddle()
  newWall()
}

function drawMessage (message) {
  G.Context.font = '1rem Verdana, -apple-system, sans-serif'
  G.Context.fillStyle = G.Colours.White

  let textMeasure = G.Context.measureText(message)
  let posX = Math.floor((G.Canvas.width / 2) - (textMeasure.width / 2))
  let posY = G.Canvas.height / 2

  G.Context.fillText(message, posX, posY)
}

function newWall() {
  G.BrickWall = new BrickWall(wallMargin, rowHeight, columnWidth, rowHeight, brickRows, brickColumns)
}

function gameOver () {
  drawMessage('Game Over')
  G.Data.reset()
  startLevel()
  startObjects()
}

function drawObjects () {
  G.Context.clearRect(0, 0, G.Canvas.width, G.Canvas.height)

  G.Border.draw()
  G.BrickWall.draw()
  G.Paddle.draw()

  if (G.BrickWall.bricksToClear() == 0) {
    G.Data.Level.increase()
    startLevel()
    G.Ball.readyToServe = true
    newWall()
  }

  if (G.Ball.readyToServe) {
    G.Ball.status = false

    if (G.Data.Lives.get() > 0) {
      drawMessage('Press <Space> or Click/Tap to Launch')
    } else {
      gameOver()
    }
  }

  if (G.Ball.status) {
    let inPlay = G.Ball.move()
    if (inPlay) {
      G.Ball.draw()
    } else {
      G.Data.Lives.lose()
      G.Ball.readyToServe = true
    }
  }

  G.Data.Lives.draw()
  G.Data.Level.draw()
  G.Data.Score.draw()

  requestAnimationFrame(drawObjects)
}

// Game Start
G.Start = function () {
  startLevel()
  startObjects()
  drawObjects()
}

document.addEventListener('DOMContentLoaded', G.Start)
