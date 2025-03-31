"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useSound } from "@/hooks/use-sound"
import { useMobile } from "@/hooks/use-mobile"
import { ChevronLeft, ChevronRight, Zap, Lightbulb, Wifi } from "lucide-react"
import Link from "next/link"

// Tech-inspired title style
const techTitleStyle = {
  background: "linear-gradient(to right, #FFFFFF, #E0E0E0, #FFFFFF)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: "0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.2)",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 700,
  letterSpacing: "-0.03em",
}

// Keyframes for animations
const keyframes = `
@keyframes pulse {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.4;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.2);
  }
  50% {
    box-shadow: 0 0 15px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.4);
  }
}

@keyframes scanline {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}
`

type Service = {
  id: number
  title: string
  description: string
  image: string
  number: string
  slug: string
  specs?: {
    efficiency?: number
    brightness?: number
    lifespan?: number
    connectivity?: number
    features?: string[]
  }
  project?: {
    title: string
    year: string
    image: string
  }
}

const services: Service[] = [
  {
    id: 1,
    title: "Residential",
    description:
      "Transform your home with our elegant residential lighting solutions. From ambient lighting to accent fixtures, we create lighting designs that enhance comfort and aesthetics while meeting functional needs.",
    image: "/work/residential/residential.jpeg",
    number: "01",
    slug: "residential",
    specs: {
      efficiency: 92,
      brightness: 85,
      connectivity: 95,
      features: ["Smart Home Integration", "Energy Monitoring", "Scene Presets", "Voice Control"],
    },
    project: {
      title: "Modern Villa Project",
      year: "2023",
      image: "/work/residential/residential.jpeg",
    },
  },
  {
    id: 2,
    title: "Commercial",
    description:
      "Enhance productivity and create inviting spaces with our commercial lighting solutions. We design lighting systems for offices, retail spaces, and hospitality venues that balance aesthetics with energy efficiency.",
    image: "/work/commercial/commercial.png",
    number: "02",
    slug: "commercial",
    specs: {
      efficiency: 88,
      brightness: 90,
      connectivity: 85,
      features: ["Occupancy Sensing", "Daylight Harvesting", "Energy Analytics", "Centralized Control"],
    },
    project: {
      title: "Office Complex Lighting",
      year: "2022",
      image: "/work/commercial/commercial.png",
    },
  },
  {
    id: 3,
    title: "Industrial",
    description:
      "Maximize safety and efficiency with our industrial lighting solutions. Our high-performance lighting systems are designed for factories, warehouses, and industrial facilities, providing optimal visibility and durability.",
    image: "/work/industry/industrial.png",
    number: "03",
    slug: "industrial",
    specs: {
      efficiency: 95,
      brightness: 98,
      connectivity: 80,
      features: ["High-Bay Solutions", "Emergency Lighting", "Hazardous Area Lighting", "Automated Maintenance"],
    },
    project: {
      title: "Factory Lighting System",
      year: "2023",
      image: "/work/industry/industrial.png",
    },
  },
  {
    id: 4,
    title: "Smart Lighting",
    description:
      "Experience the future of lighting with our smart lighting solutions. Our intelligent systems offer advanced control capabilities, energy efficiency, and seamless integration with home automation systems.",
    image: "/work/smart-home/smart-home-app.jpeg",
    number: "04",
    slug: "smart",
    specs: {
      efficiency: 90,
      brightness: 85,
      connectivity: 98,
      features: ["IoT Integration", "Mobile App Control", "Adaptive Lighting", "Predictive Analytics"],
    },
    project: {
      title: "Smart Home Integration",
      year: "2023",
      image: "/work/smart-home/smart-home-app.jpeg",
    },
  },
]

// Tech feature badge component
const FeatureBadge = ({ text }: { text: string }) => (
  <div className="px-2 py-1 bg-black/30 backdrop-blur-sm rounded text-xs text-white border border-white/10 inline-flex items-center mr-2 mb-2">
    <div className="w-1 h-1 rounded-full bg-[#FF4D4D] mr-1.5"></div>
    {text}
  </div>
)

// Tech stat bar component
const StatBar = ({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) => (
  <div className="mb-2">
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center text-xs text-white/80">
        {icon}
        <span className="ml-1">{label}</span>
      </div>
      <span className="text-xs font-medium text-white">{value}%</span>
    </div>
    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-[#FF4D4D]"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, delay: 0.2 }}
      />
    </div>
  </div>
)

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [viewedServices, setViewedServices] = useState<Set<number>>(new Set([0])) // Track viewed services
  const { playSound, isSoundEnabled } = useSound()
  const isMobile = useMobile()
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  // Calculate if all services have been viewed
  const hasViewedAllServices = viewedServices.size === services.length

  // Track cursor for spotlight effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setCursorPosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  // Handle wheel events to navigate through services
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (hasViewedAllServices) return

      // Only if we're in the viewport
      const rect = sectionRef.current?.getBoundingClientRect()
      if (!rect || rect.top > 100 || rect.bottom < 0) return

      e.preventDefault()

      // Debounce scroll events
      if (isAnimating) return

      if (e.deltaY > 0) {
        // Scroll down - go to next service
        handleNext()
      } else if (e.deltaY < 0) {
        // Scroll up - go to previous service
        handlePrevious()
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [isAnimating, hasViewedAllServices])

  useEffect(() => {
    // Add Google Font
    const link = document.createElement("link")
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
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

  const handlePrevious = () => {
    if (isAnimating) return
    setIsAnimating(true)

    const newIndex = (activeIndex - 1 + services.length) % services.length
    setActiveIndex(newIndex)

    // Mark this service as viewed
    setViewedServices((prev) => new Set([...prev, newIndex]))

    if (isSoundEnabled) {
      playSound()
    }

    setTimeout(() => setIsAnimating(false), 700)
  }

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)

    const newIndex = (activeIndex + 1) % services.length
    setActiveIndex(newIndex)

    // Mark this service as viewed
    setViewedServices((prev) => new Set([...prev, newIndex]))

    if (isSoundEnabled) {
      playSound()
    }

    setTimeout(() => setIsAnimating(false), 700)
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      data-viewed-all-services={hasViewedAllServices ? "true" : "false"}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Full-screen background image */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${activeIndex}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full h-full">
              <img
                src={services[activeIndex].image || "/placeholder.svg"}
                alt={services[activeIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />

              {/* Tech grid overlay */}
              <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)] opacity-20">
                {Array.from({ length: 41 }).map((_, i) => (
                  <div key={`h-${i}`} className="col-span-full h-px bg-white/30" style={{ gridRow: i + 1 }} />
                ))}
                {Array.from({ length: 41 }).map((_, i) => (
                  <div key={`v-${i}`} className="row-span-full w-px bg-white/30" style={{ gridColumn: i + 1 }} />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main content container */}
      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col">
        {/* Top section with title and description */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl max-w-5xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={techTitleStyle}
          >
            {services[activeIndex].title.toUpperCase()}
          </motion.h1>

          <motion.p
            className="text-white/90 max-w-2xl text-center text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {services[activeIndex].description}
          </motion.p>
        </div>

        {/* Bottom section with info panels and CTA */}
        <div className="relative mb-16">
          {/* Info panels container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left info panel */}
            <motion.div
              className="bg-black/70 backdrop-blur-md p-6 rounded-l-xl border border-white/10 border-r-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-[#FF4D4D] flex items-center justify-center">
                  <Zap size={24} className="text-white" />
                </div>
                <h3 className="text-white text-lg font-medium">Technical Specifications</h3>
              </div>

              {services[activeIndex].specs && (
                <div className="space-y-4">
                  {services[activeIndex].specs.efficiency !== undefined && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center text-xs text-white/80">
                          <Zap size={12} className="mr-1" />
                          <span>Energy Efficiency</span>
                        </div>
                        <span className="text-xs font-medium text-white">
                          {services[activeIndex].specs.efficiency}%
                        </span>
                      </div>
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#FF4D4D]"
                          style={{ width: `${services[activeIndex].specs.efficiency}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {services[activeIndex].specs.brightness !== undefined && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center text-xs text-white/80">
                          <Lightbulb size={12} className="mr-1" />
                          <span>Brightness Output</span>
                        </div>
                        <span className="text-xs font-medium text-white">
                          {services[activeIndex].specs.brightness}%
                        </span>
                      </div>
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#FF4D4D]"
                          style={{ width: `${services[activeIndex].specs.brightness}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {services[activeIndex].specs.features && (
                    <div className="mt-4">
                      <div className="text-xs text-white/70 mb-2">KEY FEATURES:</div>
                      <div className="flex flex-wrap gap-2">
                        {services[activeIndex].specs.features.slice(0, 2).map((feature, i) => (
                          <div
                            key={i}
                            className="px-3 py-1 bg-black/30 rounded text-xs text-white border border-[#FF4D4D]/30 inline-flex items-center"
                          >
                            <div className="w-1 h-1 rounded-full bg-[#FF4D4D] mr-1.5"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {services[activeIndex].specs.features.slice(2, 4).map((feature, i) => (
                          <div
                            key={i}
                            className="px-3 py-1 bg-black/30 rounded text-xs text-white border border-[#FF4D4D]/30 inline-flex items-center"
                          >
                            <div className="w-1 h-1 rounded-full bg-[#FF4D4D] mr-1.5"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Right info panel */}
            <motion.div
              className="bg-black/70 backdrop-blur-md p-6 rounded-r-xl border border-white/10 border-l-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-[#FF4D4D] flex items-center justify-center">
                  <Wifi size={24} className="text-white" />
                </div>
                <h3 className="text-white text-lg font-medium">Smart Features</h3>
              </div>

              <p className="text-white/80 mb-4">
                We apply modern technologies of design, construction and process management to create lighting solutions
                that fully assist in achieving your goals.
              </p>

              {services[activeIndex].specs && services[activeIndex].specs.connectivity !== undefined && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center text-xs text-white/80">
                      <Wifi size={12} className="mr-1" />
                      <span>Smart Connectivity</span>
                    </div>
                    <span className="text-xs font-medium text-white">{services[activeIndex].specs.connectivity}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#FF4D4D]"
                      style={{ width: `${services[activeIndex].specs.connectivity}%` }}
                    />
                  </div>
                </div>
              )}

              {services[activeIndex].project && (
                <div className="mt-4">
                  <div className="text-xs text-white/70 mb-2">FEATURED PROJECT:</div>
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-lg overflow-hidden mr-3 border border-white/10">
                      <img
                        src={services[activeIndex].project.image || "/placeholder.svg"}
                        alt={services[activeIndex].project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-white font-medium">{services[activeIndex].project.title}</div>
                      <div className="text-white/60 text-sm">{services[activeIndex].project.year}</div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* CTA Button positioned over the two panels */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link
              href={`/work/${services[activeIndex].slug}`}
              className="flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300"
            >
              <span className="text-white font-medium">LEARN MORE</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-40">
        <motion.button
          onClick={handlePrevious}
          className="p-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition-all duration-300 border border-white/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous service"
          disabled={isAnimating}
        >
          <ChevronLeft size={16} className="text-white" />
        </motion.button>

        <div className="flex space-x-2">
          {services.map((_, index) => (
            <motion.div
              key={index}
              className={cn(
                "h-1 rounded-full transition-all duration-300 backdrop-blur-sm",
                index === activeIndex ? "bg-white w-8" : "bg-white/40 w-2",
              )}
              whileHover={{ scale: 1.2 }}
              onClick={() => {
                if (!isAnimating && index !== activeIndex) {
                  setActiveIndex(index)
                  setViewedServices((prev) => new Set([...prev, index]))
                  if (isSoundEnabled) playSound()
                }
              }}
            />
          ))}
        </div>

        <motion.button
          onClick={handleNext}
          className="p-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition-all duration-300 border border-white/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next service"
          disabled={isAnimating}
        >
          <ChevronRight size={16} className="text-white" />
        </motion.button>
      </div>
    </section>
  )
}

