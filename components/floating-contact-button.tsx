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
    <div className={`fixed bottom-8 right-8 z-50`}>
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
          className={`relative z-10 flex items-center justify-center w-14 h-14 bg-black bg-opacity-90 text-white font-bold rounded-full transition-all duration-300`}
          style={{
            boxShadow: isHovered 
              ? `0 0 30px rgba(255, 120, 0, ${0.5 + glowIntensity * 0.5}), 0 0 60px rgba(255, 120, 0, ${0.3 + glowIntensity * 0.3})` 
              : `0 0 20px rgba(255, 120, 0, ${0.3 + glowIntensity * 0.4}), 0 0 40px rgba(255, 120, 0, ${0.2 + glowIntensity * 0.2})`,
            transform: isHovered ? "scale(1.05)" : "scale(1.02)",
          }}
          aria-label="Liên hệ với chúng tôi"
        >
          {/* Message Icon SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}
