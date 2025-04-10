"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useSound } from "@/hooks/use-sound"
import { ChevronRight } from "lucide-react"

// Types
type Service = {
  id: number
  title: string
  image: string
  category: string
}

// Dữ liệu dịch vụ
const services: Service[] = [
  {
    id: 1,
    title: "Tư vấn thiết kế chiếu sáng",
    image: "/home-page/_TRC7620.jpg",
    category: "residential"
  },
  {
    id: 2,
    title: "Cung cấp giải pháp chiếu sáng toàn diện",
    image: "/home-page/_TRC7706.jpg",
    category: "commercial"
  },
  {
    id: 3,
    title: "Bespoke Lighting",
    image: "/home-page/_TRC7712.jpg",
    category: "industrial"
  },
  {
    id: 4,
    title: "Cung cấp thiết bị chiếu sáng",
    image: "/home-page/_TRC7748-Pano.jpg",
    category: "smart"
  }
]

export default function TestimonialSlider({ onSlideChange }: { onSlideChange?: (isAtLastSlide: boolean) => void }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [direction, setDirection] = useState(0) // -1: prev, 0: initial, 1: next
  const sliderRef = useRef<HTMLDivElement>(null)
  const { playSound, isSoundEnabled } = useSound()

  // Add responsive state
  const [isMobile, setIsMobile] = useState(false)

  // Touch handling variables
  const touchStartY = useRef<number | null>(null)
  const touchEndY = useRef<number | null>(null)
  const lastTouchTime = useRef<number>(0)
  const touchThreshold = 50 // Minimum swipe distance in pixels
  const touchTimeThreshold = 800 // ms between touch actions
  const [hasViewedAllSlides, setHasViewedAllSlides] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Current and next service (with safety check)
  const currentService = services[activeIndex] || services[0]
  const nextService = services[(activeIndex + 1) % services.length] || services[0]

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

  // Handle scroll events to navigate through services
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return

      // Check if we're in the viewport
      if (!sliderRef.current) return
      const rect = sliderRef.current.getBoundingClientRect()
      if (rect.top > window.innerHeight || rect.bottom < 0) return

      e.preventDefault()
      setIsScrolling(true)

      if (e.deltaY > 0 && activeIndex < services.length - 1) {
        // Scroll down - go to next service
        setActiveIndex((prev) => prev + 1)
        if (isSoundEnabled) playSound()
      } else if (e.deltaY < 0 && activeIndex > 0) {
        // Scroll up - go to previous service
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
        if (activeIndex < services.length - 1) {
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

  // Báo khi đến slide cuối
  useEffect(() => {
    const isLastSlide = activeIndex === services.length - 1;
    
    if (isLastSlide) {
      setHasViewedAllSlides(true);
    }
    
    // Thông báo cho parent component về trạng thái hiện tại
    if (onSlideChange) {
      onSlideChange(isLastSlide);
    }
  }, [activeIndex, onSlideChange, services.length]);

  // Handle touch events for mobile swipe
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (!sliderRef.current) return
      const rect = sliderRef.current.getBoundingClientRect()
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return

      // If we've viewed all slides, allow normal scrolling
      if (hasViewedAllSlides && activeIndex === services.length - 1) return

      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!sliderRef.current || touchStartY.current === null) return

      // If we've viewed all slides and are on the last slide, allow normal scrolling
      if (hasViewedAllSlides && activeIndex === services.length - 1) return

      // Prevent default to stop page scrolling while in this component
      e.preventDefault()
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!sliderRef.current || touchStartY.current === null || isScrolling) return

      const rect = sliderRef.current.getBoundingClientRect()
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return

      touchEndY.current = e.changedTouches[0].clientY

      // Check if enough time has passed since last touch action
      const now = new Date().getTime()
      if (now - lastTouchTime.current < touchTimeThreshold) return

      // Calculate swipe direction and distance
      const touchDiff = touchStartY.current - touchEndY.current

      if (Math.abs(touchDiff) > touchThreshold) {
        lastTouchTime.current = now

        if (touchDiff > 0 && activeIndex < services.length - 1) {
          // Swipe up - go to next slide
          setIsScrolling(true)
          setActiveIndex((prev) => prev + 1)
          if (isSoundEnabled) playSound()
          setTimeout(() => setIsScrolling(false), 800)
        } else if (touchDiff < 0 && activeIndex > 0) {
          // Swipe down - go to previous slide
          setIsScrolling(true)
          setActiveIndex((prev) => prev - 1)
          if (isSoundEnabled) playSound()
          setTimeout(() => setIsScrolling(false), 800)
        }
      }

      // Reset touch values
      touchStartY.current = null
      touchEndY.current = null
    }

    // Add touch event listeners
    if (sliderRef.current) {
      sliderRef.current.addEventListener("touchstart", handleTouchStart, { passive: false })
      sliderRef.current.addEventListener("touchmove", handleTouchMove, { passive: false })
      sliderRef.current.addEventListener("touchend", handleTouchEnd, { passive: false })
    }

    return () => {
      if (sliderRef.current) {
        sliderRef.current.removeEventListener("touchstart", handleTouchStart)
        sliderRef.current.removeEventListener("touchmove", handleTouchMove)
        sliderRef.current.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [activeIndex, isScrolling, hasViewedAllSlides, isSoundEnabled, playSound])

  return (
    <div ref={sliderRef} className="relative w-full h-screen overflow-hidden bg-white">
      {/* Tagline cố định */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 pt-[80px] z-50 text-white/90 font-bold tracking-wider text-sl md:text-base">
        DỊCH VỤ – THẾ MẠNH – SẢN PHẨM
      </div>
      
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
              className="relative h-full bg-black z-30 overflow-hidden"
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
              <div className="relative w-full h-full p-8 pt-[80px] flex flex-col justify-between">

                {/* Studio label */}
                <div className="absolute top-[calc(20%+45px)] left-8 text-white/60 text-sm">
                  <div>Thế Mạnh Của Chúng Tôi</div>
                </div>

                {/* Bottom info row */}
                <div className="mt-auto flex justify-between items-end">
                  <div className="text-xs text-white/80 uppercase tracking-widest">GIẢI PHÁP CHIẾU SÁNG</div>

                  {/* Link button */}
                  <Link
                    href={`/work/${currentService.category}`}
                    className="flex items-center text-white text-xs uppercase tracking-widest group"
                  >
                    <span>TÌM HIỂU THÊM</span>
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
              {currentService && (
                <img
                  src={currentService.image || "/placeholder.svg"}
                  alt={currentService.title}
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
              {nextService && (
                <div className="w-full h-full relative opacity-70">
                  <div className="absolute inset-0 bg-[#8B0000]/50 mix-blend-multiply z-10"></div>
                  <img
                    src={nextService.image || "/placeholder.svg"}
                    alt={nextService.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </motion.div>
          </div>

          {/* Service Title - Positioned on top of everything with higher z-index */}
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
              {currentService.title}
            </h1>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation indicators */}
      <div className="absolute bottom-8 right-8 flex space-x-2 z-50">
        {services.map((_, index) => (
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
            aria-label={`Di chuyển đến slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator for when all slides have been viewed */}
      {hasViewedAllSlides && activeIndex === services.length - 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/80 text-xs md:text-sm animate-bounce">
          Cuộn để tiếp tục
        </div>
      )}
    </div>
  )
}

