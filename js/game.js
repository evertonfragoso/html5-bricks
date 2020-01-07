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

let G = window.Game
G.Colours = Colours

let brickRows = 7
let brickColumns = 6
let rowHeight = 15
let columnWidth = 50

let wallMargin = (G.Canvas.width - (brickColumns * columnWidth)) / brickColumns

G.Brick.height = rowHeight
G.Brick.width = columnWidth

function startObjects () {
  G.Ball = new Ball()
  G.Border = new Border()
  G.BrickWall = new BrickWall(wallMargin, rowHeight, brickRows, brickColumns)
  G.Paddle = new Paddle()
  G.Data = new GameData()
}

function drawMessage () {
  let message

  if (G.Data.Lives.get() > 0) {
    message = 'Press <Space> or Click/Tap to Start'
  } else {
    message = 'Game Over'
  }

  G.Context.font = '1rem Verdana, -apple-system, sans-serif'
  G.Context.fillStyle = G.Colours.White

  let textMeasure = G.Context.measureText(message)
  let posX = Math.floor((G.Canvas.width / 2) - (textMeasure.width / 2))
  let posY = G.Canvas.height / 2

  G.Context.fillText(message, posX, posY)
}

function drawObjects () {
  G.Context.clearRect(0, 0, G.Canvas.width, G.Canvas.height)

  G.Ball.draw()
  G.Border.draw()

  if (G.BrickWall.bricksToClear() == 0) {
    G.BrickWall = new BrickWall(wallMargin, rowHeight, brickRows, brickColumns)
    G.Ball.readyToServe = true
  }

  G.BrickWall.draw()
  G.Paddle.draw()

  if (G.Ball.status) {
    let inPlay = G.Ball.move()
    if (!inPlay) {
      G.Data.Lives.lose()
      G.Ball.readyToServe = true
    }
  }

  G.Data.Lives.draw()
  G.Data.Score.draw()

  if (G.Ball.readyToServe) {
    drawMessage()
  }

  requestAnimationFrame(drawObjects)
}

// Game Start
G.Start = function () {
  startObjects()
  drawObjects()
}

document.addEventListener('DOMContentLoaded', G.Start)
