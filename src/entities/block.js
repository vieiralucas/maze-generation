class Block {
  constructor(x, y, w, h) {
    this.posX = x;
    this.posY = y;
    this.x = x * w;
    this.y = y * h;
    this.w = w;
    this.h = h;
    this.visited = false;
    this.walls = [
      // top
      new Wall(this.x, this.y, this.w, 1),
      // right
      new Wall(this.x + this.w, this.y, 1, this.h),
      // bottom
      new Wall(this.x, this.y + this.h, this.w, 1),
      // left
      new Wall(this.x, this.y, 1, this.h)
    ];
  }

  draw(ctx, color = 'black') {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
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
