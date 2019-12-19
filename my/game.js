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
let brickRows = 7
let brickColumns = 8

G.Colours = Colours

G.Brick.height = G.Canvas.height * 0.02
// TODO: Make this width properly
G.Brick.width = G.Canvas.width / (brickColumns * 1.225)
G.Brick.XSpacing = G.Brick.width * 0.2
G.Brick.YSpacing = G.Brick.height * 0.5

G.Ball = new Ball()
G.Border = new Border()
G.BrickWall = new BrickWall(brickRows, brickColumns)
G.Paddle = new Paddle()

function drawObjects () {
  G.Context.clearRect(0, 0, G.Canvas.width, G.Canvas.height)

  G.Ball.draw()
  G.Border.draw()
  G.BrickWall.draw()
  G.Paddle.draw()
debugger

  requestAnimationFrame(drawObjects)
}

drawObjects()
