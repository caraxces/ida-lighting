"use client"

import { motion } from "framer-motion"
import AnimatedTitle from "./animated-title"

export default function AboutHero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 pt-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-blue-900/20 to-black z-0"></div>

      {/* Main content */}
      <div className="container mx-auto text-center z-10 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <AnimatedTitle>
            Về <span className="font-extrabold">IDA Lighting</span>
          </AnimatedTitle>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            IDA Lighting là nhà cung cấp hàng đầu về giải pháp chiếu sáng sáng tạo. Chúng tôi kết hợp công nghệ tiên tiến với thiết kế thanh lịch để tạo ra hệ thống chiếu sáng biến đổi không gian và nâng cao trải nghiệm.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

