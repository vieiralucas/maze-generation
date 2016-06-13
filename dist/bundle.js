/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const recursiveBacktracker = __webpack_require__(1);

	let WIDTH = 400;
	let HEIGHT = 400;
	let canvas;
	let ctx;
	let animationFrame;

	const onSubmit = e => {
	  e.preventDefault();
	  const algorithm = document.getElementById('algorithm').value;
	  const blockSize = document.getElementById('blockSize').value;
	  const hurryUp = document.getElementById('hurryUp').checked;
	  WIDTH = Number(document.getElementById('canvasWidth').value);
	  HEIGHT = Number(document.getElementById('canvasHeight').value);

	  canvas.width = WIDTH;
	  canvas.height = HEIGHT;
	  start(algorithm, blockSize, hurryUp);
	};

	const getRandomInt = (min, max) => {
	  return Math.floor(Math.random() * (max - min)) + min;
	}

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

	window.onload = function() {
	  canvas = document.getElementById('canvas');
	  canvas.width = WIDTH;
	  canvas.height = HEIGHT;
	  ctx = canvas.getContext('2d');
	  ctx.fillRect(0, 0, WIDTH, HEIGHT);

	  const form = document.getElementById('form');
	  form.addEventListener('submit', onSubmit);
	}



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2);

	export default recursiveBacktracker = (blockSize = 40, hurry = false) => {
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



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Block = __webpack_require__(3);

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


/***/ },
/* 3 */
/***/ function(module, exports) {

	export default class Block {
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


/***/ }
/******/ ]);