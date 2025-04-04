"use client"

import type React from "react"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect, useCallback, useRef } from "react"
import { AnimatedRoundedGrid } from "@/components/animated-rounded-grid"
import Image from "next/image"
import CommunitySection from "@/components/who-are-we"
import AnimatedTitle from "@/components/animated-title"
import NavigationSlides from "@/components/nav-slides"

// Combine projects from sections 2 and 3
const categories = [
  {
    id: 1,
    title: "Residential Lighting",
    description: "Elegant lighting solutions for homes and living spaces",
    image: "/placeholder.svg?height=600&width=800",
    slug: "residential",
  },
  {
    id: 2,
    title: "Commercial Lighting",
    description: "Efficient lighting systems for offices and retail spaces",
    image: "/placeholder.svg?height=600&width=800",
    slug: "commercial",
  },
  {
    id: 3,
    title: "Industrial Lighting",
    description: "Durable and high-performance lighting for industrial facilities",
    image: "/placeholder.svg?height=600&width=800",
    slug: "industrial",
  },
  {
    id: 4,
    title: "Outdoor Lighting",
    description: "Weather-resistant lighting solutions for exterior spaces",
    image: "/placeholder.svg?height=600&width=800",
    slug: "outdoor",
  },
  {
    id: 5,
    title: "Smart Lighting",
    description: "Intelligent lighting systems with advanced control capabilities",
    image: "/placeholder.svg?height=600&width=800",
    slug: "smart",
  },
  {
    id: 6,
    title: "Decorative Lighting",
    description: "Artistic lighting fixtures that enhance interior design",
    image: "/placeholder.svg?height=600&width=800",
    slug: "decorative",
  },
]

// Sample gallery images for the grid layouts
const galleryImages = [
  { src: "/work/residential/residential.jpeg", alt: "Residential lighting project" },
  { src: "/work/commercial/commercial.png", alt: "Commercial lighting installation" },
  { src: "/work/industry/industrial.png", alt: "Industrial lighting solution" },
  { src: "/work/residential/out-door.jpeg", alt: "Outdoor lighting design" },
  { src: "/work/smart-home/smart-home-app.jpeg", alt: "Smart lighting system" },
  { src: "/work/commercial/restaurant-lighting.jpeg", alt: "Decorative lighting fixture" },
  { src: "/work/commercial/hotel-lighting-systems.jpeg", alt: "Architectural lighting" },
  { src: "/work/commercial/spa-lighting.jpeg", alt: "Event lighting setup" },
]

// Component hiệu ứng nền RGB
function RGBBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Lớp nền đen */}
      <div className="absolute inset-0 bg-black opacity-90"></div>
      
      {/* Các vòng tròn RGB di chuyển */}
      <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-r from-purple-600 to-blue-500 blur-[120px] opacity-30 animate-rgb-float-1"></div>
      <div className="absolute -bottom-[40%] -right-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-r from-red-500 to-pink-500 blur-[120px] opacity-30 animate-rgb-float-2"></div>
      <div className="absolute top-[30%] -right-[30%] w-[70%] h-[70%] rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 blur-[120px] opacity-20 animate-rgb-float-3"></div>
      <div className="absolute -bottom-[20%] left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-r from-green-400 to-teal-500 blur-[120px] opacity-20 animate-rgb-float-4"></div>
      
      {/* Lớp lưới */}
      <div className="absolute inset-0 bg-[url('/grid.png')] bg-repeat opacity-10"></div>
      
      {/* Lớp noise để tạo hiệu ứng hạt */}
      <div className="absolute inset-0 bg-[url('/noise.png')] bg-repeat opacity-5 mix-blend-overlay"></div>
    </div>
  )
}

// Component Footer được nâng cấp
function EnhancedFooter() {
  return (
    <div className="relative z-10">
      {/* Lớp nền cho Footer */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"></div>
      
      {/* Bọc Footer trong container để thêm các hiệu ứng */}
      <div className="relative">
        <Footer />
        
        {/* Thêm các hiệu ứng glow cho Footer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
    </div>
  )
}

// Component hiệu ứng popup 3D cho hình ảnh
function ImagePopup({ isOpen, image, onClose }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  
  // Xử lý hiệu ứng 3D khi di chuyển chuột
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current.getBoundingClientRect();
    const centerX = card.left + card.width / 2;
    const centerY = card.top + card.height / 2;
    const posX = e.clientX - centerX;
    const posY = e.clientY - centerY;
    
    // Tính toán góc xoay (giới hạn trong khoảng ±10 độ)
    const rotateY = Math.max(Math.min(posX / (card.width / 2) * 10, 10), -10);
    const rotateX = Math.max(Math.min(-posY / (card.height / 2) * 10, 10), -10);
    
    setRotation({ x: rotateX, y: rotateY });
  }, []);
  
  // Reset góc xoay khi rời chuột
  const handleMouseLeave = useCallback(() => {
    setRotation({ x: 0, y: 0 });
  }, []);
  
  // Dữ liệu mẫu về dự án (trong thực tế sẽ lấy từ image object)
  const projectData = {
    location: "Hà Tĩnh, Việt Nam",
    address: "Ha Huy Tập, Hà Tĩnh",
    client: "IDA Lighting Hà Tĩnh",
    area: "~1,200 m²",
    constructionTime: "6 tháng (01/2023 - 06/2023)",
    lightingTypes: [
      "Đèn LED âm trần",
      "Đèn treo trang trí",
      "Đèn pha ngoài trời",
      "Đèn LED dây"
    ],
    designer: "Kim Tiền",
    photographer: "Thiên Ngân"
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        ref={cardRef}
        className="relative w-[80vw] h-[80vh] rounded-xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing bg-black/90"
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: '1500px',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Hiệu ứng ánh sáng trắng xung quanh viền */}
        <div className="absolute -inset-1 bg-white rounded-xl blur-md opacity-30"></div>
        
        {/* Container chính */}
        <div className="absolute inset-0 bg-black/90 rounded-xl p-4 overflow-hidden flex flex-col md:flex-row">
          {/* Phần bên trái - Thông tin vị trí công trình */}
          <div 
            className="w-full md:w-1/4 p-4 flex flex-col justify-between border-r border-white/10"
            style={{
              transform: `translateZ(30px)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <div>
              <h3 className="text-white text-xl font-bold mb-4">{image?.alt || 'Project Name'}</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Vị trí</p>
                  <p className="text-white">{projectData.location}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">Địa chỉ</p>
                  <p className="text-white">{projectData.address}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">Khách hàng</p>
                  <p className="text-white">{projectData.client}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">Diện tích</p>
                  <p className="text-white">{projectData.area}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-4">
              <button className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors">
                Xem chi tiết dự án
              </button>
            </div>
          </div>
          
          {/* Phần giữa - Hình ảnh */}
          <div 
            className="w-full md:w-2/4 p-4 flex items-center justify-center"
            style={{
              transform: `translateZ(20px)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              {/* Hiệu ứng shine */}
              <div 
                className="absolute inset-0 w-full h-full z-10 mix-blend-overlay pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${50 + rotation.y / 2}% ${50 + rotation.x / 2}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)`
                }}
              ></div>
              
              {/* Hình ảnh chính */}
              <img 
                src={image?.src || '/placeholder.svg'} 
                alt={image?.alt || 'Gallery image'} 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          {/* Phần bên phải - Thông tin thời gian thi công, loại đèn */}
          <div 
            className="w-full md:w-1/4 p-4 flex flex-col justify-between border-l border-white/10"
            style={{
              transform: `translateZ(30px)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <div>
              <h3 className="text-white text-xl font-bold mb-4">Thông tin kỹ thuật</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Thời gian thi công</p>
                  <p className="text-white">{projectData.constructionTime}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">Loại đèn sử dụng</p>
                  <ul className="text-white list-disc pl-5 mt-1">
                    {projectData.lightingTypes.map((type, index) => (
                      <li key={index}>{type}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">Thiết kế</p>
                  <p className="text-white">{projectData.designer}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">Nhiếp ảnh</p>
                  <p className="text-white">{projectData.photographer}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-4 flex space-x-2">
              <button className="flex-1 py-2 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="flex-1 py-2 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
              <button className="flex-1 py-2 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Nút đóng */}
        <button 
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors z-10"
          onClick={onClose}
          style={{
            transform: `translateZ(50px)`,
            transformStyle: 'preserve-3d'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Wrapper component cho AnimatedRoundedGrid để thêm chức năng popup
function EnhancedAnimatedRoundedGrid({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const handleImageClick = useCallback((image) => {
    setSelectedImage(image);
    setIsPopupOpen(true);
  }, []);
  
  const closePopup = useCallback(() => {
    setIsPopupOpen(false);
  }, []);
  
  return (
    <>
      {/* Sử dụng component AnimatedRoundedGrid gốc với onClick handler */}
      <div className="relative">
        <AnimatedRoundedGrid 
          images={images.map(img => ({
            ...img,
            onClick: () => handleImageClick(img)
          }))}
        />
      </div>
      
      {/* Popup component */}
      <ImagePopup 
        isOpen={isPopupOpen} 
        image={selectedImage} 
        onClose={closePopup} 
      />
    </>
  );
}

export default function WorkPage() {
  // Thêm CSS animations vào <head>
  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      @keyframes rgb-float-1 {
        0% { transform: translate(0, 0) rotate(0deg); }
        50% { transform: translate(10%, 5%) rotate(180deg); }
        100% { transform: translate(0, 0) rotate(360deg); }
      }
      @keyframes rgb-float-2 {
        0% { transform: translate(0, 0) rotate(0deg); }
        50% { transform: translate(-10%, -5%) rotate(-180deg); }
        100% { transform: translate(0, 0) rotate(-360deg); }
      }
      @keyframes rgb-float-3 {
        0% { transform: translate(0, 0) rotate(0deg); }
        50% { transform: translate(-5%, 10%) rotate(180deg); }
        100% { transform: translate(0, 0) rotate(360deg); }
      }
      @keyframes rgb-float-4 {
        0% { transform: translate(0, 0) rotate(0deg); }
        50% { transform: translate(5%, -10%) rotate(-180deg); }
        100% { transform: translate(0, 0) rotate(-360deg); }
      }
      .animate-rgb-float-1 {
        animation: rgb-float-1 25s infinite linear;
      }
      .animate-rgb-float-2 {
        animation: rgb-float-2 30s infinite linear;
      }
      .animate-rgb-float-3 {
        animation: rgb-float-3 35s infinite linear;
      }
      .animate-rgb-float-4 {
        animation: rgb-float-4 40s infinite linear;
      }
      
      /* CSS để nổi bật text trong Footer */
      footer h3 {
        font-weight: 600 !important;
        color: white !important;
        text-shadow: 0 0 10px rgba(255,255,255,0.3) !important;
        margin-bottom: 1.25rem !important;
      }
      
      footer a, footer p {
        color: rgba(255,255,255,0.8) !important;
        transition: all 0.3s ease !important;
      }
      
      footer a:hover {
        color: white !important;
        text-shadow: 0 0 8px rgba(255,255,255,0.5) !important;
        transform: translateY(-2px) !important;
        display: inline-block !important;
      }
      
      footer .footer-bottom {
        border-top: 1px solid rgba(255,255,255,0.1) !important;
        padding-top: 1.5rem !important;
        margin-top: 2rem !important;
      }
      
      footer .social-icon {
        opacity: 0.8 !important;
        transition: all 0.3s ease !important;
      }
      
      footer .social-icon:hover {
        opacity: 1 !important;
        transform: translateY(-2px) !important;
        filter: drop-shadow(0 0 8px rgba(255,255,255,0.5)) !important;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <main className="min-h-screen bg-transparent text-white relative">
      {/* Nền RGB di chuyển */}
      <RGBBackground />
      
      <Header />

      <section className="pt-32 pb-24 px-4 md:px-8 relative z-10">
        <div className="container mx-auto">
          {/* Phần tiêu đề với hiệu ứng giống HeroSection */}
          <div className="text-center mb-16 relative">
            <AnimatedTitle>
              <span className="text-6xl md:text-8xl lg:text-9xl block mb-2">Our</span>
              <span className="font-extrabold italic">Projects</span>
            </AnimatedTitle>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mt-8">
              Explore our diverse portfolio of lighting solutions across various sectors
            </p>
            
            {/* Hiệu ứng glow phía sau tiêu đề */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/20 rounded-full blur-[80px] -z-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-orange-500/20 rounded-full blur-[60px] -z-10"></div>
          </div>

          {/* Thêm NavigationSlides ở đây */}
          <div className="my-16">
            <div className="bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <NavigationSlides />
            </div>
          </div>

          {/* CommunitySection hiện tại */}
          <div className="bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] my-16">
            <CommunitySection />
          </div>

          {/* Phần Interactive Gallery */}
          <div className="mt-24">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="inline-block px-6 py-3 bg-black/30 backdrop-blur-xl rounded-full text-white text-2xl font-bold mb-4 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Interactive Gallery
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto mt-4">
                Explore our projects with interactive animations and effects
              </p>
            </motion.div>
            
            {/* Sử dụng EnhancedAnimatedRoundedGrid thay vì AnimatedRoundedGrid trực tiếp */}
            <div className="bg-black/30 backdrop-blur-md p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.3)] sm:shadow-[0_0_20px_rgba(0,0,0,0.4)] md:shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden">
              <EnhancedAnimatedRoundedGrid images={galleryImages} />
            </div>
          </div>
        </div>
      </section>

      {/* Sử dụng EnhancedFooter thay vì Footer trực tiếp */}
      <EnhancedFooter />
    </main>
  )
}

