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
// import PulsePreloader from "@/components/preload"

export default function Home() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      })

      if (sectionRefs.current[0]) {
        sectionRefs.current[0].style.opacity = "1"
        sectionRefs.current[0].classList.add("flip-up-animation")
      }
    }, 50)

    setIsLoaded(true)

    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px",
      threshold: 0.1,
    }

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionRefs.current.findIndex((ref) => ref === entry.target)
          const delay = index > 0 ? index * 50 : 0

          setTimeout(() => {
            if (entry.target instanceof HTMLElement) {
              entry.target.style.opacity = "1"
              entry.target.classList.add("flip-up-animation")
            }
          }, delay)
        } else {
          const index = sectionRefs.current.findIndex((ref) => ref === entry.target)
          if (index > 0 && entry.boundingClientRect.y > window.innerHeight * 0.25) {
            if (entry.target instanceof HTMLElement) {
              entry.target.classList.remove("flip-up-animation")
            }
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
      clearTimeout(scrollTimeout)
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
      window.scrollTo(0, 0)
    }

    window.addEventListener("load", forcedScrollTop)

    // Đặt vị trí cuộn về đầu trang nhiều lần trong vài mili giây đầu tiên
    const interval = setInterval(forcedScrollTop, 10)
    setTimeout(() => clearInterval(interval), 200)

    return () => {
      window.removeEventListener("load", forcedScrollTop)
      clearInterval(interval)
    }
  }, [])

  return (
    <main className="min-h-screen bg-black text-white relative">
      <Header />

      <div
        ref={containerRef}
        className={`snap-y snap-mandatory h-screen overflow-y-auto perspective-1000 ${isLoaded ? "" : "overflow-hidden"}`}
        style={{ scrollBehavior: "smooth" }}
      >
        {/* LuxuryRealEstate */}
        <div className="snap-start h-screen w-full">
          <div
            ref={(el) => {
              sectionRefs.current[0] = el
            }}
            className="h-full transition-all duration-1000 ease-in-out"
            style={{ transformOrigin: "bottom center" }}
          >
            <LuxuryRealEstate />
          </div>
        </div>

        {/* FirstElementHpage */}
        <div className="snap-start h-screen w-full relative">
          <div
            ref={(el) => {
              sectionRefs.current[1] = el
            }}
            className="h-full opacity-0 transition-all duration-1000 ease-in-out"
            style={{ transformOrigin: "bottom center" }}
          >
            <FirstElementHpage />
          </div>
        </div>

        {/* SecondElementHpage */}
        <div className="snap-start h-screen w-full relative">
          <div
            ref={(el) => {
              sectionRefs.current[2] = el
            }}
            className="h-full opacity-0 transition-all duration-1000 ease-in-out"
            style={{ transformOrigin: "bottom center" }}
          >
            <SecondElementHpage />
          </div>
        </div>

        {/* HeroSection */}
        <div className="snap-start h-screen w-full relative">
          <div
            ref={(el) => {
              sectionRefs.current[3] = el
            }}
            className="h-full opacity-0 transition-all duration-1000 ease-in-out"
            style={{ transformOrigin: "bottom center" }}
          >
            <HeroSection />
          </div>
        </div>

        {/* ProjectSlider */}
        <div className="snap-start h-screen w-full relative">
          <div
            ref={(el) => {
              sectionRefs.current[4] = el
            }}
            className="h-full opacity-0 transition-all duration-1000 ease-in-out"
            style={{ background: "#B8BBC1", transformOrigin: "bottom center" }}
          >
            <ProjectSlider />
          </div>
        </div>

        {/* VideoPlayerSection */}
        <div className="snap-start h-screen w-full relative">
          <div
            ref={(el) => {
              sectionRefs.current[5] = el
            }}
            className="h-full opacity-0 transition-all duration-1000 ease-in-out"
            style={{ background: "#B8BBC1", transformOrigin: "bottom center" }}
          >
            <VideoPlayerSection />
          </div>
        </div>

        {/* ServicesSection */}
        <div id="work" className="snap-start h-screen w-full relative">
          <div
            ref={(el) => {
              sectionRefs.current[6] = el
            }}
            className="h-full opacity-0 transition-all duration-1000 ease-in-out"
            style={{ background: "#B8BBC1", transformOrigin: "bottom center" }}
          >
            <ServicesSection />
          </div>
        </div>

        {/* Enhanced3DVideoCard */}
        <div className="snap-start h-screen w-full relative">
          <div
            ref={(el) => {
              sectionRefs.current[7] = el
            }}
            className="h-full opacity-0 transition-all duration-1000 ease-in-out"
            style={{ background: "#B8BBC1", transformOrigin: "bottom center" }}
          >
            <Enhanced3DVideoCard />
          </div>
        </div>

        {/* Footer */}
        <div className="snap-start w-full relative -mt-[50px]">
          <div
            ref={(el) => {
              sectionRefs.current[8] = el
            }}
            className="rounded-t-[10px] overflow-hidden shadow-2xl opacity-0"
            style={{ transformOrigin: "bottom center" }}
          >
            <Footer />
          </div>
        </div>
      </div>
    </main>
  )
}

