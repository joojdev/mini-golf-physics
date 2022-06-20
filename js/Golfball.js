function Golfball(initialX, initialY, size, borderSize, angle, velocity, deceleration, color) {
  this.x = initialX
  this.y = initialY
  this.size = size
  this.borderSize = borderSize
  this.totalSize = (this.size + this.borderSize / 2) * 2
  this.angle = angle
  this.velocity = velocity
  this.deceleration = deceleration
  this.color = color
}

window.Golfball = Golfball