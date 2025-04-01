"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useSound } from "@/hooks/use-sound"
import { ChevronRight } from "lucide-react"

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
    image: "/home-page/signature-it-offices-tel-aviv-1024x732.jpg",
    category: "Commercial",
    year: "2022",
    details: ["Occupancy Sensing", "Daylight Harvesting", "Energy Analytics", "Centralized Control"],
  },
  {
    id: 3,
    title: "Manufacturing Plant",
    description:
      "High-performance industrial lighting solution for a manufacturing facility, ensuring optimal visibility, safety, and energy savings.",
    image: "/home-page/download (6).jpeg",
    category: "Industrial",
    year: "2023",
    details: ["High-Bay Solutions", "Emergency Lighting", "Hazardous Area Lighting", "Automated Maintenance"],
  },
  {
    id: 4,
    title: "Smart Home",
    description:
      "Comprehensive smart lighting system for a modern residence, featuring voice control, scheduling, and seamless integration with home automation.",
    image: "/home-page/original-44eb0b36a75ab4ede89daf4d656efcb8.jpg",
    category: "Smart Lighting",
    year: "2023",
    details: ["IoT Integration", "Mobile App Control", "Adaptive Lighting", "Predictive Analytics"],
  },
  {
    id: 5,
    title: "Retail Store",
    description:
      "Custom lighting design for a high-end retail store, enhancing product displays and creating an inviting shopping environment.",
    image: "/home-page/klee_klee_photographed_by_Dirk_Weiblen_09.jpg",
    category: "Commercial",
    year: "2022",
    details: ["Product Highlighting", "Ambiance Control", "Energy Efficiency", "Customer Experience"],
  },
]

export default function ProjectSliderEnhanced() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [direction, setDirection] = useState(0) // -1: prev, 0: initial, 1: next
  const sliderRef = useRef<HTMLDivElement>(null)
  const { playSound, isSoundEnabled } = useSound()

  // Add responsive state
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Current and next project (with safety check)
  const currentProject = projects[activeIndex] || projects[0]
  const nextProject = projects[(activeIndex + 1) % projects.length] || projects[0]

  // Track direction of slide change
  useEffect(() => {
    if (activeIndex > prevIndex) {
      setDirection(1) // forward
    } else if (activeIndex < prevIndex) {
      setDirection(-1) // backward
    }
    setPrevIndex(activeIndex)
  }, [activeIndex, prevIndex])

  // Add Google Font
  useEffect(() => {
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
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
        if (isSoundEnabled) playSound()
      } else if (e.deltaY < 0 && activeIndex > 0) {
        // Scroll up - go to previous project
        setActiveIndex((prev) => prev - 1)
        if (isSoundEnabled) playSound()
      }

      // Debounce scrolling
      setTimeout(() => setIsScrolling(false), 800)
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [activeIndex, isScrolling, isSoundEnabled, playSound])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        if (activeIndex < projects.length - 1) {
          setIsScrolling(true)
          setActiveIndex((prev) => prev + 1)
          if (isSoundEnabled) playSound()
          setTimeout(() => setIsScrolling(false), 800)
        }
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        if (activeIndex > 0) {
          setIsScrolling(true)
          setActiveIndex((prev) => prev - 1)
          if (isSoundEnabled) playSound()
          setTimeout(() => setIsScrolling(false), 800)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeIndex, isScrolling, isSoundEnabled, playSound])

  return (
    <div ref={sliderRef} className="relative w-full h-screen overflow-hidden bg-white">
      {/* Slides container */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={`slide-${activeIndex}`}
          className="absolute inset-0 z-10 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main container for precise layout control */}
          <div className={`absolute inset-0 ${isMobile ? "flex flex-col" : "flex flex-row"}`}>
            {/* RED COLOR BLOCK with animated width */}
            <motion.div
              className="relative h-full bg-[#8B0000] z-30 overflow-hidden"
              initial={{
                width: isMobile ? "100%" : direction >= 0 ? "0%" : "30%",
                height: isMobile ? "0%" : "100%",
              }}
              animate={{
                width: isMobile ? "100%" : "30%",
                height: isMobile ? "50%" : "100%",
              }}
              exit={{
                width: isMobile ? "100%" : direction >= 0 ? "0%" : "30%",
                height: isMobile ? "0%" : "100%",
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Color block content */}
              <div className="relative w-full h-full p-8 flex flex-col justify-between">
                {/* Top info row */}
                <div className="flex justify-between text-xs text-white/80 uppercase tracking-widest">
                  <div>DESIGN</div>
                  <div>BY IDA LIGHTING</div>
                </div>

                {/* Studio label */}
                <div className="absolute top-[10%] left-8 text-white/60 text-sm">
                  <div>BON Studio</div>
                </div>

                {/* Bottom info row */}
                <div className="mt-auto flex justify-between items-end">
                  <div className="text-xs text-white/80 uppercase tracking-widest">3D VISUALIZATION</div>

                  {/* Discover button */}
                  <Link
                    href={`/work/${currentProject.category.toLowerCase()}`}
                    className="flex items-center text-white text-xs uppercase tracking-widest group"
                  >
                    <span>DISCOVER</span>
                    <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* CURRENT SLIDE IMAGE with animated width */}
            <motion.div
              className="relative bg-gray-100 z-20 overflow-hidden"
              initial={{
                width: isMobile ? "100%" : direction >= 0 ? "0%" : "50%",
                height: isMobile ? "0%" : "100%",
              }}
              animate={{
                width: isMobile ? "100%" : "50%",
                height: isMobile ? "50%" : "100%",
              }}
              exit={{
                width: isMobile ? "100%" : direction >= 0 ? "0%" : "50%",
                height: isMobile ? "0%" : "100%",
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {currentProject && (
                <img
                  src={currentProject.image || "/placeholder.svg"}
                  alt={currentProject.title}
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>

            {/* NEXT SLIDE PREVIEW with animated width */}
            <motion.div
              className="relative bg-[#5A0000] z-10 overflow-hidden"
              initial={{
                width: isMobile ? "100%" : direction >= 0 ? "0%" : "20%",
                height: isMobile ? "0%" : "100%",
              }}
              animate={{
                width: isMobile ? "100%" : "20%",
                height: isMobile ? "0%" : "100%",
              }}
              exit={{
                width: isMobile ? "100%" : direction >= 0 ? "0%" : "20%",
                height: isMobile ? "0%" : "100%",
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {nextProject && (
                <div className="w-full h-full relative opacity-70">
                  <div className="absolute inset-0 bg-[#8B0000]/50 mix-blend-multiply z-10"></div>
                  <img
                    src={nextProject.image || "/placeholder.svg"}
                    alt={nextProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </motion.div>
          </div>

          {/* Project Title - Positioned on top of everything with higher z-index */}
          <motion.div
            className="absolute z-40 left-0 right-0"
            style={{
              top: isMobile ? "25%" : "40%",
            }}
            initial={{ opacity: 0, x: direction >= 0 ? -100 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? 100 : -100 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1
              className="text-4xl md:text-6xl lg:text-[7rem] font-black text-white leading-none mx-8 md:ml-[calc(15%)] md:mr-16"
              style={{
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "-0.02em",
                textShadow: "0 2px 10px rgba(0,0,0,0.2)",
              }}
            >
              {currentProject.title}
            </h1>

            {/* Description underneath */}
            <motion.p
              className="text-white/80 text-sm max-w-xs mx-8 md:ml-[calc(15%+2rem)] md:mr-16 mt-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {currentProject.description.slice(0, 100)}...
            </motion.p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation indicators */}
      <div className="absolute bottom-8 right-8 flex space-x-2 z-50">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isScrolling) {
                setDirection(index > activeIndex ? 1 : -1)
                setActiveIndex(index)
                if (isSoundEnabled) playSound()
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-white scale-125" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

