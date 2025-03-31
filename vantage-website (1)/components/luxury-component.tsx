"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, useScroll } from "framer-motion"

// You can pass the background image URL as a prop
interface HeroSectionProps {
  backgroundImage?: string
}

export default function HeroSection({ backgroundImage }: HeroSectionProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[100vh] flex flex-col items-center justify-center px-4 md:px-8 overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-[#0a0a14]"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay to ensure text readability */}
        {/* <div className="absolute inset-0 bg-black/50"></div> */}

        {/* Additional gradient overlay for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, rgba(30, 50, 100, 0.3) 0%, rgba(10, 10, 20, 0.1) 70%)",
          }}
        ></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto text-center z-10 relative max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8 absolute top-1/2 transform -translate-y-1/2"
          onMouseMove={handleMouseMove}
        >
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-tight"
            style={{
              background: `linear-gradient(
                ${mousePosition.x / window.innerWidth * 360}deg,
                #8B0000,
                #A52A2A,
                #CD5C5C
              )`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% 200%",
              backgroundPosition: `${(mousePosition.x / window.innerWidth) * 100}% ${(mousePosition.y / window.innerHeight) * 100}%`
            }}
          >
            <span className="block">
              IDA
            </span>
            <span className="block italic">
              lighting
            </span>
          </motion.h1>

          <p className="text-white/80 text-lg md:text-xl max-w-lg font-['Montserrat'] font-light leading-relaxed mt-6">
            IDA Lighting - Bringing innovative lighting solutions to transform spaces with elegance and efficiency.
          </p>
        </motion.div>

        {/* Scroll button
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16"
        >
          <button className="flex items-center mx-auto space-x-2 px-6 py-3 border border-white/30 rounded-full hover:bg-white/10 transition-colors group">
            <span className="text-white">Scroll to explore more</span>
            <ChevronDown className="text-white animate-bounce group-hover:animate-none" />
          </button>
        </motion.div> */}
      </div>

      {/* Optional subtle gradient overlay at the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-0"
        style={{
          background: "linear-gradient(to top, rgba(10, 10, 20, 0.8), transparent)",
        }}
      ></div>
    </section>
  )
}

