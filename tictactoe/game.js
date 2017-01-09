import Board from './board.js'
import Player from './player.js'
// import View from './view.js'

class Game {
  constructor(view) {
    this.board = new Board();
    this.playerx = new Player("X");
    this.playero = new Player("O");
    this.currentPlayer = this.playerx;
    this.view = view;
    this.win = 0
  }

  switchPlayer () {
    if (this.currentPlayer === this.playerx) {
      this.currentPlayer = this.playero
    } else {
      this.currentPlayer = this.playerx
    }
  }

  markBoard (rowidx, colidx) {
    this.board.grid[rowidx][colidx].letter = this.currentPlayer.letter
    this.combineAndCheck()
    if (this.win === 0) {
      this.switchPlayer();
      this.view.render();
      this.view.printText();
    } else {
      this.view.render();
      this.view.printText();
    }
  }

  buildRows () {
    return this.board.grid.map((el) => {
      return el
    })
  }

  buildCols () {
    let cols = [[], [], []]
    this.board.grid.forEach((row, idx) => {
      row.forEach((unit, colidx) => {
        cols[colidx].push(unit)
      })
    })
    return cols
  }

  buildDiags () {
    let grid = this.board.grid;
    return [[grid[0][0], grid[1][1], grid[2][2]], [grid[0][2], grid[1][1], grid[2][0]]]
  }

  checkValidWin (arr) {
    // debugger
      if (arr.filter((el) => { return el.letter === "X" }).length === 3) {
        return true
      } else if (arr.filter((el) => el.letter === "O").length === 3) {
        return true
      } else {
        return false
      }
  }

  combineAndCheck () {
    this.buildRows().concat(this.buildCols(), this.buildDiags()).forEach((arr) => {
      if (this.checkValidWin(arr)) {
        this.win += 1
      }
    });
  }

}



Array.prototype.myFilter = function (callback) {
  let results = []
  this.forEach((el) => {
    if (callback(el)) {
      results.push(el)
    }
  })
  return results
}





export default Game
