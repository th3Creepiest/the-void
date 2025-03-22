import Stripes from "../components/StripedImageGallery"
import VideoCarousel from "../components/VideoCarousel"

const forestSound = new Audio("/night-ambience-59071.mp3")
const images = [
  "/images/midjourney_2025-3-18/2f296f78-6927-4ace-b076-dc3a35792e08_0.png",
  "/images/midjourney_2025-3-18/2f296f78-6927-4ace-b076-dc3a35792e08_1.png",
  "/images/midjourney_2025-3-18/2f296f78-6927-4ace-b076-dc3a35792e08_2.png",
  "/images/midjourney_2025-3-18/2f296f78-6927-4ace-b076-dc3a35792e08_3.png",
  "/images/midjourney_2025-3-18/4cff9ada-b884-4e02-9239-f6b207b8f844_0.png",
  "/images/midjourney_2025-3-18/4cff9ada-b884-4e02-9239-f6b207b8f844_1.png",
  "/images/midjourney_2025-3-18/4cff9ada-b884-4e02-9239-f6b207b8f844_2.png",
  "/images/midjourney_2025-3-18/4cff9ada-b884-4e02-9239-f6b207b8f844_3.png",
  "/images/midjourney_2025-3-18/21a3cbb2-aaa3-4213-853e-4e741ffe3e23_0.png",
  "/images/midjourney_2025-3-18/21a3cbb2-aaa3-4213-853e-4e741ffe3e23_1.png",
  "/images/midjourney_2025-3-18/21a3cbb2-aaa3-4213-853e-4e741ffe3e23_2.png",
  "/images/midjourney_2025-3-18/21a3cbb2-aaa3-4213-853e-4e741ffe3e23_3.png",
  "/images/midjourney_2025-3-18/846899e1-d973-4455-b354-81d0884a6040_0.png",
  "/images/midjourney_2025-3-18/846899e1-d973-4455-b354-81d0884a6040_1.png",
  "/images/midjourney_2025-3-18/846899e1-d973-4455-b354-81d0884a6040_2.png",
  "/images/midjourney_2025-3-18/846899e1-d973-4455-b354-81d0884a6040_3.png",
]
const videos = [
  "/videos/5bd97f8c-e962-48e3-bc4c-ed0fb33d7025.mp4",
  "/videos/9082613d-4011-4b5a-a888-5d704dd3dba8.mp4",
  "/videos/a_hole_in_the_terrain_in_a_forest_seed3977008324.mp4",
  "/videos/a4f25cc7-1ef2-4cb1-a790-fbf45f8e5417.mp4",
  "/videos/b6085e55-53ed-4798-b6bf-d6f49864cfb2.mp4",
  "/videos/WhatsApp Video 2025-03-19 at 16.20.08_1b07df14.mp4",
  "/videos/WhatsApp Video 2025-03-19 at 16.20.12_e228a75e.mp4",
]

export default function App() {
  return (
    <>
      <section className="flex justify-center p-4 max-h-180 bg-green-900">
        <img
          className="rounded-3xl hover:cursor-pointer"
          src="/images/90925a5c-0c1f-4a25-89fd-e8efeeece1af.png"
          onClick={() => (forestSound.paused ? forestSound.play() : forestSound.pause())}
        />
      </section>

      <section className="flex justify-center p-4 max-h-180 bg-red-900">
        <Stripes imageUrls={images} />
      </section>

      <section className="flex justify-center p-4 max-h-180 bg-blue-900">
        <VideoCarousel videoUrls={videos} />
      </section>
    </>
  )
}
