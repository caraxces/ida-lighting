"use client"

import Link from "next/link"
import { Facebook, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-black via-black to-[#8B2323] text-white pt-16 pb-8 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        {/* Top section with navigation and address */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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

          {/* Right section - can be used for partner info or other content */}
          <div className="text-right">
            <p className="text-gray-400 mb-2">Contact:</p>
            <Link href="mailto:idalighting.vn@gmail.com" className="block hover:text-gray-300 transition-colors">
              idalighting.vn@gmail.com
            </Link>
            <p className="mt-2">+84 24 9876 5432</p>
          </div>
        </div>

        {/* Social media icons */}
        <div className="flex justify-center space-x-4 mb-16">
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

        {/* Bottom section with copyright and privacy */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">©2025 IDA Lighting</p>
            <p className="text-sm text-gray-400">All rights reserved</p>
          </div>
          
          <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-gray-300 transition-colors mb-4 md:mb-0">
            Privacy Policy
          </Link>
          
          <p className="text-sm text-gray-400">Website by trucmt</p>
        </div>
      </div>

      {/* Large brand text at bottom */}
      <div className="absolute bottom-[-20px] left-0 w-full text-center opacity-20 pointer-events-none">
        <h1 className="text-[120px] md:text-[180px] font-bold tracking-tighter whitespace-nowrap overflow-hidden">
          IDA Lighting
        </h1>
      </div>
    </footer>
  )
}
