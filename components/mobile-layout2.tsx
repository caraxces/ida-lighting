"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft } from "lucide-react"
import AnimatedTitle from "./animated-title"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import GlowButton from "./glow-button"

// Props for the mobile layout
interface MobileLayoutProps {
  hasLoaded: boolean
  page: number
  direction: number
  paginate: (direction: number) => void
  // playSound: () => void
  images: string[]
}

export default function MobileLayout2({ hasLoaded, page, direction, paginate, images }: MobileLayoutProps) {
  // Get previous and next slide indices
  const getPrevSlide = (current: number) => (current - 1 + images.length) % images.length
  const getNextSlide = (current: number) => (current + 1) % images.length
  
  // State for animation
  const [isAnimating, setIsAnimating] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const router = useRouter()

  // Auto-slide functionality
  useEffect(() => {
    const autoSlideTimer = setInterval(() => {
      if (!isAnimating && !isZoomed) {
        setIsAnimating(true)
        paginate(1)
        setTimeout(() => {
          setIsAnimating(false)
        }, 600)
      }
    }, 5000)

    return () => clearInterval(autoSlideTimer)
  }, [page, isAnimating, isZoomed, paginate])

  // Handle image tap to zoom
  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

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
            className="absolute inset-0 z-50 bg-[#FFDAB9] flex items-center justify-center"
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
              className="text-[#8B2323] text-4xl font-bold"
            >
              IDA Lighting
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content container - mobile optimized with no padding */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Top section with text - compact */}
        <div className="flex flex-col px-3 pt-16">
          {/* Small header text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center text-white/70 text-xs tracking-wider"
          >
            {/* Date and attribution removed */}
          </motion.div>

          {/* Main title - smaller for mobile */}
          <div className="mt-1">
              <span className="text-white uppercase text-[1.5rem] whitespace-nowrap overflow-hidden text-ellipsis pb-3">BESPOKE LIGHTING</span>
          </div>

          {/* Description text - shortened for mobile */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-1 mb-2"
          >
            {/* <h3 className="text-white font-medium">Your light - Your style.</h3> */}
            <p className="text-white/80 text-xs leading-relaxed">
              Hệ thống đèn trang trí cao cấp của IDA LIGHTING là sự giao thoa tinh tế giữa nghệ thuật ánh sáng và công nghệ cá nhân hoá hiện đại, tạo nên những trải nghiệm độc bản dành riêng cho từng gia chủ.
            </p>
          </motion.div>

          {/* CTA Button - moved below description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-3 mb-3"
          >
            <GlowButton 
              text="XEM THÊM" 
              onClick={() => router.push("/products")}
              className="w-auto inline-block"
            />
          </motion.div>
        </div>

        {/* Enhanced image carousel section */}
        <div className="flex-1 flex items-center justify-center mt-0">
          {/* Updated carousel container to take more vertical space */}
          <div className="relative z-50 w-full h-[60vh] max-h-[450px] flex justify-center">
            <div className="relative w-full h-full">
              {/* Navigation buttons - now appearing on sides of the image */}
              <div className="absolute inset-x-0 top-1/2 -mt-4 px-2 flex justify-between z-[9999] pointer-events-none isolation-auto">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-lg pointer-events-auto"
                  onClick={() => {
                    if (!isAnimating && !isZoomed) {
                      setIsAnimating(true)
                      paginate(-1)
                      setTimeout(() => setIsAnimating(false), 600)
                    }
                  }}
                >
                  <ChevronLeft className="h-4 w-4 text-[#8B2323]" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-lg pointer-events-auto"
                  onClick={() => {
                    if (!isAnimating && !isZoomed) {
                      setIsAnimating(true)
                      paginate(1)
                      setTimeout(() => setIsAnimating(false), 600)
                    }
                  }}
                >
                  <ChevronRight className="h-4 w-4 text-[#8B2323]" />
                </motion.button>
              </div>

              {isZoomed && (
                <div 
                  className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
                  onClick={toggleZoom}
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="w-[90vw] h-[90vw] relative flex items-center justify-center"
                  >
                    <Image
                      src={images[page] || "/placeholder.svg"}
                      alt={`IDA Lighting - Current Slide`}
                      fill
                      className="object-contain"
                      style={{
                        maxWidth: '100%', 
                        maxHeight: '100%',
                        aspectRatio: '1/1'
                      }}
                      draggable={false}
                      sizes="90vw"
                    />
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B2323" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </motion.button>
                  </motion.div>
                </div>
              )}

              {/* Carousel Track - Centered with full height */}
              <div className="absolute w-full h-full flex items-center justify-center">
                {/* Previous Slide (Left) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`prev-${page}`}
                    initial={{ x: "-130%", opacity: 0, scale: 0.6 }}
                    animate={{
                      x: "-85%",
                      opacity: 0.4,
                      scale: 0.6,
                      rotateY: 25,
                    }}
                    exit={{ x: "-130%", opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute transform-gpu"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="relative w-[160px] h-[160px] flex items-center justify-center">
                      <Image
                        src={images[getPrevSlide(page)] || "/placeholder.svg"}
                        alt={`IDA Lighting - Previous Slide`}
                        width={160}
                        height={160}
                        className="object-contain brightness-75 contrast-75 drop-shadow-[0_5px_5px_rgba(0,0,0,0.2)]"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          aspectRatio: '1/1',
                          objectFit: 'contain'
                        }}
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-xl" />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Current Slide (Center) - Enhanced size and effects with tap to zoom */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`current-${page}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotateY: 0,
                    }}
                    exit={{ x: "-100%", opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute transform-gpu cursor-pointer"
                    style={{ transformStyle: "preserve-3d", zIndex: 10 }}
                    onClick={toggleZoom}
                  >
                    <div className="relative">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="w-[280px] h-[280px] flex items-center justify-center"
                      >
                        <Image
                          src={images[page] || "/placeholder.svg"}
                          alt={`IDA Lighting - Current Slide`}
                          width={280}
                          height={280}
                          priority
                          className="object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.3)]"
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            aspectRatio: '1/1',
                            objectFit: 'contain'
                          }}
                          draggable={false}
                        />
                      </motion.div>
                      {/* Enhanced glow effect around the current image */}
                      <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl -z-10" />
                      <div className="absolute inset-0 rounded-full bg-[#FFDAB9]/5 blur-xl -z-10" />
                      {/* Tap to zoom indicator */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/60 px-2 py-0.5 rounded-full text-xs text-white flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          <line x1="11" y1="8" x2="11" y2="14"></line>
                          <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                        <span>Tap to zoom</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Next Slide (Right) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`next-${page}`}
                    initial={{ x: "130%", opacity: 0, scale: 0.6 }}
                    animate={{
                      x: "85%",
                      opacity: 0.4,
                      scale: 0.6,
                      rotateY: -25,
                    }}
                    exit={{ x: "130%", opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute transform-gpu"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="relative w-[160px] h-[160px] flex items-center justify-center">
                      <Image
                        src={images[getNextSlide(page)] || "/placeholder.svg"}
                        alt={`IDA Lighting - Next Slide`}
                        width={160}
                        height={160}
                        className="object-contain brightness-75 contrast-75 drop-shadow-[0_5px_5px_rgba(0,0,0,0.2)]"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          aspectRatio: '1/1',
                          objectFit: 'contain'
                        }}
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-xl" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with indicators */}
        <div className="flex flex-col items-center pb-6 px-3">
          {/* Slide indicators */}
          <div className="flex gap-2 z-20">
            {images.map((_, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className={`h-1.5 rounded-full transition-all ${page === index ? "w-5 bg-white" : "w-1.5 bg-white/50"}`}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true)
                    paginate(index - page)
                    setTimeout(() => setIsAnimating(false), 600)
                  }
                }}
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
          className="absolute top-4 right-4 text-[#FFDAB9]/70 text-xs"
        >
          {String(page + 1).padStart(2, "0")} of {String(images.length).padStart(2, "0")}
        </motion.div>
      </div>
    </motion.div>
  )
}

