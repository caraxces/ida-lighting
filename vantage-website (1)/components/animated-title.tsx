"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type AnimatedTitleProps = {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function AnimatedTitle({ children, className, delay = 0.2 }: AnimatedTitleProps) {
  const headlineRef = useRef<HTMLHeadingElement>(null)

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

  return (
    <motion.h2
      ref={headlineRef}
      className={cn(
        "text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight mix-blend-difference",
        className,
      )}
      style={{
        background: "linear-gradient(45deg, #f3ec78, #af4261, #4286f4, #373B44)",
        backgroundSize: "300% 300%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        MozBackgroundClip: "text",
        MozTextFillColor: "transparent",
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.h2>
  )
}

