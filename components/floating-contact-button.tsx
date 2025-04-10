"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function FloatingContactButton() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [glowIntensity, setGlowIntensity] = useState(0.5)
  const [rotation, setRotation] = useState(0)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Animate the glow effect and pulsing
  useEffect(() => {
    let animationFrame: number
    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      // Complete rotation every 3 seconds
      setRotation((elapsed / 3000) % 1)
      
      // Pulse effect - oscillate between 0.4 and 1.0 over 2 seconds
      const pulseValue = 0.4 + (Math.sin(elapsed / 1000) + 1) * 0.3
      setGlowIntensity(pulseValue)

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className={`fixed bottom-8 ${isMobile ? 'left-4 right-4 w-auto' : 'left-1/2 transform -translate-x-1/2 w-auto'} z-50`}>
      <div
        className="relative"
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
                #ff9966, 
                #ff7733, 
                #ff5500, 
                #ff6633, 
                #ff8833, 
                #ffaa66, 
                #ff9900, 
                #ffcc66, 
                #ffbb33, 
                #ff8800, 
                #ff9966
              )`,
              filter: `blur(${isHovered ? 8 : 6}px) brightness(${isHovered ? 1.3 : 1.1 * glowIntensity})`,
              opacity: isHovered ? 1 : (0.7 + glowIntensity * 0.3),
              transform: "scale(1.05)",
            }}
          />
        </div>

        {/* Button content */}
        <button
          onClick={() => router.push("/contacts")}
          className={`relative z-10 px-4 sm:px-8 py-3 bg-black bg-opacity-90 text-white font-bold rounded-full w-full whitespace-nowrap transition-all duration-300`}
          style={{
            boxShadow: isHovered 
              ? `0 0 30px rgba(255, 120, 0, ${0.5 + glowIntensity * 0.5}), 0 0 60px rgba(255, 120, 0, ${0.3 + glowIntensity * 0.3})` 
              : `0 0 20px rgba(255, 120, 0, ${0.3 + glowIntensity * 0.4}), 0 0 40px rgba(255, 120, 0, ${0.2 + glowIntensity * 0.2})`,
            transform: isHovered ? "scale(1.05)" : "scale(1.02)",
            textShadow: isHovered 
              ? "0 0 10px rgba(255, 255, 255, 0.5)" 
              : "0 0 5px rgba(255, 255, 255, 0.3)",
          }}
        >
          Liên hệ với chúng tôi
        </button>
      </div>
    </div>
  )
}
