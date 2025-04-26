"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ChevronRight } from "lucide-react"
import AnimatedTitleComponent from "./animated-title"
import FloatingElementsComponent from "./floating-elements"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"
import GlowButton from "./glow-button"
import dynamic from "next/dynamic"
import { throttle } from "lodash"

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

// Tối ưu xử lý rotation để giảm thiểu re-render
const MAX_VISIBLE_IMAGES = 4 // Limit to only what's visible

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

// Lazy load các component
const AnimatedTitle = dynamic(() => import('./animated-title'), {
  ssr: false,
  loading: () => <div className="h-[36px] w-full"></div>
})

const FloatingElements = dynamic(() => import('./floating-elements'), {
  ssr: false,
  loading: () => null
})

export default function ThirdElementHpage({ productSet }: ThirdElementHpageProps) {
  // Use provided images from productSet or fall back to default
  const images = productSet?.images || defaultImages

  const [hasLoaded, setHasLoaded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Optimize and memoize image selection to prevent unnecessary re-renders
  const [currentPositions, setCurrentPositions] = useState([0, 1, 2, 3])
  const carouselTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Memoize image arrays to prevent reinstantiation
  const [selectedFrameImages, setSelectedFrameImages] = useState<string[]>([])
  const [selectedLedImages, setSelectedLedImages] = useState<string[]>([])
  
  // Memoize image indices computation
  const getImageIndices = useCallback((currentPosition: number, isLedModule: boolean) => {
    const imagesArray = isLedModule ? selectedLedImages : selectedFrameImages
    if (!imagesArray || imagesArray.length === 0) return { prev: 0, current: 0, next: 0 }
    
    const prev = (currentPosition - 1 + imagesArray.length) % imagesArray.length
    const next = (currentPosition + 1) % imagesArray.length
    return { prev, current: currentPosition, next }
  }, [selectedLedImages, selectedFrameImages])

  // Memoize the image arrays based on actual visibility
  const visibleImageArrays = useMemo(() => {
    // Đảm bảo các arrays đã được khởi tạo
    if (selectedLedImages.length === 0 || selectedFrameImages.length === 0) {
      return [[], [], [], []];
    }
    
    return [0, 1, 2, 3].map(colIndex => {
      const isLedModule = colIndex % 2 === 0
      return isLedModule ? selectedLedImages : selectedFrameImages
    })
  }, [selectedLedImages, selectedFrameImages])

  // Only scroll if in viewport
  const isInViewport = useRef(false)
  
  // Use intersection observer to detect if the component is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewport.current = entry.isIntersecting
      },
      { threshold: 0.1 }
    )
    
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }
    
    return () => observer.disconnect()
  }, [])
  
  // Carousel effect with 3-second interval - optimize to only run when in viewport
  useEffect(() => {
    const rotateImages = () => {
      if (!isInViewport.current) return
      if (!images || images.length === 0) return
      
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
  }, [images])
  
  // Pass an empty dependency array to the useScroll hook to avoid recreating it
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Tạo transform values ở cấp component, không phải trong hooks khác
  const backgroundY = useTransform(scrollYProgress || 0, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress || 0, [0, 0.5], [1, 0.6]);

  // Image selection optimization
  useEffect(() => {
    const getRandomUniqueImages = (imgArray: string[], count: number) => {
      // Liệu có cần lấy ngẫu nhiên không? Có thể lấy đầu tiên để tránh sort
      const shuffled = [...imgArray].slice(0, count)
      return shuffled
    }

    setSelectedFrameImages(getRandomUniqueImages(frameImages, MAX_VISIBLE_IMAGES))
    setSelectedLedImages(getRandomUniqueImages(ledModuleImages, MAX_VISIBLE_IMAGES))
  }, [])

  // Sử dụng throttle cho mouse move để tránh quá nhiều re-render
  const handleMouseMove = useCallback(
    throttle((e: React.MouseEvent) => {
      if (!containerRef.current || !isInViewport.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setCursorPosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }, 50),
    []
  )

  // Set loaded state after initial render
  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Thêm useEffect để kiểm tra kích thước màn hình
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const router = useRouter()

  // Render optimization for desktop image grid
  const renderDesktopImageGrid = useCallback(() => {
    // Bảo vệ khỏi lỗi undefined
    if (
      !selectedLedImages || selectedLedImages.length === 0 ||
      !selectedFrameImages || selectedFrameImages.length === 0 ||
      !visibleImageArrays || visibleImageArrays.some(arr => !arr)
    ) {
      return <div className="grid grid-cols-4 gap-8 w-full max-w-[650px] mx-auto h-[240px]"></div>;
    }
    
    return (
      <div className="grid grid-cols-4 gap-8 w-full max-w-[650px] mx-auto">
        {[0, 1, 2, 3].map((colIndex) => {
          const currentPos = currentPositions[colIndex];
          const isLedModule = colIndex % 2 === 0;
          const isReversed = colIndex % 2 === 1;
          const { prev, current, next } = getImageIndices(
            currentPos % (isLedModule ? 
              Math.max(1, selectedLedImages.length) : 
              Math.max(1, selectedFrameImages.length)), 
            isLedModule
          );
          
          // Bảo vệ khỏi lỗi undefined array
          const imageArray = visibleImageArrays[colIndex] || [];
          
          return (
            <div key={colIndex} className="flex flex-col items-center h-[240px] justify-center px-[15px]">
              <div className="relative h-full flex flex-col items-center justify-center">
                {/* Previous image */}
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`prev-${prev}-${colIndex}`}
                    initial={{ opacity: 0, y: isReversed ? 20 : -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: isReversed ? 20 : -20 }}
                    transition={{ duration: 0.5 }}
                    className="w-[60px] h-[60px] mb-2 opacity-60"
                  >
                    {imageArray.length > 0 && imageArray[prev] && (
                      <Image
                        src={imageArray[prev]}
                        alt={`Product Image ${prev}`}
                        width={60}
                        height={60}
                        className="object-contain rounded-lg"
                        loading="lazy"
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
                    className="w-[170px] h-[170px] my-2 z-10 relative"
                  >
                    {imageArray.length > 0 && imageArray[current] && (
                      <Image
                        src={imageArray[current]}
                        alt={`Product Image ${current}`}
                        width={170}
                        height={170}
                        className="object-contain rounded-lg"
                        style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.2))" }}
                        priority={colIndex === 0}
                        loading={colIndex === 0 ? "eager" : "lazy"}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Next image */}
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`next-${next}-${colIndex}`}
                    initial={{ opacity: 0, y: isReversed ? -20 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: isReversed ? -20 : 20 }}
                    transition={{ duration: 0.5 }}
                    className="w-[60px] h-[60px] mt-2 opacity-60"
                  >
                    {imageArray.length > 0 && imageArray[next] && (
                      <Image
                        src={imageArray[next]}
                        alt={`Product Image ${next}`}
                        width={60}
                        height={60}
                        className="object-contain rounded-lg"
                        loading="lazy"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [currentPositions, getImageIndices, selectedLedImages, selectedFrameImages, visibleImageArrays]);

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
          <FloatingElementsComponent />
          
          {/* Content container - Mobile layout */}
          <div className="relative z-10 flex flex-col min-h-screen">
            {/* Header section - Đưa lên đầu */}
            <div className="flex flex-col px-6 py-6">
              {/* Small header text with reveal animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center text-white/70 text-xs tracking-wider mb-2"
              >
                {/* Date removed */}
              </motion.div>

              {/* Main title with 3D effect - reduced size */}
              <div className="pt-0.7">
                <AnimatedTitleComponent>
                  {/* <span className="text-2xl sm:text-3xl block text-white">Downlight</span> */}
                  <span className="text-[30px] text-white mt-[15px] inline-block">DOWNLIGHT COLLECTION.</span>
                </AnimatedTitleComponent>
              </div>
              
              {/* CTA Button moved below */}

            </div>

            {/* Mobile image carousel - Ở giữa */}
            <div className="px-4 flex-1 flex items-center justify-center relative">
              <div className="w-full overflow-x-auto pb-4 hide-scrollbar -mt-[40px]">
                <div className="flex space-x-5 px-2 min-w-max">
                  {[0, 1, 2, 3].map((colIndex) => {
                    const currentPos = currentPositions[colIndex];
                    const isLedModule = colIndex % 2 === 0; // Column 1 and 3 (index 0 and 2) are LED modules
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
                                  loading="lazy"
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
                                  loading="lazy"
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
                                  loading="lazy"
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
              
              {/* Bouncing arrow button for horizontal scroll */}
              <motion.div 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-l-full p-2 z-20"
                animate={{
                  x: [-5, 0, -5],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                onClick={() => {
                  // Scroll the carousel to the right when clicked
                  const carousel = document.querySelector('.hide-scrollbar');
                  if (carousel) {
                    carousel.scrollBy({ left: 150, behavior: 'smooth' });
                  }
                }}
              >
                <ChevronRight size={24} className="text-white" />
              </motion.div>
            </div>

            {/* Description text section - Ở dưới cùng */}
            <div className="flex flex-col px-6 py-4 space-y-4 -mt-[40px]">
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
              
              {/* CTA Button - Below description text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-4"
              >
                <GlowButton 
                  text="XEM THÊM" 
                  onClick={() => router.push("/products")}
                  className="w-auto inline-block"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          ref={containerRef}
          style={{ opacity: opacity }}
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
          <FloatingElementsComponent />

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
                className="flex items-center text-white/70 md:text-[#FFDAB9]/70 text-xs mb-2 tracking-wider"
              >
                {/* Date and collection info removed */}
              </motion.div>

              {/* Main title with 3D effect - reduced size */}
              <div className="mb-2 pt-0">
                <AnimatedTitleComponent>
                  <span className="text-[36px] block text-white mt-[15px]">DOWNLIGHT COLLECTION.</span>
                </AnimatedTitleComponent>
              </div>

              {/* Move CTA Button here */}

              {/* Description text with reveal animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="max-w-md"
              >
                <p className="text-white/80 text-sm leading-relaxed">
                  Đèn downlight của IDA LIGHTING được thiết kế theo dạng modul lắp ráp, cho phép thay thế linh hoạt giữa chip LED và choá đèn chỉ với thao tác đơn giản. Nhờ đó, người dùng có thể dễ dàng tùy biến công suất, góc chiếu và màu ánh sáng phù hợp với từng không gian cụ thể mà không cần thay toàn bộ đèn, giúp tiết kiệm chi phí và tối ưu hoá hiệu suất chiếu sáng. Thiết kế modul này cũng thuận tiện cho việc bảo trì, nâng cấp trong tương lai.
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-6"
              >
                <GlowButton 
                  text="XEM THÊM" 
                  onClick={() => router.push("/products")}
                  className="w-auto inline-block"
                />
              </motion.div>

            </div>

            {/* Right section with image carousel - Now takes 7/10 columns (70%) */}
            <div className="md:col-span-7 flex items-center justify-center py-8 px-4 md:px-8">
              {renderDesktopImageGrid()}
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
} 