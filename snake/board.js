// import Snake from './snake'

class Board {
  constructor () {
    this.board = Board.makeBoard()
    this.grid = this.board[0]
    this.pos = this.board[1]
  }

  static makeBoard() {
    let pos = []
    let grid = Array(12).fill().map((row, rowidx) => {
      return Array(20).fill().map((unit, colidx) => {
        pos.push([rowidx, colidx])
      })
    })
    return [grid, pos]
  }


//End
}

export default Board;
