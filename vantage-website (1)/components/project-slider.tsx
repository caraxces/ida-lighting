"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useSound } from "@/hooks/use-sound"
import { useMobile } from "@/hooks/use-mobile"

// Types
type Project = {
  id: number
  title: string
  description: string
  image: string
  category: string
  year: string
  details?: string[]
}

// Sample data
const projects: Project[] = [
  {
    id: 1,
    title: "Luxury Villa",
    description:
      "A comprehensive lighting solution for a luxury villa in District 2, featuring smart controls and energy-efficient fixtures.",
    image: "/home-page/luxury-villa-lighting.jpeg",
    category: "Residential",
    year: "2023",
    details: ["Smart Home Integration", "Energy Monitoring", "Scene Presets", "Voice Control"],
  },
  {
    id: 2,
    title: "Office Tower",
    description:
      "Complete lighting design and implementation for a 20-story office tower, balancing aesthetics with functionality and energy efficiency.",
    image: "/home-page/office-tower-lighting.jpeg",
    category: "Commercial",
    year: "2022",
    details: ["Occupancy Sensing", "Daylight Harvesting", "Energy Analytics", "Centralized Control"],
  },
  {
    id: 3,
    title: "Manufacturing Plant",
    description:
      "High-performance industrial lighting solution for a manufacturing facility, ensuring optimal visibility, safety, and energy savings.",
    image: "/home-page/manufacturing-plant-lighting.jpeg",
    category: "Industrial",
    year: "2023",
    details: ["High-Bay Solutions", "Emergency Lighting", "Hazardous Area Lighting", "Automated Maintenance"],
  },
  {
    id: 4,
    title: "Smart Home",
    description:
      "Comprehensive smart lighting system for a modern residence, featuring voice control, scheduling, and seamless integration with home automation.",
    image: "/home-page/smart-home-app.jpeg",
    category: "Smart Lighting",
    year: "2023",
    details: ["IoT Integration", "Mobile App Control", "Adaptive Lighting", "Predictive Analytics"],
  },
  {
    id: 5,
    title: "Retail Store",
    description:
      "Custom lighting design for a high-end retail store, enhancing product displays and creating an inviting shopping environment.",
    image: "/home-page/retail-store-lighting.jpeg",
    category: "Commercial",
    year: "2022",
    details: ["Product Highlighting", "Ambiance Control", "Energy Efficiency", "Customer Experience"],
  },
]

// Custom keyframes for animations
const keyframes = `
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes floatButton {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes pulseGlow {
    0%, 100% {
      box-shadow: 0 0 15px rgba(255, 100, 50, 0.5);
    }
    50% {
      box-shadow: 0 0 30px rgba(255, 100, 50, 0.8);
    }
  }
`

export default function ProjectSliderEnhanced() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [viewedProjects, setViewedProjects] = useState<Set<number>>(new Set([0]))
  const sliderRef = useRef<HTMLDivElement>(null)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])
  const { playSound, isSoundEnabled } = useSound()
  const isMobile = useMobile()

  // Current project
  const currentProject = projects[activeIndex]

  // Determine if content should be on left or right based on index
  // Even indices (0, 2, 4) will have content on left, odd indices (1, 3) will have content on right
  const isContentOnLeft = activeIndex % 2 === 0

  // Check if all projects have been viewed
  const hasViewedAllProjects = viewedProjects.size === projects.length

  // Add styles and keyframes
  useEffect(() => {
    // Add Google Font
    const link = document.createElement("link")
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@300;400;600&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    // Add keyframes
    const style = document.createElement("style")
    style.innerHTML = keyframes
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(link)
      document.head.removeChild(style)
    }
  }, [])

  // Handle scroll events to navigate through projects
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return

      // Check if we're in the viewport
      if (!sliderRef.current) return
      const rect = sliderRef.current.getBoundingClientRect()
      if (rect.top > window.innerHeight || rect.bottom < 0) return

      e.preventDefault()

      setIsScrolling(true)

      if (e.deltaY > 0 && activeIndex < projects.length - 1) {
        // Scroll down - go to next project
        setActiveIndex((prev) => prev + 1)
        setViewedProjects((prev) => new Set([...prev, activeIndex + 1]))
        if (isSoundEnabled) playSound()
      } else if (e.deltaY < 0 && activeIndex > 0) {
        // Scroll up - go to previous project
        setActiveIndex((prev) => prev - 1)
        if (isSoundEnabled) playSound()
      }

      // Debounce scrolling
      setTimeout(() => {
        setIsScrolling(false)
      }, 1000)
    }

    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [activeIndex, isScrolling, isSoundEnabled, playSound])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return

      if (e.key === "ArrowDown" && activeIndex < projects.length - 1) {
        setIsScrolling(true)
        setActiveIndex((prev) => prev + 1)
        setViewedProjects((prev) => new Set([...prev, activeIndex + 1]))
        if (isSoundEnabled) playSound()
        setTimeout(() => setIsScrolling(false), 1000)
      } else if (e.key === "ArrowUp" && activeIndex > 0) {
        setIsScrolling(true)
        setActiveIndex((prev) => prev - 1)
        if (isSoundEnabled) playSound()
        setTimeout(() => setIsScrolling(false), 1000)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeIndex, isScrolling, isSoundEnabled, playSound])

  return (
    <div ref={sliderRef} className="relative w-full h-screen overflow-hidden">
      {/* Background color overlay with gradient */}
      <div
        className="absolute inset-0 z-0 transition-all duration-1000"
        style={{
          background: `linear-gradient(135deg, 
            ${activeIndex === 0 ? "#8B0000" : activeIndex === 1 ? "#A52A2A" : activeIndex === 2 ? "#B22222" : activeIndex === 3 ? "#CD5C5C" : "#E25822"} 0%, 
            ${activeIndex === 0 ? "#FF4500" : activeIndex === 1 ? "#FF6347" : activeIndex === 2 ? "#FF7F50" : activeIndex === 3 ? "#FFA07A" : "#FFD700"} 100%)`,
          backgroundSize: "200% 200%",
          animation: "gradientShift 15s ease infinite",
        }}
      />

      {/* Project slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`project-${activeIndex}`}
          className="absolute inset-0 z-10 flex flex-col md:flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Content Section - Will be on left or right based on index */}
          <motion.div
            className={`w-full md:w-1/2 h-full flex flex-col justify-center p-8 md:p-16 relative order-2 ${
              isContentOnLeft ? "md:order-1" : "md:order-2"
            }`}
            initial={{
              x: isContentOnLeft ? -100 : 100,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: isContentOnLeft ? -100 : 100,
              opacity: 0,
            }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute top-8 left-8 text-white/50 text-sm tracking-widest">
              {currentProject.category.toUpperCase()} / {currentProject.year}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-8 absolute top-1/2 transform -translate-y-1/2"
            >
              <h1
                className={`text-7xl md:text-9xl font-bold text-white mb-6 font-['Playfair_Display'] relative z-20 ${
                  isContentOnLeft ? "md:ml-0 md:-mr-32" : "md:-ml-32 md:mr-0"
                }`}
                style={{
                  textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                }}
              >
                {currentProject.title}
              </h1>

              <p className="text-white/80 text-lg md:text-xl max-w-lg font-['Montserrat'] font-light leading-relaxed">
                {currentProject.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-auto"
            >
              <div className="text-white/50 text-sm tracking-widest mb-4">FEATURES</div>
              <div className="grid grid-cols-2 gap-4">
                {currentProject.details?.map((detail, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-1 h-1 bg-white rounded-full mr-2"></div>
                    <span className="text-white/80 text-sm md:text-base">{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="absolute bottom-8 left-8 flex space-x-2">
              {projects.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    index === activeIndex ? "bg-white w-12" : "bg-white/30 w-6",
                  )}
                />
              ))}
            </div>
          </motion.div>

          {/* Image Section - Will be on right or left based on index */}
          <motion.div
            className={`w-full md:w-1/2 h-full relative overflow-hidden order-1 ${
              isContentOnLeft ? "md:order-2" : "md:order-1"
            }`}
            initial={{
              x: isContentOnLeft ? 100 : -100,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: isContentOnLeft ? 100 : -100,
              opacity: 0,
            }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              className="w-full h-full"
            >
              <img
                src={currentProject.image || "/placeholder.svg"}
                alt={currentProject.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Overlay gradient - direction changes based on content position */}
            <div
              className="absolute inset-0"
              style={{
                background: isContentOnLeft
                  ? "linear-gradient(to left, rgba(139, 0, 0, 0.3), transparent)"
                  : "linear-gradient(to right, rgba(139, 0, 0, 0.3), transparent)",
              }}
            />

            {/* CTA Button with parallax effect */}
            <motion.div
              className={`absolute bottom-16 ${isContentOnLeft ? "left-16" : "right-16"} z-20`}
              whileHover={{ scale: 1.05 }}
              style={{
                animation: "floatButton 3s ease-in-out infinite, pulseGlow 2s ease-in-out infinite",
              }}
            >
              <Link
                href={`/work/${currentProject.category.toLowerCase()}`}
                className="flex items-center justify-center w-32 h-32 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300"
              >
                <span className="text-white font-medium">LEARN MORE</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: activeIndex < projects.length - 1 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center"
      >
        <span className="text-white/50 text-xs mb-2">Scroll to explore</span>
        <div className="w-0.5 h-6 bg-white/30 animate-pulse"></div>
      </motion.div>
    </div>
  )
}

