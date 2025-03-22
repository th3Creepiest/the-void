import classNames from "classnames"
import { useEffect, useRef, useState } from "react"

type Props = {
  imageUrls: string[]
}

function Stripes({ imageUrls }: Props) {
  const [activeItem, setActiveItem] = useState(0)
  const wrapperRef = useRef<HTMLUListElement | null>(null)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (!wrapperRef.current) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    wrapperRef.current.style.setProperty("--transition", "600ms cubic-bezier(0.22, 0.61, 0.36, 1)")

    timeoutRef.current = setTimeout(() => {
      wrapperRef.current?.style.removeProperty("--transition")
    }, 900)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [activeItem])

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-[1200px] px-4">
        <ul ref={wrapperRef} className="group flex flex-col gap-3 min-h-[400px] md:h-[640px] md:flex-row md:gap-[1.5%]">
          {imageUrls.map((img, index) => (
            <li
              className={classNames(
                "relative cursor-pointer h-[200px] md:h-full",
                "md:[transition:width_var(--transition,600ms_cubic-bezier(0.22,0.61,0.36,1))]",
                activeItem === index ? "md:w-[48%]" : "md:w-[8%] hover:md:w-[12%] group-hover:md:w-[7%]"
              )}
              aria-current={activeItem === index}
              key={`stripe-${index}`}
              onClick={() => setActiveItem(index)}
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#c9c6c7]">
                <img className="absolute inset-0 h-full w-full object-cover" src={img} alt="" />
              </div>
              <div
                className={classNames(
                  "left-8 top-8 w-[590px] p-4 transition-[transform,opacity] md:absolute md:p-0",
                  activeItem === index ? "md:translate-x-0 md:opacity-100" : "md:translate-x-4 md:opacity-0"
                )}
              ></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Stripes
