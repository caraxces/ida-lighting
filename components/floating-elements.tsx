"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function FloatingElements() {
  const [elements, setElements] = useState<
    { id: number; x: number; y: number; size: number; delay: number; duration: number }[]
  >([])

  useEffect(() => {
    // Create random floating elements
    const newElements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 10,
      delay: Math.random() * 2,
      duration: Math.random() * 10 + 15,
    }))
    setElements(newElements)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-white/5 backdrop-blur-sm"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: element.size,
            height: element.size,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

