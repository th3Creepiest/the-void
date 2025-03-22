import { useState, useRef, useEffect, useCallback } from "react"

type Props = {
  videoUrls: string[]
}

function VideoCarousel({ videoUrls }: Props) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVideoEnd = useCallback(() => {
    setCurrentVideoIndex((prevIndex) => {
      const nextIndex = prevIndex + 1
      return nextIndex >= videoUrls.length ? 0 : nextIndex
    })
  }, [videoUrls.length])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const playVideo = async () => {
      try {
        await video.play()
      } catch (err) {
        console.log("Video playback failed:", err)
      }
    }

    video.load()
    video.addEventListener("canplaythrough", playVideo)
    video.addEventListener("ended", handleVideoEnd)

    return () => {
      video.removeEventListener("canplaythrough", playVideo)
      video.removeEventListener("ended", handleVideoEnd)
      video.pause()
    }
  }, [currentVideoIndex, handleVideoEnd])

  if (!videoUrls.length) {
    return <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">No videos to display</div>
  }

  return (
    <div className="relative max-w-[1200px] overflow-hidden rounded-lg shadow-lg">
      <video ref={videoRef} className="w-full h-auto" muted playsInline>
        <source src={videoUrls[currentVideoIndex]} type="video/mp4" />
      </video>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {videoUrls.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentVideoIndex ? "bg-white scale-125" : "bg-white/50"
            }`}
            onClick={() => setCurrentVideoIndex(index)}
            aria-label={`Go to video ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default VideoCarousel
