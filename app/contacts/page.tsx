"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { motion, HTMLMotionProps, AnimatePresence } from "framer-motion"
import { Phone, Mail, MapPin, X } from "lucide-react"
import AnimatedTitle from "@/components/animated-title"
import type { ComponentProps } from "react"
import GlowButton from "@/components/glow-button"

// Định nghĩa type cho MotionDiv
const MotionDiv = motion.div as React.FC<ComponentProps<"div"> & HTMLMotionProps<"div">>;

// Định nghĩa type cho event handler đúng với Framer Motion
type MotionHoverEvent = MouseEvent & {
  target: Element;
}

// Định nghĩa type cho QR code data
interface QRCodeData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  labelColor: string;
  labelText: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  // State để theo dõi QR code đang được xem toàn màn hình
  const [activeQR, setActiveQR] = useState<QRCodeData | null>(null);

  // Dữ liệu QR code
  const qrCodes: QRCodeData[] = [
    {
      id: "zalo-customer",
      title: "Zalo khách hàng",
      subtitle: "Dành cho khách hàng cá nhân",
      image: "/qr-zalo.png",
      buttonText: "Mở Zalo",
      buttonLink: "https://zaloapp.com/qr/p/o4teuv9ez56m",
      labelColor: "text-blue-400",
      labelText: "Zalo khách hàng",
    },
    {
      id: "zalo-contractor",
      title: "Zalo đối tác",
      subtitle: "Dành cho chủ thầu & đối tác",
      image: "/about/zlida.jpg",
      buttonText: "Mở Zalo",
      buttonLink: "https://zaloapp.com/qr/p/1edp1nqjncqgm",
      labelColor: "text-blue-400",
      labelText: "Zalo đối tác",
    },
    {
      id: "wechat",
      title: "WeChat",
      subtitle: "For international customers",
      image: "/about/wechatida.jpg",
      buttonText: "Open WeChat",
      buttonLink: "https://u.wechat.com/kPa5lhy7gr8U02FJUu6imWs?s=2",
      labelColor: "text-green-400",
      labelText: "WeChat",
    },
  ];

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

  return (
    <main className="min-h-screen bg-gradient-to-r from-black via-black to-[#8B2323] text-white">
      <Header />

      <section className="pt-32 pb-16 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="mb-16">
            <AnimatedTitle>
              <span className="text-5xl md:text-7xl lg:text-8xl">Liên hệ </span>
              <span className="font-extrabold ">với chúng tôi</span>
            </AnimatedTitle>
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-lg font-medium mb-2">Kết nối với chúng tôi</h2>
                <p className="text-gray-300 text-sm mb-8">
                  Quét mã QR bên dưới để kết nối với đội ngũ của chúng tôi trên các nền tảng nhắn tin để nhận phản hồi nhanh chóng.
                </p>

                {/* Responsive QR Code Layout - Vertical on mobile, Horizontal on md+ */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-stretch gap-6 w-full mb-8">
                  {qrCodes.map((qr, index) => (
                    <motion.div 
                      key={qr.id}
                      className="w-full max-w-[280px] mx-auto md:mx-0 cursor-pointer group mb-4 md:mb-0"
                      whileHover={{ 
                        scale: 1.02, 
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() => setActiveQR(qr)}
                    >
                      <div className={`relative w-full h-full p-4 border-2 ${
                        qr.id === "zalo-customer" ? "border-blue-500/40 bg-gradient-to-br from-slate-900/80 to-red-900/30 group-hover:border-blue-500/70" :
                        qr.id === "zalo-contractor" ? "border-blue-500/40 bg-gradient-to-br from-slate-900/80 to-blue-900/30 group-hover:border-blue-500/70" :
                        "border-green-500/40 bg-gradient-to-br from-slate-900/80 to-green-900/30 group-hover:border-green-500/70"
                      } backdrop-blur-sm rounded-xl overflow-hidden transition duration-300`}>
                        <div className={`absolute inset-0 ${
                          qr.id === "zalo-customer" ? "bg-gradient-to-br from-red-500/5 to-blue-500/5" :
                          qr.id === "zalo-contractor" ? "bg-gradient-to-br from-blue-500/5 to-purple-500/5" :
                          "bg-gradient-to-br from-green-500/5 to-teal-500/5"
                        } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                        <div className="relative z-10 flex flex-col h-full">
                          <h3 className="text-lg font-bold mb-1">{qr.title}</h3>
                          <p className="text-xs text-gray-400 mb-3">{qr.subtitle}</p>
                          <div className="bg-white/95 rounded-lg p-2 w-32 h-32 mx-auto mb-3 flex-grow flex items-center justify-center">
                            <img 
                              src={qr.image} 
                              alt={`${qr.title} QR Code`} 
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="absolute -bottom-1 right-3">
                            <div className={`bg-black/60 px-3 py-1 rounded-full border ${
                              qr.id === "wechat" ? "border-green-500/50" : "border-blue-500/50"
                            }`}>
                              <span className={`font-medium ${qr.labelColor}`}>{qr.labelText}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8">
                  <div className="text-center">
                    <p className="text-white/70 font-medium text-sm mb-2">Nhấn vào mã QR để phóng to | <span className="italic">Click on QR code to zoom</span></p>
                    <p className="text-white font-medium mb-3">Lợi ích khi kết nối trực tiếp:</p>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#000000" />
                              <stop offset="100%" stopColor="#8B2323" />
                            </linearGradient>
                          </defs>
                          <path fillRule="evenodd" fill="url(#redGradient)" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Nhắn tin tức thời với đội ngũ của chúng tôi
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="redGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#000000" />
                              <stop offset="100%" stopColor="#8B2323" />
                            </linearGradient>
                          </defs>
                          <path fillRule="evenodd" fill="url(#redGradient2)" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Chia sẻ hình ảnh không gian của bạn để được tư vấn
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="redGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#000000" />
                              <stop offset="100%" stopColor="#8B2323" />
                            </linearGradient>
                          </defs>
                          <path fillRule="evenodd" fill="url(#redGradient3)" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Nhận ưu đãi độc quyền và cập nhật mới nhất
                      </li>
                    </ul>
                  </div>
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
                <p className="text-gray-300 text-sm mb-4">
                  Đội ngũ của chúng tôi luôn sẵn sàng trả lời câu hỏi của bạn trong giờ làm việc.
                </p>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-orange-500 mr-2" />
                  <a href="tel:+84924222888" className="text-white hover:text-gray-300">
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
                <p className="text-gray-300 text-sm mb-4">
                  Gửi email cho chúng tôi và chúng tôi sẽ phản hồi trong vòng 24 giờ.
                </p>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-orange-500 mr-2" />
                  <a href="mailto:idalighting.vn@gmail.com" className="text-white hover:text-gray-300">
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
                <p className="text-gray-300 text-sm mb-4">
                  Hãy đến showroom của chúng tôi để xem trực tiếp các giải pháp chiếu sáng.
                </p>
                <div className="flex items-center mb-6">
                  <MapPin className="w-5 h-5 text-orange-500 mr-2" />
                  <span className="text-white">153 Hà Huy Tập, Nam Hà, TP. Hà Tĩnh</span>
                </div>

                <div className="w-full h-64 bg-black/30 rounded-lg overflow-hidden">
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
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-md">
                <h3 className="text-lg font-medium mb-2">Các loại giải pháp chiếu sáng nào bạn cung cấp?</h3>
                <p className="text-gray-300">
                  Chúng tôi cung cấp đa dạng các giải pháp chiếu sáng bao gồm nhà ở, thương mại, công nghiệp, ngoài trời, thông minh và chiếu sáng trang trí.
                </p>
              </div>
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-md">
                <h3 className="text-lg font-medium mb-2">Bạn có cung cấp dịch vụ lắp đặt không?</h3>
                <p className="text-gray-300">
                  Có, chúng tôi cung cấp dịch vụ lắp đặt chuyên nghiệp cho tất cả các giải pháp chiếu sáng để đảm bảo hiệu suất và an toàn tối ưu.
                </p>
              </div>
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-md">
                <h3 className="text-lg font-medium mb-2">Chính sách bảo hành của bạn là gì?</h3>
                <p className="text-gray-300">
                  Sản phẩm của chúng tôi đi kèm với bảo hành từ 1-5 năm tùy thuộc vào loại giải pháp chiếu sáng. Vui lòng liên hệ với chúng tôi để biết thông tin bảo hành cụ thể.
                </p>
              </div>
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-md">
                <h3 className="text-lg font-medium mb-2">Bạn có thể tạo thiết kế chiếu sáng tùy chỉnh không?</h3>
                <p className="text-gray-300">
                  Chúng tôi chuyên thiết kế chiếu sáng tùy chỉnh phù hợp với nhu cầu và sở thích cụ thể của bạn.
                </p>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Fullscreen QR code modal */}
      <AnimatePresence>
        {activeQR && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveQR(null)}
          >
            <motion.div 
              className="relative"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button 
                className="absolute -top-16 right-0 p-2 text-white/80 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveQR(null);
                }}
              >
                <span className="sr-only">Đóng</span>
                <X className="w-8 h-8" />
              </button>

              <div className="max-w-[90vw] max-h-[90vh] bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/20">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold">{activeQR.title}</h2>
                  <p className="text-gray-400">{activeQR.subtitle}</p>
                </div>
                <div className="bg-white rounded-lg p-4 w-[280px] h-[280px] md:w-[350px] md:h-[350px] mx-auto mb-6">
                  <img 
                    src={activeQR.image} 
                    alt={`${activeQR.title} QR Code`} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex justify-center">
                  <a
                    href={activeQR.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <GlowButton 
                      text={activeQR.buttonText}
                      className="w-full"
                      onClick={() => window.open(activeQR.buttonLink, "_blank")}
                    />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}

