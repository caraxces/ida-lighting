"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform, useAnimationControls, HTMLMotionProps } from "framer-motion"
import { ArrowRight, Circle } from "lucide-react"

interface Enhanced3DVideoCardProps {
  className?: string
  title?: string
  description?: string
  videoSrc?: string
  nextProject?: string
}

export default function Enhanced3DVideoCard({
  className = "",
  title = "IDA Lighting",
  description = "IDA Lighting is a lighting design company that specializes in creating unique and innovative lighting solutions for residential and commercial spaces.",
  videoSrc = "/13387624005549159.mp4",
  nextProject = "Next project",
}: Enhanced3DVideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [marqueeWidth, setMarqueeWidth] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(0)
  const marqueeControls = useAnimationControls()

  // Motion values for smooth animations
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Add spring physics for smoother movement
  const springConfig = { damping: 25, stiffness: 300 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig)

  // Parallax effect for content inside card
  const contentX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig)
  const contentY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), springConfig)

  // Measure the width of the marquee text and viewport for animation
  useEffect(() => {
    if (marqueeRef.current) {
      setMarqueeWidth(marqueeRef.current.offsetWidth)
      setViewportWidth(window.innerWidth)

      const handleResize = () => {
        setMarqueeWidth(marqueeRef.current?.offsetWidth || 0)
        setViewportWidth(window.innerWidth)
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Start the marquee animation
  useEffect(() => {
    if (marqueeWidth && viewportWidth) {
      // Calculate the total distance to move (viewport width + marquee width)
      const distance = viewportWidth + marqueeWidth

      // Start the animation
      marqueeControls.start({
        x: [-marqueeWidth, distance],
        transition: {
          duration: 20,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        },
      })
    }
  }, [marqueeWidth, viewportWidth, marqueeControls])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()

    // Get mouse position relative to card (0-1)
    const relativeX = (e.clientX - rect.left) / rect.width
    const relativeY = (e.clientY - rect.top) / rect.height

    // Convert to -0.5 to 0.5 range for rotation
    mouseX.set(relativeX - 0.5)
    mouseY.set(relativeY - 0.5)
  }

  return (
    <div className={`flex flex-col items-center ${className} mt-[70px] p-4 w-full`}>
      {/* 3D Card */}
      <motion.div
        ref={cardRef}
        className="relative w-full max-w-4xl h-[450px] rounded-2xl overflow-hidden shadow-xl bg-black mx-auto"
        style={{
          perspective: 1200,
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
        }}
        whileHover={{ scale: 1.05 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          mouseX.set(0)
          mouseY.set(0)
        }}
      >
        {/* Label */}
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full z-10 text-sm">
          3D/2D Animation
        </div>

        {/* Video with parallax effect */}
        <motion.div
          className="w-full h-full"
          style={{
            x: contentX,
            y: contentY,
            scale: 1.1, // Slightly larger to allow for parallax movement
          }}
        >
          <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        {/* Reflection/Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none"
          style={{
            opacity: useTransform(mouseX, [-0.5, 0, 0.5], [0.1, 0.3, 0.1]),
          }}
        />

        {/* Edge highlight effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: isHovered ? "inset 0 0 0 1px rgba(255,255,255,0.2)" : "inset 0 0 0 1px rgba(255,255,255,0)",
          }}
        />
      </motion.div>

      {/* Text content below the card */}
      <div className="w-full max-w-4xl mt-8 px-4 text-white mx-auto">
        <h3 className="text-2xl font-medium mb-3">{title}</h3>
        <p className="text-sm text-gray-300 mb-4 max-w-lg">{description}</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Circle className="h-4 w-4 mr-2" />
            <a href="#" className="text-sm hover:underline">
              View project
            </a>
          </div>
          <a href="#" className="text-sm hover:underline">
            View all works
          </a>
        </div>
      </div>

      {/* Marquee text that scrolls horizontally */}
      <div className="w-full overflow-hidden mt-16 mb-4 relative">
        <motion.div ref={marqueeRef} className="inline-flex items-center whitespace-nowrap" animate={marqueeControls}>
          <h2 className="text-[100px] font-light text-white flex items-center whitespace-nowrap">
            {nextProject} <ArrowRight className="ml-2 mr-8" />
            {nextProject} <ArrowRight className="ml-2 mr-8" />
            {nextProject} <ArrowRight className="ml-2 mr-8" />
            {nextProject} <ArrowRight className="ml-2 mr-8" />
          </h2>
        </motion.div>
      </div>
    </div>
  )
}

