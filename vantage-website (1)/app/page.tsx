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
import LuxuryRealEstate from "@/components/luxury-component"
// import PulsePreloader from "@/components/preload"

export default function Home() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Tạo timeout ngắn để đảm bảo chạy sau khi render ban đầu
    const scrollTimeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'instant', // Sử dụng 'instant' thay vì 'smooth'
      });
      
      // Đảm bảo hiển thị LuxuryRealEstate ngay lập tức (đã đổi index từ 0 thành 0)
      if (sectionRefs.current[0]) {
        sectionRefs.current[0].style.opacity = "1";
        sectionRefs.current[0].classList.add("flip-up-animation");
      }
    }, 50);
    
    setIsLoaded(true);
    
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px",
      threshold: 0.1,
    }

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionRefs.current.findIndex(ref => ref === entry.target)
          const delay = index > 0 ? index * 50 : 0
          
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.classList.add("flip-up-animation")
          }, delay)
        } else {
          const index = sectionRefs.current.findIndex(ref => ref === entry.target)
          if (index > 0 && entry.boundingClientRect.y > window.innerHeight * 0.25) {
            entry.target.classList.remove("flip-up-animation")
          }
        }
      })
    }, observerOptions)

    sectionRefs.current.forEach((section, index) => {
      if (section && index > 0) {
        sectionObserver.observe(section)
      }
    })

    return () => {
      clearTimeout(scrollTimeout);
      sectionRefs.current.forEach((section) => {
        if (section) {
          sectionObserver.unobserve(section)
        }
      })
    }
  }, [])

  // Thêm một useEffect riêng để đảm bảo vị trí cuộn luôn ở đầu trang khi component mount
  useEffect(() => {
    const forcedScrollTop = () => {
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('load', forcedScrollTop);
    
    // Đặt vị trí cuộn về đầu trang nhiều lần trong vài mili giây đầu tiên
    const interval = setInterval(forcedScrollTop, 10);
    setTimeout(() => clearInterval(interval), 200);
    
    return () => {
      window.removeEventListener('load', forcedScrollTop);
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white relative">
      <Header />
      
      <div 
        ref={containerRef} 
        className={`snap-y snap-mandatory h-screen overflow-y-auto perspective-1000 ${isLoaded ? "" : "overflow-hidden"}`}
        style={{ scrollBehavior: "smooth" }}
      >
        {/* LuxuryRealEstate - Đưa lên đầu tiên */}
        <div className="snap-start h-screen w-full">
          <div 
            ref={(el) => (sectionRefs.current[0] = el)} 
            className="h-full" 
            style={{ transformOrigin: "bottom center" }}
          >
            <LuxuryRealEstate />
          </div>
        </div>

        {/* FirstElementHpage - Chuyển xuống vị trí thứ 2 */}
        <div className="snap-start h-screen w-full relative">
          <div 
            ref={(el) => (sectionRefs.current[1] = el)} 
            className="h-full opacity-0" 
            style={{ transformOrigin: "bottom center" }}
          >
            <FirstElementHpage />
          </div>
        </div>

        {/* HeroSection - Chuyển xuống vị trí thứ 3 */}
        <div className="snap-start h-screen w-full relative">
          <div 
            ref={(el) => (sectionRefs.current[2] = el)} 
            className="h-full opacity-0" 
            style={{ transformOrigin: "bottom center" }}
          >
            <HeroSection />
          </div>
        </div>

        {/* ProjectSlider - Chuyển xuống vị trí thứ 4 */}
        <div className="snap-start h-[calc(100vh+70px)] w-full relative -mt-[50px]">
          <div
            ref={(el) => (sectionRefs.current[3] = el)}
            className="h-full rounded-t-[50px] overflow-hidden opacity-0"
            style={{ background: "#B8BBC1", transformOrigin: "bottom center" }}
          >
            <ProjectSlider />
          </div>
        </div>
        
        {/* VideoPlayerSection - Chuyển xuống vị trí thứ 5 */}
        <div className="snap-start h-screen w-full relative -mt-[50px] z-10">
          <div
            ref={(el) => (sectionRefs.current[4] = el)}
            className="h-full rounded-t-[50px] overflow-hidden opacity-0"
            style={{ background: "#B8BBC1", transformOrigin: "bottom center" }}
          >
            <VideoPlayerSection 
              videoSrc="/ida-starlake.mp4"
              title="IDA Lighting Showcase"
              autoPlay={true}
              loop={true}
            />
          </div>
        </div>
        
        {/* ServicesSection - Chuyển xuống vị trí thứ 6 */}
        <div id="work" className="snap-start h-screen w-full relative -mt-[50px] z-20">
          <div
            ref={(el) => (sectionRefs.current[5] = el)}
            className="h-full rounded-t-[50px] overflow-hidden opacity-0"
            style={{ background: "#B8BBC1", transformOrigin: "bottom center" }}
          >
            <ServicesSection />
          </div>
        </div>

        {/* Enhanced3DVideoCard - Chuyển xuống vị trí thứ 7 */}
        <div className="snap-start h-screen w-full relative -mt-[50px] z-15">
          <div
            ref={(el) => (sectionRefs.current[6] = el)}
            className="h-full rounded-t-[50px] overflow-hidden opacity-0"
            style={{ background: "#B8BBC1", transformOrigin: "bottom center" }}
          >
            <Enhanced3DVideoCard />
          </div>
        </div>
        
        {/* Footer - Giữ ở vị trí cuối cùng */}
        <div className="snap-start w-full relative -mt-[50px] z-[10]">
          <div
            ref={(el) => (sectionRefs.current[7] = el)}
            className="rounded-t-[50px] overflow-hidden shadow-2xl opacity-0"
            style={{ transformOrigin: "bottom center" }}
          >
            <Footer />
          </div>
        </div>
      </div>
    </main>
  )
}

