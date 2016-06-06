const recursiveBacktracker = (blockSize = 40, hurry = false) => {
  const blocks = [];
  const stack = [];

  const draw = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    blocks.forEach(b => b.draw(ctx));
    current.draw(ctx, 'violet');
    stack.forEach(s => s.draw(ctx, 'blue'));
  };
  const hasUnvisited = () => {
    return blocks.filter(b => !b.visited).length > 0;
  };
  const getByXY = (x, y) => {
    return blocks.filter(b => b.posX === x && b.posY === y)[0];
  };
  const getUnvisitedNeighbours = block => {
    return [
      getByXY(block.posX + 1, block.posY),
      getByXY(block.posX - 1, block.posY),
      getByXY(block.posX, block.posY + 1),
      getByXY(block.posX, block.posY - 1)
    ].filter(b => b !== undefined && !b.visited);
  };
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

  for (let x = 0; x < WIDTH / blockSize; x++) {
    for (let y = 0; y < HEIGHT / blockSize; y++) {
      blocks.push(new Block(x, y, blockSize));
    }
  }

  let current = blocks[0];
  current.visited = true;

  const update = () => {
    const neighbours = getUnvisitedNeighbours(current);
    if (neighbours.length > 0) {
      stack.push(current);
      const nextCurrent = neighbours[getRandomInt(0, neighbours.length)];
      removeWallsBetween(current, nextCurrent);
      current = nextCurrent;
      current.visited = true;
    } else if (stack.length > 0) {
      current = stack.pop();
    }

    if (stack.length === 0) {
      draw();
      current.draw(ctx, 'black');
      return;
    }

    if (!hurry) {
      draw();
      window.requestAnimationFrame(update);
    }
  };

  draw();
  update();
  if (hurry) {
    update();
    while(stack.length > 0) {
      update();
    }

    draw();
    current.draw(ctx, 'black');
  }
}

