import recursiveBacktracker from './algorithms/recursive-backtracker';
import globals from './utils/globals';

const onSubmit = e => {
  e.preventDefault();
  const algorithm = document.getElementById('algorithm').value;
  const blockSize = document.getElementById('blockSize').value;
  const hurryUp = document.getElementById('hurryUp').checked;
  globals.setWidth(Number(document.getElementById('canvasWidth').value))
  globals.setHeight(Number(document.getElementById('canvasHeight').value))

  start(algorithm, blockSize, hurryUp);
};

const start = (algorithm, blockSize, hurry) => {
  switch(algorithm) {
    case 'depth-first':
      depthFirst(blockSize);
      break;
    case 'recursive-backtracker':
      recursiveBacktracker(blockSize, hurry);
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

window.onload = () => {
  const form = document.getElementById('form');
  form.addEventListener('submit', onSubmit);
  globals.start();
}

