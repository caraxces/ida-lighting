"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import AnimatedTitle from "./animated-title"
import { ChevronDown } from "lucide-react"

// Separate component for the image overlay
const ImageOverlay = ({ 
  imageY, 
  imageOpacity, 
  imageScale, 
  imageRotate, 
  onDragEnd,
  onDragStart
}) => {
  function startDrag(event) {
    if (onDragStart) onDragStart()
  }
  
  return (
    <motion.div 
      className="absolute inset-0 w-full h-full z-20 flex items-center justify-center"
      style={{ 
        y: imageY,
        opacity: imageOpacity,
        scale: imageScale,
        rotateX: imageRotate
      }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={(event, info) => {
        if (info && info.offset && info.offset.y < -100 && onDragEnd) {
          onDragEnd()
        }
      }}
    >
      <div className="relative w-full h-full" style={{ background: "#B8BBC1" }}>
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
          onPointerDown={startDrag}
        >
          <div className="relative w-full max-w-4xl mx-auto filter drop-shadow-lg">
            <Image
              src="/mText._GoTTY__.png"
              alt="Text Overlay"
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
              priority
              style={{ 
                filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.2))",
                transformStyle: "preserve-3d"
              }}
              draggable={false}
            />
          </div>
        </div>
      </div>
      
      {/* Scroll/Drag indicator - now interactive */}
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <p className="text-gray-800 text-sm mb-2 font-medium">Drag up or scroll to reveal video</p>
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-md cursor-pointer"
          onClick={onDragEnd}
        >
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L11 4L10 3L6 7L2 3L1 4L6 9Z" fill="#333"/>
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Main component
export default function VideoPlayerSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  
  const [showFullVideo, setShowFullVideo] = useState(false)
  const [manualReveal, setManualReveal] = useState(false)
  
  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  // Animation values
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.85, 0.5, 0])
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.5, 0])
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const videoScale = useTransform(scrollYProgress, [0.3, 0.7], [1, 1.05])
  
  // Handle scroll changes
  useEffect(() => {
    if (!scrollYProgress) return
    
    const unsubscribe = scrollYProgress.onChange((value) => {
      if (value > 0.4) {
        setShowFullVideo(true)
      } else {
        setShowFullVideo(false)
        setManualReveal(false)
      }
    })
    
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [scrollYProgress])
  
  // Handle manual reveal
  const handleManualReveal = () => {
    setManualReveal(true)
    setShowFullVideo(true)
  }

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Video layer - always visible */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/ida-starlake.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Overlay with text - fades out on scroll */}
      <motion.div 
        className="absolute inset-0 w-full h-full bg-[#B8BBC1]/30 backdrop-blur-sm z-10"
        style={{ 
          opacity: manualReveal ? 0 : overlayOpacity,
          pointerEvents: showFullVideo && manualReveal ? "none" : "auto"
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Content similar to hero section */}
        <motion.div 
          className="container mx-auto h-full flex flex-col items-center justify-center text-center z-20 max-w-4xl px-4"
          style={{ 
            opacity: manualReveal ? 0 : textOpacity,
            scale: contentScale
          }}
        >
          <AnimatedTitle>
            <span className="text-6xl md:text-8xl lg:text-9xl block mb-2 text-gray-900">Discover</span>
            <span className="font-extrabold italic text-gray-800">our</span> creative
            <span className="font-extrabold italic text-gray-800"> process</span>
          </AnimatedTitle>

          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-12">
            Watch how we transform ideas into stunning visual experiences that captivate and inspire.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-center"
          >
            <button 
              onClick={handleManualReveal}
              className="flex items-center mx-auto space-x-2 px-6 py-3 border border-gray-700/30 rounded-full bg-gray-800/10 hover:bg-gray-800/20 transition-colors group text-gray-800"
            >
              <span>Reveal video</span>
              <ChevronDown className="animate-bounce group-hover:animate-none" />
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
      
      Scroll indicator - only visible when overlay is showing
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center"
        style={{ opacity: manualReveal ? 0 : textOpacity }}
      >
        {/* <p className="text-gray-800 text-sm mb-2 font-medium">Scroll down to reveal video</p> */}
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-md z-[100]"
        >
          <ChevronDown className="text-gray-800" />
        </motion.div>
      </motion.div>
      
      {/* Video controls - only visible when video is fully revealed */}
      {showFullVideo && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-8 left-8 z-40"
        >
          <div className="px-4 py-2 rounded-lg bg-black/20 backdrop-blur-md shadow-lg cursor-pointer" onClick={() => setManualReveal(false)}>
            <p className="text-white text-sm font-medium">
              {manualReveal ? "Click to restore overlay" : "Video revealed by scrolling"}
            </p>
          </div>
        </motion.div>
      )}
      
      {/* Rounded corners mask - similar to hero section */}
      <div className="absolute bottom-0 left-0 right-0 h-[50px] bg-black z-50" style={{ borderRadius: '50px 50px 0 0' }}></div>
    </section>
  )
} 