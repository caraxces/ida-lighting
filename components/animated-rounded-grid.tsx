"use client"

import type React from "react"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useCallback, useEffect } from "react"

// Add keyframe animation for RGB border
const rgbAnimation = `
@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
`

interface AnimatedRoundedGridProps {
  images: {
    src: string
    alt: string
    location?: string
    address?: string
    client?: string
    area?: string
    constructionTime?: string
    lightingTypes?: string[]
    designer?: string
    photographer?: string
    onClick?: (image: any) => void
  }[]
  className?: string
}

export function AnimatedRoundedGrid({ images, className }: AnimatedRoundedGridProps) {
  const [selectedImage, setSelectedImage] = useState<AnimatedRoundedGridProps["images"][0] | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 })
  const [isClosing, setIsClosing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  // Add style element for keyframe animation
  useEffect(() => {
    setIsMounted(true)
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (isMounted) {
      const styleElement = document.createElement("style")
      styleElement.innerHTML = rgbAnimation
      document.head.appendChild(styleElement)

      return () => {
        document.head.removeChild(styleElement)
      }
    }
  }, [isMounted])

  const handleImageClick = useCallback((image: AnimatedRoundedGridProps["images"][0], event: React.MouseEvent) => {
    setClickPosition({ x: event.clientX, y: event.clientY })
    setSelectedImage(image)
    setIsPopupOpen(true)
    setIsClosing(false)
    document.body.style.overflow = "hidden" // Prevent scrolling when popup is open

    // Call the onClick handler if provided
    if (image.onClick) {
      image.onClick(image)
    }
  }, [])

  const closePopup = useCallback(() => {
    setIsClosing(true)

    // Increase the timeout duration for a smoother transition
    setTimeout(() => {
      setIsPopupOpen(false)
      setIsClosing(false)
      document.body.style.overflow = "" // Re-enable scrolling when popup is closed
    }, 500) // Increased from 300ms to 500ms for smoother animation
  }, [])

  // Ensure we have exactly 8 images
  const gridImages =
    images.length >= 8
      ? images.slice(0, 8)
      : [...images, ...Array(8 - images.length).fill({ src: "/placeholder.svg", alt: "Placeholder" })]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <>
      <motion.div
        className={`max-w-3xl mx-auto p-4 ${className || ""}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Desktop layout (hiện trên >= md screens) */}
        <div className="hidden md:grid grid-cols-3 gap-3">
          {/* Left column - tall rounded rectangle */}
          <motion.div
            className="relative col-span-1 row-span-2 rounded-[30px] overflow-hidden h-[400px] group cursor-pointer"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            onClick={(e) => handleImageClick(gridImages[0], e)}
          >
            <Image
              src={gridImages[0].src || "/placeholder.svg"}
              alt={gridImages[0].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          </motion.div>

          {/* Remaining desktop layout items... */}
          <motion.div
            className="relative col-span-1 rounded-[30px] overflow-hidden h-[195px] group cursor-pointer"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            onClick={(e) => handleImageClick(gridImages[1], e)}
          >
            <Image
              src={gridImages[1].src || "/placeholder.svg"}
              alt={gridImages[1].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          </motion.div>

          <motion.div
            className="relative col-span-1 rounded-full overflow-hidden h-[195px] group cursor-pointer"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            onClick={(e) => handleImageClick(gridImages[2], e)}
          >
            <Image
              src={gridImages[2].src || "/placeholder.svg"}
              alt={gridImages[2].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          </motion.div>

          <motion.div
            className="relative col-span-1 rounded-tl-[30px] rounded-bl-[30px] overflow-hidden h-[195px] group cursor-pointer"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            onClick={(e) => handleImageClick(gridImages[3], e)}
          >
            <Image
              src={gridImages[3].src || "/placeholder.svg"}
              alt={gridImages[3].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          </motion.div>

          <motion.div
            className="relative col-span-1 rounded-tr-[30px] rounded-br-[30px] overflow-hidden h-[195px] group cursor-pointer"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            onClick={(e) => handleImageClick(gridImages[4], e)}
          >
            <Image
              src={gridImages[4].src || "/placeholder.svg"}
              alt={gridImages[4].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          </motion.div>

          <motion.div
            className="relative col-span-1 rounded-full overflow-hidden h-[195px] group cursor-pointer"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            onClick={(e) => handleImageClick(gridImages[5], e)}
          >
            <Image
              src={gridImages[5].src || "/placeholder.svg"}
              alt={gridImages[5].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          </motion.div>

          <motion.div
            className="relative col-span-1 rounded-tl-[30px] rounded-bl-[30px] overflow-hidden h-[195px] group cursor-pointer"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            onClick={(e) => handleImageClick(gridImages[6], e)}
          >
            <Image
              src={gridImages[6].src || "/placeholder.svg"}
              alt={gridImages[6].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          </motion.div>

          <motion.div
            className="relative col-span-1 rounded-tr-[30px] rounded-br-[30px] overflow-hidden h-[195px] group cursor-pointer"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            onClick={(e) => handleImageClick(gridImages[7], e)}
          >
            <Image
              src={gridImages[7].src || "/placeholder.svg"}
              alt={gridImages[7].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          </motion.div>
        </div>

        {/* Mobile layout (chỉ hiện trên < md screens) - Tất cả là hình vuông với 2 hình mỗi hàng */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {gridImages.map((image, index) => (
            <motion.div
              key={`mobile-image-${index}`}
              className="relative aspect-square rounded-[20px] overflow-hidden group cursor-pointer"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              onClick={(e) => handleImageClick(image, e)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Popup with animation */}
      <AnimatePresence>
        {isMounted && isPopupOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={closePopup}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }} // Increased from 0.3 to 0.4
          >
            <motion.div
              className="relative w-[90vw] sm:w-[400px] max-w-md rounded-3xl overflow-hidden shadow-2xl bg-[#1A1A1A]"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
            >
              {/* Top icons */}
              <div className="absolute top-0 left-0 right-0 z-20 flex justify-between p-4">
                <a 
                  href="https://m.me/855258281507149" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </a>
                <button
                  className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-all duration-300"
                  onClick={closePopup}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Project title */}
              <div className="pt-16 px-6 pb-4 text-center">
                <h2 className="text-white text-2xl sm:text-3xl font-bold tracking-wider uppercase">
                  {selectedImage?.alt || "Project Name"}
                </h2>
              </div>

              {/* Main image */}
              <div className="px-4">
                <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden">
                  <img
                    src={selectedImage?.src || "/placeholder.svg"}
                    alt={selectedImage?.alt || "Gallery image"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Action button */}
              <div className="flex justify-center mt-4">
                <a 
                  href="https://zaloapp.com/qr/p/o4teuv9ez56m" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-black/30 backdrop-blur-sm text-white px-6 py-2 rounded-full flex items-center hover:bg-black/50 transition-all duration-300"
                >
                  <span>Đầu tư vào tương lai</span>
                </a>
              </div>

              {/* Description */}
              <div className="p-4 sm:p-6 text-center">
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {selectedImage?.location
                    ? `${selectedImage.location}. ${selectedImage.address || ""}`
                    : "Chúng tôi cung cấp các giải pháp chiếu sáng hiện đại, tiết kiệm năng lượng và nâng cao không gian sống. IDA Lighting - Thắp sáng không gian của bạn."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

