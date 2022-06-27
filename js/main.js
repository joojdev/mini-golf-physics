const SCREEN_WIDTH = 300
const SCREEN_HEIGHT = 300
const GOLFBALL_RADIUS = 9

function random(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min
}

const gameScreen = document.querySelector('#gameScreen')
const title = document.querySelector('#title')
const canvas = new Canvas(gameScreen, SCREEN_WIDTH, SCREEN_HEIGHT)

const hole = new Hole(0, 0, 12)
const ball = new Golfball(0, 0, GOLFBALL_RADIUS, 3, 0, 0, 0.3, '#ffffff')

ball.randomLocation()
hole.randomLocation(ball)

let mouseOn = false
let mouseClicked = false
let animating = false
let animated = false
let mouseX = ball.x
let mouseY = ball.y
let points = 0

gameScreen.onmouseover = () => {
  mouseOn = true
}

gameScreen.onmouseout = () => {
  mouseOn = false
}

gameScreen.onmousemove = (event) => {
  const rectangle = gameScreen.getBoundingClientRect()
  mouseX = event.clientX - rectangle.left
  mouseY = event.clientY - rectangle.top
}

gameScreen.onclick = () => {
  if (ball.velocity == 0) mouseClicked = true
}

new Engine(60, () => {
  if (!animating && ball.velocity == 0 && hole.colliding(ball)) {
    animating = true
  }
  
  if (animating && !animated) {
    holeAngle = Math.floor(Math.atan2(hole.y - ball.y, hole.x - ball.x))
    
    if (Math.floor(ball.x) != Math.floor(hole.x) || Math.floor(ball.y) != Math.floor(hole.y)) {
      ball.x += Math.cos(holeAngle) * 1.4
      ball.y += Math.sin(holeAngle) * 1.4
    } else {
      ball.x = hole.x
      ball.y = hole.y
      
      if (ball.radius > 0) {
        ball.radius -= 0.2
      } else {
        animated = true
        setTimeout(() => {
          points += 1
          document.title = `${points} points - mini golf physics`
          title.textContent = `mini golf physics - ${points} points`
          
          ball.radius = GOLFBALL_RADIUS
          
          ball.randomLocation()
          hole.randomLocation(ball)
          animating = false
          animated = false
          
          mouseX = ball.x
          mouseY = ball.y
        }, 1000)
      }
    }

  }

  canvas.checkerboard(7, 7, '#a2e055', '#93d640')
  canvas.hole(hole)
  if (mouseOn && ball.velocity == 0 && !animating) {
    canvas.arrow(ball.x, ball.y, mouseX, mouseY, 2, '#000000')
  }
  canvas.golfBall(ball)


  if (mouseClicked && ball.velocity == 0 && !animating) {
    mouseClicked = false
    const angle = Math.atan2(mouseY - ball.y, mouseX - ball.x) * (180 / Math.PI)
    const velocity = Math.sqrt((mouseX - ball.x) ** 2 + (mouseY - ball.y) ** 2)
    ball.angle = angle
    ball.velocity = velocity * 0.15
    // ball.velocity = 100
  }

  let directionX = Math.cos(ball.angle * (Math.PI / 180))
  let directionY = Math.sin(ball.angle * (Math.PI / 180))
  
  ball.x += directionX * ball.velocity
  ball.y += directionY * ball.velocity

  if (ball.velocity > 0) ball.velocity -= ball.deceleration
  if (ball.velocity < 0) ball.velocity = 0

  if (animating) return
  if (ball.x + ball.totalSize / 2 >= SCREEN_WIDTH) {
    ball.x = SCREEN_WIDTH - ball.totalSize / 2
    ball.angle = 180 - ball.angle
  } else if (ball.x - ball.totalSize / 2 <= 0) {
    ball.x = 0 + ball.totalSize / 2
    ball.angle = 180 - ball.angle
  }
  if (ball.y + ball.totalSize / 2 >= SCREEN_HEIGHT) {
    ball.y = SCREEN_HEIGHT - ball.totalSize / 2
    ball.angle = 360 - ball.angle
  } else if (ball.y - ball.totalSize / 2 <= 0) {
    ball.y = 0 + ball.totalSize / 2
    ball.angle = 360 - ball.angle
  }
})