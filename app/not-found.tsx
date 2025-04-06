"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-6xl sm:text-8xl font-bold mb-6">404</h1>
        <h2 className="text-2xl sm:text-4xl font-medium mb-8">Trang không tìm thấy</h2>
        <p className="text-gray-400 mb-8">
          Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
        <Link 
          href="/"
          className="inline-block px-8 py-3 bg-white/10 text-white hover:bg-white/20 rounded-full transition-colors"
        >
          Trở về trang chủ
        </Link>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div className="text-[20vw] font-bold text-white/5">IDA</div>
      </motion.div>
    </div>
  )
} 