/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _recursiveBacktracker = __webpack_require__(1);
	
	var _recursiveBacktracker2 = _interopRequireDefault(_recursiveBacktracker);
	
	var _globals = __webpack_require__(25);
	
	var _globals2 = _interopRequireDefault(_globals);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var onSubmit = function onSubmit(e) {
	  e.preventDefault();
	  var algorithm = document.getElementById('algorithm').value;
	  var blockSize = document.getElementById('blockSize').value;
	  var hurryUp = document.getElementById('hurryUp').checked;
	  _globals2.default.setWidth(Number(document.getElementById('canvasWidth').value));
	  _globals2.default.setHeight(Number(document.getElementById('canvasHeight').value));
	
	  start(algorithm, blockSize, hurryUp);
	};
	
	var start = function start(algorithm, blockSize, hurry) {
	  switch (algorithm) {
	    case 'depth-first':
	      depthFirst(blockSize);
	      break;
	    case 'recursive-backtracker':
	      (0, _recursiveBacktracker2.default)(blockSize, hurry);
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
	
	window.onload = function () {
	  var form = document.getElementById('form');
	  form.addEventListener('submit', onSubmit);
	  _globals2.default.start();
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _board = __webpack_require__(2);
	
	var _board2 = _interopRequireDefault(_board);
	
	var _math = __webpack_require__(24);
	
	var _globals = __webpack_require__(25);
	
	var _globals2 = _interopRequireDefault(_globals);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  var blockSize = arguments.length <= 0 || arguments[0] === undefined ? 40 : arguments[0];
	  var hurry = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
	  var WIDTH = _globals2.default.getWidth();
	  var HEIGHT = _globals2.default.getHeight();
	  var ctx = _globals2.default.getCtx();
	
	  var removeWallsBetween = function removeWallsBetween(a, b) {
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
	
	  var draw = function draw() {
	    ctx.fillStyle = 'black';
	    ctx.fillRect(0, 0, WIDTH, HEIGHT);
	    board.draw(ctx);
	    current.draw(ctx, 'violet');
	    stack.forEach(function (s) {
	      return s.draw(ctx, 'blue');
	    });
	  };
	
	  var update = function update() {
	    if (board.hasUnvisited()) {
	      var unvisitedNeighbours = board.getNeighbours(current).filter(function (n) {
	        return !n.visited;
	      });
	
	      if (unvisitedNeighbours.length > 0) {
	        stack.push(current);
	        var nextCurrent = unvisitedNeighbours[(0, _math.getRandomInt)(0, unvisitedNeighbours.length)];
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
	
	  var board = new _board2.default(WIDTH, HEIGHT, WIDTH / blockSize, HEIGHT / blockSize);
	  var stack = [];
	  var current = board.getBlock(0, 0);
	  board.setVisited(current);
	
	  draw();
	  if (hurry) {
	    do {
	      update();
	    } while (board.hasUnvisited());
	  } else {
	    update();
	  }
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _block = __webpack_require__(23);
	
	var _block2 = _interopRequireDefault(_block);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Board = function () {
	  function Board(w, h, xBlocks, yBlocks) {
	    (0, _classCallCheck3.default)(this, Board);
	
	    this.w = w;
	    this.h = h;
	    this.width = xBlocks;
	    this.height = yBlocks;
	
	    var wBlock = this.w / xBlocks;
	    var hBlock = this.h / yBlocks;
	
	    this.blocks = [];
	
	    for (var i = 0; i < xBlocks; i++) {
	      for (var j = 0; j < yBlocks; j++) {
	        this.blocks.push(new _block2.default(i, j, wBlock, hBlock));
	      }
	    }
	
	    this.unvisiteds = this.blocks.length;
	  }
	
	  (0, _createClass3.default)(Board, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      var color = arguments.length <= 1 || arguments[1] === undefined ? 'black' : arguments[1];
	
	      this.blocks.forEach(function (b) {
	        return b.draw(ctx, color);
	      });
	    }
	  }, {
	    key: 'getBlock',
	    value: function getBlock(x, y) {
	      if (x < 0 || y < 0 || x >= this.width || y >= this.height) return undefined;
	
	      return this.blocks[x * this.width + y];
	    }
	  }, {
	    key: 'hasUnvisited',
	    value: function hasUnvisited() {
	      return this.unvisiteds > 0;
	    }
	  }, {
	    key: 'getNeighbours',
	    value: function getNeighbours(block) {
	      var blockPosX = block.posX;
	      var blockPosY = block.posY;
	
	      return [this.getBlock(blockPosX, blockPosY - 1), this.getBlock(blockPosX + 1, blockPosY), this.getBlock(blockPosX, blockPosY + 1), this.getBlock(blockPosX - 1, blockPosY)].filter(function (b) {
	        return b !== undefined;
	      });
	    }
	  }, {
	    key: 'setVisited',
	    value: function setVisited(block) {
	      block.visited = true;
	      this.unvisiteds--;
	    }
	  }]);
	  return Board;
	}();
	
	exports.default = Board;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(5);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(6), __esModule: true };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	var $Object = __webpack_require__(10).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(18), 'Object', {defineProperty: __webpack_require__(14).f});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(9)
	  , core      = __webpack_require__(10)
	  , ctx       = __webpack_require__(11)
	  , hide      = __webpack_require__(13)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 9 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(12);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(14)
	  , createDesc = __webpack_require__(22);
	module.exports = __webpack_require__(18) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(15)
	  , IE8_DOM_DEFINE = __webpack_require__(17)
	  , toPrimitive    = __webpack_require__(21)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(18) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(18) && !__webpack_require__(19)(function(){
	  return Object.defineProperty(__webpack_require__(20)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(19)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16)
	  , document = __webpack_require__(9).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(16);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Block = function () {
	  function Block(x, y, w, h) {
	    (0, _classCallCheck3.default)(this, Block);
	
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
	    new Wall(this.x, this.y, 1, this.h)];
	  }
	
	  (0, _createClass3.default)(Block, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      var color = arguments.length <= 1 || arguments[1] === undefined ? 'black' : arguments[1];
	
	      ctx.fillStyle = color;
	      ctx.fillRect(this.x, this.y, this.w, this.h);
	      this.drawWalls(ctx);
	    }
	  }, {
	    key: 'drawWalls',
	    value: function drawWalls(ctx) {
	      this.walls.forEach(function (w) {
	        return w.draw(ctx);
	      });
	    }
	  }]);
	  return Block;
	}();
	
	exports.default = Block;
	
	var Wall = function () {
	  function Wall(x, y, w, h) {
	    (0, _classCallCheck3.default)(this, Wall);
	
	    this.x = x;
	    this.y = y;
	    this.w = w;
	    this.h = h;
	    this.visible = true;
	  }
	
	  (0, _createClass3.default)(Wall, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      if (this.visible) {
	        ctx.fillStyle = 'white';
	        ctx.fillRect(this.x, this.y, this.w, this.h);
	      }
	    }
	  }]);
	  return Wall;
	}();

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getRandomInt = exports.getRandomInt = function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var WIDTH = 400;
	var HEIGHT = 400;
	var canvas = void 0;
	var ctx = void 0;
	
	var getWidth = exports.getWidth = function getWidth() {
	  return WIDTH;
	};
	var setWidth = exports.setWidth = function setWidth(width) {
	  canvas.width = width;
	  WIDTH = width;
	};
	
	var getHeight = exports.getHeight = function getHeight() {
	  return HEIGHT;
	};
	var setHeight = exports.setHeight = function setHeight(height) {
	  canvas.height = height;
	  HEIGHT = height;
	};
	
	var getCtx = exports.getCtx = function getCtx() {
	  return ctx;
	};
	
	var start = exports.start = function start() {
	  canvas = document.getElementById('canvas');
	  ctx = canvas.getContext('2d');
	  setWidth(WIDTH);
	  setHeight(HEIGHT);
	
	  ctx.fillStyle = 'black';
	  ctx.fillRect(0, 0, WIDTH, HEIGHT);
	};
	
	exports.default = {
	  start: start,
	  getWidth: getWidth, setWidth: setWidth,
	  getHeight: getHeight, setHeight: setHeight,
	  getCtx: getCtx
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map