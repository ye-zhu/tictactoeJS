const STARTING = [[6,10], [6,11], [6,12], [6,13]];

class Snake {
  constructor () {
    this.currentPos = STARTING;
  }


  move(delta, fromFruit) {
    if (!fromFruit) {
      let tail = this.currentPos.pop();
    }
    let head = this.currentPos[0]
    this.currentPos.unshift([head[0] + delta[0], head[1] + delta[1]])
  }


}

export default Snake
