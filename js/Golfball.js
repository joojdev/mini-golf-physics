function random(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min
}

function Golfball(initialX, initialY, radius, borderSize, angle, velocity, deceleration, color) {
  this.x = initialX
  this.y = initialY
  this.radius = radius
  this.borderSize = borderSize
  this.totalSize = this.radius * 2 + this.borderSize
  this.angle = angle
  this.velocity = velocity
  this.deceleration = deceleration
  this.color = color

  this.randomLocation = () => {
    this.x = random(0 + this.totalSize / 2, SCREEN_WIDTH - this.totalSize / 2)
    this.y = random(0 + this.totalSize / 2, SCREEN_HEIGHT - this.totalSize / 2)
  }
}

window.Golfball = Golfball