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

let G = window.Game
G.Colours = Colours

let brickRows = 7
let brickColumns = 5
let rowHeight = 15
let columnWidth = 50

let wallMargin = 10

let readyToServeBall = true

G.Brick.height = rowHeight
G.Brick.width = columnWidth

G.Ball = new Ball()
G.Border = new Border()
G.BrickWall = new BrickWall(wallMargin, rowHeight, brickRows, brickColumns)
G.Paddle = new Paddle()

function serveBall () {
  if (G.Ball.lives < 1) {
    G.Ball.lives = 3
    G.Ball.score = 0
    G.BrickWall = new BrickWall(wallMargin, rowHeight, brickRows, brickColumns)
  }

  readyToServeBall = false
  let ballX = G.Paddle.x + G.Paddle.width / 2
  let ballY = G.Paddle.y - G.Ball.height
  G.Ball.Launch(ballX, ballY, -3, -3)
}

function drawLives () {
  let livesElem = document.querySelector('#lives span')
  livesElem.innerHTML = G.Ball.lives
}

function drawScore () {
  let scoreElem = document.querySelector('#score span')
  scoreElem.innerHTML = G.Ball.score
}

function drawObjects () {
  G.Context.clearRect(0, 0, G.Canvas.width, G.Canvas.height)

  G.Ball.draw()
  G.Border.draw()
  G.BrickWall.draw()
  G.Paddle.draw()

  drawLives()
  drawScore()

  requestAnimationFrame(drawObjects)
}

drawObjects()
