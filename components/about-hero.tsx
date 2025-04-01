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
            About <span className="font-extrabold italic">IDA Lighting</span>
          </AnimatedTitle>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            IDA Lighting is a leading provider of innovative lighting solutions. We combine cutting-edge technology with
            elegant design to create lighting systems that transform spaces and enhance experiences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16"
        >
          <div className="text-left">
            <h3 className="inline-block px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white mb-4">
              Our Mission
            </h3>
            <p className="text-gray-300">
              To provide innovative lighting solutions that enhance spaces, improve energy efficiency, and create
              memorable experiences through the perfect balance of technology and design.
            </p>
          </div>
          <div className="text-left">
            <h3 className="inline-block px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white mb-4">
              Our Vision
            </h3>
            <p className="text-gray-300">
              To be the leading provider of lighting solutions in Vietnam, recognized for our commitment to quality,
              innovation, and customer satisfaction.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

