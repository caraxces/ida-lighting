"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import AnimatedTitle from "./animated-title"
import GlowButton from "./glow-button"
import { useSound } from "@/hooks/use-sound"

// You can pass the background image URLs as props
interface HeroSectionProps {
  lightBackground?: string
  darkBackground?: string
}

export default function HeroSection({
  lightBackground = "/red-vintage/7.png",
  darkBackground = "/red-vintage/6.png",
}: HeroSectionProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { playSound } = useSound()

  // Add custom font for the title
  useEffect(() => {
    // Add Google Font
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    setMousePosition({ x: clientX, y: clientY })
  }

  const toggleLights = () => {
    setIsDarkMode(!isDarkMode)
    playSound() // Play sound when toggling lights
  }

  return (
    <section
      ref={containerRef}
      className="relative h-[100vh] flex flex-col items-center justify-center px-4 md:px-8 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Light Background Image */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${lightBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isDarkMode ? 0 : 1,
        }}
      >
        {/* Light mode overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 70%)",
          }}
        ></div>
      </div>

      {/* Dark Background Image */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${darkBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isDarkMode ? 1 : 0,
        }}
      >
        {/* Dark mode overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, rgba(30, 50, 100, 0.3) 0%, rgba(10, 10, 20, 0.1) 70%)",
          }}
        ></div>
        </div>

      {/* Main content */}
      <div className="container mx-auto text-center z-20 relative max-w-4xl">
          <motion.div
          initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
          <AnimatedTitle>
            <span className="block">IDA</span>
            <span className="font-extrabold">Lighting</span>
          </AnimatedTitle>

          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mt-6">
            IDA Lighting - Mang đến những giải pháp chiếu sáng đột phá, kiến tạo không gian với sự tinh tế trong mức tối ưu kinh tế mang lại giá trị thực tế.
          </p>

          {/* Glow Button CTA */}
          <div className="mt-12 flex justify-center">
            <GlowButton
              text={isDarkMode ? "Turn On Lights" : "Turn Off Lights"}
              onClick={toggleLights}
              className="w-48"
            />
                </div>
              </motion.div>
            </div>

      {/* Optional subtle gradient overlay at the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-10"
        style={{
          background: "linear-gradient(to top, rgba(10, 10, 20, 0.8), transparent)",
        }}
      ></div>
        </section>
  )
}

