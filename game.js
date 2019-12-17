const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');

var speed = 2;

var rightPressed = false;
var leftPressed = false;

var ballColour = '#0095DD';
var ballRadius = 10;
var ballX = canvas.width / 2;
var ballY = canvas.height - 30;
var dx = speed;
var dy = -speed;

var paddleColour = '#0095DD';
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = ballColour;
  ctx.fill();
  ctx.closePath();

  if (ballX + dx > canvas.width-ballRadius || ballX + dx < ballRadius) {
    dx = -dx;
  }
  if (ballY + dy < ballRadius) {
    dy = -dy;
  } else if (ballY + dy > canvas.height-ballRadius) {
    if (ballX > paddleX && ballX < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      loseLife();
    }
  }

  ballX += dx;
  ballY += dy;
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - (paddleHeight * 2), paddleWidth, paddleHeight);
  ctx.fillStyle = paddleColour;
  ctx.fill();
  ctx.closePath();

  if (rightPressed) {
    paddleX += 5;
    if (paddleX + paddleWidth > canvas.width){
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 5;
    if (paddleX < 0){
      paddleX = 0;
    }
  }
}

function keyDownHandler(e) {
  if (e.key.toLowerCase() == 'd' || e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = true;
  } else if (e.key.toLowerCase() == 'a' || e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key.toLowerCase() == 'd' || e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = false;
  } else if (e.key.toLowerCase() == 'a' || e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = false;
  }
}

function loseLife() {
  clearInterval(game); // Needed for Chrome to end game
  var confirm = window.confirm('GAME OVER\n\nAgain?');
  if (confirm) document.location.reload();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPaddle();
  drawBall();
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

var game = setInterval(draw, 10);
