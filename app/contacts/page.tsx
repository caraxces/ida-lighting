"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { motion, HTMLMotionProps } from "framer-motion"
import { Phone, Mail, MapPin } from "lucide-react"
import AnimatedTitle from "@/components/animated-title"
import type { ComponentProps } from "react"

// Định nghĩa type cho MotionDiv
const MotionDiv = motion.div as React.FC<ComponentProps<"div"> & HTMLMotionProps<"div">>;

// Định nghĩa type cho event handler đúng với Framer Motion
type MotionHoverEvent = MouseEvent & {
  target: Element;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Đã gửi biểu mẫu:", formData)
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    })
  }

  // Xóa hoặc comment out hàm handleMouseMove vì không cần thiết nữa
  // const handleMouseMove = (event: MotionHoverEvent) => {
  //   const el = event.target as HTMLDivElement;
  //   const rect = el.getBoundingClientRect();
  //   const x = event.clientX - rect.left;
  //   const y = event.clientY - rect.top;
  //   
  //   el.style.background = `radial-gradient(circle at ${x}px ${y}px, #EF4444, #F59E0B, #F97316)`;
  // }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      <Header />

      <section className="pt-32 pb-16 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="mb-16">
            <AnimatedTitle>
              <span className="text-5xl md:text-7xl lg:text-8xl">Liên hệ </span>
              <span className="font-extrabold italic">với chúng tôi</span>
            </AnimatedTitle>
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-lg font-medium mb-2">Kết nối với chúng tôi qua Zalo</h2>
                <p className="text-gray-600 text-sm mb-6">
                  Quét mã QR bên dưới để kết nối với đội ngũ chăm sóc khách hàng của chúng tôi trên Zalo để nhận phản hồi nhanh chóng.
                </p>

                <div className="flex flex-col items-center">
                  <div className="relative w-64 h-64 p-4 border-2 border-gray-200 rounded-xl mb-6">
                    <img 
                      src="/qr-zalo.png" 
                      alt="Zalo QR Code" 
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full border border-gray-200">
                      <span className="font-medium text-blue-600">Zalo</span>
                    </div>
                  </div>
                  
                  <div className="text-center mb-6">
                    <p className="text-gray-700 font-medium mb-2">Lợi ích khi kết nối qua Zalo:</p>
                    <ul className="text-gray-600 text-sm space-y-2">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Nhắn tin tức thời với đội ngũ của chúng tôi
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Chia sẻ hình ảnh không gian của bạn để được tư vấn
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Nhận ưu đãi độc quyền và cập nhật mới nhất
                      </li>
                    </ul>
                  </div>
                  
                  <MotionDiv
                    initial={false}
                    whileHover={{
                      scale: 1.05,
                      textShadow: "0 0 15px rgba(255,255,255,0.7)",
                    }}
                    className="relative flex items-center hover:text-primary rounded-[10px] w-48"
                  >
                    <a
                      href="https://zaloapp.com/qr/p/o4teuv9ez56m"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full flex items-center justify-center py-3 px-6 space-x-2 z-10"
                    >
                      <span className="relative transition-all duration-300 text-white text-lg font-medium">
                        Mở Zalo
                      </span>
                    </a>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 opacity-100 hover:opacity-90 transition-opacity duration-300 rounded-[10px]"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 opacity-100 hover:opacity-90 transition-opacity duration-300"></div>
                  </MotionDiv>
                </div>
              </motion.div>
            </div>

            <div className="w-full md:w-1/2">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12"
              >
                <h2 className="text-lg font-medium mb-2">Gọi cho chúng tôi</h2>
                <p className="text-gray-600 text-sm mb-4">
                  Đội ngũ của chúng tôi luôn sẵn sàng trả lời câu hỏi của bạn trong giờ làm việc.
                </p>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-orange-500 mr-2" />
                  <a href="tel:+84924222888" className="text-gray-800 hover:text-gray-600">
                    0924.222.888
                  </a>
                </div>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-12"
              >
                <h2 className="text-lg font-medium mb-2">Gửi email cho chúng tôi</h2>
                <p className="text-gray-600 text-sm mb-4">
                  Gửi email cho chúng tôi và chúng tôi sẽ phản hồi trong vòng 24 giờ.
                </p>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-orange-500 mr-2" />
                  <a href="mailto:idalighting.vn@gmail.com" className="text-gray-800 hover:text-gray-600">
                    idalighting.vn@gmail.com
                  </a>
                </div>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-lg font-medium mb-2">Ghé thăm chúng tôi</h2>
                <p className="text-gray-600 text-sm mb-4">
                  Hãy đến showroom của chúng tôi để xem trực tiếp các giải pháp chiếu sáng.
                </p>
                <div className="flex items-center mb-6">
                  <MapPin className="w-5 h-5 text-orange-500 mr-2" />
                  <span className="text-gray-800">153 Hà Huy Tập, Nam Hà, TP. Hà Tĩnh</span>
                </div>

                <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d946.8305562986295!2d105.90002481681827!3d18.33257839614494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31384f8aac003d29%3A0x145d3a0591e89d69!2sIDA%20Lighting!5e0!3m2!1svi!2s!4v1742799579490!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </MotionDiv>
            </div>
          </div>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-24"
          >
            <h2 className="text-3xl font-bold mb-8">Câu hỏi thường gặp</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-2">Các loại giải pháp chiếu sáng nào bạn cung cấp?</h3>
                <p className="text-gray-600">
                  Chúng tôi cung cấp đa dạng các giải pháp chiếu sáng bao gồm nhà ở, thương mại, công nghiệp, ngoài trời, thông minh và chiếu sáng trang trí.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Bạn có cung cấp dịch vụ lắp đặt không?</h3>
                <p className="text-gray-600">
                  Có, chúng tôi cung cấp dịch vụ lắp đặt chuyên nghiệp cho tất cả các giải pháp chiếu sáng để đảm bảo hiệu suất và an toàn tối ưu.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Chính sách bảo hành của bạn là gì?</h3>
                <p className="text-gray-600">
                  Sản phẩm của chúng tôi đi kèm với bảo hành từ 1-5 năm tùy thuộc vào loại giải pháp chiếu sáng. Vui lòng liên hệ với chúng tôi để biết thông tin bảo hành cụ thể.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Bạn có thể tạo thiết kế chiếu sáng tùy chỉnh không?</h3>
                <p className="text-gray-600">
                  Chúng tôi chuyên thiết kế chiếu sáng tùy chỉnh phù hợp với nhu cầu và sở thích cụ thể của bạn.
                </p>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      <Footer />
    </main>
  )
}

