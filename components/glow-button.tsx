"use client"

import React from "react"
import { motion } from "framer-motion"

interface GlowButtonProps {
  text: string
  onClick?: () => void
  className?: string
}

export default function GlowButton({ text, onClick, className = "" }: GlowButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`relative px-4 py-1.5 text-[14px] font-medium text-white transition-all duration-300 rounded-sm ${className}`}
      style={{
        background: "transparent",
        boxShadow: "0 0 8px rgba(255, 51, 0, 0.5), 0 0 18px rgba(255, 69, 0, 0.3)",
      }}
    >
      <span className="relative z-10">{text}</span>
      <span 
        className="absolute inset-0 rounded-sm overflow-hidden" 
        style={{
          background: "transparent",
          border: "1px solid rgba(255, 51, 0, 0.5)",
          boxShadow: "inset 0 0 5px rgba(255, 51, 0, 0.3)",
        }}
      ></span>
    </button>
  )
} 