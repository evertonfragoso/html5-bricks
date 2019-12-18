export default function Init() {
  const GAME_CANVAS_SELECTOR = '#game';

  let canvas = document.querySelector(GAME_CANVAS_SELECTOR);
  let context = canvas.getContext('2d');

  window.Game.Canvas = canvas;
  window.Game.Context = context;
}
