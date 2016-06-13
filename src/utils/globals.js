let WIDTH = 400;
let HEIGHT = 400;
let canvas
let ctx;

export const getWidth = () => WIDTH;
export const setWidth = width => {
  canvas.width = width;
  WIDTH = width;
};

export const getHeight = () => HEIGHT;
export const setHeight = height => {
  canvas.height = height;
  HEIGHT = height;
};

export const getCtx = () => ctx;

export const start = () => {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  setWidth(WIDTH);
  setHeight(HEIGHT);

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
};

export default {
  start,
  getWidth, setWidth,
  getHeight, setHeight,
  getCtx
};
