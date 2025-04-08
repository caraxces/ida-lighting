"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useSound } from "@/hooks/use-sound"
import { ChevronRight } from "lucide-react"

// Types
type Testimonial = {
  id: number
  title: string
  description: string
  image: string
  category: string
  year: string
  details?: string[]
}

// Sample data
const testimonials: Testimonial[] = [
  {
    id: 1,
    title: "Thiết Kế Xuất Sắc",
    description:
      "IDA Lighting đã biến đổi ngôi nhà của chúng tôi với các giải pháp chiếu sáng đổi mới. Sự chú ý đến từng chi tiết và các tùy chọn cá nhân hóa đã vượt quá mong đợi của chúng tôi.",
    image: "/home-page/_TRC7620.jpg",
    category: "Residential",
    year: "2023",
    details: ["Tích hợp Nhà Thông Minh", "Giám sát Năng Lượng", "Cài đặt Cảnh Quan", "Điều Khiển Bằng Giọng Nói"],
  },
  {
    id: 2,
    title: "Không Khí Hoàn Hảo",
    description:
      "Thiết kế chiếu sáng đã tạo ra bầu không khí hoàn hảo cho không gian sống của chúng tôi. Đội ngũ của họ đã hiểu chính xác những gì chúng tôi muốn và mang đến kết quả vượt ngoài mong đợi.",
    image: "/home-page/_TRC7706.jpg",
    category: "Residential",
    year: "2023",
    details: ["Cảm Biến Hiện Diện", "Tận Dụng Ánh Sáng Tự Nhiên", "Phân Tích Năng Lượng", "Điều Khiển Tập Trung"],
  },
  {
    id: 3,
    title: "Dịch Vụ Chuyên Nghiệp",
    description:
      "Từ tư vấn đến lắp đặt, IDA Lighting đã cung cấp dịch vụ xuất sắc. Chuyên môn và tính chuyên nghiệp của họ đã giúp toàn bộ quá trình diễn ra suôn sẻ.",
    image: "/home-page/_TRC7712.jpg",
    category: "Commercial",
    year: "2023",
    details: ["Giải Pháp Chiếu Sáng Trần Cao", "Chiếu Sáng Khẩn Cấp", "Chiếu Sáng Khu Vực Nguy Hiểm", "Bảo Trì Tự Động"],
  },
  {
    id: 4,
    title: "Tiết Kiệm Năng Lượng",
    description:
      "Chúng tôi đã thấy sự giảm đáng kể trong hóa đơn năng lượng kể từ khi triển khai giải pháp của IDA Lighting. Các tùy chọn thân thiện với môi trường của họ không làm giảm chất lượng hay tính thẩm mỹ.",
    image: "/home-page/_TRC7748-Pano.jpg",
    category: "Smart Lighting",
    year: "2023",
    details: ["Tích Hợp IoT", "Điều Khiển Qua Ứng Dụng Di Động", "Chiếu Sáng Thích Ứng", "Phân Tích Dự Đoán"],
  },
  {
    id: 5,
    title: "Kết Quả Tuyệt Đẹp",
    description:
      "Thiết kế chiếu sáng đã hoàn toàn biến đổi không gian của chúng tôi. Cách tiếp cận sáng tạo của IDA Lighting đã mang lại tầm nhìn của chúng tôi và làm nổi bật các đặc điểm kiến trúc mà chúng tôi không biết mình có!",
    image: "/home-page/271597302_464562588516617_461312111088783072_n.jpg",
    category: "Residential",
    year: "2022",
    details: ["Làm Nổi Bật Sản Phẩm", "Kiểm Soát Không Khí", "Hiệu Quả Năng Lượng", "Trải Nghiệm Khách Hàng"],
  },
  {
    id: 6,
    title: "Giải Pháp Sáng Tạo",
    description:
      "IDA Lighting đã mang đến những ý tưởng đổi mới cho không gian thách thức của chúng tôi. Các giải pháp tùy chỉnh của họ đã đáp ứng tất cả nhu cầu của chúng tôi đồng thời tạo thêm yếu tố thẩm mỹ đẹp mắt cho ngôi nhà.",
    image: "/home-page/272795484_476970173942525_8341974085553444627_n.jpg",
    category: "Residential",
    year: "2022",
    details: ["Thiết Bị Tùy Chỉnh", "Chiếu Sáng Tạo Cảm Xúc", "Điều Khiển Thông Minh", "Hiệu Quả Năng Lượng"],
  },
  {
    id: 7,
    title: "Giao Hàng Đúng Hẹn",
    description:
      "Dự án đã hoàn thành đúng lịch trình và trong phạm vi ngân sách. Đội ngũ IDA Lighting luôn phản hồi nhanh chóng và cập nhật thông tin cho chúng tôi trong suốt quá trình.",
    image: "/home-page/272896867_476969750609234_168858909764072575_n.jpg",
    category: "Commercial",
    year: "2023",
    details: ["Quản Lý Dự Án", "Kiểm Soát Ngân Sách", "Tuân Thủ Thời Gian", "Đảm Bảo Chất Lượng"],
  },
  {
    id: 8,
    title: "Chất Lượng Vượt Trội",
    description:
      "Chất lượng của cả sản phẩm và lắp đặt đã vượt quá mong đợi của chúng tôi. Hai năm sau, mọi thứ vẫn hoạt động hoàn hảo và trông đẹp như ngày đầu tiên.",
    image: "/home-page/272950380_476970063942536_1891645111920650179_n.jpg",
    category: "Residential",
    year: "2022",
    details: ["Sản Phẩm Cao Cấp", "Lắp Đặt Chuyên Nghiệp", "Độ Tin Cậy Lâu Dài", "Hỗ Trợ Bảo Hành"],
  },
  {
    id: 9,
    title: "Thiết Kế Đột Phá",
    description:
      "Không gian lỗi thời của chúng tôi đã được chuyển đổi hoàn toàn nhờ thiết kế của IDA Lighting. Hệ thống chiếu sáng đã trở thành điểm nhấn thu hút mỗi khi chúng tôi có khách.",
    image: "/home-page/272997168_476963463943196_4364219283871969024_n.jpg",
    category: "Residential",
    year: "2023",
    details: ["Tư Vấn Thiết Kế", "Giải Pháp Tùy Chỉnh", "Tăng Cường Thẩm Mỹ", "Chiếu Sáng Trọng Điểm"],
  },
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

  // Current and next testimonial (with safety check)
  const currentTestimonial = testimonials[activeIndex] || testimonials[0]
  const nextTestimonial = testimonials[(activeIndex + 1) % testimonials.length] || testimonials[0]

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

  // Handle scroll events to navigate through testimonials
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return

      // Check if we're in the viewport
      if (!sliderRef.current) return
      const rect = sliderRef.current.getBoundingClientRect()
      if (rect.top > window.innerHeight || rect.bottom < 0) return

      e.preventDefault()
      setIsScrolling(true)

      if (e.deltaY > 0 && activeIndex < testimonials.length - 1) {
        // Scroll down - go to next testimonial
        setActiveIndex((prev) => prev + 1)
        if (isSoundEnabled) playSound()
      } else if (e.deltaY < 0 && activeIndex > 0) {
        // Scroll up - go to previous testimonial
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
        if (activeIndex < testimonials.length - 1) {
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

  // Cập nhật useEffect để báo khi đến slide cuối
  useEffect(() => {
    // activeIndex === testimonials.length - 1 nghĩa là đang ở slide cuối cùng
    const isLastSlide = activeIndex === testimonials.length - 1;
    
    console.log("TestimonialSlider - Current slide:", activeIndex, "Is last slide:", isLastSlide);
    
    if (isLastSlide) {
      setHasViewedAllSlides(true);
    }
    
    // Thông báo cho parent component về trạng thái hiện tại
    if (onSlideChange) {
      onSlideChange(isLastSlide);
    }
  }, [activeIndex, onSlideChange, testimonials.length]);

  // Handle touch events for mobile swipe
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (!sliderRef.current) return
      const rect = sliderRef.current.getBoundingClientRect()
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return

      // If we've viewed all slides, allow normal scrolling
      if (hasViewedAllSlides && activeIndex === testimonials.length - 1) return

      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!sliderRef.current || touchStartY.current === null) return

      // If we've viewed all slides and are on the last slide, allow normal scrolling
      if (hasViewedAllSlides && activeIndex === testimonials.length - 1) return

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

        if (touchDiff > 0 && activeIndex < testimonials.length - 1) {
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
                  <div>PHẢN HỒI</div>
                  <div>TỪ IDA LIGHTING</div>
                </div>

                {/* Studio label */}
                <div className="absolute top-[10%] left-8 text-white/60 text-sm">
                  <div>Khách Hàng Hài Lòng</div>
                </div>

                {/* Bottom info row */}
                <div className="mt-auto flex justify-between items-end">
                  <div className="text-xs text-white/80 uppercase tracking-widest">ĐÁNH GIÁ KHÁCH HÀNG</div>

                  {/* Discover button */}
                  <Link
                    href={`/work/${currentTestimonial.category.toLowerCase()}`}
                    className="flex items-center text-white text-xs uppercase tracking-widest group"
                  >
                    <span>XEM DỰ ÁN</span>
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
              {currentTestimonial && (
                <img
                  src={currentTestimonial.image || "/placeholder.svg"}
                  alt={currentTestimonial.title}
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
              {nextTestimonial && (
                <div className="w-full h-full relative opacity-70">
                  <div className="absolute inset-0 bg-[#8B0000]/50 mix-blend-multiply z-10"></div>
                  <img
                    src={nextTestimonial.image || "/placeholder.svg"}
                    alt={nextTestimonial.title}
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
              {currentTestimonial.title}
            </h1>

            {/* Description underneath */}
            <motion.p
              className="text-white/80 text-[1.2rem] max-w-xs mx-8 md:ml-[calc(15%+2rem)] md:mr-16 mt-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {currentTestimonial.description.slice(0, 100)}...
            </motion.p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation indicators */}
      <div className="absolute bottom-8 right-8 flex space-x-2 z-50">
        {testimonials.map((_, index) => (
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
      {hasViewedAllSlides && activeIndex === testimonials.length - 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/80 text-xs md:text-sm animate-bounce">
          Cuộn để tiếp tục
        </div>
      )}
    </div>
  )
}

