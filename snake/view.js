import Game from './game.js'

class View {
  constructor () {
    this.game = new Game(this)
    this.game.startSnake()
  }

  render() {
    let $root = $('#root')
    $root.empty();
    let snakePos = this.game.snake.currentPos.reduce((acc, pos) => {
      acc[pos] = true;
      return acc
    }, {});

    let fruitPos = this.game.fruit;


      this.game.board.grid.forEach((row, rowidx) => {
        let $row = $(`<div class = "row"></div>`);
        row.forEach((unit, unitidx) => {
          let snakeClass;
          let fruitClass;
            if (snakePos[[rowidx, unitidx]]) {
              snakeClass = "snake"
            }

            if (fruitPos[0] === rowidx && fruitPos[1] === unitidx) {
              fruitClass = 'fruit'
            }

          let $unit = $(`<div class = "unit ${snakeClass} ${fruitClass}"></div>`);
          $row.append($unit);
        })
        $root.append($row);
      })
    }

    printText (gameover) {
      let $text = $('#text')
      $text.empty();
      let $printText;
      let $pauseButton;
      let $restartButton;
      let $textDiv = $(`<div class="textdiv"> </div>`)


      if (gameover) {
        $printText = $(`<div class="textDis score"> GameOver / Your Score = ${this.game.score}</div>`)
      } else {
        $printText = $(`<div class="textDis score"> SCORE = ${this.game.score}</div>`)
      }


      $pauseButton = $(`<div class="textDis pause"> Pause Game </div>`)
      .on('click', (event) => {
        this.game.pauseGame()
      })

      $restartButton = $(`<div class="textDis restart"> Restart Game </div>`)
      .on('click', (event) => {
        window.location.reload();
      })

      $text.append($textDiv)
      $textDiv.append($restartButton)
      $textDiv.append($pauseButton)
      $textDiv.append($printText)
    }

//End
}




//
let view = new View();
