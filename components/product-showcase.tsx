"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ChevronRight } from "lucide-react"
import AnimatedTitle from "./animated-title"
import FloatingElements from "./floating-elements"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Image array - có thể được thay đổi sau
const images = [
  "/home-page/3.1.png",
  "/home-page/6.png",
  "/home-page/3.png",
]

// Add Mobile Product Showcase component inside this file
function MobileProductShowcase({ hasLoaded, page, direction, paginate, images }: { 
  hasLoaded: boolean;
  page: number;
  direction: number;
  paginate: (direction: number) => void;
  images: string[];
}) {
  // Get previous and next slide indices
  const getPrevSlide = (current: number) => (current - 1 + images.length) % images.length
  const getNextSlide = (current: number) => (current + 1) % images.length
  
  // State for animation
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()

  // Auto-slide functionality
  useEffect(() => {
    const autoSlideTimer = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true)
        paginate(1)
        setTimeout(() => {
          setIsAnimating(false)
        }, 600)
      }
    }, 2000)

    return () => clearInterval(autoSlideTimer)
  }, [page, isAnimating, paginate])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-r from-black via-black to-[#8B2323]"
    >
      {/* Loading animation */}
      <AnimatePresence>
        {!hasLoaded && (
          <motion.div
            className="absolute inset-0 z-50 bg-gradient-to-r from-black via-black to-[#8B2323] flex items-center justify-center"
            exit={{
              opacity: 0,
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              }}
              exit={{
                opacity: 0,
                scale: 1.2,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              }}
              className="text-white text-4xl font-bold"
            >
              IDA Collection
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content container - mobile optimized with no padding */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Top section with text - compact */}
        <div className="flex flex-col px-3 pt-24">
          {/* Small header text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center text-white/70 text-xs tracking-wider"
          >
            {/* Date and collection info removed */}
          </motion.div>

          {/* Main title - smaller for mobile */}
          <div className="mt-1">
            <AnimatedTitle>
              {/* <span className="text-3xl block text-white">Our</span> */}
              <span className="text-3xl font-extrabold text-white">OUTDOOR</span>
              <span className="text-3xl text-white">LIGHTING.</span>
            </AnimatedTitle>
          </div>

          {/* Description text - shortened for mobile */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-1"
          >
            <p className="text-white/80 text-xs leading-relaxed">
              Hệ thống chiếu sáng ngoài trời của IDA LIGHTING kết hợp giữa thiết kế tinh tế và công nghệ bền bỉ, 
              tạo nên điểm nhấn hoàn hảo cho cảnh quan của bạn.
            </p>
            
            {/* CTA Button - moved directly under description text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-4"
            >
              <button 
                onClick={() => router.push("/collections")}
                className="relative px-4 py-1.5 text-[14px] font-medium text-white transition-all duration-300 rounded-sm inline-block"
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
          </motion.div>
        </div>

        {/* Middle section with carousel */}
        <div className="flex-1 flex items-center justify-center mt-[-5%]">
          <div className="relative z-50 w-full max-w-[95vw] flex justify-center overflow-visible">
            <div className="relative w-full h-[280px] overflow-visible">
              {/* Carousel Track */}
              <div className="absolute w-full h-full flex items-center justify-center">
                {/* Previous Slide (Left) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`prev-${page}`}
                    initial={{ x: "-100%", opacity: 0, scale: 0.8 }}
                    animate={{
                      x: "-60%",
                      opacity: 0.8,
                      scale: 0.8,
                      rotateY: 15,
                    }}
                    exit={{ x: "-120%", opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute transform-gpu"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Image
                      src={images[getPrevSlide(page)] || "/placeholder.svg"}
                      alt={`IDA Lighting - Previous Product`}
                      width={250}
                      height={250}
                      className="object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
                      draggable={false}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Current Slide (Center) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`current-${page}`}
                    initial={{ x: "100%", opacity: 0, scale: 0.8 }}
                    animate={{
                      x: "0%",
                      opacity: 1,
                      scale: 1,
                      rotateY: 0,
                    }}
                    exit={{ x: "-100%", opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute transform-gpu"
                    style={{ transformStyle: "preserve-3d", zIndex: 10 }}
                  >
                    <Image
                      src={images[page] || "/placeholder.svg"}
                      alt={`IDA Lighting - Current Product`}
                      width={350}
                      height={350}
                      priority
                      className="object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.3)]"
                      draggable={false}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Next Slide (Right) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`next-${page}`}
                    initial={{ x: "100%", opacity: 0, scale: 0.8 }}
                    animate={{
                      x: "60%",
                      opacity: 0.8,
                      scale: 0.8,
                      rotateY: -15,
                    }}
                    exit={{ x: "120%", opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute transform-gpu"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Image
                      src={images[getNextSlide(page)] || "/placeholder.svg"}
                      alt={`IDA Lighting - Next Product`}
                      width={250}
                      height={250}
                      className="object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
                      draggable={false}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section without navigation buttons */}
        <div className="flex flex-col items-center pb-6">
          {/* Slide indicators */}
          <div className="flex gap-2 z-20 mb-6">
            {images.map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className={`h-1.5 rounded-full transition-all ${page === index ? "w-5 bg-white" : "w-1.5 bg-white/50"}`}
                aria-label={`Slide ${index + 1}`}
                aria-current={page === index ? "true" : "false"}
              />
            ))}
          </div>
        </div>

        {/* Page indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-4 right-4 text-[#8B2323]/70 text-xs"
        >
          {String(page + 1).padStart(2, "0")} of {String(images.length).padStart(2, "0")}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function ProductShowcase() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6])

  // Track cursor for spotlight effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setCursorPosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  // Set loaded state after initial render
  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Get previous and next slide indices
  const getPrevSlide = (current: number) => (current - 1 + images.length) % images.length
  const getNextSlide = (current: number) => (current + 1) % images.length

  // Handle slide change
  const goToNextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(getNextSlide(currentSlide))

    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }

  const goToPrevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(getPrevSlide(currentSlide))

    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }

  // Auto-slide functionality
  useEffect(() => {
    const autoSlideTimer = setInterval(() => {
      if (!isAnimating) {
        goToNextSlide()
      }
    }, 2000)

    return () => clearInterval(autoSlideTimer)
  }, [currentSlide, isAnimating])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevSlide()
      } else if (e.key === "ArrowRight") {
        goToNextSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlide, isAnimating])

  // Handle touch events
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartX.current || !touchStartY.current) return

      const touchCurrentX = e.touches[0].clientX
      const touchCurrentY = e.touches[0].clientY

      const diffX = touchStartX.current - touchCurrentX
      const diffY = touchStartY.current - touchCurrentY

      // Chỉ chặn vuốt ngang, cho phép vuốt dọc
      // Nếu chuyển động ngang lớn hơn chuyển động dọc và đủ lớn để được coi là vuốt
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartX.current) return

      const touchEndX = e.changedTouches[0].clientX
      const diffX = touchStartX.current - touchEndX

      // Swipe detection
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          goToNextSlide()
        } else {
          goToPrevSlide()
        }
      }

      touchStartX.current = null
      touchStartY.current = null
    }

    // Thêm event listeners vào component
    if (containerRef.current) {
      containerRef.current.addEventListener("touchstart", handleTouchStart, { passive: true })
      containerRef.current.addEventListener("touchmove", handleTouchMove, { passive: false })
      containerRef.current.addEventListener("touchend", handleTouchEnd, { passive: true })
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("touchstart", handleTouchStart)
        containerRef.current.removeEventListener("touchmove", handleTouchMove)
        containerRef.current.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentSlide, isAnimating])

  // Thêm useEffect để kiểm tra kích thước màn hình
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px là breakpoint cho mobile
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <>
      {isMobile ? (
        <MobileProductShowcase
          hasLoaded={hasLoaded}
          page={currentSlide}
          direction={1}
          paginate={goToNextSlide}
          images={images}
        />
      ) : (
        <motion.div
          ref={containerRef}
          style={{ opacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={cn(
            "relative w-full min-h-screen overflow-hidden bg-gradient-to-r from-black via-black to-[#8B2323]",
            hasLoaded ? "transition-all duration-1000" : "",
          )}
          onMouseEnter={() => {
            setIsHovering(true)
          }}
          onMouseLeave={() => {
            setIsHovering(false)
          }}
          onMouseMove={handleMouseMove}
        >
          {/* Loading animation */}
          <AnimatePresence>
            {!hasLoaded && (
              <motion.div
                className="absolute inset-0 z-50 bg-gradient-to-r from-black via-black to-[#8B2323] flex items-center justify-center"
                exit={{
                  opacity: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.2,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  }}
                  className="text-white text-4xl font-bold"
                >
                  IDA Collection
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Spotlight effect */}
          {isHovering && (
            <div
              className="absolute inset-0 pointer-events-none z-5 opacity-30 hidden md:block"
              style={{
                background: `radial-gradient(circle at ${cursorPosition.x}% ${cursorPosition.y}%, rgba(255,255,255,0.8) 0%, transparent 20%)`,
              }}
            />
          )}

          {/* Floating elements */}
          <FloatingElements />

          {/* Grid lines overlay with parallax */}
          <motion.div
            style={{ y: backgroundY }}
            className="absolute inset-0 grid grid-cols-12 z-10 pointer-events-none"
          >
            {Array(13)
              .fill(0)
              .map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-full w-px bg-white/10"
                  style={{ marginLeft: `${(i * 100) / 12}%` }}
                />
              ))}
          </motion.div>

          {/* Content container */}
          <div className="relative z-10 grid md:grid-cols-12 grid-cols-1 min-h-screen">
            {/* Left section with text - stacks on mobile */}
            <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-center md:pl-16 px-6 pt-24 md:pt-0 pb-16 md:pb-0">
              {/* Small header text with reveal animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center text-white/70 md:text-[#8B2323]/70 text-xs mb-4 md:mb-8 tracking-wider"
              >
                {/* Date and collection info removed */}
              </motion.div>

              {/* Main title with 3D effect */}
              <div className="mb-4">
                <AnimatedTitle>
                  {/* <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl block text-white">Our</span> */}
                  <span className="text-[36px] text-white inline-block">OUTDOOR LIGHTING.</span>
                </AnimatedTitle>
              </div>

              {/* Description text with reveal animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-4 md:mt-8 mb-6 md:mb-10 max-w-md"
              >
                <h3 className="text-white font-medium mb-2">Illuminate your outdoor spaces</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Hệ thống chiếu sáng ngoài trời của IDA LIGHTING kết hợp giữa thiết kế tinh tế và công nghệ bền bỉ, 
                  tạo nên điểm nhấn hoàn hảo cho cảnh quan sân vườn. Với khả năng chống chịu thời tiết khắc nghiệt 
                  và hiệu suất năng lượng tối ưu, các sản phẩm đèn sân vườn của chúng tôi không chỉ làm đẹp không gian 
                  mà còn nâng cao an ninh và tạo ra bầu không khí ấm cúng cho những buổi tối ngoài trời.
                </p>
              </motion.div>

              {/* CTA Button with 3D effect and hover animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <button 
                  onClick={() => router.push("/collections")}
                  className="relative px-4 py-1.5 text-[14px] font-medium text-white transition-all duration-300 rounded-sm inline-block"
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

            {/* Center/Right section with carousel */}
            <div className="md:col-span-7 lg:col-span-8 relative flex items-center justify-center md:justify-start">
              {/* Carousel Container */}
              <div
                ref={carouselRef}
                className="relative z-50 md:ml-[100px] lg:ml-[100px] w-full max-w-[80vw] md:max-w-none lg:max-w-none xl:max-w-none flex justify-center overflow-visible"
              >
                <div className="relative w-full h-[400px] md:h-[600px] lg:h-[800px] overflow-visible">
                  {/* Carousel Track */}
                  <div className="absolute w-full h-full flex items-center justify-center">
                    {/* Previous Slide (Left) */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`prev-${currentSlide}`}
                        initial={{ x: "-100%", opacity: 0, scale: 0.8 }}
                        animate={{
                          x: "-60%",
                          opacity: 0.8,
                          scale: 0.8,
                          rotateY: 15,
                        }}
                        exit={{ x: "-120%", opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute transform-gpu"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <Image
                          src={images[getPrevSlide(currentSlide)] || "/placeholder.svg"}
                          alt={`IDA Lighting - Previous Product`}
                          width={350}
                          height={350}
                          className="object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
                          draggable={false}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Current Slide (Center) */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`current-${currentSlide}`}
                        initial={{ x: "100%", opacity: 0, scale: 0.8 }}
                        animate={{
                          x: "0%",
                          opacity: 1,
                          scale: 1,
                          rotateY: 0,
                        }}
                        exit={{ x: "-100%", opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute transform-gpu"
                        style={{ transformStyle: "preserve-3d", zIndex: 10 }}
                      >
                        <Image
                          src={images[currentSlide] || "/placeholder.svg"}
                          alt={`IDA Lighting - Current Product`}
                          width={500}
                          height={500}
                          priority
                          className="object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.3)]"
                          draggable={false}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Next Slide (Right) */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`next-${currentSlide}`}
                        initial={{ x: "100%", opacity: 0, scale: 0.8 }}
                        animate={{
                          x: "60%",
                          opacity: 0.8,
                          scale: 0.8,
                          rotateY: -15,
                        }}
                        exit={{ x: "120%", opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute transform-gpu"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <Image
                          src={images[getNextSlide(currentSlide)] || "/placeholder.svg"}
                          alt={`IDA Lighting - Next Product`}
                          width={350}
                          height={350}
                          className="object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
                          draggable={false}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide indicators with animations */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className={`h-2 rounded-full transition-all ${currentSlide === index ? "w-6 md:w-8 bg-white" : "w-2 bg-white/50"}`}
                aria-label={`Slide ${index + 1}`}
                aria-current={currentSlide === index ? "true" : "false"}
              />
            ))}
          </div>

          {/* Page indicator with animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-6 md:top-16 right-6 md:right-16 text-[#8B2323]/70 text-xs"
          >
            {String(currentSlide + 1).padStart(2, "0")} of {String(images.length).padStart(2, "0")}
          </motion.div>
        </motion.div>
      )}
    </>
  )
} 