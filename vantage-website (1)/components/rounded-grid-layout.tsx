"use client"
import Image from "next/image"

export default function RoundedGridLayout() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
        {/* Left column - tall rounded rectangle */}
        <div className="relative col-span-1 md:col-span-1 md:row-span-2 rounded-[30px] overflow-hidden aspect-[2/3] md:h-[400px]">
          <Image
            src="/placeholder.svg?height=800&width=400"
            alt="Plants with red flowers"
            fill
            className="object-cover"
          />
        </div>

        {/* Top middle - rounded square */}
        <div className="relative col-span-1 md:col-span-1 rounded-[30px] overflow-hidden aspect-square md:h-[195px]">
          <Image src="/placeholder.svg?height=400&width=400" alt="Green leaves closeup" fill className="object-cover" />
        </div>

        {/* Top right - circle */}
        <div className="relative col-span-1 md:col-span-1 rounded-full overflow-hidden aspect-square md:h-[195px]">
          <Image src="/placeholder.svg?height=400&width=400" alt="Hands touching" fill className="object-cover" />
        </div>

        {/* Middle row - left side (under top middle) */}
        <div className="relative col-span-1 md:col-span-1 rounded-tl-[30px] rounded-bl-[30px] overflow-hidden aspect-square md:h-[195px]">
          <Image src="/placeholder.svg?height=400&width=400" alt="Dark green leaves" fill className="object-cover" />
        </div>

        {/* Middle row - right side (under top right) */}
        <div className="relative col-span-1 md:col-span-1 rounded-tr-[30px] rounded-br-[30px] overflow-hidden aspect-square md:h-[195px]">
          <Image
            src="/placeholder.svg?height=400&width=400"
            alt="Person in white outfit"
            fill
            className="object-cover"
          />
        </div>

        {/* Bottom row - left side */}
        <div className="relative col-span-1 md:col-span-1 rounded-full overflow-hidden aspect-square md:h-[195px]">
          <div className="absolute inset-0 bg-green-800 flex items-center justify-center">
            <span className="text-white text-3xl font-bold">G3</span>
          </div>
        </div>

        {/* Bottom row - middle */}
        <div className="relative col-span-1 md:col-span-1 rounded-tl-[30px] rounded-bl-[30px] overflow-hidden aspect-square md:h-[195px]">
          <Image src="/placeholder.svg?height=400&width=400" alt="Plant stems" fill className="object-cover" />
        </div>

        {/* Bottom row - right side */}
        <div className="relative col-span-1 md:col-span-1 rounded-tr-[30px] rounded-br-[30px] overflow-hidden aspect-square md:h-[195px]">
          <Image
            src="/placeholder.svg?height=400&width=400"
            alt="Person with white bag"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}

