"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useSound } from "@/hooks/use-sound"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

// Types
type HomeProject = {
  id: number
  title: string
  image: string
  description?: string
  link: string
}

// Homepage project data
const homeProjects: HomeProject[] = [
  {
    id: 1,
    title: "DỰ ÁN | 44 VILLAR",
    image: "/work/villa-44/TRC_9185-min.jpg",
    description: "TKKT: LE HUU SANG ARCHITEXT\nĐịa Chỉ: TP Hà Tĩnh\nNăm hoàn thành: 2024\nHạng mục chiếu sáng: Garden lighting, Indoor, Outdoor, Decor Lighting",
    link: "/projects/villa-44"
  },
  {
    id: 2,
    title: "DỰ ÁN | LONG HOUSE",
    image: "/work/long-house/_TRC7413-min.jpg", 
    description: "TKKT: LE HUU SANG ARCHITEXT\nĐịa Chỉ: TP Hà Tĩnh\nNăm hoàn thành: 2024\nHạng mục chiếu sáng: Garden lighting, Indoor, Outdoor, Decor Lighting",
    link: "/projects/long-house"
  },
  {
    id: 3,
    title: "DỰ ÁN | AN HOUSE",
    image: "/work/vn3/2022_09_26_19_34_IMG_8523.JPG",
    description: "TKKT: MAAR DESIGNS\nĐịa Chỉ: TP Hà Tĩnh\nNăm hoàn thành: 2023\nHạng mục chiếu sáng: Garden lighting, Indoor, Outdoor, Decor Lighting",
    link: "/projects/luxury-villas"
  },
  {
    id: 4,
    title: "DỰ ÁN | STARLAKE VILLAR",
    image: "/work/IDA_Starlake/TRC_7559.jpg",
    description: "TKKT: RHINELUX\nĐịa Chỉ: Hồ Tây – Hà Nội\nNăm hoàn thành: 2024\nHạng mục chiếu sáng: Garden lighting, Indoor, Outdoor, Decor Lighting",
    link: "/projects/starlake"
  }
]

interface HomeProjectSliderProps {
  onSlideChange?: (isAtLastSlide: boolean) => void
}

const HomeProjectSlider = ({ onSlideChange }: HomeProjectSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const { playSound, isSoundEnabled } = useSound()
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

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

  // Notify when at the last slide
  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentIndex === homeProjects.length - 1)
    }
  }, [currentIndex, onSlideChange, homeProjects.length])

  // Auto slide functionality
  useEffect(() => {
    const moveToNextSlide = () => {
      if (!isScrolling) {
        const nextIndex = (currentIndex + 1) % homeProjects.length;
        setCurrentIndex(nextIndex);
      }
    };

    // Start auto-slide timer
    autoSlideTimerRef.current = setInterval(moveToNextSlide, 4000);

    // Pause on mouse enter, resume on mouse leave
    const sliderElement = sliderRef.current;
    if (sliderElement) {
      const pauseAutoSlide = () => {
        if (autoSlideTimerRef.current) {
          clearInterval(autoSlideTimerRef.current);
          autoSlideTimerRef.current = null;
        }
      };

      const resumeAutoSlide = () => {
        if (!autoSlideTimerRef.current) {
          autoSlideTimerRef.current = setInterval(moveToNextSlide, 4000);
        }
      };

      sliderElement.addEventListener('mouseenter', pauseAutoSlide);
      sliderElement.addEventListener('mouseleave', resumeAutoSlide);

      return () => {
        if (autoSlideTimerRef.current) {
          clearInterval(autoSlideTimerRef.current);
        }
        sliderElement.removeEventListener('mouseenter', pauseAutoSlide);
        sliderElement.removeEventListener('mouseleave', resumeAutoSlide);
      };
    }

    return () => {
      if (autoSlideTimerRef.current) {
        clearInterval(autoSlideTimerRef.current);
      }
    };
  }, [currentIndex, isScrolling, homeProjects.length]);

  // Handle button click to change slide
  const handleButtonClick = useCallback(
    (direction: "next" | "prev") => {
      if (isScrolling) return

      setIsScrolling(true)

      if (direction === "next") {
        setCurrentIndex((prev) => (prev === homeProjects.length - 1 ? 0 : prev + 1))
      } else {
        setCurrentIndex((prev) => (prev === 0 ? homeProjects.length - 1 : prev - 1))
      }

      setTimeout(() => {
        setIsScrolling(false)
      }, 500)
    },
    [isScrolling, homeProjects.length]
  )

  // Handle arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleButtonClick("next")
      } else if (e.key === "ArrowLeft") {
        handleButtonClick("prev")
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleButtonClick])

  // Handle touch events for mobile swipe
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      // Don't capture touch events for swipe navigation on mobile - allow normal scrolling
      if (isMobile) return
      
      if (!sliderRef.current) return
      const rect = sliderRef.current.getBoundingClientRect()
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return

      // If we've viewed all slides, allow normal scrolling
      if (hasViewedAllSlides && currentIndex === homeProjects.length - 1) return

      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      // Don't prevent default scrolling behavior on mobile
      if (isMobile) return
      
      if (!sliderRef.current || touchStartY.current === null) return

      // If we've viewed all slides and are on the last slide, allow normal scrolling
      if (hasViewedAllSlides && currentIndex === homeProjects.length - 1) return

      // Prevent default to stop page scrolling while in this component
      e.preventDefault()
    }

    const handleTouchEnd = (e: TouchEvent) => {
      // Don't handle swipe gestures on mobile
      if (isMobile) return
      
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

        if (touchDiff > 0 && currentIndex < homeProjects.length - 1) {
          // Swipe up - go to next slide
          setIsScrolling(true)
          setCurrentIndex((prev) => prev + 1)
          setTimeout(() => setIsScrolling(false), 800)
        } else if (touchDiff < 0 && currentIndex > 0) {
          // Swipe down - go to previous slide
          setIsScrolling(true)
          setCurrentIndex((prev) => prev - 1)
          setTimeout(() => setIsScrolling(false), 800)
        }
      }

      // Reset touch values
      touchStartY.current = null
      touchEndY.current = null
    }

    // Add touch event listeners
    if (sliderRef.current) {
      sliderRef.current.addEventListener("touchstart", handleTouchStart, { passive: true })
      sliderRef.current.addEventListener("touchmove", handleTouchMove, { passive: true })
      sliderRef.current.addEventListener("touchend", handleTouchEnd, { passive: true })
    }

    return () => {
      if (sliderRef.current) {
        sliderRef.current.removeEventListener("touchstart", handleTouchStart)
        sliderRef.current.removeEventListener("touchmove", handleTouchMove)
        sliderRef.current.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentIndex, isScrolling, hasViewedAllSlides, homeProjects.length, isMobile])

  return (
    <div ref={sliderRef} className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Slides container */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={`slide-${currentIndex}`}
          className="absolute inset-0 z-[10] flex"
          initial={{ opacity: 0, y: isMobile ? 20 : 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: isMobile ? -20 : 0 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeInOut"
          }}
        >
          {/* Main container for precise layout control */}
          <div className={`absolute inset-0 ${isMobile ? "flex flex-col" : "flex flex-row"}`}>
            {/* COLOR BLOCK with animated width */}
            <motion.div
              className="relative h-full bg-gradient-to-r from-gray-900 to-[#8B2323] z-[30] overflow-hidden"
              initial={{
                width: isMobile ? "100%" : "40%",
                height: isMobile ? "50%" : "100%",
                opacity: 0.8
              }}
              animate={{
                width: isMobile ? "100%" : "40%",
                height: isMobile ? "50%" : "100%",
                opacity: 1
              }}
              exit={{
                width: isMobile ? "100%" : "40%",
                height: isMobile ? "0%" : "100%",
                opacity: 0.8
              }}
              transition={{ 
                duration: 1.2, 
                ease: "easeOut"
              }}
            >
              {/* Color block content with project info */}
              <div className="relative w-full h-full flex flex-col justify-center px-8 md:px-12 mt-[20px]">
                <motion.h2 
                  className="text-white text-[1.6rem] font-bold uppercase"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  {homeProjects[currentIndex].title}
                </motion.h2>
                
                <motion.p
                  className="text-white/80 text-sm uppercase tracking-wide mb-1 md:mt-6 md:mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                >
                  {homeProjects[currentIndex].description}
                </motion.p>
                
                {/* Link button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  className="md:mt-4"
                >
                  <button 
                    onClick={() => router.push(homeProjects[currentIndex].link)}
                    className="relative px-4 py-1.5 text-[14px] font-medium text-white transition-all duration-300 rounded-sm"
                    style={{
                      background: "transparent",
                      boxShadow: "0 0 8px rgba(255, 51, 0, 0.5), 0 0 18px rgba(255, 69, 0, 0.3)",
                    }}
                  >
                    <span className="relative z-10">XEM THÊM</span>
                    <span className="absolute inset-0 rounded-sm overflow-hidden" style={{
                      background: "transparent",
                      border: "1px solid rgba(255, 51, 0, 0.5)",
                      boxShadow: "inset 0 0 5px rgba(255, 51, 0, 0.3)",
                    }}></span>
                  </button>
                </motion.div>
              </div>
            </motion.div>

            {/* CURRENT SLIDE IMAGE with animated width */}
            <motion.div
              className="relative bg-gray-100 z-[20] overflow-hidden"
              initial={{
                width: isMobile ? "100%" : "60%",
                height: isMobile ? "50%" : "100%",
                opacity: 0.8
              }}
              animate={{
                width: isMobile ? "100%" : "60%",
                height: isMobile ? "50%" : "100%",
                opacity: 1
              }}
              exit={{
                width: isMobile ? "100%" : "60%",
                height: isMobile ? "0%" : "100%",
                opacity: 0.8
              }}
              transition={{ 
                duration: 1.2, 
                ease: "easeOut"
              }}
            >
              {homeProjects[currentIndex] && (
                <motion.div 
                  className="w-full h-full"
                  initial={{ scale: 1.05, filter: "blur(2px)" }}
                  animate={{ scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 2.5, ease: "easeOut" }}
                >
                  <img
                    src={homeProjects[currentIndex].image || "/placeholder.svg"}
                    alt={homeProjects[currentIndex].title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Mobile Navigation Arrows */}
      {isMobile && (
        <div className="absolute inset-x-0 top-1/2 -mt-4 px-2 flex justify-between z-[9999] pointer-events-none isolation-auto">
          <button
            onClick={() => handleButtonClick("prev")}
            className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-lg pointer-events-auto"
            aria-label="Previous project"
          >
            <ChevronLeft size={18} className="text-[#8B2323]" />
          </button>
          <button
            onClick={() => handleButtonClick("next")}
            className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-lg pointer-events-auto"
            aria-label="Next project"
          >
            <ChevronRight size={18} className="text-[#8B2323]" />
          </button>
        </div>
      )}

      {/* Bottom Navigation Buttons */}
      <div className="absolute bottom-8 right-8 flex space-x-2 z-[500]">
        {!isMobile && (
          <>
            <button
              onClick={() => handleButtonClick("prev")}
              className="bg-white/10 backdrop-blur-xl p-4 rounded-full"
              aria-label="Previous project"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button
              onClick={() => handleButtonClick("next")}
              className="bg-white/10 backdrop-blur-xl p-4 rounded-full"
              aria-label="Next project"
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          </>
        )}
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-8 left-8 flex space-x-2 z-[500]">
        {homeProjects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isScrolling) {
                setCurrentIndex(index)
              }
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-white scale-125" : "bg-white/50"
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default HomeProjectSlider 