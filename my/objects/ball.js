export default function Ball() {
  const b = this;
  const canvas = window.Game.Canvas;
  const context = window.Game.Context;

  let radius = 10;

  b.x = canvas.width / 2;
  b.y = canvas.height - 50;
  b.colour = '#FF3333';

  b.draw = function() {
    context.beginPath();
    context.arc(b.x, b.y, radius, 0, Math.PI*2);
    context.fillStyle = b.colour;
    context.fill();
    context.closePath();
  };
}
