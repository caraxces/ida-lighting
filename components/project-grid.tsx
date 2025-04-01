"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

type ProjectItem = {
  id: number
  title: string
  image: string
}

type ProjectGridProps = {
  items: ProjectItem[]
}

export default function ProjectGrid({ items }: ProjectGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(gridRef, { once: false, amount: 0.1 })

  // Split items into rows of 2
  const rows = []
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2))
  }

  return (
    <section className="py-24 px-4 md:px-8 bg-black">
      <div className="container mx-auto">
        <h2 className="inline-block px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white mb-12">
          Project Gallery
        </h2>

        <div ref={gridRef} className="space-y-[10px]">
          {rows.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="flex flex-col md:flex-row gap-[10px]">
              {row.map((item, itemIndex) => (
                <Card3D key={item.id} item={item} index={rowIndex * 2 + itemIndex} isInView={isInView} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Card3D({ item, index, isInView }: { item: ProjectItem; index: number; isInView: boolean }) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate rotation based on mouse position
    // Max rotation of 10 degrees
    const rotateY = (x / rect.width - 0.5) * 20
    const rotateX = (y / rect.height - 0.5) * -10

    setRotateX(rotateX)
    setRotateY(rotateY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className="w-full md:w-[calc(50%-5px)]"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.2 * index, // Sequential animation
        ease: "easeOut",
      }}
    >
      <div
        className="group relative overflow-hidden rounded-xl aspect-video perspective-[1000px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="w-full h-full"
          style={{
            transform: `translate3d(0px, 0px, 0px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 rounded-xl">
            <h3 className="text-xl font-medium">{item.title}</h3>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

