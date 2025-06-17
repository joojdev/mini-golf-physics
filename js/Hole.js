function Hole(initialX, initialY, radius) {
  this.x = initialX;
  this.y = initialY;
  this.radius = radius;

  this.colliding = (golfball) => {
    golfballRadius = golfball.totalSize / 2;
    const distanceBetweenCircles = Math.sqrt(((this.x - golfball.x) ** 2) + ((this.y - golfball.y) ** 2)); // pythagorean theorem

    return distanceBetweenCircles < golfballRadius + this.radius;
  };

  this.randomLocation = (golfball) => {
    hole.x = random(0 + hole.radius, SCREEN_WIDTH - hole.radius);
    hole.y = random(0 + hole.radius, SCREEN_HEIGHT - hole.radius);

    if (this.colliding(golfball)) this.randomLocation(golfball)
  };
}

window.Hole = Hole;