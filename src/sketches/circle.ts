import p5 from "p5"

export const circle = (p: p5) => {
  const FPS = 30
  const CIRCLE_SIZE = 150
  const BOB_AMPLITUDE = 30
  const ANGLE_INCREMENT = 0.08

  let circleX: number
  let circleY: number
  let yOffset: number
  let angle = 0

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight)
    p.noStroke()
    p.frameRate(FPS)
    circleX = p.width / 2
    circleY = p.height / 2
  }

  p.draw = () => {
    yOffset = p.sin(angle) * BOB_AMPLITUDE

    if (angle > 2 * p.PI) angle = 0
    angle += ANGLE_INCREMENT

    p.background(0)
    p.ellipse(circleX, circleY + yOffset, CIRCLE_SIZE, CIRCLE_SIZE)
  }

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight)
    circleX = p.width / 2
    circleY = p.height / 2
  }

  p.mousePressed = (event: MouseEvent) => {
    const d = p.dist(event.clientX, event.clientY, circleX, circleY)
    if (d < CIRCLE_SIZE / 2) {
      window.location.href = "/testing"
    }
  }
}
