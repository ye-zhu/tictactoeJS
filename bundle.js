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
	  }

	  _createClass(View, [{
	    key: 'render',
	    value: function render() {
	      var _this = this;

	      var $root = $('#root');
	      $root.empty();
	      this.game.board.grid.forEach(function (row, rowidx) {
	        var $row = $('<div class="row"></div>');
	        row.forEach(function (unit, colidx) {
	          var $unit = $('<div class=unit-' + unit.letter + '>' + unit.letter + '</div>').on('click', function (event) {
	            if (unit.letter === "") {
	              _this.game.markBoard(rowidx, colidx);
	            } else {
	              _this.printText();
	            }
	          });
	          $row.append($unit);
	        });
	        $root.append($row);
	      });
	    }
	  }, {
	    key: 'printText',
	    value: function printText() {
	      var $text = $('#text');
	      $text.empty();
	      if (this.game.win > 0) {
	        var $printText = $('<div class="textdiv"> ' + this.game.currentPlayer.letter + ' WON!!!</div>');
	        $text.append($printText);
	      } else {
	        var _$printText = $('<div class="textdiv"> Place Move ' + this.game.currentPlayer.letter + '</div>');
	        $text.append(_$printText);
	      }
	    }
	  }]);

	  return View;
	}();

	// export default View

	var view = new View();
	window.view = view;
	view.render();
	view.printText();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _board = __webpack_require__(2);

	var _board2 = _interopRequireDefault(_board);

	var _player = __webpack_require__(3);

	var _player2 = _interopRequireDefault(_player);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// import View from './view.js'

	var Game = function () {
	  function Game(view) {
	    _classCallCheck(this, Game);

	    this.board = new _board2.default();
	    this.playerx = new _player2.default("X");
	    this.playero = new _player2.default("O");
	    this.currentPlayer = this.playerx;
	    this.view = view;
	    this.win = 0;
	  }

	  _createClass(Game, [{
	    key: 'switchPlayer',
	    value: function switchPlayer() {
	      if (this.currentPlayer === this.playerx) {
	        this.currentPlayer = this.playero;
	      } else {
	        this.currentPlayer = this.playerx;
	      }
	    }
	  }, {
	    key: 'markBoard',
	    value: function markBoard(rowidx, colidx) {
	      this.board.grid[rowidx][colidx].letter = this.currentPlayer.letter;
	      this.combineAndCheck();
	      if (this.win === 0) {
	        this.switchPlayer();
	        this.view.render();
	        this.view.printText();
	      } else {
	        this.view.render();
	        this.view.printText();
	      }
	    }
	  }, {
	    key: 'buildRows',
	    value: function buildRows() {
	      return this.board.grid.map(function (el) {
	        return el;
	      });
	    }
	  }, {
	    key: 'buildCols',
	    value: function buildCols() {
	      var cols = [[], [], []];
	      this.board.grid.forEach(function (row, idx) {
	        row.forEach(function (unit, colidx) {
	          cols[colidx].push(unit);
	        });
	      });
	      return cols;
	    }
	  }, {
	    key: 'buildDiags',
	    value: function buildDiags() {
	      var grid = this.board.grid;
	      return [[grid[0][0], grid[1][1], grid[2][2]], [grid[0][2], grid[1][1], grid[2][0]]];
	    }
	  }, {
	    key: 'checkValidWin',
	    value: function checkValidWin(arr) {
	      // debugger
	      if (arr.filter(function (el) {
	        return el.letter === "X";
	      }).length === 3) {
	        return true;
	      } else if (arr.filter(function (el) {
	        return el.letter === "O";
	      }).length === 3) {
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: 'combineAndCheck',
	    value: function combineAndCheck() {
	      var _this = this;

	      this.buildRows().concat(this.buildCols(), this.buildDiags()).forEach(function (arr) {
	        if (_this.checkValidWin(arr)) {
	          _this.win += 1;
	        }
	      });
	    }
	  }]);

	  return Game;
	}();

	Array.prototype.myFilter = function (callback) {
	  var results = [];
	  this.forEach(function (el) {
	    if (callback(el)) {
	      results.push(el);
	    }
	  });
	  return results;
	};

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

	var Board = function () {
	  function Board() {
	    _classCallCheck(this, Board);

	    this.grid = Board.makeBoard();
	  }

	  _createClass(Board, null, [{
	    key: "makeBoard",
	    value: function makeBoard() {
	      var grid = Array(3).fill().map(function (row) {
	        return Array(3).fill().map(function (unit) {
	          return {
	            letter: ""
	          };
	        });
	      });
	      return grid;
	    }
	  }]);

	  return Board;
	}();

	exports.default = Board;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Player = function Player(letter) {
	  _classCallCheck(this, Player);

	  this.letter = letter;
	};

	exports.default = Player;

/***/ }
/******/ ]);