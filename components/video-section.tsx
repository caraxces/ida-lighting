"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

export default function VideoPlayerSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  
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
      
      {/* Rounded corners mask - similar to hero section */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-[50px] bg-black z-50" style={{ borderRadius: '50px 50px 0 0' }}></div> */}
    </section>
  )
} 