"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ChevronRight, ChevronLeft } from "lucide-react"
import AnimatedTitle from "./animated-title"
import { useSound } from "@/hooks/use-sound"
import FloatingElements from "./floating-elements"
import { cn } from "@/lib/utils"
import MobileLayout2 from "./mobile-layout2"
import Link from "next/link"
import { useRouter } from "next/navigation"
import GlowButton from "./glow-button"

// Image array
const images = [
  // "/slides/1.png", // Renamed from 1.png
  "/home-page/4ae1bc8666-1.png",
  "/home-page/4ff8136e05-1.png",
  "/home-page/155a8c6b92-1.png",
]

export default function SecondElementHpage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  // const { playSound } = useSound()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
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
    // playSound()

    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }

  const goToPrevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(getPrevSlide(currentSlide))
    // playSound()

    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }

  // Auto-slide functionality
  useEffect(() => {
    if (isPaused) return

    const autoSlideTimer = setInterval(() => {
      if (!isAnimating) {
        goToNextSlide()
      }
    }, 5000)

    return () => clearInterval(autoSlideTimer)
  }, [currentSlide, isAnimating, isPaused])

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
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      {isMobile ? (
        <MobileLayout2
          hasLoaded={hasLoaded}
          page={currentSlide}
          direction={1}
          paginate={goToNextSlide}
          // playSound={playSound}
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
            setIsPaused(true)
            setIsHovering(true)
          }}
          onMouseLeave={() => {
            setIsPaused(false)
            setIsHovering(false)
          }}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
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
                  IDA Lighting
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
          <motion.div style={{ y: backgroundY }} className="absolute inset-0 grid grid-cols-12 z-10 pointer-events-none">
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
                  style={{ marginLeft: `${(i as number) * 100 / 12}%` }}
                />
              ))}
          </motion.div>

          {/* Background gradient with parallax and fade-in - INVERTED POSITION AND COLOR - REMOVED */}

          {/* Content container */}
          <div className="relative z-10 grid md:grid-cols-12 grid-cols-1 min-h-screen">
            {/* Left section with image - INVERTED FROM RIGHT TO LEFT */}
            <div className="md:col-span-7 lg:col-span-8 relative flex items-center justify-center md:justify-end order-2 md:order-1">
              {/* Carousel Container */}
              <div
                ref={carouselRef}
                className="relative z-10 md:mr-[100px] lg:mr-[100px] w-full max-w-[80vw] md:max-w-[50vw] lg:max-w-[45vw] xl:max-w-[40vw] flex justify-center overflow-visible"
              >
                <div className="relative w-full h-[400px] md:h-[600px] overflow-visible">
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
                          alt={`IDA Lighting - Previous Slide`}
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
                          alt={`IDA Lighting - Current Slide`}
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
                          alt={`IDA Lighting - Next Slide`}
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

            {/* Right section with text - INVERTED FROM LEFT TO RIGHT */}
            <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-center md:pr-16 px-6 pt-24 md:pt-0 pb-16 md:pb-0 order-1 md:order-2">
              {/* Small header text with reveal animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center text-white/70 md:text-[#FFDAB9]/70 text-xs mb-4 md:mb-8 tracking-wider"
              >
                {/* Date and attribution removed */}
              </motion.div>

              {/* Main title with 3D effect */}
              <div className="mb-4">
                <AnimatedTitle>
                  {/* <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl block text-white">This is</span> */}
                  <span className="text-[36px] font-extrabold text-white">BESPOKE LIGHTING</span>                </AnimatedTitle>
              </div>

              {/* Description text with reveal animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-4 md:mt-8 mb-6 md:mb-10 max-w-md"
              >
                {/* <h3 className="text-white font-medium mb-2">Your light - Your style.</h3> */}
                <p className="text-white/80 text-sm leading-relaxed">
                Hệ thống đèn trang trí cao cấp của IDA LIGHTING là sự giao thoa tinh tế giữa nghệ thuật ánh sáng và công nghệ cá nhân hoá hiện đại, tạo nên những trải nghiệm độc bản dành riêng cho từng gia chủ. Mỗi thiết kế được chăm chút tỉ mỉ từ kiểu dáng, chất liệu đến nhịp điệu ánh sáng, đảm bảo sự hòa quyện tuyệt đối với không gian sống và phong cách thẩm mỹ riêng biệt của từng gia đình. Không chỉ là thiết bị chiếu sáng, sản phẩm của IDA LIGHTING còn là tác phẩm nghệ thuật treo trần, khơi dậy cảm xúc, thể hiện cá tính và nâng tầm đẳng cấp cho mọi không gian nội thất.
                </p>
              </motion.div>

              {/* CTA Button with 3D effect and hover animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <GlowButton 
                  text="XEM THÊM" 
                  onClick={() => router.push("/products")}
                  className="inline-block"
                />
              </motion.div>
            </div>
          </div>

          {/* Navigation buttons with hover effects - MOVED TO LEFT SIDE */}
          <div className="flex flex-col gap-4 z-20 m-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform transition-all hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFDAB9]"
              onClick={goToPrevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-[#8B2323]" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform transition-all hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFDAB9]"
              onClick={goToNextSlide}
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-[#8B2323]" />
            </motion.button>
          </div>

          {/* Slide indicators with animations */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className={`h-2 rounded-full transition-all ${currentSlide === index ? "w-6 md:w-8 bg-white" : "w-2 bg-white/50"}`}
                onClick={() => {
                  // playSound()
                  setIsAnimating(true)
                  setCurrentSlide(index)
                  setTimeout(() => setIsAnimating(false), 600)
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={currentSlide === index ? "true" : "false"}
              />
            ))}
          </div>

          {/* Left side text with parallax - INVERTED FROM RIGHT TO LEFT
          <motion.div
            style={{ y: backgroundY }}
            className="hidden md:block absolute left-16 top-1/2 transform -translate-y-1/2 text-[#FFDAB9]/20 text-6xl lg:text-8xl font-bold leading-none z-10"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="rotate-90 origin-center whitespace-nowrap"
            >
              Scan
              <br />
              Wow
            </motion.div>
          </motion.div> */}

          {/* Page indicator with animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-6 md:top-16 left-6 md:left-16 text-[#FFDAB9]/70 text-xs"
          >
            {String(currentSlide + 1).padStart(2, "0")} of {String(images.length).padStart(2, "0")}
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

