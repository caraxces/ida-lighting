"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useCallback, useEffect } from "react"

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
  }[]
  className?: string
}

// Component for image popup with RGB border
function ImagePopup({
  isOpen,
  image,
  onClose,
}: {
  isOpen: boolean
  image: AnimatedRoundedGridProps["images"][0] | null
  onClose: () => void
}) {
  // Use image data if available, otherwise use default data
  const projectData = {
    location: image?.location || "Hà Nội, Việt Nam",
    address: image?.address || "Số 123 Đường Nguyễn Huệ, Quận 1",
    client: image?.client || "Công ty ABC",
    area: image?.area || "1,200 m²",
    constructionTime: image?.constructionTime || "6 tháng (01/2023 - 06/2023)",
    lightingTypes: image?.lightingTypes || [
      "Đèn LED âm trần",
      "Đèn treo trang trí",
      "Đèn pha ngoài trời",
      "Đèn LED dây",
    ],
    designer: image?.designer || "Nguyễn Văn A",
    photographer: image?.photographer || "Trần Thị B",
  }

  if (!isOpen) return null

  return (
    <>
        {/* RGB border effect */}
        <div className="absolute -inset-[2px] rounded-xl overflow-hidden z-0">
          <div
            className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 via-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 animate-rgb-float-1"
            style={{
              backgroundSize: "200% 200%",
            }}
          ></div>
        </div>

        {/* Main container */}
        <div className="absolute inset-0 bg-black/90 rounded-xl overflow-hidden flex flex-col md:flex-row z-10">
          {/* Left section - Image */}
          <div className="w-full md:w-1/2 p-6 flex items-center justify-center bg-[#1A1A1A] relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute -right-20 top-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-orange-300 to-pink-300 opacity-20 blur-xl"></div>

            {/* Main image */}
            <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={image?.src || "/placeholder.svg"}
                alt={image?.alt || "Gallery image"}
                className="max-w-full max-h-full object-contain"
              />

              {/* Shine overlay */}
              <div
                className="absolute inset-0 w-full h-full z-10 mix-blend-overlay pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)`,
                }}
              ></div>
            </div>
          </div>

          {/* Right section - Project information */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-between bg-[#2A2A2A] relative overflow-hidden">
            <div>
              <h3 className="text-white text-2xl font-bold mb-6">{image?.alt || "Project Name"}</h3>

              <div className="space-y-6">
                <div>
                  <p className="text-gray-400 text-sm">Vị trí</p>
                  <p className="text-white">{projectData.location}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Địa chỉ</p>
                  <p className="text-white">{projectData.address}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Khách hàng</p>
                  <p className="text-white">{projectData.client}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Diện tích</p>
                  <p className="text-white">{projectData.area}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Thời gian thi công</p>
                  <p className="text-white">{projectData.constructionTime}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Loại đèn sử dụng</p>
                  <ul className="text-white list-disc pl-5 mt-1">
                    {projectData.lightingTypes.map((type, index) => (
                      <li key={index}>{type}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Thiết kế</p>
                  <p className="text-white">{projectData.designer}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Nhiếp ảnh</p>
                  <p className="text-white">{projectData.photographer}</p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6 flex space-x-2">
              <button className="flex-1 py-2 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              <button className="flex-1 py-2 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
              <button className="flex-1 py-2 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors z-20"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
    </>
  )
}

export function AnimatedRoundedGrid({ images, className }: AnimatedRoundedGridProps) {
  const [selectedImage, setSelectedImage] = useState<AnimatedRoundedGridProps["images"][0] | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 })
  const [isClosing, setIsClosing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setIsMounted(true)
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleImageClick = useCallback((image: AnimatedRoundedGridProps["images"][0], event: React.MouseEvent) => {
    setClickPosition({ x: event.clientX, y: event.clientY })
    setSelectedImage(image)
    setIsPopupOpen(true)
    setIsClosing(false)
  }, [])

  const closePopup = useCallback(() => {
    setIsClosing(true)
    
    setTimeout(() => {
    setIsPopupOpen(false)
      setIsClosing(false)
    }, 500)
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
        <div className="grid grid-cols-3 gap-2 md:gap-3">
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

          {/* Top middle - rounded square */}
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

          {/* Top right - circle */}
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

          {/* Middle row - left side (under top middle) */}
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

          {/* Middle row - right side (under top right) */}
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

          {/* Bottom row - left side */}
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

          {/* Bottom row - middle */}
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

          {/* Bottom row - right side */}
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
      </motion.div>

      {isMounted && (
        <AnimatePresence>
          {(isPopupOpen || isClosing) && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              onClick={closePopup}
            >
              <motion.div
                className="relative w-[95vw] sm:w-[90vw] md:w-[80vw] max-h-[95vh] sm:max-h-[90vh] md:max-h-[80vh] rounded-xl overflow-hidden shadow-2xl bg-black/90"
                onClick={(e) => e.stopPropagation()}
                initial={{ 
                  opacity: 0,
                  scale: 0.5,
                  x: clickPosition.x - windowSize.width / 2,
                  y: clickPosition.y - windowSize.height / 2,
                }}
                animate={{ 
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: 0,
                  transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
                }}
                exit={{ 
                  opacity: 0,
                  scale: 0.5,
                  x: isClosing ? (clickPosition.x - windowSize.width / 2) : 0,
                  y: isClosing ? (clickPosition.y - windowSize.height / 2) : 0,
                  transition: { duration: 0.5, ease: [0.32, 0, 0.67, 0] }
                }}
              >
                {/* RGB border effect */}
                <div className="absolute -inset-[2px] rounded-xl overflow-hidden z-0">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 via-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                    animate={{
                      backgroundPosition: isClosing ? ["0% 50%", "100% 50%"] : ["0% 50%", "100% 50%"],
                    }}
                    transition={{
                      duration: 2,
                      ease: "linear",
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  ></motion.div>
                </div>

                {/* Main container - Optimize for mobile with better overflow handling */}
                <div className="absolute inset-0 bg-black/90 rounded-xl overflow-hidden flex flex-col md:flex-row z-10">
                  {/* Image section - Optimize height for mobile vertical layout */}
                  <div className="w-full md:w-1/2 p-3 sm:p-4 md:p-6 flex items-center justify-center bg-[#1A1A1A] relative overflow-hidden h-[40vh] md:h-auto">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-black/5 bg-[length:20px_20px] opacity-10"></div>

                    {/* Noise effect */}
                    <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] bg-[length:4px_4px] opacity-5 mix-blend-overlay"></div>

                    {/* Main image - Improved object-fit handling */}
                    <motion.div 
                      className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={selectedImage?.src || "/placeholder.svg"}
                        alt={selectedImage?.alt || "Gallery image"}
                        className="max-w-full max-h-full object-contain"
                      />

                      {/* Shine overlay */}
                      <div
                        className="absolute inset-0 w-full h-full z-10 mix-blend-overlay pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)`,
                        }}
                      ></div>
                    </motion.div>
                  </div>

                  {/* Info section - Add scrollable container for mobile */}
                  <motion.div 
                    className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col bg-[#2A2A2A] relative overflow-hidden h-[55vh] md:h-auto"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {/* Scrollable content container */}
                    <div className="overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-6 text-white">{selectedImage?.alt || "Project Name"}</h3>

                      <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base">
                        {/* Project info rows - Optimized spacing for mobile */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-gray-400 text-xs sm:text-sm">Vị trí</p>
                          <p className="text-white">{selectedImage?.location || "Hà Tĩnh, Việt Nam"}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-gray-400 text-xs sm:text-sm">Địa chỉ</p>
                          <p className="text-white">{selectedImage?.address || "Hà Huy Tập, Hà Tĩnh, Việt Nam"}</p>
                        </div>

                        {/* Continue with similar pattern for other info fields */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-gray-400 text-xs sm:text-sm">Khách hàng</p>
                          <p className="text-white">{selectedImage?.client || "Ẩn danh"}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-gray-400 text-xs sm:text-sm">Diện tích</p>
                          <p className="text-white">{selectedImage?.area || "1,200 m²"}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                          <p className="text-gray-400 text-xs sm:text-sm">Thời gian thi công</p>
                          <p className="text-white">{selectedImage?.constructionTime || "6 tháng (01/2023 - 06/2023)"}</p>
                        </div>

                        <div className="flex flex-col">
                          <p className="text-gray-400 text-xs sm:text-sm mb-1">Loại đèn sử dụng</p>
                          <ul className="text-white list-disc pl-5 text-sm">
                            {selectedImage?.lightingTypes?.map((type, index) => (
                              <li key={index}>{type}</li>
                            )) || ["Đèn LED âm trần", "Đèn treo trang trí", "Đèn pha ngoài trời", "Đèn LED dây"].map((type, index) => (
                              <li key={index}>{type}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-gray-400 text-xs sm:text-sm">Thiết kế</p>
                          <p className="text-white">{selectedImage?.designer || "Ẩn danh"}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-gray-400 text-xs sm:text-sm">Nhiếp ảnh</p>
                          <p className="text-white">{selectedImage?.photographer || "IDA Lighting"}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons - Fixed at bottom for easier mobile access */}
                    <div className="mt-auto pt-3 sm:pt-4 md:pt-6 flex space-x-2 sticky bottom-0 bg-[#2A2A2A]">
                      <button className="flex-1 py-2 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <button className="flex-1 py-2 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                      <button className="flex-1 py-2 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Close button - Made larger for mobile */}
                <motion.button
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors z-20"
                  onClick={closePopup}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  )
}

