"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, useMotionValue } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Check, Award, Users, Lightbulb, Zap, Heart, Sparkles, BarChart3 } from "lucide-react"
import AnimatedTitle from "./animated-title"
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import CountUp from 'react-countup'

export default function AboutBodyEnhanced() {
  // Refs for 3D hover effects
  const image1Ref = useRef<HTMLDivElement>(null)
  const image2Ref = useRef<HTMLDivElement>(null)
  const image3Ref = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const isLogoInView = useInView(logoRef, { once: false })
  const achievementsRef = useRef<HTMLDivElement>(null)
  const isAchievementsInView = useInView(achievementsRef, { once: false, amount: 0.2 })

  // Motion values for parallax scrolling
  const y = useMotionValue(0)
  const y2 = useMotionValue(0)

  // 3D hover effect states
  const [rotateX1, setRotateX1] = useState(0)
  const [rotateY1, setRotateY1] = useState(0)
  const [rotateX2, setRotateX2] = useState(0)
  const [rotateY2, setRotateY2] = useState(0)
  const [rotateX3, setRotateX3] = useState(0)
  const [rotateY3, setRotateY3] = useState(0)

  // Handle mouse movement for 3D effect
  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    setX: React.Dispatch<React.SetStateAction<number>>,
    setY: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate rotation based on mouse position (max 15 degrees)
    const rotateY = (x / rect.width - 0.5) * 15
    const rotateX = (y / rect.height - 0.5) * -15

    setX(rotateX)
    setY(rotateY)
  }

  const handleMouseLeave = (
    setX: React.Dispatch<React.SetStateAction<number>>,
    setY: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    setX(0)
    setY(0)
  }

  // Core values data
  const coreValues = [
    {
      icon: <Check className="w-5 h-5" />,
      title: "Phù hợp nhất",
      description: "Đáp ứng gu thẩm mỹ, phong cách kiến trúc và ngân sách của khách hàng.",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Tiên tiến nhất",
      description: "Luôn cập nhật công nghệ và sản phẩm mới.",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Chuyên tâm",
      description: "Tận tâm trong từng sản phẩm, hướng tới trải nghiệm và cảm xúc người dùng.",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Chuyên nghiệp",
      description: "Đội ngũ nhân sự chuyên môn cao, đặt chất lượng lên hàng đầu.",
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Chuyên biệt",
      description: "Sáng tạo, cập nhật xu hướng, công nghệ và sản phẩm tốt nhất, phù hợp từng dự án.",
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Đẳng cấp",
      description: "Tôn vinh kiến trúc qua ánh sáng, kiến tạo không gian sống hoàn hảo.",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Tâm huyết",
      description: "Đề cao sự tận tâm, chuyên nghiệp và chân thành.",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Khác biệt",
      description: "Giải pháp riêng biệt, độc bản phù hợp với từng khách hàng.",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Hiệu quả",
      description: "Giải pháp tối ưu về chất lượng, công nghệ, chi phí.",
    },
  ]

  // Services data
  const services = [
    {
      title: "Tư vấn và thiết kế chiếu sáng",
      items: [
        "Cung cấp các giải pháp chiếu sáng tối ưu, hiện đại, mang tính cá nhân hóa cao.",
        "Đảm bảo hài hòa giữa thẩm mỹ và công năng, tối ưu hóa trải nghiệm và tiết kiệm năng lượng.",
      ],
    },
    {
      title: "Indoor Lighting",
      items: ["Đèn LED âm trần", "Đèn thả", "Đèn tường", "Spotlight", "Hệ thống chiếu sáng thông minh"],
    },
    {
      title: "Outdoor Lighting",
      items: ["Đèn sân vườn", "Đèn cột", "Đèn pha", "Chiếu sáng cảnh quan"],
    },
    {
      title: "Decorative Lighting",
      items: ["Các mẫu đèn trang trí từ cổ điển tới hiện đại", "Sử dụng chất liệu cao cấp (như pha lê K9)"],
    },
    {
      title: "Bespoke Lighting",
      items: ["Giải pháp chiếu sáng may đo", "Sản phẩm cá nhân hóa theo yêu cầu khách hàng"],
    },
  ]

  // State cho nút Liên hệ ngay
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const [rotation, setRotation] = useState(0)
  
  // Animate cho hiệu ứng xoay gradient
  useEffect(() => {
    let animationFrame: number
    let startTime: number | null = null
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      
      // Hoàn thành một vòng xoay mỗi 3 giây
      setRotation((elapsed / 3000) % 1)
      
      animationFrame = requestAnimationFrame(animate)
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  useEffect(() => {
    if (!logoRef.current) return;
    
    // Tạo scene Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, logoRef.current.clientWidth / logoRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(logoRef.current.clientWidth, logoRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    logoRef.current.appendChild(renderer.domElement);
    
    // Tạo text geometry
    const loader = new FontLoader();
    loader.load('/fonts/helvetiker_regular.typeface.json', function(font: any) {
      const textGeometry = new TextGeometry('IDA', {
        font: font,
        size: 5,
        height: 1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 5
      });
      
      textGeometry.center();
      
      // Material với hiệu ứng ánh kim loại
      const material = new THREE.MeshStandardMaterial({ 
        color: 0xC73E1D,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x330000,
        emissiveIntensity: 0.5
      });
      
      const text = new THREE.Mesh(textGeometry, material);
      scene.add(text);
      
      // Thêm ánh sáng
      const light1 = new THREE.PointLight(0xffffff, 1, 100);
      light1.position.set(10, 10, 10);
      scene.add(light1);
      
      const light2 = new THREE.PointLight(0xC73E1D, 0.8, 100);
      light2.position.set(-10, -10, 5);
      scene.add(light2);
      
      // Thêm ánh sáng ambient
      const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
      scene.add(ambientLight);
      
      camera.position.z = 15;
      
      // Animation loop
      function animate() {
        requestAnimationFrame(animate);
        
        text.rotation.y += 0.005;
        
        renderer.render(scene, camera);
      }
      
      animate();
    });
    
    // Cleanup
    return () => {
      if (logoRef.current && logoRef.current.contains(renderer.domElement)) {
        logoRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-black via-black to-[#8B2323] text-white overflow-hidden rounded-t-3xl">
      <div className="container mx-auto px-4 md:px-8">
        {/* Main Headline */}
        {/* <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-light mb-20 md:mb-32"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          KHÁM PHÁ HÀNH TRÌNH CỦA CHÚNG TÔI
        </motion.h1> */}

        {/* First Content Row - Company Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-24 md:mb-40">
          {/* Left Column - Image with 3D hover effect */}
          <div className="relative perspective-[1000px]">
            <motion.div
              ref={image1Ref}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 transform-gpu"
              style={{
                transform: `perspective(1000px) rotateX(${rotateX1}deg) rotateY(${rotateY1}deg)`,
                transition: "transform 0.2s ease-out",
              }}
              onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => handleMouseMove(e, setRotateX1, setRotateY1)}
              onMouseLeave={() => handleMouseLeave(setRotateX1, setRotateY1)}
            >
              <div className="relative overflow-hidden">
                <img
                  src="/about/652.png"
                  alt="Cluster of round lights"
                  className="w-full h-auto transition-all duration-300"
                />
                
                {/* Scanning effect */}
                <motion.div 
                  initial={{ top: "-30%" }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatType: "loop", ease: "linear", repeatDelay: 1 }}
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C73E1D]/20 to-transparent h-[30%] w-full"
                />
                
                {/* Horizontal laser line */}
                <motion.div
                  initial={{ top: "-10%" }}
                  animate={{ top: "110%" }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatType: "loop", ease: "linear", repeatDelay: 1 }}
                  className="absolute left-0 right-0 h-[2px] bg-[#C73E1D] opacity-70"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 blur-[2px] bg-[#C73E1D]" />
                </motion.div>
              </div>
            </motion.div>

            <div className="mt-4">
              <p className="text-sm text-gray-300">
                Biến ánh sáng thành linh hồn của không gian
              </p>
            </div>
          </div>

          {/* Right Column - Text */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm mb-4 text-gray-300">
                Công ty TNHH Tư vấn thiết kế và cung cấp giải pháp ánh sáng IDA LIGHTING
                <br />
                Thành lập năm 2019
                <br />
                Địa chỉ: 153 Hà Huy Tập, Thành phố Hà Tĩnh, Việt Nam
              </p>

              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-light mt-8 md:mt-16 relative"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                ĐỊNH NGHĨA LẠI
                <br />
                SỰ XUẤT SẮC
                {/* Animated underline */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "40%" }}
                  transition={{ duration: 1, delay: 1 }}
                  className="absolute -bottom-2 left-0 h-0.5 bg-white"
                />
              </motion.h2>
            </div>

            <div className="mt-8 md:mt-0">
              <span className="text-xs uppercase text-gray-400">Từ năm 2019</span>
            </div>
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="mb-24 md:mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
              className="bg-black/30 p-8 rounded-xl border border-gray-800"
            >
              <h3 className="text-2xl font-light mb-4">Sứ mệnh</h3>
              <p className="text-lg italic mb-4 text-gray-300">Biến ánh sáng thành linh hồn của không gian.</p>
              <p className="text-sm text-gray-400">
                Chúng tôi tin rằng ánh sáng không chỉ là nguồn sáng, mà còn là yếu tố quan trọng tạo nên cảm xúc và trải
                nghiệm trong không gian sống.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
              className="bg-black/30 p-8 rounded-xl border border-gray-800"
            >
              <h3 className="text-2xl font-light mb-4">Tầm nhìn</h3>
              <p className="text-sm text-gray-400">
                Trở thành địa chỉ hàng đầu về tư vấn thiết kế và cung cấp giải pháp chiếu sáng chuyên nghiệp tại Việt
                Nam, kết nối các sản phẩm quốc tế tới thị trường nội địa và ngược lại.
              </p>
            </motion.div>
          </div>
        </div>

        {/* IDA Lighting Branding Section */}
        <motion.div
          ref={logoRef}
          className="text-center mb-24 md:mb-40 relative"
          initial={{ opacity: 0 }}
          animate={isLogoInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Holographic glow effect */}
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <div className="w-60 h-60 rounded-full bg-gradient-to-r from-[#C73E1D]/20 via-[#FF5733]/20 to-[#C73E1D]/20 blur-[50px] animate-pulse-slow"></div>
          </div>
          
          {/* Scan line effect */}
          <motion.div 
            className="absolute inset-0 overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div 
              className="absolute left-0 right-0 h-[1px] bg-[#C73E1D]/50"
              initial={{ top: "-10%" }}
              animate={{ top: "110%" }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.8 }}
            animate={isLogoInView ? { scale: 1 } : { scale: 0.8 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-4"
          >
            <AnimatedTitle>
              <span className="text-4xl md:text-6xl font-light italic block">IDA Lighting</span>
              <span className="text-xl md:text-2xl tracking-wider">
                Ánh sáng của bạn - <span className="font-extrabold italic text-[#FF5733]">Phong cách</span> của bạn
              </span>
            </AnimatedTitle>
          </motion.div>
        </motion.div>

        {/* Services Section */}
        <div className="mb-24 md:mb-40">
          <motion.h2
            className="text-3xl md:text-4xl font-light mb-12 relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            Sản phẩm và Dịch vụ
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: false, amount: 0.3 }}
              className="absolute -bottom-2 left-0 h-0.5 bg-white"
            />
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
                className="bg-black/20 p-6 rounded-xl hover:bg-black/40 transition-colors duration-300 transform-gpu hover:shadow-lg border border-gray-800"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className="text-xl font-medium mb-4">{service.title}</h3>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-yellow-500 mr-2">•</span>
                      <span className="text-sm text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Second Content Row - Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-24 md:mb-40">
          {/* Left Column - Small Images */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <span className="text-sm uppercase text-gray-400">ABOUT</span>
              <span className="text-sm uppercase text-gray-400">IDA LIGHTING</span>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-8 perspective-[1000px]">
              <motion.div
                ref={image2Ref}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="transform-gpu overflow-hidden rounded-md"
                style={{
                  transform: `perspective(1000px) rotateX(${rotateX2}deg) rotateY(${rotateY2}deg)`,
                  transition: "transform 0.2s ease-out",
                }}
                onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => handleMouseMove(e, setRotateX2, setRotateY2)}
                onMouseLeave={() => handleMouseLeave(setRotateX2, setRotateY2)}
              >
                <img
                  src="/about/Image_20250221103244.jpg"
                  alt="Wall light"
                  className="w-full h-auto transition-all duration-500 hover:scale-110"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="overflow-hidden rounded-md"
              >
                <img
                  src="/about/Image_20250221104044.jpg"
                  alt="Table lamp"
                  className="w-full h-auto transition-all duration-500 hover:scale-110"
                />
              </motion.div>

              <motion.div
                ref={image3Ref}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="transform-gpu overflow-hidden rounded-md"
                style={{
                  transform: `perspective(1000px) rotateX(${rotateX3}deg) rotateY(${rotateY3}deg)`,
                  transition: "transform 0.2s ease-out",
                }}
                onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => handleMouseMove(e, setRotateX3, setRotateY3)}
                onMouseLeave={() => handleMouseLeave(setRotateX3, setRotateY3)}
              >
                <img
                  src="/about/Image_20250221103839.jpg"
                  alt="Pendant light"
                  className="w-full h-auto transition-all duration-500 hover:scale-110"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column - Large Image */}
          <div className="relative">
          <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-end"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <img
                src="/about/T1018.png"
                alt="Circular pendant light"
                className="w-3/4 h-auto drop-shadow-xl transition-all duration-300 hover:drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-24 md:mb-40">
          <motion.h2
            className="text-3xl md:text-4xl font-light mb-12 relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            Giá trị cốt lõi
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: false, amount: 0.3 }}
              className="absolute -bottom-2 left-0 h-0.5 bg-white"
            />
          </motion.h2>

          <div className="relative">
            {/* Grid layout with 9 cells, where the center (5th) cell is empty for the image */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* First row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: false, amount: 0.1 }}
                className="bg-black/30 p-6 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-800"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-600/20 flex items-center justify-center mr-3 text-yellow-500">
                    {coreValues[0].icon}
                  </div>
                  <h3 className="text-lg font-medium">{coreValues[0].title}</h3>
                </div>
                <p className="text-sm text-gray-300">{coreValues[0].description}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: false, amount: 0.1 }}
                className="bg-black/30 p-6 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-800"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-600/20 flex items-center justify-center mr-3 text-yellow-500">
                    {coreValues[1].icon}
                  </div>
                  <h3 className="text-lg font-medium">{coreValues[1].title}</h3>
                </div>
                <p className="text-sm text-gray-300">{coreValues[1].description}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: false, amount: 0.1 }}
                className="bg-black/30 p-6 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-800"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-600/20 flex items-center justify-center mr-3 text-yellow-500">
                    {coreValues[2].icon}
                  </div>
                  <h3 className="text-lg font-medium">{coreValues[2].title}</h3>
                </div>
                <p className="text-sm text-gray-300">{coreValues[2].description}</p>
              </motion.div>

              {/* Second row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: false, amount: 0.1 }}
                className="bg-black/30 p-6 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-800"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-600/20 flex items-center justify-center mr-3 text-yellow-500">
                    {coreValues[3].icon}
                  </div>
                  <h3 className="text-lg font-medium">{coreValues[3].title}</h3>
                </div>
                <p className="text-sm text-gray-300">{coreValues[3].description}</p>
              </motion.div>

              {/* Center cell - Empty for the image */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  viewport={{ once: false, amount: 0.3 }}
                  className="w-full h-full relative"
                >
                  <img
                    src="/Ida B-W2.png"
                    alt="Brain visualization"
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: false, amount: 0.1 }}
                className="bg-black/30 p-6 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-800"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-600/20 flex items-center justify-center mr-3 text-yellow-500">
                    {coreValues[4].icon}
                  </div>
                  <h3 className="text-lg font-medium">{coreValues[4].title}</h3>
                </div>
                <p className="text-sm text-gray-300">{coreValues[4].description}</p>
              </motion.div>

              {/* Third row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: false, amount: 0.1 }}
                className="bg-black/30 p-6 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-800"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-600/20 flex items-center justify-center mr-3 text-yellow-500">
                    {coreValues[5].icon}
                  </div>
                  <h3 className="text-lg font-medium">{coreValues[5].title}</h3>
                </div>
                <p className="text-sm text-gray-300">{coreValues[5].description}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: false, amount: 0.1 }}
                className="bg-black/30 p-6 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-800"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-600/20 flex items-center justify-center mr-3 text-yellow-500">
                    {coreValues[6].icon}
                  </div>
                  <h3 className="text-lg font-medium">{coreValues[6].title}</h3>
                </div>
                <p className="text-sm text-gray-300">{coreValues[6].description}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: false, amount: 0.1 }}
                className="bg-black/30 p-6 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-800"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-600/20 flex items-center justify-center mr-3 text-yellow-500">
                    {coreValues[7].icon}
                  </div>
                  <h3 className="text-lg font-medium">{coreValues[7].title}</h3>
                </div>
                <p className="text-sm text-gray-300">{coreValues[7].description}</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Third Content Row - Lighting Strategist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-24 md:mb-40 relative">
          {/* Large Text */}
          <div className="col-span-1 md:col-span-2">
            <motion.h2
              className="text-5xl md:text-7xl lg:text-8xl font-light mb-16 relative z-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              CHIẾN LƯỢC GIA CHIẾU SÁNG
            </motion.h2>
          </div>

          {/* Desk Lamp Image - Positioned to overlap with text */}
          <motion.div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 md:w-2/5 z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            whileHover={{
              scale: 1.05,
              rotate: -5,
              transition: { duration: 0.3 },
            }}
          >
            <img src="/about/Image_20250221104112.png" alt="Desk lamp" className="w-full h-auto filter drop-shadow-2xl" />

            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 opacity-0 hover:opacity-100 transition-opacity duration-700 rounded-full blur-xl -z-10"></div>
          </motion.div>

          {/* Text Content */}
          <div className="md:col-span-1 z-0">
            <div className="mt-8 md:mt-0">
              <span className="text-xs uppercase text-gray-400">Từ năm 2019</span>
            </div>
          </div>

          <div className="md:col-span-1 z-0">
            <p className="text-sm max-w-xs text-gray-300">
              Với sứ mệnh biến ánh sáng thành linh hồn của không gian, chúng tôi cung cấp các giải pháp chiếu sáng
              chuyên nghiệp, sáng tạo và cá nhân hóa.
            </p>

            <Link
              href="/contacts"
              className="inline-flex items-center mt-8 px-4 py-2 border border-gray-500 text-sm relative overflow-hidden group"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                Khám Phá Thêm{" "}
                <ArrowRight size={14} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-out -z-0"></span>
              <span className="absolute inset-0 bg-transparent group-hover:bg-transparent transition-colors duration-300 ease-out z-0"></span>
              <span className="absolute inset-0 w-full h-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center group-hover:text-black z-10">
                Khám Phá Thêm <ArrowRight size={14} className="ml-2" />
              </span>
            </Link>
          </div>
        </div>

        {/* Achievements Section */}
        <motion.div
          ref={achievementsRef}
          className="mb-24 md:mb-40"
          initial={{ opacity: 0 }}
          animate={isAchievementsInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-light mb-12 relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            Thành tựu nổi bật
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: false, amount: 0.3 }}
              className="absolute -bottom-2 left-0 h-0.5 bg-white"
            />
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isAchievementsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-black/20 backdrop-blur-sm p-8 rounded-xl text-center border border-[#C73E1D]/20 relative overflow-hidden"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              {/* Tech grid background */}
              <div className="absolute inset-0 bg-[url('/tech-grid.svg')] bg-cover opacity-10"></div>
              
              {/* Digital counter effect */}
              <div className="relative">
                <motion.div
                  className="text-5xl font-bold mb-4 text-[#C73E1D] font-mono"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.3 }}
                >
                  <CountUp end={5000} duration={2.5} />+
                </motion.div>
                
                <p className="text-lg">Dự án đã thực hiện</p>
                
                {/* Animated progress bar */}
                <div className="h-1 w-full bg-white/10 mt-4 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#8B2323] to-[#C73E1D]"
                    initial={{ width: 0 }}
                    whileInView={{ width: "94%" }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </div>
                
                {/* Technical data */}
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>2019</span>
                  <span>2024</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isAchievementsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/30 p-8 rounded-xl text-center md:col-span-3"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <p className="text-lg">
                Các giải pháp chiếu sáng cho các sự kiện lớn (Ashui Awards 2023, Ashui Awards Vibe Expo 2024)
              </p>
              
              {/* 3D Image Card */}
              <div className="mt-8 perspective-[1000px] max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="relative z-10 transform-gpu"
                  style={{
                    transform: `perspective(1000px) rotateX(${rotateX1}deg) rotateY(${rotateY1}deg)`,
                    transition: "transform 0.2s ease-out",
                  }}
                  onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => handleMouseMove(e, setRotateX1, setRotateY1)}
                  onMouseLeave={() => handleMouseLeave(setRotateX1, setRotateY1)}
                >
                  <img
                    src="/about/473584212_1055379076627086_5463849186793518302_n.jpg" // Hãy thay đổi đường dẫn hình ảnh
                    alt="Ashui Awards lighting solution"
                    className="w-full h-auto rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl"
                  />

                  {/* Shine effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Branding Tagline with Animation - MATCHED WITH HERO STYLE */}
        <motion.div
          className="text-center mb-24 md:mb-40 py-12 border-y border-gray-700"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="relative"
          >
            <AnimatedTitle>
              <span className="text-5xl md:text-7xl lg:text-8xl block mb-2">IDA Lighting</span>
              <span className="font-extrabold ">Your Light - </span>
              <span className="font-extrabold ">Your Style</span>
            </AnimatedTitle>

            {/* Animated light beam effect */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-0 bg-gradient-to-b from-yellow-400 to-transparent"
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: 100, opacity: 0.7 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: false }}
            />
          </motion.div>
        </motion.div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-24 md:mb-40">
          <div>
            <h3 className="text-xl font-light mb-4 text-white">
              Liên hệ với chúng tôi
              <br />
              để nhận tư vấn miễn phí
            </h3>

            <div className="mt-6">
              <div 
                className="relative inline-block"
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
              >
                {/* Hiệu ứng glow viền */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="absolute inset-[-2px]"
                    style={{
                      background: `conic-gradient(
                        from ${rotation * 360}deg,
                        #ff0066, 
                        #ff3300, 
                        #ffcc00, 
                        #C73E1D, 
                        #8B2323, 
                        #ff0066
                      )`,
                      filter: `blur(${isButtonHovered ? 8 : 6}px) brightness(${isButtonHovered ? 1.2 : 1.1})`,
                      opacity: isButtonHovered ? 1 : 0.85,
                    }}
                  />
                </div>
                
                {/* Nút với link */}
                <a
                  href="https://m.me/855258281507149"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative z-10 inline-block px-8 py-3 bg-black bg-opacity-90 text-white font-medium transition-all duration-300"
                  style={{
                    boxShadow: isButtonHovered 
                      ? "0 0 30px rgba(199, 62, 29, 0.7), 0 0 60px rgba(199, 62, 29, 0.4)" 
                      : "0 0 20px rgba(199, 62, 29, 0.5), 0 0 40px rgba(199, 62, 29, 0.3)",
                    transform: isButtonHovered ? "scale(1.03)" : "scale(1)",
                    textShadow: isButtonHovered 
                      ? "0 0 10px rgba(255, 255, 255, 0.5)" 
                      : "0 0 5px rgba(255, 255, 255, 0.3)",
                  }}
                >
                  Liên hệ ngay
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-medium mb-4 text-gray-300">DỊCH VỤ</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="hover:underline relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white hover:after:w-full after:transition-all after:duration-300 text-gray-400 hover:text-white"
                  >
                    TƯ VẤN
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:underline relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white hover:after:w-full after:transition-all after:duration-300 text-gray-400 hover:text-white"
                  >
                    THIẾT KẾ
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:underline relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white hover:after:w-full after:transition-all after:duration-300 text-gray-400 hover:text-white"
                  >
                    SẢN PHẨM
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-4 text-gray-300">SẢN PHẨM</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="hover:underline relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white hover:after:w-full after:transition-all after:duration-300 text-gray-400 hover:text-white"
                  >
                    INDOOR
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:underline relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white hover:after:w-full after:transition-all after:duration-300 text-gray-400 hover:text-white"
                  >
                    OUTDOOR
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:underline relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white hover:after:w-full after:transition-all after:duration-300 text-gray-400 hover:text-white"
                  >
                    DECORATIVE
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-4 text-gray-300">LIÊN HỆ</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="mailto:idalighting.vn@gmail.com"
                    className="hover:underline relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white hover:after:w-full after:transition-all after:duration-300 text-gray-400 hover:text-white"
                  >
                    EMAIL
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:underline relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white hover:after:w-full after:transition-all after:duration-300 text-gray-400 hover:text-white"
                  >
                    PHÒNG TRƯNG BÀY
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:underline relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white hover:after:w-full after:transition-all after:duration-300 text-gray-400 hover:text-white"
                  >
                    CÂU HỎI THƯỜNG GẶP
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-24 md:mb-40">
          <div className="md:col-span-1">
            <p className="text-sm text-gray-300">
              Trụ Sở 
              153 Hà Huy Tập,
              <br />
              Thành phố Hà Tĩnh, Việt Nam
            </p>
          </div>

          <div className="md:col-span-1">
            <p className="text-sm text-gray-300">+84 0924.222.888</p>
          </div>

          {/* <div className="md:col-span-1">
            <p className="text-sm">SẢN XUẤT TẠI VIỆT NAM</p>
          </div> */}
        </div>

        {/* Bottom Large Text */}
        <div className="mt-16">
          <motion.h2
            className="text-6xl md:text-8xl lg:text-9xl font-light relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            Tỏa Sáng !{/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 opacity-0 blur-xl -z-10"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.h2>
        </div>
      </div>
    </section>
  )
}

