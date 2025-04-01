"use client"

import { useState, useEffect } from "react"

interface GlowButtonProps {
  text: string
  onClick: () => void
  className?: string
}

export default function GlowButton({ text, onClick, className = "" }: GlowButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [rotation, setRotation] = useState(0)

  // Animate the glow effect
  useEffect(() => {
    let animationFrame: number
    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      // Complete rotation every 3 seconds
      setRotation((elapsed / 3000) % 1)

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect container */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {/* Animated gradient border */}
        <div
          className="absolute inset-[-2px] rounded-full"
          style={{
            background: `conic-gradient(
              from ${rotation * 360}deg,
              #00ffff, 
              #0099ff, 
              #0033ff, 
              #9900ff, 
              #ff00cc, 
              #ff0066, 
              #ff3300, 
              #ffcc00, 
              #33ff00, 
              #00ffcc, 
              #00ffff
            )`,
            filter: `blur(${isHovered ? 5 : 3}px)`,
            opacity: isHovered ? 1 : 0.8,
            transform: "scale(1.02)",
          }}
        />
      </div>

      {/* Button content */}
      <button
        onClick={onClick}
        className="relative z-10 px-8 py-3 bg-black bg-opacity-90 text-white font-medium rounded-full w-full transition-all duration-300"
        style={{
          boxShadow: isHovered ? "0 0 20px rgba(0, 255, 255, 0.5)" : "none",
          transform: isHovered ? "scale(1.03)" : "scale(1)",
        }}
      >
        {text}
      </button>
    </div>
  )
}

