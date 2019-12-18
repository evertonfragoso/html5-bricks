export default function Paddle() {
  const p = this;
  const canvas = window.Game.Canvas;
  const context = window.Game.Context;

  p.height = 10;
  p.width = 75;
  p.startX = (canvas.width - p.width) / 2;
  p.startY = canvas.height - (p.height * 2);
  p.x = p.startX;
  p.y = p.startY;
  p.colour = '#F3F3F3';

  p.draw = function() {
    context.beginPath();
    context.rect(p.x, p.y, p.width, p.height);
    context.fillStyle = p.colour;
    context.fill();
    context.closePath();
  };
}
