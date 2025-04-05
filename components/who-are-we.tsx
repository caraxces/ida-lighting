import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const AboutUsSection = () => {
  const [rotation, setRotation] = useState({ x: -2.5251, y: 38.3124 });
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !imageRef.current) return;
      
      // Get container position
      const container = containerRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to container center
      const mouseX = e.clientX - container.left - container.width / 2;
      const mouseY = e.clientY - container.top - container.height / 2;
      
      // Calculate rotation values (adjust sensitivity as needed)
      const rotateY = 38.3124 + (mouseX / container.width) * 10;
      const rotateX = -2.5251 + (mouseY / container.height) * -10;
      
      // Update rotation state
      setRotation({ x: rotateX, y: rotateY });
    };
    
    // Add event listener to window
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const transform = `translate3d(0px, 0px, 0px) rotateY(${rotation.y}deg) rotateX(${rotation.x}deg)`;

  return (
    <section className="relative bg-gradient-to-r from-black via-black to-[#8B2323] text-white py-16 px-4 md:px-8 lg:px-16 xl:px-24 overflow-hidden" ref={containerRef}>
      {/* Container for the entire section */}
      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Left side - Floating image with 3D effect */}
          <div className="w-full md:w-1/2 relative z-10 -ml-4 md:-ml-12 md:absolute md:left-0 md:top-0 lg:top-1/2 lg:-translate-y-1/2">
            <div 
              className="relative transition-transform duration-200 ease-out" 
              ref={imageRef}
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="bg-[#C73E1D]/20 absolute inset-0 rounded-lg transform -rotate-3"></div>
              <img 
                src="/TRC_9686.jpg" 
                alt="IDA Lighting Project" 
                className="rounded-lg relative z-10 w-full md:max-w-md"
                style={{
                  transform: transform,
                  transition: 'transform 0.2s ease-out'
                }}
              />
            </div>
          </div>
          
          {/* Right side - Content */}
          <div className="w-full md:w-1/2 md:ml-auto pt-8 md:pt-0 pl-0 md:pl-8 lg:pl-16 xl:pl-24">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-gray-400 text-sm uppercase tracking-wider">Chúng Tôi Là Ai</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Chuyên Gia Chiếu Sáng</h2>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                IDA Lighting là công ty chuyên nghiệp hàng đầu về tư vấn, thiết kế và cung cấp giải pháp chiếu sáng tại Việt Nam. Với đội ngũ chuyên gia có kinh nghiệm và đam mê, chúng tôi mang đến những giải pháp ánh sáng độc đáo và tối ưu cho mọi không gian sống và làm việc.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#C73E1D]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Đội ngũ chuyên gia tư vấn thiết kế chiếu sáng chuyên nghiệp</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#C73E1D]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Sản phẩm chiếu sáng cao cấp từ các thương hiệu uy tín</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#C73E1D]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Giải pháp chiếu sáng may đo theo nhu cầu khách hàng</span>
                </div>
              </div>
              
              <div className="pt-4">
                <Link 
                  href="/contacts" 
                  className="bg-transparent hover:bg-[#C73E1D] text-white border border-[#C73E1D] hover:border-transparent py-2 px-6 rounded-full transition duration-300 inline-block"
                >
                  Liên Hệ Ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;