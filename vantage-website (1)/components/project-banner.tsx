"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import AnimatedTitle from "./animated-title"
import { useEffect, useState } from "react"
import type { ComponentProps } from "react"

// Define motion components with proper types
const MotionP = motion.p as React.FC<ComponentProps<"p"> & HTMLMotionProps<"p">>;
const MotionDiv = motion.div as React.FC<ComponentProps<"div"> & HTMLMotionProps<"div">>;

type ProjectBannerProps = {
  title: string
  description: string
  image: string
}

export default function ProjectBanner({ title, description, image }: ProjectBannerProps) {
  const [isVideo, setIsVideo] = useState(false)

  useEffect(() => {
    // Check if the banner is a video file
    setIsVideo(image.endsWith('.mp4') || image.endsWith('.webm'))
  }, [image])

  return (
    <section className="relative w-full h-screen">
      {/* Background media - either video or image */}
      <div className="absolute inset-0 z-0">
        {isVideo ? (
          <video
            src={image}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto h-full flex flex-col justify-end pb-24 px-4 md:px-8">
        <AnimatedTitle>{title}</AnimatedTitle>

        <MotionP
          className="text-xl md:text-2xl text-gray-300 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {description}
        </MotionP>
      </div>

      {/* Scroll indicator */}
      <MotionDiv
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="w-8 h-12 border-2 border-white rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
      </MotionDiv>
    </section>
  )
}

