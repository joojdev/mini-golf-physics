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
}

window.Golfball = Golfball