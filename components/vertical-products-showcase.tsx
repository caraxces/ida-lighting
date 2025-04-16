"use client"

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ThirdElementHpage from './third-element-hpage'

// Define product sets with different images and data
const productSets = [
  {
    id: 1,
    title: "Premium Collection",
    images: [
      "/work/IDA_Starlake/TRC_7559.jpg",
      "/work/IDA_Starlake/TRC_7565.jpg",
      "/work/IDA_Starlake/TRC_7561.jpg",
      "/work/IDA_Starlake/TRC_7562.jpg",
    ]
  },
  {
    id: 2,
    title: "Designer Series",
    images: [
      "/slides/6899-10+5.png",
      "/slides/6551-6.png",
      "/slides/6897-1.png",
      "/slides/6899-2+1.png",
    ]
  },
  {
    id: 3,
    title: "Modern Collection",
    images: [
      "/slides/2.png",
      "/slides/3.png",
      "/slides/4.png",
      "/slides/6898-8.png",
    ]
  },
  {
    id: 4,
    title: "Classic Series",
    images: [
      "/work/IDA_Starlake/TRC_7562.jpg",
      "/work/IDA_Starlake/TRC_7561.jpg", 
      "/work/IDA_Starlake/TRC_7565.jpg",
      "/work/IDA_Starlake/TRC_7559.jpg",
    ]
  }
]

export default function VerticalProductsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Array<HTMLDivElement | null>>(Array(productSets.length).fill(null))
  const [isScrolling, setIsScrolling] = useState(false)
  
  // Handle scroll to specific section
  const scrollToSection = (index: number) => {
    if (isScrolling || !containerRef.current) return
    
    setIsScrolling(true)
    setActiveIndex(index)
    
    const targetSection = sectionRefs.current[index]
    if (targetSection) {
      targetSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })
    }
    
    // Prevent rapid scrolling
    setTimeout(() => {
      setIsScrolling(false)
    }, 1000)
  }
  
  // Handle wheel events for smooth scrolling between sections
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return
      e.preventDefault()
      
      const direction = e.deltaY > 0 ? 1 : -1
      const newIndex = Math.min(Math.max(activeIndex + direction, 0), productSets.length - 1)
      
      if (newIndex !== activeIndex) {
        scrollToSection(newIndex)
      }
    }
    
    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
    }
    
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [activeIndex, isScrolling])

  // Set ref callback function
  const setSectionRef = (el: HTMLDivElement | null, index: number) => {
    sectionRefs.current[index] = el
  }
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Stacked product sections */}
      <div className="relative w-full h-full">
        {productSets.map((productSet, index) => (
          <div 
            key={productSet.id}
            ref={(el) => setSectionRef(el, index)}
            className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
              index === activeIndex ? 'z-10' : 'z-0'
            }`}
            style={{
              transform: `translateY(${(index - activeIndex) * 100}%)`,
              height: '100vh',
            }}
          >
            <ThirdElementHpage productSet={productSet} />
          </div>
        ))}
      </div>
      
      {/* Vertical Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-50">
        {productSets.map((set, index) => (
          <button
            key={set.id}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              activeIndex === index ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to product set ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
} 