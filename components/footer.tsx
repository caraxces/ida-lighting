"use client"

import Link from "next/link"
import { Facebook, Linkedin } from 'lucide-react'
import { motion } from "framer-motion"
import { useState } from "react"
import { X } from "lucide-react"

export default function Footer() {
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

  return (
    <footer className="w-full bg-gradient-to-r from-black via-black to-[#8B2323] text-white flex flex-col pt-16 pb-8 relative">
      <div className="container mx-auto px-4 md:px-8 flex flex-col">
        {/* Top section with navigation and address */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 mt-8 md:mt-16">
          {/* Navigation links */}
          <div className="space-y-2">
            <Link href="/" className="block text-lg hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link href="/work" className="block text-lg hover:text-gray-300 transition-colors">
              Work
            </Link>
            <Link href="/about" className="block text-lg hover:text-gray-300 transition-colors">
              About us
            </Link>
            <Link href="/contact" className="block text-lg hover:text-gray-300 transition-colors">
              Contact us
            </Link>
          </div>

          {/* Address */}
          <div className="text-center">
            <p className="text-gray-400 mb-2">Address:</p>
            <p className="mb-1">IDA Lighting</p>
            <p className="mb-1">Trụ sở</p>
            <p className="mb-1">153 Hà Huy Tập, Nam Hà, TP. Hà Tĩnh</p>
          </div>

          {/* Right section with contact info */}
          <div className="text-right">
            <p className="text-gray-400 mb-2">Contact:</p>
            <Link href="mailto:idalighting.vn@gmail.com" className="block hover:text-gray-300 transition-colors">
              idalighting.vn@gmail.com
            </Link>
            <p className="mt-2">+84 0924.222.888</p>
          </div>
        </div>

        {/* Offices section */}
        <div className="mb-10">
          <div className="w-full border-t border-gray-800 pt-6 mb-6">
            <p className="text-center text-gray-400 mb-6">Văn phòng đại diện</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
              <div className="bg-black/20 backdrop-blur-sm rounded-md p-4">
                <p className="text-gray-300 font-medium mb-1">Hà Nội:</p>
                <p className="text-sm text-gray-400">Tòa nhà số 373 Vũ Tông Phan, P. Khương Đình, Q.Thanh Xuân, Tp. Hà Nội</p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-md p-4">
                <p className="text-gray-300 font-medium mb-1">Hà Nội:</p>
                <p className="text-sm text-gray-400">Trung tâm Hội nghị Quốc Gia - số 1 Đại lộ Thăng Long, quận Nam Từ Liêm, Tp. Hà Nội</p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-md p-4">
                <p className="text-gray-300 font-medium mb-1">Nghệ An:</p>
                <p className="text-sm text-gray-400">Tòa nhà HV59, khu đô thị Eco Central Park, TP Vinh, Nghệ An</p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-md p-4">
                <p className="text-gray-300 font-medium mb-1">Quảng Bình:</p>
                <p className="text-sm text-gray-400">26 Bùi Sĩ Tiêm, Hải Đình, TP. Đồng Hới</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social media icons */}
        <div className="flex justify-center space-x-4 mb-8 flex-shrink-0 items-center">
          <a 
            href="https://www.facebook.com/idalighting" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black hover:bg-gray-800 transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </a>
          
          <a 
            href="https://www.linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black hover:bg-gray-800 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          
          <a 
            href="https://zaloapp.com/qr/p/o4teuv9ez56m" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black hover:bg-gray-800 transition-colors"
            aria-label="Zalo"
          >
            <img 
              src="/zalo-svgrepo-com.svg" 
              alt="Zalo" 
              className="w-5 h-5" 
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </a>
        </div>

        {/* QR Codes Section */}
        <div className="mb-10">
          <p className="text-center text-sm text-gray-300 mb-4">Quét mã QR để kết nối với chúng tôi</p>
          <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-4 w-full">
            {qrCodes.map((qr, index) => (
              <motion.div 
                key={qr.id}
                className="w-full max-w-[220px] mx-auto md:mx-0 cursor-pointer group mb-4 md:mb-0"
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 10px 15px -5px rgba(0, 0, 0, 0.1)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setActiveQR(qr)}
              >
                <div className={`relative w-full h-full p-3 border-2 ${
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
                    <h3 className="text-sm font-bold mb-1">{qr.title}</h3>
                    <p className="text-xs text-gray-400 mb-2">{qr.subtitle}</p>
                    <div className="bg-white/95 rounded-lg p-2 w-24 h-24 mx-auto mb-2 flex-grow flex items-center justify-center">
                      <img 
                        src={qr.image} 
                        alt={`${qr.title} QR Code`} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="absolute -bottom-1 right-2">
                      <div className={`bg-black/60 px-2 py-0.5 rounded-full border ${
                        qr.id === "wechat" ? "border-green-500/50" : "border-blue-500/50"
                      }`}>
                        <span className={`font-medium text-xs ${qr.labelColor}`}>{qr.labelText}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom section with copyright and privacy */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 md:mt-auto">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">©2025 IDA Lighting</p>
            <p className="text-sm text-gray-400">All rights reserved</p>
          </div>
          
          <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-gray-300 transition-colors mb-4 md:mb-0">
            Privacy Policy
          </Link>
          
          <p className="text-sm text-gray-400">
            Website by{" "}
            <a 
              href="https://www.linkedin.com/in/trucmt0110/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors duration-200 underline underline-offset-2"
            >
              trucmt
            </a>
          </p>
        </div>
      </div>

      {/* Large brand text at bottom */}
      <div className="absolute bottom-[-20px] left-0 w-full text-center opacity-20 pointer-events-none">
        <h1 className="text-[120px] md:text-[180px] font-bold tracking-tighter whitespace-nowrap overflow-hidden">
          IDA Lighting
        </h1>
      </div>

      {/* Fullscreen QR code modal */}
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
                  className="w-full max-w-xs bg-gradient-to-r from-black to-[#8B2323] hover:from-[#8B2323] hover:to-black text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {activeQR.buttonText}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </footer>
  )
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
