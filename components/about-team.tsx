"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"

type TeamMember = {
  id: number
  name: string
  role: string
  image: string
  overlayColor: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "MR Duong",
    role: "Founder",
    image: "/member/founder.png",
    overlayColor: "from-red-900 to-red-800"
  },
  {
    id: 2,
    name: "PAULINA GAYOSO",
    role: "Manager",
    image: "/member/2.jpeg",
    overlayColor: "from-red-800 to-red-700"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Technical Lead",
    image: "/member/3.jpeg",
    overlayColor: "from-red-700 to-red-600"
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    role: "UX Specialist",
    image: "/member/4.jpeg",
    overlayColor: "from-red-600 to-red-500"
  },
  {
    id: 5,
    name: "David Kim",
    role: "3D Artist",
    image: "/member/5.jpeg",
    overlayColor: "from-red-500 to-red-400"
  },
  {
    id: 6,
    name: "Olivia Taylor",
    role: "Project Manager",
    image: "/member/6.jpeg",
    overlayColor: "from-red-400 to-red-300"
  },
]

export default function AboutTeam() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.1 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  const smoothY = useSpring(y, { damping: 15, stiffness: 100 })
  const smoothScale = useSpring(scale, { damping: 15, stiffness: 100 })

  return (
    <section ref={containerRef} className="relative min-h-screen py-24 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black z-0"></div>

      <motion.div style={{ opacity, y: smoothY }} className="container mx-auto z-10 relative">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white text-2xl font-bold mb-6"
          >
            Meet Our Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            A collective of creative minds, technical wizards, and strategic thinkers dedicated to bringing your vision
            to life.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} inView={isInView} />
          ))}
        </div>
      </motion.div>

      <motion.div
        style={{
          scale: smoothScale,
          opacity,
        }}
        className="mt-24 text-center"
      >
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-block px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-xl font-bold mb-6"
        >
          Join Our Team
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg text-gray-300 max-w-2xl mx-auto mb-8"
        >
          We're always looking for talented individuals to join our creative family. If you're passionate about design
          and technology, we'd love to hear from you.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors active:scale-95 transform duration-150"
        >
          View Open Positions
        </motion.button>
      </motion.div>
    </section>
  )
}

function TeamMemberCard({
  member,
  index,
  inView,
}: {
  member: TeamMember
  index: number
  inView: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isCardInView = useInView(cardRef, { once: false, amount: 0.2 })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        delay: 0.1 * index,
        type: "spring",
        stiffness: 50,
      }}
      className="bg-white rounded-3xl overflow-hidden group relative"
    >
      <div className="relative aspect-[3/4] w-full">
        {/* Colored Overlay */}
        <div className={`absolute top-0 left-0 w-1/3 h-full bg-gradient-to-b ${member.overlayColor} opacity-90 z-10`}></div>
        
        {/* Brand Text */}
        <div className="absolute top-8 left-6 z-20 text-white">
          <p className="text-sm font-medium tracking-wider">IDA</p>
          <p className="text-sm font-medium tracking-wider">LIGHTING</p>
        </div>

        {/* Image */}
        <motion.img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
          initial={{ scale: 1.2 }}
          animate={isCardInView ? { scale: 1 } : { scale: 1.2 }}
          transition={{ duration: 0.8 }}
        />

        {/* Member Info */}
        <div className="absolute bottom-8 left-6 z-20">
          <h3 className="text-xl font-bold text-white">{member.name}</h3>
          <p className="text-sm text-gray-200 mt-1">{member.role}</p>
        </div>
      </div>
    </motion.div>
  )
}

