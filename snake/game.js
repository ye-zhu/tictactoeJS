import Snake from './snake.js'
import Board from './board.js'


const DELTAS = {
  'w': [-1,0],
  's': [1,0],
  'd': [0,1],
  'a': [0,-1],
}



class Game {
  constructor(view) {
    this.view = view;
    this.board = new Board();
    this.snake = new Snake();
    this.currentDelta = DELTAS['a']
    this.fruit = undefined;
    this.addMoveListeners();
    this.makeFruit();
    this.running = 0;
    this.score = 0
    this.hitFruit = false

  }

  addMoveListeners () {
    document.addEventListener('keydown', (e) => {
      let delKey = DELTAS[e.key]
      let currDelt = this.currentDelta
      if (delKey && (delKey[0] + currDelt[0] !== 0 || delKey[1] + currDelt[1] !== 0)) {
        this.currentDelta = DELTAS[e.key]
      } else if (e.key === 'g') {
        this.pauseGame();
      }
    })
  }

  snakeAndFruitOverlay () {
    this.snake.currentPos.forEach((pos) => {
      let fruit = this.fruit
      if (pos[0] === fruit[0] && pos[1] === fruit[1])
        {
          this.makeFruit();
          this.score += 100
          this.hitFruit = true
        }
      })
    }

  hitBorderOrSnake () {
    let head = this.snake.currentPos[0]
    let snakePos = this.snake.currentPos
    for (var i = 1; i < snakePos.length; i+=1) {
      if (head[0] === snakePos[i][0] && head[1] === snakePos[i][1]) {
       return true
      }
    }
    if (head[0] >= 12 || head[0] < 0 || head[1] >= 20 || head[1] < 0) {
      return true
    }
  }

  gameOver () {
    if (this.hitBorderOrSnake()) {
      this.pauseGame('gameover');
      this.view.printText('gameover');
    }
  }


  makeFruit () {
      this.fruit = this.board.pos[Math.floor(Math.random()*this.board.pos.length)]
    }

  startSnake () {
    let callback = function () {
      if (this.hitFruit) {
        this.snake.move(this.currentDelta, "fromFruit")
        this.hitFruit = false
      } else {
        this.snake.move(this.currentDelta);
      }
      this.snakeAndFruitOverlay();
      this.view.render();
      this.view.printText();
      if (this.running === 0) {
        this.running = 1
      }
      this.gameOver();
    }
    this.interval = setInterval(callback.bind(this), 150)
  }

  pauseGame (gameover) {
    if (this.running === 1) {
      clearInterval(this.interval)
      if (gameover) {
        this.running = -1;
      } else {
        this.running = 0
      }
    } else if (this.running === 0) {
      this.startSnake();
    }
  }

//End
}

export default Game
