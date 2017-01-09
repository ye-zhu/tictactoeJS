class Board {
  constructor () {
    this.grid = Board.makeBoard()
  }

  static makeBoard() {
    let grid = Array(3).fill().map((row) => {
      return Array(3).fill().map((unit) => {
        return {
          letter: ""
        }
      });
    })
    return grid
  }
}

export default Board;
