"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ChevronRight, ChevronLeft } from "lucide-react"
import AnimatedTitle from "./animated-title"
import { useSound } from "@/hooks/use-sound"
import FloatingElements from "./floating-elements"
import { cn } from "@/lib/utils"

// Image array
const images = [
  "/slides/6899-10+5.png",
  "/slides/6551-6.png",
  "/slides/6897-1.png",
  "/slides/6899-2+1.png",
  "/slides/6898-8.png",
]

export default function FirstElementHpage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const { playSound } = useSound()
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)

  // Scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6])

  // Track cursor for spotlight effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setCursorPosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  // Auto slide with pause on hover/touch
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isPaused])

  // Handle slide change
  const handleSlideChange = (direction: "prev" | "next") => {
    playSound()
    if (direction === "prev") {
      setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
    } else {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handleSlideChange("prev")
      } else if (e.key === "ArrowRight") {
        handleSlideChange("next")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Set loaded state after initial render
  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Slide variants for animation
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  // Track slide direction
  const [[page, direction], setPage] = useState([0, 0])

  const paginate = (newDirection: number) => {
    const newPage = page + newDirection
    const wrappedPage = ((newPage % images.length) + images.length) % images.length
    setPage([wrappedPage, newDirection])
    setCurrentSlide(wrappedPage)
  }

  // Prevent horizontal swiping on mobile
  useEffect(() => {
    const preventHorizontalSwipe = (e: TouchEvent) => {
      // Only prevent horizontal swipes, allow vertical scrolling
      if (!touchStartX.current) return

      const touchEndX = e.touches[0].clientX
      const diffX = touchStartX.current - touchEndX

      // If horizontal movement is greater than vertical, prevent default
      if (Math.abs(diffX) > 10) {
        e.preventDefault()
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = () => {
      touchStartX.current = null
    }

    // Add event listeners to the document to catch all touch events
    document.addEventListener("touchstart", handleTouchStart, { passive: true })
    document.addEventListener("touchmove", preventHorizontalSwipe, { passive: false })
    document.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", preventHorizontalSwipe)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={cn(
        "relative w-full min-h-screen overflow-hidden bg-[#FFDAB9] touch-none",
        hasLoaded ? "transition-all duration-1000" : "",
      )}
      onMouseEnter={() => {
        setIsPaused(true)
        setIsHovering(true)
      }}
      onMouseLeave={() => {
        setIsPaused(false)
        setIsHovering(false)
      }}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Loading animation */}
      <AnimatePresence>
        {!hasLoaded && (
          <motion.div
            className="absolute inset-0 z-50 bg-[#8B2323] flex items-center justify-center"
            exit={{
              opacity: 0,
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              }}
              exit={{
                opacity: 0,
                scale: 1.2,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              }}
              className="text-white text-4xl font-bold"
            >
              IDA Lighting
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spotlight effect */}
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none z-5 opacity-30 hidden md:block"
          style={{
            background: `radial-gradient(circle at ${cursorPosition.x}% ${cursorPosition.y}%, rgba(255,255,255,0.8) 0%, transparent 20%)`,
          }}
        />
      )}

      {/* Floating elements */}
      <FloatingElements />

      {/* Grid lines overlay with parallax */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 grid grid-cols-12 z-10 pointer-events-none">
        {Array(13)
          .fill(0)
          .map((_, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{
                duration: 1.5,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-full w-px bg-white/10"
              style={{ marginLeft: `${(i * 100) / 12}%` }}
            />
          ))}
      </motion.div>

      {/* Background gradient with parallax and fade-in */}
      <motion.div
        style={{ y: backgroundY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
        }}
        className="absolute left-0 md:top-[5%] top-0 md:h-[95%] h-full w-full md:w-[65%] bg-gradient-to-r from-[#8B2323] via-[#A52A2A] to-[#CD5C5C] md:rounded-tr-[250px] z-0"
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 opacity-70" />

        {/* Animated border */}
        <motion.div
          className="absolute top-0 right-0 w-1 h-full bg-white/20 hidden md:block"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "100%", opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
        />
      </motion.div>

      {/* Content container */}
      <div className="relative z-10 grid md:grid-cols-12 grid-cols-1 min-h-screen">
        {/* Left section with text - stacks on mobile */}
        <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-center md:pl-16 px-6 pt-24 md:pt-0 pb-16 md:pb-0">
          {/* Small header text with reveal animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center text-white/70 md:text-[#8B2323]/70 text-xs mb-4 md:mb-8 tracking-wider"
          >
            <span>2019</span>
            <span className="mx-2">—</span>
            <span>Duong Nguyen</span>
          </motion.div>

          {/* Main title with 3D effect */}
          <div className="mb-4">
            <AnimatedTitle>
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl block text-white">This is</span>
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold italic text-white">IDA</span>
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white"> Lighting.</span>
            </AnimatedTitle>
          </div>

          {/* Description text with reveal animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-4 md:mt-8 mb-6 md:mb-10 max-w-md"
          >
            <h3 className="text-white font-medium mb-2">Your light - Your style.</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              The IDA collection is part of IDA's commitment to working with companies to lower their impact on the
              environment with uniquely but responsibly new products.
            </p>
          </motion.div>

          {/* CTA Button with 3D effect and hover animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              variant="ghost"
              className="w-fit text-white hover:bg-white/10 hover:text-white group transition-all duration-300 shadow-[0_4px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.2)] transform hover:-translate-y-1 px-0 relative overflow-hidden"
            >
              <span className="border-b border-white/40 pb-1 flex items-center relative z-10">
                See collection
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <motion.div
                className="absolute inset-0 bg-white/10 -z-0"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
        </div>

        {/* Center/Right section with image */}
        <div className="md:col-span-7 lg:col-span-8 relative flex items-center justify-center md:justify-start">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative z-10 md:ml-[100px] lg:ml-[100px] w-full max-w-[80vw] md:max-w-[50vw] lg:max-w-[45vw] xl:max-w-[40vw] flex justify-center"
              drag={false}
            >
              {/* 3D transform effect on hover */}
              <motion.div
                whileHover={{
                  rotateY: 5,
                  rotateX: -5,
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                className="w-full h-full perspective-1000"
                drag={false}
              >
                <Image
                  src={images[page] || "/placeholder.svg"}
                  alt={`IDA Lighting - Slide ${page + 1}`}
                  width={600}
                  height={600}
                  priority={page === 0}
                  className="drop-shadow-[0_20px_20px_rgba(0,0,0,0.25)] object-contain h-auto transform transition-transform duration-300"
                  sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 40vw"
                  onLoad={(e) => {
                    // Add a subtle animation when image loads
                    const img = e.currentTarget
                    img.classList.add("animate-fadeIn")
                  }}
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation buttons with hover effects */}
      <div className="absolute md:right-8 right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-20">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform transition-all hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#CD5C5C]"
          onClick={() => {
            paginate(-1)
            playSound()
          }}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-[#CD5C5C]" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform transition-all hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#CD5C5C]"
          onClick={() => {
            paginate(1)
            playSound()
          }}
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-[#CD5C5C]" />
        </motion.button>
      </div>

      {/* Slide indicators with animations */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            className={`h-2 rounded-full transition-all ${page === index ? "w-6 md:w-8 bg-white" : "w-2 bg-white/50"}`}
            onClick={() => {
              playSound()
              setPage([index, page < index ? 1 : -1])
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={page === index ? "true" : "false"}
          />
        ))}
      </div>

      {/* Right side text with parallax */}
      <motion.div
        style={{ y: backgroundY }}
        className="hidden md:block absolute right-16 top-1/2 transform -translate-y-1/2 text-[#CD5C5C]/20 text-6xl lg:text-8xl font-bold leading-none z-10"
      >
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="rotate-90 origin-center whitespace-nowrap"
        >
          Scan
          <br />
          Wow
        </motion.div>
      </motion.div>

      {/* Page indicator with animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-6 md:top-16 right-6 md:right-16 text-[#8B2323]/70 text-xs"
      >
        {String(page + 1).padStart(2, "0")} of {String(images.length).padStart(2, "0")}
      </motion.div>
    </motion.div>
  )
}

