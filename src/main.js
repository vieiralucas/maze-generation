const WIDTH = 400;
const HEIGHT = 400;

let canvas;
let ctx;
let animationFrame;

const onSubmit = e => {
  e.preventDefault();
  const algorithm = document.getElementById('algorithm').value;
  const blockSize = document.getElementById('blockSize').value;

  start(algorithm, blockSize);
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const start = (algorithm, blockSize) => {
  switch(algorithm) {
    case 'depth-first':
      depthFirst(blockSize);
      break;
    case 'recursive-backtracker':
      recursiveBacktracker(blockSize);
      break;
    case 'randomized-kruskal':
      randomizedKruskal(blockSize);
      break;
    case 'randomized-prim':
      randomizedPrim(blockSize);
      break;
    case 'recursive-division':
      recursiveDivision(blockSize);
      break;
  }
};

window.onload = function() {
  canvas = document.getElementById('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  ctx = canvas.getContext('2d');
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const form = document.getElementById('form');
  form.addEventListener('submit', onSubmit);
}

