"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import dynamic from 'next/dynamic'

// Dynamic imports with loading fallbacks
const VideoPlayerSection = dynamic(() => import("@/components/video-section"), {
  loading: () => <div className="w-full bg-black flex items-center justify-center py-20">Loading video...</div>,
  ssr: false
})

const HomeProjectSlider = dynamic(() => import("@/components/home-project-slider"), {
  loading: () => <div className="w-full py-20 bg-gray-900"></div>
})

const FirstElementHpage = dynamic(() => import("@/components/first-element-hpage"), {
  loading: () => <div className="w-full py-20 bg-black"></div>
})

const SecondElementHpage = dynamic(() => import("@/components/second-element-hpage"), {
  loading: () => <div className="w-full py-20 bg-black"></div>
})

const ThirdElementHpage = dynamic(() => import("@/components/third-element-hpage"), {
  loading: () => <div className="w-full py-20 bg-black"></div>
})

const ProjectSlider = dynamic(() => import("@/components/project-slider"), {
  loading: () => <div className="w-full py-20 bg-[#B8BBC1]"></div>
})

const ProductShowcase = dynamic(() => import("@/components/product-showcase"), {
  loading: () => <div className="w-full py-20 bg-black"></div>
})

const LightingShowcase = dynamic(() => import("@/components/lighting-showcase"), {
  loading: () => <div className="w-full py-20 bg-black"></div>
})

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

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

  return (
    <div className="w-full relative">
      {/* CSS for hiding scrollbar */}
      <style jsx global>{`
        ::-webkit-scrollbar { 
          width: 0;
          display: none; 
        }
        
        html, body {
          -ms-overflow-style: none;
          scrollbar-width: none;
          max-width: 100vw;
        }
      `}</style>

      <main className="w-full relative">
        <Header />
        
        <section id="video-section">
          <VideoPlayerSection />
        </section>
        
        <section id="project-section" className="bg-[#B8BBC1] w-full">
          <ProjectSlider />
        </section>
        
        <section id="home-projects-section">
          <HomeProjectSlider />
        </section>
        
        <section id="third-element-section">
          <ThirdElementHpage productSet={homeProductSet} />
        </section>
        
        <section id="first-element-section">
          <FirstElementHpage />
        </section>
        
        <section id="second-element-section">
          <SecondElementHpage />
        </section>
        
        <section id="product-showcase-section">
          <ProductShowcase />
        </section>
        
        <section id="lighting-showcase-section">
          <LightingShowcase />
        </section>
        
        <footer>
          <Footer />
        </footer>
      </main>
    </div>
  )
}