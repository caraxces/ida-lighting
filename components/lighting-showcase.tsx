"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function LightingShowcase() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let animationFrameId: number
    let particleX = -200

    // Create particles for more dynamic light effect
    const particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = []

    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height / 2 + (Math.random() * 2 - 1) * 3,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw dotted line
      ctx.setLineDash([4, 8])
      ctx.beginPath()
      ctx.moveTo(0, canvas.height / 2)
      ctx.lineTo(canvas.width, canvas.height / 2)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw the main flowing light
      const gradient = ctx.createLinearGradient(particleX - 200, 0, particleX + 200, 0)
      gradient.addColorStop(0, "rgba(255, 255, 255, 0)")
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.6)")
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, canvas.height / 2 - 4, canvas.width, 8)

      // Draw additional particles for more dynamic effect
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
        ctx.fill()

        // Move particles
        particle.x += particle.speed
        if (particle.x > canvas.width) {
          particle.x = 0
          particle.y = canvas.height / 2 + (Math.random() * 2 - 1) * 3
        }
      })

      // Move the main light
      particleX += 3
      if (particleX > canvas.width + 200) {
        particleX = -200
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-black via-black to-[#8B2323] flex items-center justify-center overflow-hidden">
      {/* Animated light flow */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Left side - Title */}
          <div className="lg:col-span-1">
            <div className="text-center lg:text-right">
              <h2 className="text-white uppercase font-bold tracking-wider mb-2 text-lg">Dòng chảy của ánh sáng</h2>
            </div>
          </div>

          {/* Right side - Categories */}
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link href={category.link} className="block overflow-hidden transition-transform duration-300 hover:scale-105">
                  <div className="aspect-[4/3] overflow-hidden mb-3">
                    <Image
                      src={category.image || "/about/outdoor1.JPG"}
                      alt={category.title}
                      width={240}
                      height={180}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <h3 className="text-white uppercase text-center font-medium tracking-wider text-sm mb-1">
                  {category.title}
                </h3>
                <div className="w-full flex justify-center mb-2">
                  <div className="w-12 h-[1px] bg-white opacity-30"></div>
                </div>
                <p className="text-white/70 text-xs text-center leading-relaxed max-w-[240px] mx-auto">
                  {category.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const categories = [
  {
    title: "Outdoor Light",
    description:
      "Các công đèn ngoài trời của chúng tôi được thiết kế để chịu được điều kiện thời tiết khắc nghiệt, đồng thời mang lại ánh sáng đẹp và hiệu quả cho không gian ngoài trời của bạn.",
    image: "/about/outdoor1.JPG",
    link: "/about",
  },
  {
    title: "Indoor Light",
    description:
      "Hệ thống đèn chiếu sáng trong nhà của chúng tôi được thiết kế để tạo nên một môi trường sống ấm áp, tạo cảm giác thoải mái và thư giãn. Đèn trong nhà của chúng tôi mang đến vẻ đẹp và chức năng.",
    image: "/about/showroom-lighting.jpg",
    link: "/about",
  },
  {
    title: "Đèn Trang Trí",
    description:
      "Những chiếc đèn trang trí của chúng tôi không chỉ mang ánh sáng đến không gian của bạn mà còn là những tác phẩm nghệ thuật độc đáo, tạo điểm nhấn cho không gian của bạn.",
    image: "/about/chadl.jpg",
    link: "/about",
  },
  {
    title: "Bespoke Lighting",
    description:
      "Chúng tôi cung cấp các thiết kế đèn tùy chỉnh để đáp ứng nhu cầu cụ thể của mọi không gian. Thiết kế độc đáo, phù hợp với từng không gian riêng của bạn.",
    image: "/about/bespoke.png",
    link: "/about",
  },
]
