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

// Define ProductSet type
type ProductSet = {
  id: number
  title: string
  images: string[]
}

// Frame images from frames folder
const frameImages = [
  "/home-page/frames/N048080.png",
  "/home-page/frames/N04075.png",
  "/home-page/frames/N02075.png",
  "/home-page/frames/N01075.png",
  "/home-page/frames/N0875A.png",
  "/home-page/frames/N0575.png",
]

// LED module images from LED modules folder
const ledModuleImages = [
  "/home-page/led modules/1.png",
  "/home-page/led modules/2.png",
  "/home-page/led modules/4.png",
  "/home-page/led modules/5.png",
  "/home-page/led modules/6.png",
  "/home-page/led modules/7.png",
  "/home-page/led modules/9.png",
]

// Default images if no productSet is provided
const defaultImages = [
  "/work/IDA_Starlake/TRC_7559.jpg",
  "/work/IDA_Starlake/TRC_7565.jpg",
  "/work/IDA_Starlake/TRC_7561.jpg",
  "/work/IDA_Starlake/TRC_7562.jpg",
]

// CSS để ẩn thanh cuộn trên các thiết bị khác nhau
const scrollbarHideCss = `
  /* Ẩn thanh cuộn trên Chrome, Safari và Opera */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  /* Ẩn thanh cuộn trên IE, Edge và Firefox */
  .hide-scrollbar {
    -ms-overflow-style: none;  /* IE và Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

interface ThirdElementHpageProps {
  productSet?: ProductSet
}

export default function ThirdElementHpage({ productSet }: ThirdElementHpageProps) {
  // Use provided images from productSet or fall back to default
  const images = productSet?.images || defaultImages

  const [hasLoaded, setHasLoaded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // New carousel state for current positions
  const [currentPositions, setCurrentPositions] = useState([0, 1, 2, 3])
  const carouselTimerRef = useRef<NodeJS.Timeout | null>(null)

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

  // Carousel effect with 3-second interval
  useEffect(() => {
    const rotateImages = () => {
      setCurrentPositions(prev => 
        prev.map(pos => (pos + 1) % images.length)
      )
    }

    // Set up the interval for image rotation
    carouselTimerRef.current = setInterval(rotateImages, 3000)
    
    // Cleanup
    return () => {
      if (carouselTimerRef.current) {
        clearInterval(carouselTimerRef.current)
      }
    }
  }, [images.length])

  // Randomly select unique frame images
  const [selectedFrameImages, setSelectedFrameImages] = useState<string[]>([])
  // Randomly select unique LED module images
  const [selectedLedImages, setSelectedLedImages] = useState<string[]>([])

  // Initialize selected images on component mount
  useEffect(() => {
    // Function to shuffle array and take first n elements
    const getRandomUniqueImages = (imgArray: string[], count: number) => {
      const shuffled = [...imgArray].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, count)
    }

    // Select unique images from each folder
    setSelectedFrameImages(getRandomUniqueImages(frameImages, 4))
    setSelectedLedImages(getRandomUniqueImages(ledModuleImages, 4))
  }, [])

  // Helper function to get previous, current, and next image indices
  const getImageIndices = (currentPosition: number, isLedModule: boolean) => {
    const imagesArray = isLedModule ? selectedLedImages : selectedFrameImages
    if (imagesArray.length === 0) return { prev: 0, current: 0, next: 0 }
    
    const prev = (currentPosition - 1 + imagesArray.length) % imagesArray.length
    const next = (currentPosition + 1) % imagesArray.length
    return { prev, current: currentPosition, next }
  }

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
      <style jsx global>{scrollbarHideCss}</style>
      {isMobile ? (
        <motion.div
          style={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full min-h-screen overflow-hidden bg-gradient-to-r from-black via-black to-[#8B2323]"
        >
          {/* Mobile version with vertical layout */}
          
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
          
          {/* Floating elements */}
          <FloatingElements />
          
          {/* Content container - Mobile layout */}
          <div className="relative z-10 flex flex-col min-h-screen">
            {/* Header section - Đưa lên đầu */}
            <div className="flex flex-col px-6 py-6">
              {/* Small header text with reveal animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center text-white/70 text-xs tracking-wider mb-4"
              >
                <span>2023</span>
                <span className="mx-2">—</span>
                <span>IDA Collection</span>
              </motion.div>

              {/* Main title with 3D effect */}
              <div className="mb-2">
                <AnimatedTitle>
                  <span className="text-2xl sm:text-3xl block text-white">Downlight</span>
                  <span className="text-2xl sm:text-3xl font-extrabold italic text-white">
                    {productSet?.title || "IDA"}
                  </span>
                  <span className="text-2xl sm:text-3xl text-white"> Collection.</span>
                </AnimatedTitle>
              </div>
            </div>

            {/* Mobile image carousel - Ở giữa */}
            <div className="px-4 py-6 flex-1 flex items-center justify-center">
              <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
                <div className="flex space-x-5 px-2 min-w-max">
                  {[0, 1, 2, 3].map((colIndex) => {
                    const currentPos = currentPositions[colIndex];
                    const isLedModule = colIndex % 2 === 1; // Column 2 and 4 (index 1 and 3) are LED modules
                    const { prev, current, next } = getImageIndices(currentPos % (isLedModule ? selectedLedImages.length : selectedFrameImages.length), isLedModule);
                    const isReversed = colIndex % 2 === 1; // Columns 2 and 4 (index 1 and 3) will be reversed
                    
                    // Select the appropriate image array based on column
                    const imageArray = isLedModule ? selectedLedImages : selectedFrameImages;
                    
                    return (
                      <div key={colIndex} className="flex-shrink-0 flex flex-col items-center h-[250px] justify-center w-[140px]">
                        <div className="relative h-full flex flex-col items-center justify-center">
                          {/* Previous image (smaller) */}
                          <AnimatePresence mode="popLayout">
                            <motion.div
                              key={`prev-${prev}-${colIndex}`}
                              initial={{ 
                                opacity: 0, 
                                y: isReversed ? 20 : -20 
                              }}
                              animate={{ 
                                opacity: 1, 
                                y: 0 
                              }}
                              exit={{ 
                                opacity: 0, 
                                y: isReversed ? 20 : -20 
                              }}
                              transition={{ duration: 0.5 }}
                              className="w-[50px] h-[50px] mb-2 opacity-60"
                            >
                              {imageArray.length > 0 && (
                                <Image
                                  src={imageArray[prev]}
                                  alt={`Product Image ${prev}`}
                                  width={50}
                                  height={50}
                                  className="object-contain rounded-lg"
                                />
                              )}
                            </motion.div>
                          </AnimatePresence>

                          {/* Current image (larger) */}
                          <AnimatePresence mode="popLayout">
                            <motion.div
                              key={`current-${current}-${colIndex}`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.5 }}
                              className="w-[100px] h-[100px] my-2 z-10 relative"
                            >
                              {imageArray.length > 0 && (
                                <Image
                                  src={imageArray[current]}
                                  alt={`Product Image ${current}`}
                                  width={100}
                                  height={100}
                                  className="object-contain rounded-lg"
                                  style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.2))" }}
                                />
                              )}
                            </motion.div>
                          </AnimatePresence>

                          {/* Next image (smaller) */}
                          <AnimatePresence mode="popLayout">
                            <motion.div
                              key={`next-${next}-${colIndex}`}
                              initial={{ 
                                opacity: 0, 
                                y: isReversed ? -20 : 20 
                              }}
                              animate={{ 
                                opacity: 1, 
                                y: 0 
                              }}
                              exit={{ 
                                opacity: 0, 
                                y: isReversed ? -20 : 20 
                              }}
                              transition={{ duration: 0.5 }}
                              className="w-[50px] h-[50px] mt-2 opacity-60"
                            >
                              {imageArray.length > 0 && (
                                <Image
                                  src={imageArray[next]}
                                  alt={`Product Image ${next}`}
                                  width={50}
                                  height={50}
                                  className="object-contain rounded-lg"
                                />
                              )}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Description text section - Ở dưới cùng */}
            <div className="flex flex-col px-6 py-4 space-y-4">
              {/* Description text with reveal animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h3 className="text-white font-medium mb-2 text-sm">Premium Lighting Solutions</h3>
                <p className="text-white/80 text-xs leading-relaxed">
                  Đèn downlight của IDA LIGHTING được thiết kế theo dạng modul lắp ráp, cho phép thay thế linh hoạt giữa chip LED và choá đèn chỉ với thao tác đơn giản. Nhờ đó, người dùng có thể dễ dàng tùy biến công suất, góc chiếu và màu ánh sáng phù hợp với từng không gian cụ thể mà không cần thay toàn bộ đèn, giúp tiết kiệm chi phí và tối ưu hoá hiệu suất chiếu sáng. Thiết kế modul này cũng thuận tiện cho việc bảo trì, nâng cấp trong tương lai.
                </p>
              </motion.div>
              
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex justify-center pt-4"
              >
                <Link href="/products">
                  <Button
                    variant="ghost"
                    className="w-fit text-white hover:bg-white/10 hover:text-white group transition-all duration-300 shadow-[0_4px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.2)] transform hover:-translate-y-1 px-0 relative overflow-hidden"
                  >
                    <span className="border-b border-white/40 pb-1 flex items-center relative z-10">
                      Explore collection
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-white/10 -z-0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
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
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
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

          {/* Content container - Changed to grid with custom column sizing for 30/70 split */}
          <div className="relative z-10 grid md:grid-cols-10 min-h-screen">
            {/* Left section with text - Now takes 3/10 columns (30%) */}
            <div className="md:col-span-3 flex flex-col justify-center px-6 py-16 md:py-12">
              {/* Small header text with reveal animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center text-white/70 md:text-[#FFDAB9]/70 text-xs mb-4 tracking-wider"
              >
                <span>2023</span>
                <span className="mx-2">—</span>
                <span>IDA Collection</span>
              </motion.div>

              {/* Main title with 3D effect */}
              <div className="mb-4">
                <AnimatedTitle>
                  <span className="text-3xl sm:text-4xl md:text-5xl block text-white">Downlight</span>
                  <span className="text-3xl sm:text-4xl md:text-5xl text-white"> Collection.</span>
                </AnimatedTitle>
              </div>

              {/* Description text with reveal animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-4 mb-6 max-w-md"
              >
                <h3 className="text-white font-medium mb-2">Premium Lighting Solutions</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Đèn downlight của IDA LIGHTING được thiết kế theo dạng modul lắp ráp, cho phép thay thế linh hoạt giữa chip LED và choá đèn chỉ với thao tác đơn giản. Nhờ đó, người dùng có thể dễ dàng tùy biến công suất, góc chiếu và màu ánh sáng phù hợp với từng không gian cụ thể mà không cần thay toàn bộ đèn, giúp tiết kiệm chi phí và tối ưu hoá hiệu suất chiếu sáng. Thiết kế modul này cũng thuận tiện cho việc bảo trì, nâng cấp trong tương lai.
                </p>
              </motion.div>

              {/* CTA Button with 3D effect and hover animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link href="/products">
                  <Button
                    variant="ghost"
                    className="w-fit text-white hover:bg-white/10 hover:text-white group transition-all duration-300 shadow-[0_4px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.2)] transform hover:-translate-y-1 px-0 relative overflow-hidden"
                  >
                    <span className="border-b border-white/40 pb-1 flex items-center relative z-10">
                      Explore collection
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-white/10 -z-0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right section with image carousel - Now takes 7/10 columns (70%) */}
            <div className="md:col-span-7 flex items-center justify-center py-8 px-4 md:px-8">
              <div className="grid grid-cols-4 gap-8 w-full max-w-[650px] mx-auto">
                {[0, 1, 2, 3].map((colIndex) => {
                  const currentPos = currentPositions[colIndex];
                  const isLedModule = colIndex % 2 === 1; // Column 2 and 4 (index 1 and 3) are LED modules
                  const { prev, current, next } = getImageIndices(currentPos % (isLedModule ? selectedLedImages.length : selectedFrameImages.length), isLedModule);
                  const isReversed = colIndex % 2 === 1; // Columns 2 and 4 (index 1 and 3) will be reversed
                  
                  // Select the appropriate image array based on column
                  const imageArray = isLedModule ? selectedLedImages : selectedFrameImages;
                  
                  return (
                    <div key={colIndex} className="flex flex-col items-center h-[240px] justify-center px-[15px]">
                      <div className="relative h-full flex flex-col items-center justify-center">
                        {/* Previous image (smaller) */}
                        <AnimatePresence mode="popLayout">
                          <motion.div
                            key={`prev-${prev}-${colIndex}`}
                            initial={{ 
                              opacity: 0, 
                              y: isReversed ? 20 : -20 
                            }}
                            animate={{ 
                              opacity: 1, 
                              y: 0 
                            }}
                            exit={{ 
                              opacity: 0, 
                              y: isReversed ? 20 : -20 
                            }}
                            transition={{ duration: 0.5 }}
                            className="w-[60px] h-[60px] mb-2 opacity-60"
                          >
                            {imageArray.length > 0 && (
                              <Image
                                src={imageArray[prev]}
                                alt={`Product Image ${prev}`}
                                width={60}
                                height={60}
                                className="object-contain rounded-lg"
                              />
                            )}
                          </motion.div>
                        </AnimatePresence>

                        {/* Current image (larger by 50%) */}
                        <AnimatePresence mode="popLayout">
                          <motion.div
                            key={`current-${current}-${colIndex}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            className="w-[170px] h-[170px] my-2 z-10 relative"
                          >
                            {imageArray.length > 0 && (
                              <Image
                                src={imageArray[current]}
                                alt={`Product Image ${current}`}
                                width={170}
                                height={170}
                                className="object-contain rounded-lg"
                                style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.2))" }}
                              />
                            )}
                          </motion.div>
                        </AnimatePresence>

                        {/* Next image (smaller) */}
                        <AnimatePresence mode="popLayout">
                          <motion.div
                            key={`next-${next}-${colIndex}`}
                            initial={{ 
                              opacity: 0, 
                              y: isReversed ? -20 : 20 
                            }}
                            animate={{ 
                              opacity: 1, 
                              y: 0 
                            }}
                            exit={{ 
                              opacity: 0, 
                              y: isReversed ? -20 : 20 
                            }}
                            transition={{ duration: 0.5 }}
                            className="w-[60px] h-[60px] mt-2 opacity-60"
                          >
                            {imageArray.length > 0 && (
                              <Image
                                src={imageArray[next]}
                                alt={`Product Image ${next}`}
                                width={60}
                                height={60}
                                className="object-contain rounded-lg"
                              />
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
} 