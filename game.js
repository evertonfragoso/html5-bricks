const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');

var score = 0;
var lives = 3;
var fontColour = '#33EE33';

var speed = 2;

var rightPressed = false;
var leftPressed = false;

var ballColour = '#EE3333';
var ballRadius = 10;
var ballStartX = canvas.width / 2;
var ballStartY = canvas.height - 50;
var ballX = ballStartX;
var ballY = ballStartY;
var dx = speed;
var dy = -speed;

var paddleColour = '#EEEEEE';
var paddleHeight = 10;
var paddleWidth = 75;
var paddleStartX = canvas.height - (paddleHeight * 2);
var paddleStartY = canvas.width - paddleWidth / 2;
var paddleY = paddleStartX;
var paddleX = paddleStartY;

var bricksColour = '#3333EE';
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}


function drawBricks() {
  let brickX = 0;
  let brickY = 0;

  var drawBrick = function(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = bricksColour;
    ctx.fill();
    ctx.closePath();
  };

  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;

        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;

        drawBrick(brickX, brickY, brickWidth, brickHeight);
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = ballColour;
  ctx.fill();
  ctx.closePath();

  if ((ballX + dx) > (canvas.width - ballRadius) || (ballX + dx) < ballRadius) {
    dx = -dx;
  }
  if (ballY + dy < ballRadius) {
    dy = -dy;
  } else if (ballY + dy > canvas.height - ballRadius) {
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
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
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

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}


function collisionDetection() {
  // brick collision
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (ballX > b.x && ballX < b.x + brickWidth && ballY > b.y && ballY < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score == (brickRowCount * brickColumnCount)) {
            levelFinished();
          }
        }
      }
    }
  }

  // paddle collision
  if ((ballY + paddleHeight) > paddleY) dy = -dy;
}

function levelFinished() {
  clearInterval(game);
  alert('GAME OVER! YOU WIN!');
  document.location.reload();
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = fontColour;
  ctx.fillText('Score: ' + score, 8, 20);
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = fontColour;
  ctx.fillText('Lives: ' + lives, canvas.width - 65, 20);
}

function loseLife() {
  lives--;
  if (lives <= 0) {
    clearInterval(game); // Needed for Chrome to end game
    var confirm = window.confirm('GAME OVER\n\nAgain?');
    if (confirm) {
      document.location.reload();
    }
  } else {
    ballX = ballStartX;
    ballY = ballStartY;
    dx = speed;
    dy = -speed;
    paddleX = paddleStartX;
  }
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBricks();
  drawPaddle();
  drawBall();
  drawScore();
  drawLives();

  collisionDetection();
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

var game = setInterval(draw, 10);
