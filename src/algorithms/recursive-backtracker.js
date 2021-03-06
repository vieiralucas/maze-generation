import Board from '../entities/board';
import {getRandomInt} from '../utils/math';
import globals from '../utils/globals';

export default (blockSize = 40, hurry = false) => {
  const WIDTH = globals.getWidth();
  const HEIGHT = globals.getHeight();
  const ctx = globals.getCtx();

  const removeWallsBetween = (a, b) => {
    if (a.posY === b.posY) {
      if (a.posX - b.posX > 0) {
        // a is on the right of b
        a.walls[3].visible = false; // remove left wall of a
        b.walls[1].visible = false; // remove right wall of b
      } else {
        // a is on the left of b
        a.walls[1].visible = false; // remove right wall of a
        b.walls[3].visible = false; // remove left wall of b
      }
    } else {
      if (a.posY - b.posY > 0) {
        // a is below b
        a.walls[0].visible = false; // remove top wall of a
        b.walls[2].visible = false; // remove bottom wall of b
      } else {
        // a is on top of b
        a.walls[2].visible = false; // remove bottom wall of a
        b.walls[0].visible = false; // remove top wall of b
      }
    }
  };

  const draw = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    board.draw(ctx);
    current.draw(ctx, 'violet');
    stack.forEach(s => s.draw(ctx, 'blue'));
  };

  const update = () => {
    if (board.hasUnvisited()) {
      const unvisitedNeighbours = board.getNeighbours(current)
        .filter(n => !n.visited);

      if (unvisitedNeighbours.length > 0) {
        stack.push(current);
        const nextCurrent = unvisitedNeighbours[getRandomInt(0, unvisitedNeighbours.length)];
        removeWallsBetween(current, nextCurrent);
        current = nextCurrent;
        board.setVisited(current);
        current.visited = true;
      } else if (stack.length > 0) {
        current = stack.pop();
      }

      if (!hurry) {
        draw();
        requestAnimationFrame(update);
      }
    } else {
      board.draw(ctx);
    }
  };

  const board = new Board(WIDTH, HEIGHT, WIDTH / blockSize, HEIGHT / blockSize);
  const stack = [];
  let current = board.getBlock(0, 0);
  board.setVisited(current);

  draw();
  if (hurry) {
    do {
      update();
    } while(board.hasUnvisited());
  } else {
    update();
  }
};

