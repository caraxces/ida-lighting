"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

export default function FloatingContactButton() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

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

  // Scientific geometric background animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const buttonEl = canvas.parentElement
      if (buttonEl) {
        canvas.width = buttonEl.clientWidth
        canvas.height = buttonEl.clientHeight
      }
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Lines configuration
    const lines: {
      x1: number
      y1: number
      x2: number
      y2: number
      angle: number
      speed: number
      progress: number
      maxProgress: number
      width: number
      opacity: number
      color: string
    }[] = []

    // Create initial lines
    const createLines = () => {
      lines.length = 0
      const lineCount = 15

      for (let i = 0; i < lineCount; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.2 + Math.random() * 0.8
        const progress = Math.random()
        const maxProgress = 0.7 + Math.random() * 0.5
        const width = 0.5 + Math.random() * 1.5
        const opacity = 0.5 + Math.random() * 0.5
        // Randomly choose between white and red for the lines
        const color = Math.random() > 0.3 ? "255, 255, 255" : "255, 50, 50"

        lines.push({
          x1: canvas.width / 2,
          y1: canvas.height / 2,
          x2: canvas.width / 2,
          y2: canvas.height / 2,
          angle,
          speed,
          progress,
          maxProgress,
          width,
          opacity,
          color,
        })
      }
    }

    createLines()

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw lines
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]

        // Update line progress
        line.progress += 0.005 * line.speed
        if (line.progress >= line.maxProgress) {
          // Reset line with new properties
          line.angle = Math.random() * Math.PI * 2
          line.speed = 0.2 + Math.random() * 0.8
          line.progress = 0
          line.maxProgress = 0.7 + Math.random() * 0.5
          line.width = 0.5 + Math.random() * 1.5
          line.opacity = 0.5 + Math.random() * 0.5
          line.x1 = Math.random() * canvas.width
          line.y1 = Math.random() * canvas.height
          // Randomly change color when line resets
          line.color = Math.random() > 0.3 ? "255, 255, 255" : "255, 50, 50"
        }

        // Calculate end point based on angle and progress
        const length = Math.max(canvas.width, canvas.height) * line.progress
        line.x2 = line.x1 + Math.cos(line.angle) * length
        line.y2 = line.y1 + Math.sin(line.angle) * length

        // Draw line with "writing" effect - make the line fade out toward the end
        const gradient = ctx.createLinearGradient(line.x1, line.y1, line.x2, line.y2)
        gradient.addColorStop(0, `rgba(${line.color}, ${line.opacity})`)
        gradient.addColorStop(0.8, `rgba(${line.color}, ${line.opacity * 0.8})`)
        gradient.addColorStop(1, `rgba(${line.color}, 0)`)

        ctx.beginPath()
        ctx.moveTo(line.x1, line.y1)
        ctx.lineTo(line.x2, line.y2)
        ctx.lineWidth = line.width
        ctx.strokeStyle = gradient
        ctx.stroke()

        // Draw small circle at start point
        ctx.beginPath()
        ctx.arc(line.x1, line.y1, 1.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${line.color}, ${line.opacity * 1.2})`
        ctx.fill()

        // Draw small circle at intersection points
        for (let j = i + 1; j < lines.length; j++) {
          const line2 = lines[j]

          // Simple line intersection check
          const intersection = getIntersection(
            line.x1,
            line.y1,
            line.x2,
            line.y2,
            line2.x1,
            line2.y1,
            line2.x2,
            line2.y2,
          )

          if (intersection) {
            // Use a mix of the two line colors for intersection points
            const mixedColor = line.color === line2.color ? line.color : "255, 150, 150"

            ctx.beginPath()
            ctx.arc(intersection.x, intersection.y, 2, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${mixedColor}, ${Math.min(line.opacity + line2.opacity, 1)})`
            ctx.fill()
            
            // Add a subtle glow effect for intersections
            ctx.beginPath()
            ctx.arc(intersection.x, intersection.y, 3, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${mixedColor}, ${Math.min(line.opacity + line2.opacity, 1) * 0.3})`
            ctx.fill()
          }
        }
      }

      // Add new line occasionally
      if (Math.random() < 0.03 && lines.length < 25) {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.2 + Math.random() * 0.8
        const width = 0.5 + Math.random() * 1.5
        const opacity = 0.5 + Math.random() * 0.5
        const color = Math.random() > 0.3 ? "255, 255, 255" : "255, 50, 50"

        lines.push({
          x1: Math.random() * canvas.width,
          y1: Math.random() * canvas.height,
          x2: Math.random() * canvas.width,
          y2: Math.random() * canvas.height,
          angle,
          speed,
          progress: 0,
          maxProgress: 0.7 + Math.random() * 0.5,
          width,
          opacity,
          color,
        })
      }

      // Remove excess lines
      if (lines.length > 30) {
        lines.shift()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Helper function to detect line intersection
    function getIntersection(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      x3: number,
      y3: number,
      x4: number,
      y4: number,
    ) {
      const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1)
      if (denom === 0) return null

      const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom
      const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom

      if (ua < 0 || ua > 1 || ub < 0 || ub > 1) return null

      const x = x1 + ua * (x2 - x1)
      const y = y1 + ua * (y2 - y1)

      return { x, y }
    }

    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className="relative"
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onTouchStart={() => isMobile && setIsHovered(true)}
        onTouchEnd={() => isMobile && setIsHovered(false)}
      >
        {/* Layer 1: Base button with transparent background (lowest layer) */}
        <div className="relative rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-full" />
        </div>

        {/* Layer 2: Scientific geometric background */}
        <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none z-30">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>

        {/* Layer 3: Glow border effect */}
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-300 z-20 ${
            isHovered ? "opacity-100" : "opacity-40"
          }`}
          style={{
            background: "transparent",
            boxShadow: "0 0 15px rgba(0, 200, 255, 0.7), 0 0 30px rgba(0, 150, 255, 0.4)",
            filter: `blur(${isHovered ? 3 : 2}px)`,
          }}
        />

        {/* Layer 4: Button content (highest layer) */}
        <button
          onClick={() => router.push("/contacts")}
          className="relative z-40 px-8 py-3 bg-transparent text-white font-bold rounded-full w-full transition-all duration-300 border border-cyan-500/70"
          style={{
            transform: isHovered ? "scale(1.03)" : "scale(1)",
            textShadow: "0 0 5px rgba(0, 200, 255, 0.7)",
          }}
        >
          Thiết kế cùng chúng tôi!
        </button>
      </div>
    </div>
  )
}
