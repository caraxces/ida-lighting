"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useSound } from "@/hooks/use-sound"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import GlowButton from "./glow-button"

// Types
type Service = {
  id: number
  title: string
  image: string
  category: string
  description?: string
}

// Dữ liệu dịch vụ
const services: Service[] = [
  {
    id: 1,
    title: "Ánh sáng không chỉ là ánh sáng – mà là để cảm nhận!",
    image: "/home-page/_TRC7620.jpg",
    category: "residential",
    description: "Tại IDA Lighting, mỗi giải pháp chiếu sáng đều được thiết kế để truyền cảm hứng, định hình không gian và nâng tầm trải nghiệm sống."
  },
  {
    id: 2,
    title: "Không gian của bạn – Ánh sáng của bạn!",
    image: "/home-page/_TRC7706.jpg",
    category: "commercial",
    description: "IDA Lighting cung cấp thiết bị chiếu sáng cao cấp kết hợp thiết kế độc quyền, tối ưu cả công năng lẫn thẩm mỹ."
  },
  {
    id: 3,
    title: "Công nghệ chiếu sáng thông minh – Giải pháp cho công trình đẳng cấp!",
    image: "/home-page/_TRC7712.jpg",
    category: "industrial",
    description: "IDA Lighting ứng dụng công nghệ hiện đại để kiến tạo giải pháp chiếu sáng thông minh, tiết kiệm năng lượng và bền vững."
  },
  {
    id: 4,
    title: "Từ bản vẽ đến thực tế – chúng tôi làm ánh sáng trở nên sống động!",
    image: "/home-page/_TRC7748-Pano.jpg",
    category: "smart",
    description: "Với đội ngũ kiến trúc sư và kỹ sư chuyên sâu, IDA Lighting biến ý tưởng chiếu sáng thành hiện thực hoàn hảo cho mọi công trình."
  }
]

interface ProjectSliderProps {
  onSlideChange?: (isAtLastSlide: boolean) => void
}

const ProjectSlider = ({ onSlideChange }: ProjectSliderProps) => {
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

  // Thông báo khi đã đến slide cuối
  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentIndex === services.length - 1)
    }
  }, [currentIndex, onSlideChange, services.length])

  // Auto slide functionality
  useEffect(() => {
    const moveToNextSlide = () => {
      if (!isScrolling) {
        const nextIndex = (currentIndex + 1) % services.length;
        setCurrentIndex(nextIndex);
      }
    };

    // Start auto-slide timer
    autoSlideTimerRef.current = setInterval(moveToNextSlide, 6500);

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
          autoSlideTimerRef.current = setInterval(moveToNextSlide, 2000);
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
  }, [currentIndex, isScrolling, services.length]);

  // Xử lý chuyển slide khi click nút
  const handleButtonClick = useCallback(
    (direction: "next" | "prev") => {
      if (isScrolling) return

      setIsScrolling(true)

      if (direction === "next") {
        setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1))
      } else {
        setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1))
      }

      setTimeout(() => {
        setIsScrolling(false)
      }, 500)
    },
    [isScrolling, services.length]
  )

  // Xử lý chuyển slide khi nhấn phím mũi tên trái/phải
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
      if (!sliderRef.current) return
      const rect = sliderRef.current.getBoundingClientRect()
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return

      // If we've viewed all slides, allow normal scrolling
      if (hasViewedAllSlides && currentIndex === services.length - 1) return

      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!sliderRef.current || touchStartY.current === null) return

      // If we've viewed all slides and are on the last slide, allow normal scrolling
      if (hasViewedAllSlides && currentIndex === services.length - 1) return

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

        if (touchDiff > 0 && currentIndex < services.length - 1) {
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
  }, [currentIndex, isScrolling, hasViewedAllSlides, services.length])

  return (
    <div ref={sliderRef} className="relative w-full h-screen overflow-hidden bg-white">
      {/* Slides container */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={`slide-${currentIndex}`}
          className="absolute inset-0 z-10 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main container for precise layout control */}
          <div className={`absolute inset-0 ${isMobile ? "flex flex-col" : "flex flex-row"}`}>
            {/* COLOR BLOCK with animated width */}
            <motion.div
              className="relative h-full bg-black z-30 overflow-hidden"
              initial={{
                width: isMobile ? "100%" : "37.5%",
                height: isMobile ? "50%" : "100%",
              }}
              animate={{
                width: isMobile ? "100%" : "37.5%",
                height: isMobile ? "50%" : "100%",
              }}
              exit={{
                width: isMobile ? "100%" : "37.5%",
                height: isMobile ? "0%" : "100%",
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Color block content with project info */}
              <div className="relative w-full h-full flex flex-col justify-center px-8 md:px-12 mt-[20px]">
                <motion.h2 
                  className="text-[1.125rem] md:text-4xl lg:text-5xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {services[currentIndex].title}
                </motion.h2>
                
                <motion.p
                  className="text-sm md:text-base text-white/80 max-w-md mb-8 whitespace-pre-line"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {services[currentIndex].description}
                </motion.p>
                
                {/* Link button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <GlowButton 
                    text="TÌM HIỂU THÊM" 
                    onClick={() => router.push("/about")}
                    width="70%"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* CURRENT SLIDE IMAGE with animated width */}
            <motion.div
              className="relative bg-gray-100 z-20 overflow-hidden"
              initial={{
                width: isMobile ? "100%" : "50%",
                height: isMobile ? "50%" : "100%",
              }}
              animate={{
                width: isMobile ? "100%" : "50%",
                height: isMobile ? "50%" : "100%",
              }}
              exit={{
                width: isMobile ? "100%" : "50%",
                height: isMobile ? "0%" : "100%",
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {services[currentIndex] && (
                <motion.div 
                  className="w-full h-full"
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 5, ease: "easeInOut" }}
                >
                  <img
                    src={services[currentIndex].image || "/placeholder.svg"}
                    alt={services[currentIndex].title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
            </motion.div>

            {/* NEXT SLIDE PREVIEW with animated width */}
            <motion.div
              className="relative bg-black/80 z-10 overflow-hidden"
              initial={{
                width: isMobile ? "100%" : "12.5%",
                height: isMobile ? "0%" : "100%",
              }}
              animate={{
                width: isMobile ? "100%" : "12.5%",
                height: isMobile ? "0%" : "100%",
              }}
              exit={{
                width: isMobile ? "100%" : "12.5%",
                height: isMobile ? "0%" : "100%",
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {services[(currentIndex + 1) % services.length] && (
                <div className="w-full h-full relative opacity-70">
                  <div className="absolute inset-0 bg-black/50 mix-blend-multiply z-10"></div>
                  <img
                    src={services[(currentIndex + 1) % services.length].image || "/placeholder.svg"}
                    alt={services[(currentIndex + 1) % services.length].title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="absolute bottom-8 left-8 flex space-x-4 z-50">
        <button
          onClick={() => handleButtonClick("prev")}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronRight size={20} className="text-white rotate-180" />
        </button>
        <button
          onClick={() => handleButtonClick("next")}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={20} className="text-white" />
        </button>
      </div>

      {/* Navigation indicators */}
      <div className="absolute bottom-8 right-8 flex space-x-2 z-50">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isScrolling) {
                setCurrentIndex(index)
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white scale-125" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator for when all slides have been viewed */}
      {hasViewedAllSlides && currentIndex === services.length - 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/80 text-xs md:text-sm animate-bounce">
          Cuộn để tiếp tục
        </div>
      )}
    </div>
  )
}

export default ProjectSlider

