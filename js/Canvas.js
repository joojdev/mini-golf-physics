function Canvas(element, width, height) {
  this.element = element
  this.context = this.element.getContext('2d')
  this.width = width
  this.height = height

  this.element.width = this.width
  this.element.height = this.height

  this.clear = () => {
    this.context.clearRect(0, 0, this.width, this.height)
  }

  this.rect = (x, y, width, height, color) => {
    this.context.fillStyle = color
    this.context.fillRect(x, y, width, height)
  }

  this.checkerboard = (columns, rows, color1, color2) => {
    const columnSize = this.width / columns
    const rowSize = this.height / rows

    for (let i = 0; i <= columnSize; i++) {
      for (let j = 0; j <= rowSize; j++) {
        let firstColor = false
        let colorToUse

        if (i % 2 == 1) {
          firstColor = !firstColor
        }

        if (j % 2 == 1) {
          firstColor = !firstColor
        }

        colorToUse = firstColor ? color1 : color2

        this.rect(i * columnSize, j * rowSize, columnSize, rowSize, colorToUse)
      }
    }
  }

  this.golfBall = (golfball) => {
    if (golfball.radius < 0) return
    this.context.fillStyle = golfball.color
    this.context.strokeStyle = '#000000'
    this.context.lineWidth = golfball.borderSize
    this.context.beginPath()
    this.context.arc(golfball.x, golfball.y, golfball.radius, 0, Math.PI * 2)
    this.context.stroke()
    this.context.fill()
  }

  this.arrow = (startX, startY, endX, endY, lineWidth, color) => {
    const headLength = 10
    const distanceX = endX - startX
    const distanceY = endY - startY
    const angle = Math.atan2(distanceY, distanceX)

    this.context.strokeStyle = color
    this.context.lineWidth = lineWidth

    this.context.beginPath()
    this.context.moveTo(startX, startY)
    this.context.lineTo(endX, endY)
    this.context.moveTo(endX, endY)

    this.context.lineTo(endX - headLength * Math.cos(angle - Math.PI / 6), endY - headLength * Math.sin(angle - Math.PI / 6))
    this.context.moveTo(endX, endY)
    this.context.lineTo(endX - headLength * Math.cos(angle + Math.PI / 6), endY - headLength * Math.sin(angle + Math.PI / 6))

    this.context.stroke()
  }

  this.hole = (hole) => {
    this.context.fillStyle = '#705441'
    this.context.strokeStyle = '#000000'
    this.context.lineWidth = 4
    this.context.beginPath()
    this.context.arc(hole.x, hole.y, hole.radius, 0, Math.PI * 2)
    this.context.stroke()
    this.context.fill()
  }
}

window.Canvas = Canvas