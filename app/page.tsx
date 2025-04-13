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
  const [projectSliderAtLastSlideRef, setProjectSliderAtLastSlide] = useState(false)

  // Danh sách index của các component có slide riêng
  const independentComponentIndices = [2, 3, 4] // FirstElementHpage, SecondElementHpage, ProjectSlider

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
  const isIndependentComponent = useCallback((sectionIndex: number) => {
    return independentComponentIndices.includes(sectionIndex)
  }, [])

  // Kiểm tra xem có thể chuyển từ component độc lập không
  const canNavigateFromIndependentComponent = useCallback((direction: number, sectionIndex: number) => {
    // Chỉ áp dụng khi muốn chuyển xuống (direction > 0)
    if (direction > 0) {
      // Với ProjectSlider (index 4)
      if (sectionIndex === 4) {
        console.log("Can navigate from ProjectSlider:", projectSliderAtLastSlideRef);
        return projectSliderAtLastSlideRef;
      }
    }
    
    // Cho phép chuyển đối với các trường hợp khác
    return true;
  }, [projectSliderAtLastSlideRef])

  // Hàm chuyển đến section
  const navigateToSection = useCallback((index: number) => {
    // Kiểm tra thời gian giữa các lần scroll để tránh scroll quá nhanh
    const now = Date.now()
    if (now - lastScrollTimeRef.current < 800) return
    lastScrollTimeRef.current = now

    // Nếu đang scrolling, bỏ qua
    if (isScrolling) return

    // Kiểm tra index hợp lệ
    if (index < 0 || index >= sectionRefs.current.length) return

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
  }, [currentSection, isScrolling, isIndependentComponent, canNavigateFromIndependentComponent])

  // Xử lý sự kiện wheel (cuộn chuột) cho desktop
  useEffect(() => {
    let wheelDebounceTimer: NodeJS.Timeout | null = null;
    
    const handleWheel = (e: WheelEvent) => {
      // Ngăn chặn xử lý nhiều sự kiện wheel liên tiếp
      if (wheelDebounceTimer !== null) return;
      
      // Ngăn chặn hành vi scroll mặc định
      e.preventDefault();
      
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
      
      // Thiết lập debounce để ngăn nhiều sự kiện wheel xảy ra quá nhanh
      wheelDebounceTimer = setTimeout(() => {
        wheelDebounceTimer = null;
      }, 800);
    }

    const container = containerRef.current
    if (container) {
      // Sử dụng passive: false để có thể gọi preventDefault()
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
  }, [currentSection, navigateToSection, isIndependentComponent, canNavigateFromIndependentComponent])

  // Xử lý sự kiện touch cho mobile
  useEffect(() => {
    let touchStartY = 0;
    let touchStartX = 0;
    let touchDebounceTimer: NodeJS.Timeout | null = null;
    const minSwipeDistance = 50; // khoảng cách vuốt tối thiểu (px)

    const handleTouchStart = (e: TouchEvent) => {
      // Chỉ xử lý khi không có timer debounce đang chạy
      if (touchDebounceTimer !== null) return;
      
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX; // Lưu vị trí X để phân biệt vuốt dọc/ngang
    }

    const handleTouchMove = (e: TouchEvent) => {
      // Ngăn scroll mặc định của trình duyệt nếu đang trong component
      if (containerRef.current?.contains(e.target as Node)) {
        // Chỉ ngăn scroll dọc, cho phép scroll ngang
        const touchCurrentY = e.touches[0].clientY;
        const touchCurrentX = e.touches[0].clientX;
        const deltaY = Math.abs(touchCurrentY - touchStartY);
        const deltaX = Math.abs(touchCurrentX - touchStartX);
        
        // Nếu vuốt dọc nhiều hơn vuốt ngang, ngăn hành vi mặc định
        if (deltaY > deltaX) {
          e.preventDefault();
        }
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      // Bỏ qua nếu đang có một debounce timer
      if (touchDebounceTimer !== null) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      
      const diffY = touchStartY - touchEndY;
      const diffX = touchStartX - touchEndX;
      
      // Chỉ xử lý vuốt dọc (khi vuốt dọc nhiều hơn ngang)
      if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > minSwipeDistance) {
        // Xác định hướng vuốt
        const direction = diffY > 0 ? 1 : -1;
        
        // Nếu đang ở component độc lập, kiểm tra trước
        if (isIndependentComponent(currentSection)) {
          if (!canNavigateFromIndependentComponent(direction, currentSection)) {
            console.log(`Touch: Blocked navigation from component ${currentSection}`);
            return; // Chặn ngay từ đầu nếu chưa đủ điều kiện
          }
        }

        // Nếu qua được điều kiện, mới chuyển section
        if (direction > 0) {
          navigateToSection(currentSection + 1);
        } else {
          navigateToSection(currentSection - 1);
        }
        
        // Thiết lập debounce để ngăn nhiều sự kiện touch xảy ra quá nhanh
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
  }, [currentSection, navigateToSection, isIndependentComponent, canNavigateFromIndependentComponent])

  // Xử lý phím mũi tên
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

  // Hàm xử lý thông báo từ các component
  const handleComponentSlideChange = (componentIndex: number, isAtLastSlide: boolean) => {
    console.log(`Component ${componentIndex} at last slide: ${isAtLastSlide}`);
    
    if (componentIndex === 4) { // ProjectSlider
      setProjectSliderAtLastSlide(isAtLastSlide);
    }
  }

  return (
    <div className="w-full h-full relative">
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
            className="section independent-section"
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
            className="section independent-section"
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
            className="section independent-section"
            style={{ transform: `translateY(${(currentSection - 4) * -100}vh)`, background: "#B8BBC1" }}
            data-index={4}
          >
            <ProjectSlider onSlideChange={(isAtLastSlide: boolean) => handleComponentSlideChange(4, isAtLastSlide)} />
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

        {/* Chấm chỉ báo section */}
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2">
          {Array(5)
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

