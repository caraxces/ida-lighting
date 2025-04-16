"use client"

import { useState, useRef, useEffect, useCallback } from "react"
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
  description?: string
}

// Dữ liệu dịch vụ
const services: Service[] = [
  {
    id: 1,
    title: "Tư vấn thiết kế chiếu sáng",
    image: "/home-page/_TRC7620.jpg",
    category: "residential",
    description: "IDA LIGHTING mang đến các giải pháp thiết kế chiếu sáng chuyên nghiệp, phù hợp cho từng không gian kiến trúc như: Nhà ở, Văn phòng, Khách sạn, Resort nghỉ dưỡng, Nhà hàng... và các công trình Công cộng. Chúng tôi đảm bảo sự hài hòa giữa thẩm mỹ và công năng, tối ưu hóa ánh sáng để nâng cao trải nghiệm và tiết kiệm năng lượng."
  },
  {
    id: 2,
    title: "Cung cấp giải pháp chiếu sáng toàn diện",
    image: "/home-page/_TRC7706.jpg",
    category: "commercial",
    description: "Chiếu sáng không đơn thuần là ánh sáng mà còn là cách chúng ta kiểm soát và sử dụng ánh sáng như thế nào để phục vụ - nuông chiều cảm xúc của mình nhất. IDA cung cấp một giải pháp tổng thể cho công trình và tương thích với các ngôn ngữ điều khiển tân tiến nhất hiện nay."
  },
  {
    id: 3,
    title: "Bespoke Lighting",
    image: "/home-page/_TRC7712.jpg",
    category: "industrial",
    description: "IDA làm chủ được công nghệ sản xuất, lắp ráp tại Trung Quốc, các nước Châu Âu như Đức, Czech... với lựa chọn các nhà thầu cung cáp linh kiện - phụ kiện hàng đầu thế giới. Không chỉ mang lại những sản phẩm chất lượng cao mà chi phí phù hợp với thị trường Việt Nam, đáp ứng nhu cầu cá nhân hóa ngày càng được giới tinh hoa lựa chọn."
  },
  {
    id: 4,
    title: "Cung cấp thiết bị chiếu sáng",
    image: "/home-page/_TRC7748-Pano.jpg",
    category: "smart",
    description: "IDA LIGHTING mang đến những dòng sản phẩm đa dạng, đáp ứng đầu đủ nhu cầu chiếu sáng cho nhiều không gian khác nhau. Luôn lựa chọn và mang đến cho khách hàng những sản phẩm với tiêu chí: - Cùng một chất lượng thì chi phí thấp nhất. - Cùng một chi phí thì chất lượng cao nhất."
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
                width: isMobile ? "100%" : "30%",
                height: isMobile ? "50%" : "100%",
              }}
              animate={{
                width: isMobile ? "100%" : "30%",
                height: isMobile ? "50%" : "100%",
              }}
              exit={{
                width: isMobile ? "100%" : "30%",
                height: isMobile ? "0%" : "100%",
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Color block content - simplified, removed small labels */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Link button */}
                <Link
                  href={`/work/${services[currentIndex].category}`}
                  className="absolute bottom-8 right-8 flex items-center text-white text-sm uppercase tracking-widest group"
                >
                  <span>TÌM HIỂU THÊM</span>
                  <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
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
                <img
                  src={services[currentIndex].image || "/placeholder.svg"}
                  alt={services[currentIndex].title}
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>

            {/* NEXT SLIDE PREVIEW with animated width */}
            <motion.div
              className="relative bg-black/80 z-10 overflow-hidden"
              initial={{
                width: isMobile ? "100%" : "20%",
                height: isMobile ? "0%" : "100%",
              }}
              animate={{
                width: isMobile ? "100%" : "20%",
                height: isMobile ? "0%" : "100%",
              }}
              exit={{
                width: isMobile ? "100%" : "20%",
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

          {/* Service Title - Positioned on top of everything with higher z-index */}
          <motion.div
            className="absolute z-40 left-0 right-0"
            style={{
              top: isMobile ? "25%" : "40%",
            }}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1
              className="text-4xl md:text-6xl lg:text-[40px] font-black text-white leading-none mx-8 md:ml-[calc(15%)] md:mr-16"
              style={{
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "-0.02em",
                textShadow: "0 2px 10px rgba(0,0,0,0.2)",
              }}
            >
              {services[currentIndex].title}
              {services[currentIndex].description && (
                <p className="text-base md:text-lg mt-4 font-normal max-w-2xl">
                  {services[currentIndex].description}
                </p>
              )}
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

