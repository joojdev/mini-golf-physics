function Engine(fps, callback) {
  this.fps = fps
  this.callback = callback

  this.delay = 1000 / this.fps

  this.gameLoop = () => {
    callback()
    setTimeout(this.gameLoop, this.delay)
  }

  setTimeout(this.gameLoop, this.delay)
}

window.Engine = Engine