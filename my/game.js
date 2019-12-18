// Config
import './game_namespace.js';
import Init from './game_init.js';

// Game Objects
import Ball from './objects/ball.js';
import Border from './objects/border.js';
import Brick from './objects/brick.js';
import Paddle from './objects/paddle.js';
import Wall from './objects/wall.js';

// Controls
//


Init();

let ball = new Ball();
let border = new Border();
let brick = new Brick();
let paddle = new Paddle();
let wall = new Wall();

(function drawObjects() {
  ball.draw();
  border.draw();
  brick.draw();
  paddle.draw();
  wall.draw();

  requestAnimationFrame(drawObjects);
})();
