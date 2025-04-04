"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft } from "lucide-react"
import AnimatedTitle from "./animated-title"

// Props for the mobile layout
interface MobileLayoutProps {
  hasLoaded: boolean
  page: number
  direction: number
  paginate: (direction: number) => void
  playSound: () => void
  images: string[]
}

export default function MobileLayout({ hasLoaded, page, direction, paginate, playSound, images }: MobileLayoutProps) {
  // Mobile-specific slide variants
  const mobileSlideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full min-h-screen overflow-hidden bg-[#FFDAB9]"
    >
      {/* Loading animation */}
      <AnimatePresence>
        {!hasLoaded && (
          <motion.div
            className="absolute inset-0 z-50 bg-[#8B2323] flex items-center justify-center"
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

      {/* Background gradient - 70% red, 30% peach */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-0 top-0 h-full w-[70%] bg-gradient-to-r from-[#8B2323] via-[#A52A2A] to-[#CD5C5C] z-0">
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 opacity-70" />
        </div>
      </div>

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
              <span className="text-3xl block text-white">This is</span>
              <span className="text-3xl font-extrabold italic text-white">IDA</span>
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
              IDA's commitment to creating unique, responsible lighting solutions.
            </p>
          </motion.div>
        </div>

        {/* Middle section with image - moved up and centered */}
        <div className="flex-1 flex items-center justify-center mt-[-5%]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={mobileSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative z-10 w-full flex justify-center"
              drag={false}
            >
              <Image
                src={images[page] || "/placeholder.svg"}
                alt={`IDA Lighting - Slide ${page + 1}`}
                width={570} // 5% smaller (600 * 0.95 = 570)
                height={570}
                priority={page === 0}
                className="drop-shadow-[0_20px_20px_rgba(0,0,0,0.25)] object-contain"
                sizes="95vw"
                style={{
                  maxHeight: "40vh",
                  objectFit: "contain",
                }}
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom section with navigation - compact */}
        <div className="flex flex-col items-center pb-6">
          {/* Navigation buttons - horizontal layout for mobile */}
          <div className="flex flex-row gap-4 z-20 mb-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
              onClick={() => {
                paginate(-1)
                playSound()
              }}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4 text-[#CD5C5C]" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
              onClick={() => {
                paginate(1)
                playSound()
              }}
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4 text-[#CD5C5C]" />
            </motion.button>
          </div>

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
                  playSound()
                  paginate(index > page ? 1 : -1)
                }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={page === index ? "true" : "false"}
              />
            ))}
          </div>
        </div>

        {/* CTA Button - moved to bottom for better thumb reach */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-16 left-3 z-20"
        >
          <Button
            variant="ghost"
            className="w-fit text-white hover:bg-white/10 hover:text-white group transition-all duration-300 shadow-[0_4px_8px_rgba(0,0,0,0.1)] px-0 relative overflow-hidden"
          >
            <span className="border-b border-white/40 pb-1 flex items-center relative z-10">
              See collection
              <ChevronRight className="ml-2 h-4 w-4" />
            </span>
          </Button>
        </motion.div>

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

