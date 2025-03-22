import { useEffect, useRef } from "react"
import p5 from "p5"

type P5SketchProps = {
  sketch: (p: p5) => void
}

export const P5Sketch: React.FC<P5SketchProps> = ({ sketch }) => {
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
