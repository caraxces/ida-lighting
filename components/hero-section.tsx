"use client"
import { ChevronDown } from "lucide-react"
import AnimatedTitle from "./animated-title"
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section className="relative h-[100vh] flex flex-col items-center justify-center px-4 md:px-8">
      {/* Background gradient with mask for rounded corners */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-blue-900/20 to-black z-0">
        <div className="absolute bottom-0 left-0 right-0 h-[50px] bg-black" style={{ borderRadius: '50px 50px 0 0' }}></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto text-center z-10 max-w-4xl">
        <AnimatedTitle>
          <span className="text-6xl md:text-8xl lg:text-9xl block mb-2">Transforming</span>
          <span className="font-extrabold italic">reality</span> to show
          <span className="font-extrabold italic"> more</span>
        </AnimatedTitle>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12">
          IDA Lighting - Bringing innovative lighting solutions to transform spaces with elegance and efficiency.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex justify-center"
        >
          <button className="flex items-center mx-auto space-x-2 px-6 py-3 border border-white/30 rounded-full hover:bg-white/10 transition-colors group">
            <span>Scroll to explore more</span>
            <ChevronDown className="animate-bounce group-hover:animate-none" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

