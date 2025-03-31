"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email, agreedToPrivacy)
    // Reset form
    setEmail("")
    setAgreedToPrivacy(false)
  }

  return (
    <section className="w-full bg-[#0F0F0F] text-white py-16 rounded-t-3xl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0 md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Lighting solutions in your inbox</h2>
            <p className="text-gray-600 mb-4">Email address</p>

            <form onSubmit={handleSubmit} className="mb-6">
              <div className="flex items-center mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="flex-grow py-2 px-4 bg-transparent border-b border-gray-400 focus:outline-none focus:border-gray-800"
                  required
                />
                <button
                  type="submit"
                  className="ml-2 bg-gray-800 text-white rounded-full px-6 py-2 hover:bg-gray-700 transition-colors"
                >
                  Send
                </button>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={agreedToPrivacy}
                  onChange={() => setAgreedToPrivacy(!agreedToPrivacy)}
                  className="mr-2"
                  required
                />
                <label htmlFor="privacy" className="text-sm text-gray-600">
                  I agree to the privacy statement
                </label>
              </div>
            </form>

            <div className="border-t border-gray-400 pt-6 mb-8"></div>

            <div className="mb-8">
              <h3 className="font-medium mb-4">Directly to</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Link href="/" className="block font-medium mb-2">
                    Vision
                  </Link>
                  <Link href="/work" className="block font-medium mb-2">
                    Cases
                  </Link>
                  <div className="relative">
                    <Link href="/services" className="block font-medium mb-2">
                      Solutions
                    </Link>
                    <ChevronRight className="absolute right-0 top-1 w-4 h-4" />
                  </div>
                </div>
                <div>
                  <Link href="/about" className="block font-medium mb-2">
                    About IDA Lighting
                  </Link>
                  <Link href="/updates" className="block font-medium mb-2">
                    Updates
                  </Link>
                  <div className="relative">
                    <Link href="/work" className="block font-medium mb-2">
                      Work
                    </Link>
                    <ChevronRight className="absolute right-0 top-1 w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 md:pl-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-medium mb-2">IDA Lighting Hà Nội</h3>
                <p className="text-sm text-gray-600 mb-1">Trung tâm Hội nghị Quốc Gia</p>
                <p className="text-sm text-gray-600 mb-1">Số 1 Đại lộ Thăng Long, quận Nam Từ Liêm</p>
                <p className="text-sm text-gray-600 mb-4">Tp. Hà Nội</p>
                <p className="text-sm text-gray-600">+84 24 9876 5432</p>

                <Link
                  href="https://maps.google.com"
                  target="_blank"
                  className="inline-flex items-center mt-4 bg-[#C73E1D] text-white rounded-full px-4 py-1 text-sm font-medium hover:bg-[#8B2323] transition-colors"
                >
                  Route <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </div>

              <div>
                <h3 className="font-medium mb-2">IDA Lighting Nghệ An</h3>
                <p className="text-sm text-gray-600 mb-1">Tòa nhà HV59, khu đô thị Eco Central Park</p>
                <p className="text-sm text-gray-600 mb-1">TP Vinh</p>
                <p className="text-sm text-gray-600 mb-4">Nghệ An</p>
                <p className="text-sm text-gray-600">+84 238 1234 567</p>

                <Link
                  href="https://maps.google.com"
                  target="_blank"
                  className="inline-flex items-center mt-4 bg-[#C73E1D] text-white rounded-full px-4 py-1 text-sm font-medium hover:bg-[#8B2323] transition-colors"
                >
                  Route <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </div>

              <div>
                <h3 className="font-medium mb-2">IDA Lighting Hà Tĩnh</h3>
                <p className="text-sm text-gray-600 mb-1">153 Hà Huy Tập</p>
                <p className="text-sm text-gray-600 mb-1">Nam Hà</p>
                <p className="text-sm text-gray-600 mb-4">TP. Hà Tĩnh</p>
                <p className="text-sm text-gray-600">+84 239 8765 432</p>

                <Link
                  href="https://maps.google.com"
                  target="_blank"
                  className="inline-flex items-center mt-4 bg-[#C73E1D] text-white rounded-full px-4 py-1 text-sm font-medium hover:bg-[#8B2323] transition-colors"
                >
                  Route <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-400 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="mailto:idalighting.vn@gmail.com" className="text-gray-600 hover:text-gray-800">
              idalighting.vn@gmail.com
            </Link>
          </div>

          <div className="flex space-x-4">
            <a 
              href="https://www.facebook.com/idalighting" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Facebook"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className="text-white"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            
            <a 
              href="https://zaloapp.com/qr/p/o4teuv9ez56m" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Zalo"
            >
              <img 
                src="/zalo-svgrepo-com.svg" 
                alt="Zalo" 
                className="w-5 h-5 invert" 
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </a>
            
            <a 
              href="https://instagram.com/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Instagram"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className="text-white"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>

          <div>
            <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-800">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

