"use client"

import { useEffect, useRef, useState, useCallback, Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from "framer-motion"

// Dynamic imports with loading fallbacks
const VideoPlayerSection = dynamic(() => import("@/components/video-section"), {
  loading: () => <div className="w-full h-screen bg-black flex items-center justify-center">Loading video...</div>,
  ssr: false
})

const HomeProjectSlider = dynamic(() => import("@/components/home-project-slider"), {
  loading: () => <div className="w-full h-screen bg-gray-900"></div>
})

const FirstElementHpage = dynamic(() => import("@/components/first-element-hpage"), {
  loading: () => <div className="w-full h-screen bg-black"></div>
})

const SecondElementHpage = dynamic(() => import("@/components/second-element-hpage"), {
  loading: () => <div className="w-full h-screen bg-black"></div>
})

const ThirdElementHpage = dynamic(() => import("@/components/third-element-hpage"), {
  loading: () => <div className="w-full h-screen bg-black"></div>
})

const ProjectSlider = dynamic(() => import("@/components/project-slider"), {
  loading: () => <div className="w-full h-screen bg-[#B8BBC1]"></div>
})

const ProductShowcase = dynamic(() => import("@/components/product-showcase"), {
  loading: () => <div className="w-full h-screen bg-black"></div>
})

const LightingShowcase = dynamic(() => import("@/components/lighting-showcase"), {
  loading: () => <div className="w-full h-screen bg-black"></div>
})

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const scrollCooldownRef = useRef(false)
  const totalSections = 9

  // Define product set for ThirdElementHpage
  const homeProductSet = {
    id: 1,
    title: "Featured Products",
    images: [
      "/slides/6899-10+5.png",
      "/slides/6551-6.png",
      "/slides/6897-1.png",
      "/slides/6899-2+1.png",
    ]
  }

  // Detect device type
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Handle section navigation with improved performance
  const navigateToSection = useCallback((index: number) => {
    // Validate index boundaries
    if (index < 0 || index >= totalSections || scrollCooldownRef.current || isScrolling) {
      return
    }

    // Set cooldown to prevent rapid scrolling
    scrollCooldownRef.current = true
    
    // Start transition
    setIsScrolling(true)
    setCurrentSection(index)

    // Reset states after animation completes
    setTimeout(() => {
      setIsScrolling(false)
      
      // Add a small delay before allowing next scroll
      setTimeout(() => {
        scrollCooldownRef.current = false
      }, 100)
    }, 800)
  }, [isScrolling, totalSections])

  // Create optimized wheel event handler
  useEffect(() => {
    if (!containerRef.current) return
    
    // Use passive wheel listener for better performance
    const handleWheel = (e: WheelEvent) => {
      // Allow normal scrolling behavior when in the footer section
      if (currentSection === totalSections - 1) {
        const footerElement = document.querySelector('.footer-section');
        const isFooterScrollable = footerElement && footerElement.scrollHeight > footerElement.clientHeight;
        
        // If at the top of footer and scrolling up, move to previous section
        if (e.deltaY < 0 && (!footerElement || footerElement.scrollTop === 0)) {
          e.preventDefault();
          navigateToSection(currentSection - 1);
        }
        // Otherwise allow normal scrolling in the footer
        else if (isFooterScrollable) {
          return;
        }
        // If footer is not scrollable and scrolling down, prevent default behavior
        else if (e.deltaY > 0) {
          e.preventDefault();
        }
        return;
      }
      
      e.preventDefault();
      
      if (scrollCooldownRef.current) return;
      
      const direction = e.deltaY > 0 ? 1 : -1;
      navigateToSection(currentSection + direction);
    }

    const container = containerRef.current
    container.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      container.removeEventListener("wheel", handleWheel)
    }
  }, [currentSection, navigateToSection, totalSections])

  // Optimized touch events handler
  useEffect(() => {
    let touchStartY = 0
    const minSwipeDistance = 50
    
    const handleTouchStart = (e: TouchEvent) => {
      if (scrollCooldownRef.current) return
      touchStartY = e.touches[0].clientY
    }
    
    const handleTouchMove = (e: TouchEvent) => {
      // Allow normal touch behavior in the footer section
      if (currentSection === totalSections - 1) {
        const footerElement = document.querySelector('.footer-section');
        
        // Only prevent default if at the top of footer and trying to scroll up
        if (footerElement && footerElement.scrollTop === 0) {
          const touchCurrentY = e.touches[0].clientY;
          if (touchCurrentY > touchStartY) {
            e.preventDefault();
          }
        }
        return;
      }
      
      // Only prevent default for vertical swipes to allow horizontal scrolling
      const touchCurrentY = e.touches[0].clientY
      const touchCurrentX = e.touches[0].clientX
      const touchStartX = e.touches[0].clientX
      
      const deltaY = Math.abs(touchCurrentY - touchStartY)
      const deltaX = Math.abs(touchCurrentX - touchStartX)
      
      if (deltaY > deltaX && containerRef.current?.contains(e.target as Node)) {
        e.preventDefault()
      }
    }
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (scrollCooldownRef.current) return
      
      const touchEndY = e.changedTouches[0].clientY
      const diffY = touchStartY - touchEndY
      
      // In footer, only navigate to previous section if at the top and swiping up
      if (currentSection === totalSections - 1) {
        const footerElement = document.querySelector('.footer-section');
        if (footerElement && footerElement.scrollTop === 0 && diffY < -minSwipeDistance) {
          navigateToSection(currentSection - 1);
        }
        return;
      }
      
      if (Math.abs(diffY) > minSwipeDistance) {
        const direction = diffY > 0 ? 1 : -1
        navigateToSection(currentSection + direction)
      }
    }
    
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })
    
    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [currentSection, navigateToSection, totalSections])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          navigateToSection(currentSection + 1)
          break
        case "ArrowUp":
          navigateToSection(currentSection - 1)
          break
        case "Home":
          navigateToSection(0)
          break
        case "End":
          navigateToSection(totalSections - 1)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSection, navigateToSection, totalSections])

  // Prepare section components for better performance
  const sections = [
    <VideoPlayerSection key="video" />,
    <div className="bg-[#B8BBC1] w-full h-full" key="project"><ProjectSlider /></div>,
    <HomeProjectSlider key="home-projects" />,
    <ThirdElementHpage key="third" productSet={homeProductSet} />,
    <FirstElementHpage key="first" />,
    <SecondElementHpage key="second" />,
    <ProductShowcase key="product-showcase" />,
    <LightingShowcase key="lighting-showcase" />,
    <div className="rounded-t-[10px] overflow-y-auto w-full h-auto" key="footer"><Footer /></div>
  ]

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* CSS for smooth transitions and hiding scrollbar */}
      <style jsx global>{`
        ::-webkit-scrollbar { display: none; width: 0; }
        
        html, body {
          -ms-overflow-style: none;
          scrollbar-width: none;
          max-width: 100vw;
          overscroll-behavior: none;
          overflow: ${currentSection === totalSections - 1 ? 'auto' : 'hidden'};
        }

        .footer-section {
          overflow-y: ${currentSection === totalSections - 1 ? 'auto' : 'hidden'};
          height: ${currentSection === totalSections - 1 ? 'auto' : '100vh'};
        }
      `}</style>

      <main className="w-full h-screen relative">
        <Header />

        <div ref={containerRef} className="w-full h-full relative">
          {/* Use Framer Motion for smoother section transitions */}
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className={`absolute top-0 left-0 w-full ${index === totalSections - 1 ? 'footer-section' : 'h-screen'}`}
              initial={false}
              animate={{
                y: `${(index - currentSection) * 100}vh`,
                transition: { 
                  duration: 0.8, 
                  ease: [0.645, 0.045, 0.355, 1.000],
                }
              }}
              style={{ 
                zIndex: totalSections - Math.abs(currentSection - index),
                willChange: "transform",
              }}
              data-index={index}
              aria-hidden={currentSection !== index}
            >
              {/* Only render current section and adjacent sections for performance */}
              {Math.abs(currentSection - index) <= 1 && section}
            </motion.div>
          ))}
        </div>

        {/* Section indicator dots with animation */}
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3">
          {Array(totalSections)
            .fill(0)
            .map((_, index) => (
              <motion.button
                key={index}
                className="relative flex items-center justify-center h-6 w-6 group"
                onClick={() => navigateToSection(index)}
                aria-label={`Go to section ${index + 1}`}
                initial={false}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Section {index + 1}</span>
                <motion.span 
                  className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-white/70 transition-colors duration-200"
                  animate={{
                    scale: currentSection === index ? 1.5 : 1,
                    backgroundColor: currentSection === index ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.4)"
                  }}
                />
                {currentSection === index && (
                  <motion.span 
                    className="absolute inset-0 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5,
                      repeatDelay: 0.5
                    }}
                    style={{ 
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                    }}
                  />
                )}
              </motion.button>
            ))}
        </div>

        {/* Section progress indicator */}
        {/* <div className="fixed left-8 bottom-8 z-50 flex items-center gap-2">
          <span className="text-white text-lg font-medium">{currentSection + 1}</span>
          <div className="w-12 h-[1px] bg-white/30">
            <motion.div 
              className="h-full bg-white" 
              initial={false}
              animate={{ 
                width: `${((currentSection + 1) / totalSections) * 100}%` 
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-white/70 text-sm">{totalSections}</span>
        </div> */}
      </main>
    </div>
  )
}