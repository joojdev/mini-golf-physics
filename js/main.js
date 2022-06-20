const SCREEN_WIDTH = 300
const SCREEN_HEIGHT = 300

const gameScreen = document.querySelector('#gameScreen')
const canvas = new Canvas(gameScreen, SCREEN_WIDTH, SCREEN_HEIGHT)
const ball = new Golfball(10, 10, 9, 3, 0, 0, 0.3, '#ffffff')

let mouseOn = false
let mouseClicked = false
let mouseX = 10 + ball.totalSize / 2
let mouseY = 10 + ball.totalSize / 2

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
  canvas.checkerboard(7, 7, '#a2e055', '#93d640')
  if (mouseOn && ball.velocity == 0) {
    canvas.arrow(ball.x + ball.totalSize / 2, ball.y + ball.totalSize / 2, mouseX, mouseY, 2, '#000')
  }
  canvas.golfBall(ball)

  if (mouseClicked && ball.velocity == 0) {
    mouseClicked = false
    const angle = Math.atan2(mouseY - ball.y - ball.totalSize / 2, mouseX - ball.x - ball.totalSize / 2) * (180 / Math.PI)
    const velocity = Math.sqrt((mouseX - ball.x + ball.totalSize / 2) ** 2 + (mouseY - ball.y + ball.totalSize / 2) ** 2)
    ball.angle = angle
    ball.velocity = velocity * 0.15
  }

  let directionX = Math.cos(ball.angle * (Math.PI / 180))
  let directionY = Math.sin(ball.angle * (Math.PI / 180))
  
  ball.x += directionX * ball.velocity
  ball.y += directionY * ball.velocity

  if (ball.velocity > 0) ball.velocity -= ball.deceleration
  if (ball.velocity < 0) ball.velocity = 0

  if (ball.x + ball.totalSize >= SCREEN_WIDTH) {
    ball.x = SCREEN_WIDTH - ball.totalSize
    ball.angle = 180 - ball.angle
  } else if (ball.x <= 0) {
    ball.x = 0
    ball.angle = 180 - ball.angle
  }
  if (ball.y + ball.totalSize >= SCREEN_HEIGHT) {
    ball.y = SCREEN_HEIGHT - ball.totalSize
    ball.angle = 360 - ball.angle
  } else if (ball.y <= 0) {
    ball.y = 0
    ball.angle = 360 - ball.angle
  }
})