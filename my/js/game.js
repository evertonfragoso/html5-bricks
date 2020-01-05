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
let brickColumns = 5
let rowHeight = 15
let columnWidth = 50

let wallMargin = (G.Canvas.width - (brickColumns * columnWidth)) / brickColumns

G.Brick.height = rowHeight
G.Brick.width = columnWidth

function serveBall () {
  if (G.Data.Lives.get() < 1) {
    startGame()
  }

  G.Ball.readyToServe = false
  let ballX = G.Paddle.x + G.Paddle.width / 2
  let ballY = G.Paddle.y - G.Ball.height

  function randomVelocity () {
    let min = -5
    let max = 5
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  G.Ball.Launch(ballX, ballY, randomVelocity, randomVelocity)
}

function drawObjects () {
  G.Context.clearRect(0, 0, G.Canvas.width, G.Canvas.height)

  G.Ball.draw()
  G.Border.draw()
  G.BrickWall.draw()
  G.Paddle.draw()

  G.Data.Lives.draw()
  G.Data.Score.draw()

  requestAnimationFrame(drawObjects)
}

// Game Start
function startGame () {
  G.Ball = new Ball()
  G.Border = new Border()
  G.BrickWall = new BrickWall(wallMargin, rowHeight, brickRows, brickColumns)
  G.Paddle = new Paddle()
  G.Data = new GameData()

  drawObjects()
}

startGame()
