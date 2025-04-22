"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft } from "lucide-react"
import AnimatedTitle from "./animated-title"
import { useState, useEffect } from "react"
import Link from "next/link"

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
    }, 5000)

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

      {/* Background gradient overlay - removed previous gradient */}

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
            <span>2019</span>
            <span className="mx-2">—</span>
            <span>Duong Nguyen</span>
          </motion.div>

          {/* Main title - smaller for mobile */}
          <div className="mt-1">
            <AnimatedTitle>
              {/* <span className="text-3xl block text-white">This is</span> */}
              <span className="text-3xl font-extrabold text-white">IDA</span>
              <span className="text-3xl text-white"> Lighting.</span>
            </AnimatedTitle>
          </div>

          {/* Description text - shortened for mobile */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-1"
          >
            <h3 className="text-white font-medium">Your light - Your style.</h3>
            <p className="text-white/80 text-xs leading-relaxed">
              Hệ thống đèn trang trí cao cấp của IDA LIGHTING là sự giao thoa tinh tế giữa nghệ thuật ánh sáng và công nghệ cá nhân hoá hiện đại, tạo nên những trải nghiệm độc bản dành riêng cho từng gia chủ. Mỗi thiết kế được chăm chút tỉ mỉ từ kiểu dáng đến chất liệu.
            </p>
            
            {/* CTA Button - moved directly under description text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-4"
            >
              <Link href="/products">
                <Button
                  variant="ghost"
                  className="w-fit text-white hover:bg-white/10 hover:text-white group transition-all duration-300 shadow-[0_4px_8px_rgba(0,0,0,0.1)] px-0 relative overflow-hidden"
                > 
                  <span className="border-b border-white/40 pb-1 flex items-center relative z-10">
                    See collection
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </span>
                </Button>
              </Link>
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
                      alt={`IDA Lighting - Previous Slide`}
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
                      alt={`IDA Lighting - Current Slide`}
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
                      alt={`IDA Lighting - Next Slide`}
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
          className="absolute top-4 right-4 text-[#FFDAB9]/70 text-xs"
        >
          {String(page + 1).padStart(2, "0")} of {String(images.length).padStart(2, "0")}
        </motion.div>
      </div>
    </motion.div>
  )
}

