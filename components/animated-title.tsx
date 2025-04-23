"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { HEADING_SIZES } from "@/lib/constants/typography"
import { useDeviceSize } from "./hooks/use-device-size"

type AnimatedTitleProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  variant?: keyof typeof HEADING_SIZES
}

export default function AnimatedTitle({ 
  children, 
  className, 
  delay = 0.2,
  variant = "h2" 
}: AnimatedTitleProps) {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const { isDesktop } = useDeviceSize()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!headlineRef.current) return

      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth) * 100
      const y = (clientY / window.innerHeight) * 100

      headlineRef.current.style.backgroundPosition = `${x}% ${y}%`
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Lấy class dựa trên kích thước màn hình
  const responsiveClass = isDesktop 
    ? "text-7xl lg:text-8xl" // Desktop size
    : "text-5xl" // Mobile/tablet size

  return (
    <motion.h2
      ref={headlineRef}
      className={cn(
        "font-bold leading-tight tracking-tight", 
        responsiveClass,
        "mix-blend-difference",
        className,
      )}
      style={{
        background: "linear-gradient(45deg, #E70E02, #af4261, #D84A05, #373B44)",
        backgroundSize: "300% 300%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.h2>
  )
}

