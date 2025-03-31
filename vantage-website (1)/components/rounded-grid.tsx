"use client"
import Image from "next/image"

interface RoundedGridProps {
  images: {
    src: string
    alt: string
  }[]
  className?: string
}

export function RoundedGrid({ images, className }: RoundedGridProps) {
  // Ensure we have exactly 8 images
  const gridImages =
    images.length >= 8
      ? images.slice(0, 8)
      : [...images, ...Array(8 - images.length).fill({ src: "/placeholder.svg", alt: "Placeholder" })]

  return (
    <div className={`max-w-3xl mx-auto p-4 ${className || ""}`}>
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {/* Left column - tall rounded rectangle */}
        <div className="relative col-span-1 row-span-2 rounded-[30px] overflow-hidden h-[400px]">
          <Image src={gridImages[0].src || "/placeholder.svg"} alt={gridImages[0].alt} fill className="object-cover" />
        </div>

        {/* Top middle - rounded square */}
        <div className="relative col-span-1 rounded-[30px] overflow-hidden h-[195px]">
          <Image src={gridImages[1].src || "/placeholder.svg"} alt={gridImages[1].alt} fill className="object-cover" />
        </div>

        {/* Top right - circle */}
        <div className="relative col-span-1 rounded-full overflow-hidden h-[195px]">
          <Image src={gridImages[2].src || "/placeholder.svg"} alt={gridImages[2].alt} fill className="object-cover" />
        </div>

        {/* Middle row - left side (under top middle) */}
        <div className="relative col-span-1 rounded-tl-[30px] rounded-bl-[30px] overflow-hidden h-[195px]">
          <Image src={gridImages[3].src || "/placeholder.svg"} alt={gridImages[3].alt} fill className="object-cover" />
        </div>

        {/* Middle row - right side (under top right) */}
        <div className="relative col-span-1 rounded-tr-[30px] rounded-br-[30px] overflow-hidden h-[195px]">
          <Image src={gridImages[4].src || "/placeholder.svg"} alt={gridImages[4].alt} fill className="object-cover" />
        </div>

        {/* Bottom row - left side */}
        <div className="relative col-span-1 rounded-full overflow-hidden h-[195px]">
          <Image src={gridImages[5].src || "/placeholder.svg"} alt={gridImages[5].alt} fill className="object-cover" />
        </div>

        {/* Bottom row - middle */}
        <div className="relative col-span-1 rounded-tl-[30px] rounded-bl-[30px] overflow-hidden h-[195px]">
          <Image src={gridImages[6].src || "/placeholder.svg"} alt={gridImages[6].alt} fill className="object-cover" />
        </div>

        {/* Bottom row - right side */}
        <div className="relative col-span-1 rounded-tr-[30px] rounded-br-[30px] overflow-hidden h-[195px]">
          <Image src={gridImages[7].src || "/placeholder.svg"} alt={gridImages[7].alt} fill className="object-cover" />
        </div>
      </div>
    </div>
  )
}

