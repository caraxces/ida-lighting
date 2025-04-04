"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useSound } from "@/hooks/use-sound"

// Define the slide type
type Slide = {
  id: number
  title: string
  subtitle: string
  image: string
}

// Sample slides data
const slides: Slide[] = [
  {
    id: 1,
    title: "Bedroom",
    subtitle: "Bedroom Design",
    image: "/red-vintage/1.png",
  },
  {
    id: 2,
    title: "Bathroom",
    subtitle: "Bathroom Design",
    image: "/red-vintage/2.png",
  },
  {
    id: 3,
    title: "Kitchen",
    subtitle: "Kitchen Design",
    image: "/red-vintage/3.png",
  },
  {
    id: 4,
    title: "Living Room",
    subtitle: "Living Room Design",
    image: "/red-vintage/4.png",
  },
  {
    id: 5,
    title: "Guest Room",
    subtitle: "Guest Room Design",
    image: "/red-vintage/5.png",
  },
]

export default function DoorOpeningSlides({ onSlideChange }: { onSlideChange?: (isAtLastSlide: boolean) => void }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isDoorsOpen, setIsDoorsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasViewedAllSlides, setHasViewedAllSlides] = useState(false)
  const [viewedSlides, setViewedSlides] = useState<Set<number>>(new Set([0]))
  const sectionRef = useRef<HTMLDivElement>(null)
  const { playSound } = useSound()

  // Touch handling variables
  const touchStartY = useRef<number | null>(null)
  const touchEndY = useRef<number | null>(null)
  const lastTouchTime = useRef<number>(0)
  const touchThreshold = 50 // Minimum swipe distance in pixels
  const touchTimeThreshold = 800 // ms between touch actions

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return

      if (e.key === "ArrowDown" && activeSlide < slides.length - 1) {
        changeSlide(activeSlide + 1)
      } else if (e.key === "ArrowUp" && activeSlide > 0) {
        changeSlide(activeSlide - 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeSlide, isAnimating])

  // Handle scroll
  useEffect(() => {
    let lastScrollTime = 0
    const scrollThreshold = 800 // ms between scroll actions

    const handleWheel = (e: WheelEvent) => {
      // Kiểm tra xem section này có đang trong viewport không
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return

      // Nếu đã xem hết tất cả slide và đang ở slide cuối cùng, cho phép tiếp tục scroll
      if (hasViewedAllSlides && activeSlide === slides.length - 1) return

      e.preventDefault()

      const now = new Date().getTime()
      if (now - lastScrollTime < scrollThreshold || isAnimating) return

      lastScrollTime = now

      if (e.deltaY > 0 && activeSlide < slides.length - 1) {
        changeSlide(activeSlide + 1)
      } else if (e.deltaY < 0 && activeSlide > 0) {
        changeSlide(activeSlide - 1)
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [activeSlide, isAnimating, hasViewedAllSlides])

  // Handle touch events for mobile swipe
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return

      // If we've viewed all slides and are on the last slide, allow normal scrolling
      if (hasViewedAllSlides && activeSlide === slides.length - 1) return

      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!sectionRef.current || touchStartY.current === null) return
      
      // If we've viewed all slides and are on the last slide, allow normal scrolling
      if (hasViewedAllSlides && activeSlide === slides.length - 1) return

      // Prevent default to stop page scrolling while in this component
      e.preventDefault()
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!sectionRef.current || touchStartY.current === null || isAnimating) return

      // If we've viewed all slides and are on the last slide, allow normal scrolling
      if (hasViewedAllSlides && activeSlide === slides.length - 1) {
        touchStartY.current = null
        touchEndY.current = null
        return
      }

      const rect = sectionRef.current.getBoundingClientRect()
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return

      touchEndY.current = e.changedTouches[0].clientY

      // Check if enough time has passed since last touch action
      const now = new Date().getTime()
      if (now - lastTouchTime.current < touchTimeThreshold) return

      // Calculate swipe direction and distance
      const touchDiff = touchStartY.current - touchEndY.current

      if (Math.abs(touchDiff) > touchThreshold) {
        lastTouchTime.current = now

        if (touchDiff > 0 && activeSlide < slides.length - 1) {
          // Swipe up - go to next slide
          changeSlide(activeSlide + 1)
        } else if (touchDiff < 0 && activeSlide > 0) {
          // Swipe down - go to previous slide
          changeSlide(activeSlide - 1)
        }
      }

      // Reset touch values
      touchStartY.current = null
      touchEndY.current = null
    }

    // Add touch event listeners
    if (sectionRef.current) {
      sectionRef.current.addEventListener("touchstart", handleTouchStart, { passive: false })
      sectionRef.current.addEventListener("touchmove", handleTouchMove, { passive: false })
      sectionRef.current.addEventListener("touchend", handleTouchEnd, { passive: false })
    }

    return () => {
      if (sectionRef.current) {
        sectionRef.current.removeEventListener("touchstart", handleTouchStart)
        sectionRef.current.removeEventListener("touchmove", handleTouchMove)
        sectionRef.current.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [activeSlide, isAnimating, hasViewedAllSlides])

  // Add Google Font
  useEffect(() => {
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  // Initial animation
  useEffect(() => {
    // Open doors on first render
    setTimeout(() => {
      setIsDoorsOpen(true)
    }, 500)
  }, [])

  // Cập nhật useEffect để kiểm tra trạng thái slide cuối
  useEffect(() => {
    const newViewedSlides = new Set(viewedSlides)
    newViewedSlides.add(activeSlide)
    setViewedSlides(newViewedSlides)

    // Kiểm tra xem có đang ở slide cuối không
    const isLastSlide = activeSlide === slides.length - 1
    
    // Set hasViewedAllSlides to true when we reach the last slide
    if (isLastSlide) {
      setHasViewedAllSlides(true)
    }
    
    // Thông báo cho parent component
    if (onSlideChange) {
      onSlideChange(isLastSlide)
    }
  }, [activeSlide, onSlideChange])

  // Remove touch-none class when on last slide and all slides viewed
  useEffect(() => {
    if (hasViewedAllSlides && activeSlide === slides.length - 1 && sectionRef.current) {
      sectionRef.current.classList.remove('touch-none')
    } else if (sectionRef.current) {
      sectionRef.current.classList.add('touch-none')
    }
  }, [hasViewedAllSlides, activeSlide])

  const changeSlide = (newIndex: number) => {
    if (isAnimating) return

    setIsAnimating(true)
    playSound() // Play sound when changing slides

    // Close the doors
    setIsDoorsOpen(false)

    // Wait for doors to close
    setTimeout(() => {
      // Change the slide
      setActiveSlide(newIndex)

      // Wait a moment then open doors
      setTimeout(() => {
        setIsDoorsOpen(true)

        // Animation complete
        setTimeout(() => {
          setIsAnimating(false)
        }, 800)
      }, 200)
    }, 800)
  }

  return (
    <div ref={sectionRef} className="w-full h-screen overflow-hidden bg-white touch-none">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Container chứa cả title và ảnh để duy trì tỷ lệ */}
        <div className="relative w-[60%] md:w-[30%]">
          {/* Title positioned exactly at the top edge of the image */}
          <h1
            className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 text-center whitespace-nowrap"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3.5rem, 10vw, 7rem)",
              color: "rgb(12 0 0)",
              top: "-2%", // Vị trí cố định so với container
            }}
          >
            {slides[activeSlide].title}
          </h1>

          {/* Image container */}
          <div className="w-full aspect-square overflow-hidden bg-gray-800">
            <img
              src={slides[activeSlide].image || "/placeholder.svg"}
              alt={slides[activeSlide].title}
              className="w-full h-full object-cover"
            />

            {/* Credits overlay */}
            <div className="absolute inset-0 flex flex-col justify-between z-30 pointer-events-none p-4">
              <div className="flex justify-between mt-8">
                <h3
                  className="text-white text-[0.5rem] md:text-xs lg:text-sm tracking-wider"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  DESIGN
                </h3>
                <h3
                  className="text-white text-[0.5rem] md:text-xs lg:text-sm tracking-wider"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  BY Mr Duong
                </h3>
              </div>

              <div className="flex justify-between">
                <h3
                  className="text-white text-[0.5rem] md:text-xs lg:text-sm tracking-wider"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  3D VISUALIZATION
                </h3>
                <h3
                  className="text-white text-[0.5rem] md:text-xs lg:text-sm tracking-wider"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  BY IDA Lighting team
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Left door */}
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-full bg-white z-20"
          initial={{ x: 0 }}
          animate={{ x: isDoorsOpen ? "-100%" : 0 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-black/10"></div>
        </motion.div>

        {/* Right door */}
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-full bg-white z-20"
          initial={{ x: 0 }}
          animate={{ x: isDoorsOpen ? "100%" : 0 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-black/10"></div>
        </motion.div>

        {/* Navigation dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === activeSlide ? "bg-black scale-125" : "bg-black/40"
              }`}
              onClick={() => !isAnimating && changeSlide(index)}
              disabled={isAnimating}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Swipe indicator for mobile */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-black/50 text-[0.5rem] md:hidden">
          Swipe up/down to navigate
        </div>

        {/* Scroll indicator */}
        {hasViewedAllSlides && activeSlide === slides.length - 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-black/50 text-xs md:text-sm animate-bounce">
            Scroll to continue
          </div>
        )}
      </div>
    </div>
  )
}
