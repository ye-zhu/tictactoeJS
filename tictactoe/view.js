import Game from './game.js'

class View {
  constructor () {
    this.game = new Game(this)
  }

    render () {
      let $root = $('#root')
        $root.empty();
        this.game.board.grid.forEach((row, rowidx) => {
          let $row = $(`<div class="row"></div>`)
            row.forEach((unit, colidx) => {
              let $unit = $(`<div class=unit-${unit.letter}>${unit.letter}</div>`)
                .on('click', (event) => {
                  if (unit.letter === "") {
                    this.game.markBoard(rowidx, colidx);
                  } else {
                    this.printText();
                  }
                })
              $row.append($unit)
            })
            $root.append($row)
          })
    }


   printText() {
     let $text = $('#text')
     $text.empty();
         if (this.game.win > 0) {
           let $printText = $(`<div class="textdiv"> ${this.game.currentPlayer.letter} WON!!!</div>`)
           $text.append($printText);
         } else {
       let $printText = $(`<div class="textdiv"> Place Move ${this.game.currentPlayer.letter}</div>`)
     $text.append($printText);
     }
   }

}





// export default View

let view = new View();
window.view = view;
view.render();
view.printText();
