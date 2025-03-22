import { useEffect, useRef } from "react"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import p5 from "p5"

const sketch = (p: p5) => {
  const circleSize = 150
  let circleX: number
  let circleY: number

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight)
    p.background(3)
    p.noStroke()
    circleX = p.width / 2
    circleY = p.height / 2
    p.ellipse(circleX, circleY, circleSize, circleSize)
  }

  p.mousePressed = (event: MouseEvent) => {
    const d = p.dist(event.clientX, event.clientY, circleX, circleY)
    if (d < circleSize / 2) {
      window.location.href = "/testing"
    }
  }
}

type P5SketchProps = {
  sketch: (p: p5) => void
}

const P5Sketch: React.FC<P5SketchProps> = ({ sketch }) => {
  const sketchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sketchRef.current) {
      const p5Instance = new p5(sketch, sketchRef.current)
      return () => {
        p5Instance.remove()
      }
    }
  }, [sketch])

  return <div ref={sketchRef} />
}

function HomePage() {
  return <P5Sketch sketch={sketch} />
}

function TestingPage() {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Testing Page</h1>
      <p>This is the testing page</p>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/testing" element={<TestingPage />} />
      </Routes>
    </BrowserRouter>
  )
}
