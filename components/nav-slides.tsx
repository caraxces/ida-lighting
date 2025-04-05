"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

// Define the slide data
const slides = [
  {
    id: "01",
    title: "Residential",
    description: "Transform your home with elegant lighting solutions designed for comfort and aesthetics.",
    image: "/work/residential/residential.jpeg",
    link: "/work/residential",
    color: "#2A6D50", // Dark green
  },
  {
    id: "02",
    title: "Commercial",
    description: "Enhance productivity and create inviting spaces with our commercial lighting solutions.",
    image: "/work/commercial/commercial.png",
    link: "/work/commercial",
    color: "#A67C52", // Sand/brown
  },
  {
    id: "03",
    title: "Industry",
    description: "Maximize safety and efficiency with our industrial lighting systems for factories and warehouses.",
    image: "/work/industry/industrial.png",
    link: "/work/industry",
    color: "#2C4770", // Dark blue
  },
  {
    id: "04",
    title: "Smart Home",
    description: "Experience the future of lighting with intelligent systems and seamless automation.",
    image: "/work/smart-home/smart-home-app.jpeg",
    link: "/work/smart-home",
    color: "#1A3A4A", // Deep teal
  },
]

export default function NavigationSlides() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Check on initial load
    checkMobile()
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle navigation to previous slide
  const handlePrevious = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  // Handle navigation to next slide
  const handleNext = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  // Slide variants for animation
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    }),
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevious()
      } else if (e.key === "ArrowRight") {
        handleNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div 
      className={`relative w-full overflow-hidden bg-black ${isMobile ? 'aspect-square h-auto' : 'h-screen'}`} 
      ref={containerRef}
    >
      {/* Background color transition */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`bg-${activeIndex}`}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{ backgroundColor: slides[activeIndex].color }}
        />
      </AnimatePresence>

      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={`slide-${activeIndex}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 z-10"
        >
          <div className="relative w-full h-full flex items-center">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={slides[activeIndex].image || "/placeholder.svg"}
                alt={slides[activeIndex].title}
                fill
                className={`${isMobile ? 'object-contain' : 'object-cover'}`}
                priority
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between p-4 sm:p-6 md:p-16">
              <div className="flex justify-between items-start">
                {/* Title */}
                <div className="max-w-md">
                  <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold text-white mb-2 md:mb-4">{slides[activeIndex].title}</h2>
                  <p className="text-white/80 text-xs sm:text-sm md:text-base max-w-xs line-clamp-3 md:line-clamp-none">{slides[activeIndex].description}</p>

                  {/* CTA Button */}
                  <Link
                    href={slides[activeIndex].link}
                    className="inline-flex items-center mt-4 md:mt-8 px-4 py-2 md:px-6 md:py-3 bg-white/20 backdrop-blur-sm text-white rounded-full group hover:bg-white/30 transition-all duration-300 text-sm md:text-base"
                  >
                    <span>Discover</span>
                    <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Slide number - Hidden on small mobile */}
                <span className="text-5xl sm:text-6xl md:text-9xl font-bold text-white/20 hidden xs:block">{slides[activeIndex].id}</span>
              </div>

              {/* Bottom navigation */}
              <div className="flex justify-between items-center">
                <div className="text-[10px] sm:text-xs text-white/60 hidden sm:block">Use arrows to navigate</div>

                {/* Slide indicators */}
                <div className="flex space-x-1 sm:space-x-2 mx-auto sm:mx-0">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      className={`w-6 sm:w-8 md:w-10 h-1 rounded-full transition-all duration-300 ${
                        idx === activeIndex ? "bg-white" : "bg-white/30"
                      }`}
                      onClick={() => {
                        setDirection(idx > activeIndex ? 1 : -1)
                        setActiveIndex(idx)
                      }}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows - Smaller on mobile */}
      <div className="absolute inset-y-0 left-0 z-20 flex items-center">
        <button
          onClick={handlePrevious}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 m-2 sm:m-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 z-20 flex items-center">
        <button
          onClick={handleNext}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 m-2 sm:m-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>
      </div>
    </div>
  )
}

