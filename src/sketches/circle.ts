import p5 from "p5"

export const circle = (p: p5) => {
  const circleSize = 150
  let circleX: number
  let circleY: number

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight)
    p.noStroke()
    p.frameRate(30)
    circleX = p.width / 2
    circleY = p.height / 2
  }

  p.draw = () => {
    p.background(3)
    p.ellipse(circleX, circleY, circleSize, circleSize)
  }

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight)
    circleX = p.width / 2
    circleY = p.height / 2
  }

  p.mousePressed = (event: MouseEvent) => {
    const d = p.dist(event.clientX, event.clientY, circleX, circleY)
    if (d < circleSize / 2) {
      window.location.href = "/testing"
    }
  }
}
