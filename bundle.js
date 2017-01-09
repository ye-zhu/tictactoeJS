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

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _game = __webpack_require__(1);

	var _game2 = _interopRequireDefault(_game);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var View = function () {
	  function View() {
	    _classCallCheck(this, View);

	    this.game = new _game2.default(this);
	    this.game.startSnake();
	  }

	  _createClass(View, [{
	    key: 'render',
	    value: function render() {
	      var $root = $('#root');
	      $root.empty();
	      var snakePos = this.game.snake.currentPos.reduce(function (acc, pos) {
	        acc[pos] = true;
	        return acc;
	      }, {});

	      var fruitPos = this.game.fruit;

	      this.game.board.grid.forEach(function (row, rowidx) {
	        var $row = $('<div class = "row"></div>');
	        row.forEach(function (unit, unitidx) {
	          var snakeClass = void 0;
	          var fruitClass = void 0;
	          if (snakePos[[rowidx, unitidx]]) {
	            snakeClass = "snake";
	          }

	          if (fruitPos[0] === rowidx && fruitPos[1] === unitidx) {
	            fruitClass = 'fruit';
	          }

	          var $unit = $('<div class = "unit ' + snakeClass + ' ' + fruitClass + '"></div>');
	          $row.append($unit);
	        });
	        $root.append($row);
	      });
	    }
	  }, {
	    key: 'printText',
	    value: function printText(gameover) {
	      var _this = this;

	      var $text = $('#text');
	      $text.empty();
	      var $printText = void 0;
	      var $pauseButton = void 0;
	      var $restartButton = void 0;
	      var $textDiv = $('<div class="textdiv"> </div>');

	      if (gameover) {
	        $printText = $('<div class="textDis score"> GameOver / Your Score = ' + this.game.score + '</div>');
	      } else {
	        $printText = $('<div class="textDis score"> SCORE = ' + this.game.score + '</div>');
	      }

	      $pauseButton = $('<div class="textDis pause"> Pause Game </div>').on('click', function (event) {
	        _this.game.pauseGame();
	      });

	      $restartButton = $('<div class="textDis restart"> Restart Game </div>').on('click', function (event) {
	        window.location.reload();
	      });

	      $text.append($textDiv);
	      $textDiv.append($restartButton);
	      $textDiv.append($pauseButton);
	      $textDiv.append($printText);
	    }

	    //End

	  }]);

	  return View;
	}();

	//


	var view = new View();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _snake = __webpack_require__(2);

	var _snake2 = _interopRequireDefault(_snake);

	var _board = __webpack_require__(3);

	var _board2 = _interopRequireDefault(_board);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DELTAS = {
	  'w': [-1, 0],
	  's': [1, 0],
	  'd': [0, 1],
	  'a': [0, -1]
	};

	var Game = function () {
	  function Game(view) {
	    _classCallCheck(this, Game);

	    this.view = view;
	    this.board = new _board2.default();
	    this.snake = new _snake2.default();
	    this.currentDelta = DELTAS['a'];
	    this.fruit = undefined;
	    this.addMoveListeners();
	    this.makeFruit();
	    this.running = 0;
	    this.score = 0;
	    this.hitFruit = false;
	  }

	  _createClass(Game, [{
	    key: 'addMoveListeners',
	    value: function addMoveListeners() {
	      var _this = this;

	      document.addEventListener('keydown', function (e) {
	        var delKey = DELTAS[e.key];
	        var currDelt = _this.currentDelta;
	        if (delKey && (delKey[0] + currDelt[0] !== 0 || delKey[1] + currDelt[1] !== 0)) {
	          _this.currentDelta = DELTAS[e.key];
	        } else if (e.key === 'g') {
	          _this.pauseGame();
	        }
	      });
	    }
	  }, {
	    key: 'snakeAndFruitOverlay',
	    value: function snakeAndFruitOverlay() {
	      var _this2 = this;

	      this.snake.currentPos.forEach(function (pos) {
	        var fruit = _this2.fruit;
	        if (pos[0] === fruit[0] && pos[1] === fruit[1]) {
	          _this2.makeFruit();
	          _this2.score += 100;
	          _this2.hitFruit = true;
	        }
	      });
	    }
	  }, {
	    key: 'hitBorderOrSnake',
	    value: function hitBorderOrSnake() {
	      var head = this.snake.currentPos[0];
	      var snakePos = this.snake.currentPos;
	      for (var i = 1; i < snakePos.length; i += 1) {
	        if (head[0] === snakePos[i][0] && head[1] === snakePos[i][1]) {
	          return true;
	        }
	      }
	      if (head[0] >= 12 || head[0] < 0 || head[1] >= 20 || head[1] < 0) {
	        return true;
	      }
	    }
	  }, {
	    key: 'gameOver',
	    value: function gameOver() {
	      if (this.hitBorderOrSnake()) {
	        this.pauseGame('gameover');
	        this.view.printText('gameover');
	      }
	    }
	  }, {
	    key: 'makeFruit',
	    value: function makeFruit() {
	      this.fruit = this.board.pos[Math.floor(Math.random() * this.board.pos.length)];
	    }
	  }, {
	    key: 'startSnake',
	    value: function startSnake() {
	      var callback = function callback() {
	        if (this.hitFruit) {
	          this.snake.move(this.currentDelta, "fromFruit");
	          this.hitFruit = false;
	        } else {
	          this.snake.move(this.currentDelta);
	        }
	        this.snakeAndFruitOverlay();
	        this.view.render();
	        this.view.printText();
	        if (this.running === 0) {
	          this.running = 1;
	        }
	        this.gameOver();
	      };
	      this.interval = setInterval(callback.bind(this), 150);
	    }
	  }, {
	    key: 'pauseGame',
	    value: function pauseGame(gameover) {
	      if (this.running === 1) {
	        clearInterval(this.interval);
	        if (gameover) {
	          this.running = -1;
	        } else {
	          this.running = 0;
	        }
	      } else if (this.running === 0) {
	        this.startSnake();
	      }
	    }

	    //End

	  }]);

	  return Game;
	}();

	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var STARTING = [[6, 10], [6, 11], [6, 12], [6, 13]];

	var Snake = function () {
	  function Snake() {
	    _classCallCheck(this, Snake);

	    this.currentPos = STARTING;
	  }

	  _createClass(Snake, [{
	    key: "move",
	    value: function move(delta, fromFruit) {
	      if (!fromFruit) {
	        var tail = this.currentPos.pop();
	      }
	      var head = this.currentPos[0];
	      this.currentPos.unshift([head[0] + delta[0], head[1] + delta[1]]);
	    }
	  }]);

	  return Snake;
	}();

	exports.default = Snake;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// import Snake from './snake'

	var Board = function () {
	  function Board() {
	    _classCallCheck(this, Board);

	    this.board = Board.makeBoard();
	    this.grid = this.board[0];
	    this.pos = this.board[1];
	  }

	  _createClass(Board, null, [{
	    key: "makeBoard",
	    value: function makeBoard() {
	      var pos = [];
	      var grid = Array(12).fill().map(function (row, rowidx) {
	        return Array(20).fill().map(function (unit, colidx) {
	          pos.push([rowidx, colidx]);
	        });
	      });
	      return [grid, pos];
	    }

	    //End

	  }]);

	  return Board;
	}();

	exports.default = Board;

/***/ }
/******/ ]);