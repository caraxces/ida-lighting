"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Header from "@/components/header"
import AboutHero from "@/components/about-hero"
// import AboutTeam from "@/components/about-team"
import AboutBody from "@/components/about-body"
import Footer from "@/components/footer"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState(0)
  const heroRef = useRef(null)
  const bodyRef = useRef<HTMLDivElement | null>(null)
  const bodyContentRef = useRef<HTMLDivElement | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [canScroll, setCanScroll] = useState(true)
  const [hasScrolledInBody, setHasScrolledInBody] = useState(false)

  // Hàm chuyển đến phần tiếp theo
  const scrollToNextSection = useCallback(() => {
    if (isTransitioning || !canScroll) return

    setIsTransitioning(true)
    setActiveSection(activeSection === 0 ? 1 : 0)
    setCanScroll(false)
    
    setTimeout(() => {
      setIsTransitioning(false)
      setCanScroll(true)
      
      // Khi chuyển sang phần Body, đặt scrollTop về 0
      if (activeSection === 0 && bodyRef.current) {
        bodyRef.current.scrollTop = 0
        setHasScrolledInBody(false)
      }
    }, 1000)
  }, [activeSection, isTransitioning, canScroll]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!canScroll) return;
      
      // Ngăn chặn xử lý nhiều sự kiện cuộn cùng lúc
      if (isTransitioning) return;
      
      // Xác định hướng cuộn (lên hay xuống)
      const direction = e.deltaY > 0 ? 1 : -1;
      
      if (activeSection === 0 && direction > 0) {
        // Cuộn xuống từ Hero đến Body
        e.preventDefault();
        scrollToNextSection();
      } else if (activeSection === 1 && direction < 0) {
        // Chỉ chuyển về Hero nếu đang ở đầu phần Body (chưa cuộn xuống)
        if (bodyRef.current && bodyRef.current.scrollTop <= 10) {
          e.preventDefault();
          scrollToNextSection();
        }
      }
    };

    // Touch events cho thiết bị di động
    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!canScroll || isTransitioning) return;
      
      const touchY = e.touches[0].clientY;
      const diff = touchStartY - touchY;
      
      // Xác định hướng vuốt (lên hay xuống)
      if (diff > 50 && activeSection === 0) {
        // Vuốt lên từ Hero đến Body
        e.preventDefault();
        scrollToNextSection();
      } else if (diff < -50 && activeSection === 1) {
        // Chỉ chuyển về Hero nếu đang ở đầu phần Body (chưa cuộn xuống)
        if (bodyRef.current && bodyRef.current.scrollTop <= 10) {
          e.preventDefault();
          scrollToNextSection();
        }
      }
    };
    
    // Theo dõi cuộn trong phần Body
    const handleBodyScroll = () => {
      if (bodyRef.current && bodyRef.current.scrollTop > 10) {
        setHasScrolledInBody(true);
      } else {
        setHasScrolledInBody(false);
      }
    };

    // Đăng ký các event listeners
    window.addEventListener('wheel', handleWheel as EventListener, { passive: false });
    window.addEventListener('touchstart', handleTouchStart as EventListener, { passive: false });
    window.addEventListener('touchmove', handleTouchMove as EventListener, { passive: false });
    
    // Thêm event listener cho body scroll
    if (bodyRef.current) {
      bodyRef.current.addEventListener('scroll', handleBodyScroll);
    }
    
    return () => {
      // Xóa event listeners khi component unmount
      window.removeEventListener('wheel', handleWheel as EventListener);
      window.removeEventListener('touchstart', handleTouchStart as EventListener);
      window.removeEventListener('touchmove', handleTouchMove as EventListener);
      
      if (bodyRef.current) {
        bodyRef.current.removeEventListener('scroll', handleBodyScroll);
      }
    };
  }, [scrollToNextSection, activeSection, isTransitioning, canScroll]);

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-black text-white">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      
      <main className="h-screen w-screen overflow-hidden">
        {/* Hero Section */}
        <div 
          ref={heroRef}
          className="h-screen w-full absolute top-0 left-0 transition-transform duration-1000 ease-in-out"
          style={{ 
            transform: `translateY(${activeSection === 0 ? '0' : '-100%'})`,
            opacity: activeSection === 0 ? 1 : 0,
            visibility: activeSection === 0 ? 'visible' : 'hidden',
            transition: 'transform 1s ease-in-out, opacity 0.8s ease-in-out, visibility 0s linear'
          }}
        >
          <AboutHero />
          
          {/* Scroll Indicator - chỉ hiển thị khi đang ở Hero section */}
          {activeSection === 0 && (
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer z-20" onClick={scrollToNextSection}>
              <p className="text-white/70 mb-2 text-sm">Cuộn xuống để xem thêm</p>
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <ChevronDown className="w-6 h-6 text-white animate-bounce" />
              </div>
            </div>
          )}
        </div>
        
        {/* Body Section */}
        <div 
          ref={bodyRef}
          className="h-screen w-full absolute top-0 left-0 transition-transform duration-1000 ease-in-out overflow-y-auto"
          style={{ 
            transform: `translateY(${activeSection === 1 ? '0' : '100%'})`,
            opacity: activeSection === 1 ? 1 : 0,
            visibility: activeSection === 1 ? 'visible' : 'hidden',
            transition: 'transform 1s ease-in-out, opacity 0.8s ease-in-out, visibility 0s linear',
            scrollBehavior: 'smooth',
            msOverflowStyle: 'none', /* IE and Edge */
            scrollbarWidth: 'none', /* Firefox */
          }}
        >
          {/* Hide scrollbar for Chrome, Safari and Opera */}
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          <div ref={bodyContentRef} className="relative">
            <AboutBody />
            <div className="-mt-[30px] relative z-10">
              <Footer />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

