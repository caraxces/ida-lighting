"use client"

import { useEffect, useRef, useState } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import VideoPlayerSection from "@/components/video-section"
import ProjectSlider from "@/components/project-slider"
import ServicesSection from "@/components/services-section"
import Footer from "@/components/footer"
import Enhanced3DVideoCard from "@/components/video-3D"
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
  const [projectSliderAtLastSlideRef, setProjectSliderAtLastSlide] = useState(false)
  const [servicesSliderAtLastSlideRef, setServicesSliderAtLastSlide] = useState(false)

  // Danh sách index của các component có slide riêng
  const independentComponentIndices = [1, 2, 4, 6] // FirstElementHpage, SecondElementHpage, ProjectSlider, ServicesSection

  // Kiểm tra thiết bị di động khi trang được tải
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Kiểm tra xem component hiện tại có phải là component độc lập không
  const isIndependentComponent = (sectionIndex) => {
    return independentComponentIndices.includes(sectionIndex)
  }

  // Hàm chuyển đến section
  const navigateToSection = (index) => {
    // Kiểm tra thời gian giữa các lần scroll để tránh scroll quá nhanh
    const now = Date.now()
    if (now - lastScrollTimeRef.current < 800) return
    lastScrollTimeRef.current = now

    // Nếu đang scrolling, bỏ qua
    if (isScrolling) return

    // Kiểm tra index hợp lệ
    if (index < 0 || index >= sectionRefs.current.length) return

    // Nếu đang ở section cuối và cố gắng chuyển đến section sau
    if (currentSection === sectionRefs.current.length - 1 && index > currentSection) {
      return
    }

    // Nếu đang ở section đầu và cố gắng chuyển đến section trước
    if (currentSection === 0 && index < 0) {
      return
    }

    // THÊM KIỂM TRA CHO COMPONENT CÓ SLIDE
    if (isIndependentComponent(currentSection)) {
      const direction = index - currentSection;
      
      // Kiểm tra xem có thể chuyển từ component hiện tại không
      if (!canNavigateFromIndependentComponent(direction, currentSection)) {
        console.log(`Prevented navigation from component ${currentSection} in direction ${direction}`);
        return; // Chặn việc chuyển nếu chưa đạt điều kiện
      }
    }

    // Nếu mọi điều kiện đều hợp lệ, chuyển section
    setIsScrolling(true)
    setCurrentSection(index)

    // Sau khi chuyển xong, reset trạng thái scrolling
    setTimeout(() => {
      setIsScrolling(false)
    }, 800)
  }

  // Xử lý sự kiện wheel (cuộn chuột) cho desktop
  useEffect(() => {
    const handleWheel = (e) => {
      // Ngăn cản scroll mặc định
      e.preventDefault()

      // Xác định hướng cuộn
      const direction = e.deltaY > 0 ? 1 : -1;
      
      // Nếu đang ở component độc lập, kiểm tra trước
      if (isIndependentComponent(currentSection)) {
        if (!canNavigateFromIndependentComponent(direction, currentSection)) {
          console.log(`Wheel: Blocked navigation from component ${currentSection}`);
          return; // Chặn ngay từ đầu nếu chưa đủ điều kiện
        }
      }

      // Nếu qua được điều kiện, mới chuyển section
      if (direction > 0) {
        navigateToSection(currentSection + 1)
      } else {
        navigateToSection(currentSection - 1)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [currentSection, isScrolling, projectSliderAtLastSlideRef, servicesSliderAtLastSlideRef])

  // Xử lý sự kiện touch cho mobile
  useEffect(() => {
    let touchStartY = 0

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY
      const diff = touchStartY - touchEndY

      // Nếu vuốt đủ khoảng cách (50px)
      if (Math.abs(diff) > 50) {
        // Xác định hướng vuốt
        const direction = diff > 0 ? 1 : -1;
        
        // Nếu đang ở component độc lập, kiểm tra trước
        if (isIndependentComponent(currentSection)) {
          if (!canNavigateFromIndependentComponent(direction, currentSection)) {
            console.log(`Touch: Blocked navigation from component ${currentSection}`);
            return; // Chặn ngay từ đầu nếu chưa đủ điều kiện
          }
        }

        // Nếu qua được điều kiện, mới chuyển section
        if (direction > 0) {
          navigateToSection(currentSection + 1)
        } else {
          navigateToSection(currentSection - 1)
        }
      }
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [currentSection, isScrolling, projectSliderAtLastSlideRef, servicesSliderAtLastSlideRef])

  // Xử lý phím mũi tên
  useEffect(() => {
    const handleKeyDown = (e) => {
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
  }, [currentSection, isScrolling])

  // Cuộn về đầu trang khi tải
  useEffect(() => {
    window.scrollTo(0, 0)

    // Tránh overflow cho html và body
    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"

    return () => {
      document.documentElement.style.overflow = ""
      document.body.style.overflow = ""
    }
  }, [])

  // Hàm xử lý thông báo từ các component
  const handleComponentSlideChange = (componentIndex, isAtLastSlide) => {
    console.log(`Component ${componentIndex} at last slide: ${isAtLastSlide}`);
    
    if (componentIndex === 4) { // ProjectSlider
      setProjectSliderAtLastSlide(isAtLastSlide);
    } else if (componentIndex === 6) { // ServicesSection 
      setServicesSliderAtLastSlide(isAtLastSlide);
    }
  }

  // Kiểm tra xem có thể chuyển từ component độc lập không
  const canNavigateFromIndependentComponent = (direction, sectionIndex) => {
    // Chỉ áp dụng khi muốn chuyển xuống (direction > 0)
    if (direction > 0) {
      // Với ProjectSlider (index 4)
      if (sectionIndex === 4) {
        console.log("Can navigate from ProjectSlider:", projectSliderAtLastSlideRef);
        return projectSliderAtLastSlideRef;
      }
      
      // Với ServicesSection (index 6)
      if (sectionIndex === 6) {
        console.log("Can navigate from ServicesSection:", servicesSliderAtLastSlideRef);
        return servicesSliderAtLastSlideRef;
      }
    }
    
    // Cho phép chuyển đối với các trường hợp khác
    return true;
  }

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* CSS để làm mượt chuyển động và ẩn scrollbar */}
      <style jsx global>{`
        /* Ẩn scrollbar */
        ::-webkit-scrollbar {
          display: none;
          width: 0;
        }
        
        html, body {
          -ms-overflow-style: none;
          scrollbar-width: none;
          max-width: 100vw;
          overscroll-behavior: none;
          height: 100%;
          width: 100%;
        }
        
        /* Thêm transition cho các section */
        .section {
          transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1.000);
          position: absolute;
          height: 100vh;
          width: 100vw;
          will-change: transform;
        }
        
        /* Hiệu ứng mượt cho dots navigation */
        .dot {
          transition: all 0.3s ease;
        }
        
        .dot.active {
          transform: scale(1.5);
        }
        
        /* Đặt z-index cao hơn cho các component độc lập */
        .independent-section {
          z-index: 20;
        }
      `}</style>

      <main className="w-full h-screen relative overflow-hidden">
        <Header />

        <div ref={containerRef} className="w-full h-screen relative">
          {/* LuxuryRealEstate */}
          <div
            ref={(el) => {
              sectionRefs.current[0] = el
            }}
            className="section"
            style={{ transform: `translateY(${(currentSection - 0) * -100}vh)` }}
            data-index={0}
          >
            <LuxuryRealEstate />
          </div>

          {/* FirstElementHpage - component không tác động */}
          <div
            ref={(el) => {
              sectionRefs.current[1] = el
            }}
            className="section independent-section"
            style={{ transform: `translateY(${(currentSection - 1) * -100}vh)` }}
            data-index={1}
          >
            <FirstElementHpage onSlideChange={(isAtLastSlide) => handleComponentSlideChange(1, isAtLastSlide)} />
          </div>

          {/* SecondElementHpage - component không tác động */}
          <div
            ref={(el) => {
              sectionRefs.current[2] = el
            }}
            className="section independent-section"
            style={{ transform: `translateY(${(currentSection - 2) * -100}vh)` }}
            data-index={2}
          >
            <SecondElementHpage onSlideChange={(isAtLastSlide) => handleComponentSlideChange(2, isAtLastSlide)} />
          </div>

          {/* HeroSection */}
          <div
            ref={(el) => {
              sectionRefs.current[3] = el
            }}
            className="section"
            style={{ transform: `translateY(${(currentSection - 3) * -100}vh)` }}
            data-index={3}
          >
            <HeroSection />
          </div>

          {/* ProjectSlider */}
          <div
            ref={(el) => {
              sectionRefs.current[4] = el
            }}
            className="section independent-section"
            style={{ transform: `translateY(${(currentSection - 4) * -100}vh)`, background: "#B8BBC1" }}
            data-index={4}
          >
            <ProjectSlider onSlideChange={(isAtLastSlide) => handleComponentSlideChange(4, isAtLastSlide)} />
          </div>

          {/* VideoPlayerSection */}
          <div
            ref={(el) => {
              sectionRefs.current[5] = el
            }}
            className="section"
            style={{ transform: `translateY(${(currentSection - 5) * -100}vh)`, background: "#B8BBC1" }}
            data-index={5}
          >
            <VideoPlayerSection />
          </div>

          {/* ServicesSection */}
          <div
            id="work"
            ref={(el) => {
              sectionRefs.current[6] = el
            }}
            className="section independent-section"
            style={{ transform: `translateY(${(currentSection - 6) * -100}vh)`, background: "#B8BBC1" }}
            data-index={6}
          >
            <ServicesSection onSlideChange={(isAtLastSlide) => handleComponentSlideChange(6, isAtLastSlide)} />
          </div>

          {/* Enhanced3DVideoCard */}
          <div
            ref={(el) => {
              sectionRefs.current[7] = el
            }}
            className="section"
            style={{ transform: `translateY(${(currentSection - 7) * -100}vh)`, background: "#B8BBC1" }}
            data-index={7}
          >
            <Enhanced3DVideoCard />
          </div>

          {/* Footer */}
          <div
            ref={(el) => {
              sectionRefs.current[8] = el
            }}
            className="section"
            style={{ transform: `translateY(${(currentSection - 8) * -100}vh)` }}
            data-index={8}
          >
            <div className="rounded-t-[10px] overflow-hidden shadow-2xl h-full">
              <Footer />
            </div>
          </div>
        </div>

        {/* Chấm chỉ báo section */}
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2">
          {Array(9)
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

