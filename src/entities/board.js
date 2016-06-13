import Block from './block';

export default class Board {
  constructor(w, h, xBlocks, yBlocks) {
    this.w = w;
    this.h = h;
    this.width = xBlocks;
    this.height = yBlocks;

    const wBlock = this.w / xBlocks ;
    const hBlock = this.h / yBlocks;

    this.blocks = [];

    for (let i = 0; i < xBlocks; i++) {
      for (let j = 0; j < yBlocks; j++) {
        this.blocks.push(new Block(i, j, wBlock, hBlock));
      }
    }

    this.unvisiteds = this.blocks.length;
  }

  draw(ctx, color = 'black') {
    this.blocks.forEach(b => b.draw(ctx, color));
  }

  getBlock(x, y) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return undefined;

    return this.blocks[x * this.width + y];
  }

  hasUnvisited() {
    return this.unvisiteds > 0;
  }

  getNeighbours(block) {
    const blockPosX = block.posX;
    const blockPosY = block.posY;

    return [
      this.getBlock(blockPosX, blockPosY - 1),
      this.getBlock(blockPosX + 1, blockPosY),
      this.getBlock(blockPosX, blockPosY + 1),
      this.getBlock(blockPosX - 1, blockPosY)
    ].filter(b => b !== undefined);
  }

  setVisited(block) {
    block.visited = true;
    this.unvisiteds--
  }
}
