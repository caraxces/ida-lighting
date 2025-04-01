"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LightPreloaderProps {
  color?: string
  duration?: number
  size?: number
  text?: string
  onComplete?: () => void
  variant?: "pulse" | "rays" | "spotlight" | "particles"
  flashDuration?: number
  flashColor?: string
}

export default function LightPreloader({
  color = "#ffffff",
  duration = 3,
  size = 100,
  text = "Loading",
  onComplete,
  variant = "rays",
  flashDuration = 1,
  flashColor,
}: LightPreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isFlashing, setIsFlashing] = useState(false)

  // Use the provided flashColor or default to the same color as the preloader
  const actualFlashColor = flashColor || color

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1
        if (newProgress >= 100) {
          clearInterval(interval)
          // When loading reaches 100%, trigger the flash effect
          setIsFlashing(true)
          return 100
        }
        return newProgress
      })
    }, duration * 10)

    return () => clearInterval(interval)
  }, [duration])

  // Handle the flash effect completion
  useEffect(() => {
    if (isFlashing) {
      const flashTimer = setTimeout(() => {
        setIsLoading(false)
        if (onComplete) {
          onComplete()
        }
      }, flashDuration * 1000)

      return () => clearTimeout(flashTimer)
    }
  }, [isFlashing, flashDuration, onComplete])

  const renderPreloader = () => {
    switch (variant) {
      case "pulse":
        return <PulsePreloader color={color} size={size} progress={progress} />
      case "spotlight":
        return <SpotlightPreloader color={color} size={size} progress={progress} />
      case "particles":
        return <ParticlesPreloader color={color} size={size} progress={progress} />
      case "rays":
      default:
        return <RaysPreloader color={color} size={size} progress={progress} />
    }
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Flash effect overlay */}
          <AnimatePresence>
            {isFlashing && (
              <motion.div
                className="absolute inset-0 z-10"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0.8, 0],
                }}
                transition={{
                  duration: flashDuration,
                  times: [0, 0.2, 0.3, 1],
                  ease: "easeInOut",
                }}
                style={{
                  background: actualFlashColor,
                  boxShadow: `0 0 100px ${actualFlashColor}, 0 0 200px ${actualFlashColor}`,
                }}
              />
            )}
          </AnimatePresence>

          {/* Preloader content */}
          <motion.div
            animate={{
              opacity: isFlashing ? 0 : 1,
              scale: isFlashing ? 1.5 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            {renderPreloader()}
          </motion.div>

          <motion.div
            className="mt-8 text-white font-light tracking-widest"
            animate={{
              opacity: isFlashing ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="text-xl mb-2">{text}</div>
              <div className="text-sm">{progress}%</div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Rays preloader - light beams radiating outward
function RaysPreloader({ color, size, progress }: { color: string; size: number; progress: number }) {
  return (
    <div className="relative" style={{ width: size * 2, height: size * 2 }}>
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 70%)`,
          opacity: 0.7,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 origin-left"
          style={{
            width: size * 1.5,
            height: 2,
            background: `linear-gradient(90deg, ${color} 0%, rgba(0,0,0,0) 100%)`,
            rotate: `${i * 30}deg`,
            transformOrigin: "left center",
            opacity: 0.6,
            filter: "blur(1px)",
          }}
          animate={{
            opacity: [0.6, 0.8, 0.6],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: size * 0.3,
          height: size * 0.3,
          background: color,
          boxShadow: `0 0 ${size * 0.2}px ${color}`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          boxShadow: [`0 0 ${size * 0.2}px ${color}`, `0 0 ${size * 0.3}px ${color}`, `0 0 ${size * 0.2}px ${color}`],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <svg width={size * 2} height={size * 2} viewBox={`0 0 ${size * 2} ${size * 2}`} className="absolute top-0 left-0">
        <circle
          cx={size}
          cy={size}
          r={size * 0.8}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray={2 * Math.PI * size * 0.8}
          strokeDashoffset={(1 - progress / 100) * 2 * Math.PI * size * 0.8}
          transform={`rotate(-90 ${size} ${size})`}
          style={{ transition: "stroke-dashoffset 0.3s ease" }}
        />
      </svg>
    </div>
  )
}

// Pulse preloader - pulsating light orb
function PulsePreloader({ color, size, progress }: { color: string; size: number; progress: number }) {
  return (
    <div className="relative" style={{ width: size * 2, height: size * 2 }}>
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: size,
            height: size,
            border: `2px solid ${color}`,
            opacity: 0.5 - i * 0.15,
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5 - i * 0.15, 0, 0.5 - i * 0.15],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: size * 0.4,
          height: size * 0.4,
          background: color,
          boxShadow: `0 0 ${size * 0.3}px ${color}`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          boxShadow: [`0 0 ${size * 0.3}px ${color}`, `0 0 ${size * 0.5}px ${color}`, `0 0 ${size * 0.3}px ${color}`],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <svg width={size * 2} height={size * 2} viewBox={`0 0 ${size * 2} ${size * 2}`} className="absolute top-0 left-0">
        <circle
          cx={size}
          cy={size}
          r={size * 0.8}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray={2 * Math.PI * size * 0.8}
          strokeDashoffset={(1 - progress / 100) * 2 * Math.PI * size * 0.8}
          transform={`rotate(-90 ${size} ${size})`}
          style={{ transition: "stroke-dashoffset 0.3s ease" }}
        />
      </svg>
    </div>
  )
}

// Spotlight preloader - moving spotlight effect
function SpotlightPreloader({ color, size, progress }: { color: string; size: number; progress: number }) {
  return (
    <div className="relative" style={{ width: size * 2, height: size * 2 }}>
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 0.8,
          height: size * 0.8,
          background: `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 70%)`,
          filter: `blur(${size * 0.05}px)`,
          opacity: 0.8,
        }}
        animate={{
          x: [0, size, size, 0, 0],
          y: [0, 0, size, size, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: size * 0.3,
          height: size * 0.3,
          background: color,
          boxShadow: `0 0 ${size * 0.2}px ${color}`,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <svg width={size * 2} height={size * 2} viewBox={`0 0 ${size * 2} ${size * 2}`} className="absolute top-0 left-0">
        <circle
          cx={size}
          cy={size}
          r={size * 0.8}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray={2 * Math.PI * size * 0.8}
          strokeDashoffset={(1 - progress / 100) * 2 * Math.PI * size * 0.8}
          transform={`rotate(-90 ${size} ${size})`}
          style={{ transition: "stroke-dashoffset 0.3s ease" }}
        />
      </svg>
    </div>
  )
}

// Particles preloader - light particles orbiting
function ParticlesPreloader({ color, size, progress }: { color: string; size: number; progress: number }) {
  return (
    <div className="relative" style={{ width: size * 2, height: size * 2 }}>
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2
        const radius = size * 0.7
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        return (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 rounded-full"
            style={{
              width: size * 0.05,
              height: size * 0.05,
              background: color,
              boxShadow: `0 0 ${size * 0.05}px ${color}`,
              x: x,
              y: y,
            }}
            animate={{
              x: [x, x * 0.8, x],
              y: [y, y * 0.8, y],
              opacity: [0.8, 1, 0.8],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        )
      })}

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: size * 0.3,
          height: size * 0.3,
          background: color,
          boxShadow: `0 0 ${size * 0.2}px ${color}`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          boxShadow: [`0 0 ${size * 0.2}px ${color}`, `0 0 ${size * 0.3}px ${color}`, `0 0 ${size * 0.2}px ${color}`],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <svg width={size * 2} height={size * 2} viewBox={`0 0 ${size * 2} ${size * 2}`} className="absolute top-0 left-0">
        <circle
          cx={size}
          cy={size}
          r={size * 0.8}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray={2 * Math.PI * size * 0.8}
          strokeDashoffset={(1 - progress / 100) * 2 * Math.PI * size * 0.8}
          transform={`rotate(-90 ${size} ${size})`}
          style={{ transition: "stroke-dashoffset 0.3s ease" }}
        />
      </svg>
    </div>
  )
}

