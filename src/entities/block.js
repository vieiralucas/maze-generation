class Block {
  constructor(x, y, size) {
    this.posX = x;
    this.posY = y;
    this.x = x * size;
    this.y = y * size;
    this.size = size;
    this.visited = false;
    this.walls = [
      // top
      new Wall(this.x, this.y, size, 1),
      // right
      new Wall(this.x + size, this.y, 1, size),
      // bottom
      new Wall(this.x, this.y + size, size, 1),
      // left
      new Wall(this.x, this.y, 1, size)
    ];
  }

  draw(ctx, color = 'black') {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    this.drawWalls(ctx);
  }

  drawWalls(ctx) {
    this.walls.forEach(w => w.draw(ctx));
  }
}

class Wall {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.visible = true;
  }

  draw(ctx) {
    if (this.visible) {
      ctx.fillStyle = 'white';
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }
}
