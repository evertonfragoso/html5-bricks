// Config
import './game_namespace.js'
import './game_init.js'

// Game Objects
import Ball from './objects/ball.js'
import Border from './objects/border.js'
import BrickWall from './objects/brick_wall.js'
import Paddle from './objects/paddle.js'

// Controls
//

let brickRows = 7
let brickColumns = 8

window.Game.BrickHeight = window.Game.Canvas.height * 0.02
// TODO: Make this width properly
window.Game.BrickWidth = window.Game.Canvas.width / (brickColumns * 1.225)
window.Game.BrickXSpacing = window.Game.BrickWidth * 0.2
window.Game.BrickYSpacing = window.Game.BrickHeight * 0.5

let ball = new Ball()
let border = new Border()
let brickWall = new BrickWall(brickRows, brickColumns)
let paddle = new Paddle()

function drawObjects () {
  ball.draw()
  border.draw()
  brickWall.draw()
  paddle.draw()

  requestAnimationFrame(drawObjects)
}

drawObjects()
