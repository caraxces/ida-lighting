"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Header from "@/components/header"
import VideoPlayerSection from "@/components/video-section"
import ProjectSlider from "@/components/project-slider"
import Footer from "@/components/footer"
import FirstElementHpage from "@/components/first-element-hpage"
import SecondElementHpage from "@/components/second-element-hpage"
import LuxuryRealEstate from "@/components/luxury-component"

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const [currentSection, setCurrentSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const lastScrollTimeRef = useRef(0)

  // Check if on mobile device when page loads
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Navigate to section function
  const navigateToSection = useCallback((index: number) => {
    // Check time between scrolls to prevent scrolling too quickly
    const now = Date.now()
    if (now - lastScrollTimeRef.current < 800) return
    lastScrollTimeRef.current = now

    // If already scrolling, skip
    if (isScrolling) return

    // Check valid index
    if (index < 0 || index >= sectionRefs.current.length) return

    // If all conditions are valid, change section
    setIsScrolling(true)
    setCurrentSection(index)

    // After change, reset scrolling state
    setTimeout(() => {
      setIsScrolling(false)
    }, 800)
  }, [currentSection, isScrolling])

  // Handle wheel event for desktop
  useEffect(() => {
    let wheelDebounceTimer: NodeJS.Timeout | null = null;
    
    const handleWheel = (e: WheelEvent) => {
      // Prevent handling multiple wheel events in succession
      if (wheelDebounceTimer !== null) return;
      
      // Prevent default scroll behavior
      e.preventDefault();
      
      // Determine scroll direction
      const direction = e.deltaY > 0 ? 1 : -1;
      
      // Change section based on direction
      if (direction > 0) {
        navigateToSection(currentSection + 1)
      } else {
        navigateToSection(currentSection - 1)
      }
      
      // Set debounce to prevent wheel events happening too quickly
      wheelDebounceTimer = setTimeout(() => {
        wheelDebounceTimer = null;
      }, 800);
    }

    const container = containerRef.current
    if (container) {
      // Use passive: false to allow preventDefault()
      container.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
      if (wheelDebounceTimer) {
        clearTimeout(wheelDebounceTimer);
      }
    }
  }, [currentSection, navigateToSection])

  // Handle touch events for mobile
  useEffect(() => {
    let touchStartY = 0;
    let touchStartX = 0;
    let touchDebounceTimer: NodeJS.Timeout | null = null;
    const minSwipeDistance = 50; // minimum swipe distance (px)

    const handleTouchStart = (e: TouchEvent) => {
      // Only process when no debounce timer is running
      if (touchDebounceTimer !== null) return;
      
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    }

    const handleTouchMove = (e: TouchEvent) => {
      // Prevent default browser scroll if in component
      if (containerRef.current?.contains(e.target as Node)) {
        // Only prevent vertical scroll, allow horizontal
        const touchCurrentY = e.touches[0].clientY;
        const touchCurrentX = e.touches[0].clientX;
        const deltaY = Math.abs(touchCurrentY - touchStartY);
        const deltaX = Math.abs(touchCurrentX - touchStartX);
        
        // If vertical swipe is more than horizontal, prevent default
        if (deltaY > deltaX) {
          e.preventDefault();
        }
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      // Skip if there's a debounce timer
      if (touchDebounceTimer !== null) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      
      const diffY = touchStartY - touchEndY;
      const diffX = touchStartX - touchEndX;
      
      // Only process vertical swipes (when vertical > horizontal)
      if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > minSwipeDistance) {
        // Determine swipe direction
        const direction = diffY > 0 ? 1 : -1;
        
        // Change section based on direction
        if (direction > 0) {
          navigateToSection(currentSection + 1);
        } else {
          navigateToSection(currentSection - 1);
        }
        
        // Set debounce to prevent touch events happening too quickly
        touchDebounceTimer = setTimeout(() => {
          touchDebounceTimer = null;
        }, 800);
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener("touchstart", handleTouchStart, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      }
      if (touchDebounceTimer) {
        clearTimeout(touchDebounceTimer);
      }
    }
  }, [currentSection, navigateToSection])

  // Handle arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return

      if (e.key === "ArrowDown") {
        navigateToSection(currentSection + 1)
      } else if (e.key === "ArrowUp") {
        navigateToSection(currentSection - 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentSection, isScrolling, navigateToSection])

  // Total number of sections for navigation dots
  const totalSections = 6;

  return (
    <div className="w-full h-full relative">
      {/* CSS for smooth transitions and hiding scrollbar */}
      <style jsx global>{`
        /* Hide scrollbar */
        ::-webkit-scrollbar {
          display: none;
          width: 0;
        }
        
        html, body {
          -ms-overflow-style: none;
          scrollbar-width: none;
          max-width: 100vw;
          overscroll-behavior: none;
        }
        
        /* Add transition for sections */
        .section {
          transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1.000);
          position: absolute;
          height: 100vh;
          width: 100vw;
          will-change: transform;
        }
        
        /* Smooth effect for dots navigation */
        .dot {
          transition: all 0.3s ease;
        }
        
        .dot.active {
          transform: scale(1.5);
        }
      `}</style>

      <main className="w-full min-h-screen relative">
        <Header />

        <div ref={containerRef} className="w-full relative">
          {/* VideoPlayerSection - Now first */}
          <div
            ref={(el) => {
              sectionRefs.current[0] = el
            }}
            className="section"
            style={{ transform: `translateY(${(currentSection - 0) * -100}vh)` }}
            data-index={0}
          >
            <VideoPlayerSection />
          </div>

          {/* LuxuryRealEstate */}
          <div
            ref={(el) => {
              sectionRefs.current[1] = el
            }}
            className="section"
            style={{ transform: `translateY(${(currentSection - 1) * -100}vh)` }}
            data-index={1}
          >
            <LuxuryRealEstate />
          </div>

          {/* FirstElementHpage */}
          <div
            ref={(el) => {
              sectionRefs.current[2] = el
            }}
            className="section"
            style={{ transform: `translateY(${(currentSection - 2) * -100}vh)` }}
            data-index={2}
          >
            <FirstElementHpage />
          </div>

          {/* SecondElementHpage */}
          <div
            ref={(el) => {
              sectionRefs.current[3] = el
            }}
            className="section"
            style={{ transform: `translateY(${(currentSection - 3) * -100}vh)` }}
            data-index={3}
          >
            <SecondElementHpage />
          </div>

          {/* ProjectSlider */}
          <div
            ref={(el) => {
              sectionRefs.current[4] = el
            }}
            className="section"
            style={{ transform: `translateY(${(currentSection - 4) * -100}vh)`, background: "#B8BBC1" }}
            data-index={4}
          >
            <ProjectSlider />
          </div>

          {/* Footer */}
          <div
            ref={(el) => {
              sectionRefs.current[5] = el
            }}
            className="section"
            style={{ transform: `translateY(${(currentSection - 5) * -100}vh)` }}
            data-index={5}
          >
            <div className="rounded-t-[10px] overflow-hidden shadow-2xl h-full">
              <Footer />
            </div>
          </div>
        </div>

        {/* Section indicator dots */}
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2">
          {Array(totalSections)
            .fill(0)
            .map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 dot ${
                  currentSection === index ? "bg-white scale-150 active" : "bg-white/40"
                }`}
                onClick={() => navigateToSection(index)}
                aria-label={`Go to section ${index + 1}`}
              />
            ))}
        </div>
      </main>
    </div>
  )
}