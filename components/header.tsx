"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSound } from "@/hooks/use-sound"
import { useRouter } from "next/navigation"
import HeaderButtons from "@/components/header-buttons"

interface HeaderProps {
  onButtonClick?: () => void
  onButtonHover?: () => void
}

export default function Header({ onButtonClick, onButtonHover }: HeaderProps) {
  const [soundOn, setSoundOn] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { playSound, toggleSound, isSoundEnabled } = useSound()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  useEffect(() => {
    // Sync sound state with the global sound state
    setSoundOn(isSoundEnabled)
  }, [isSoundEnabled])

  const handleSoundToggle = () => {
    toggleSound()
    setSoundOn(!soundOn)
    playSound()
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, section?: string) => {
    if (isSoundEnabled) {
      playSound()
    }
    setMobileMenuOpen(false)

    // If we're on the homepage and a section is specified, scroll to it
    if (pathname === "/" && section) {
      e.preventDefault()
      const sectionElement = document.getElementById(section)
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    if (isSoundEnabled) {
      playSound()
    }
  }

  // Thêm menu item mới cho blog
  const menuItems = [
    { title: "Trang Chủ", href: "/" },
    { title: "Về Chúng Tôi", href: "/about" },
    { title: "Tác Phẩm", href: "/work" },
    { title: "Blog", href: "/blog" },
    { title: "Liên Hệ", href: "/contacts" },
  ]

  return (
    <header
      className={cn(
        "w-full py-4 md:py-6 px-4 md:px-8 fixed top-0 z-50 transition-all duration-500",
        scrolled ? "bg-black/60 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      {/* Desktop Navigation */}
      <div className="container mx-auto hidden md:flex items-center justify-between">
        {/* Left Navigation - Split into two groups */}
        <div className="flex items-center space-x-3">
          {/* Group 1: Home button */}
          <Link
            href="/"
            className={cn(
              "px-5 py-2 rounded-full font-medium transition-all duration-300",
              pathname === "/"
                ? "bg-white text-black"
                : "text-gray-400 hover:text-white hover:text-shadow-[0_0_15px_rgba(255,255,255,0.7)] bg-white/10 backdrop-blur-sm",
            )}
            onClick={(e) => handleNavClick(e)}
            onMouseEnter={onButtonHover}
          >
            Home
          </Link>

          {/* Group 2: Work, About, Contacts */}
          <div className="relative group bg-white/10 backdrop-blur-sm rounded-full">
            <div className="flex items-center px-2">
              <Link
                href="/work"
                className={cn(
                  "px-3 py-2 font-medium transition-all duration-300 relative",
                  pathname === "/work"
                    ? "text-white [text-shadow:0_0_15px_rgba(255,255,255,0.7)]"
                    : "text-gray-400 hover:text-white hover:[text-shadow:0_0_15px_rgba(255,255,255,0.7)]",
                )}
                onClick={(e) => handleNavClick(e)}
                onMouseEnter={onButtonHover}
              >
                Work
              </Link>
              <Link
                href="/about"
                className={cn(
                  "px-3 py-2 font-medium transition-all duration-300 relative",
                  pathname === "/about"
                    ? "text-white [text-shadow:0_0_15px_rgba(255,255,255,0.7)]"
                    : "text-gray-400 hover:text-white hover:[text-shadow:0_0_15px_rgba(255,255,255,0.7)]",
                )}
                onClick={(e) => handleNavClick(e)}
                onMouseEnter={onButtonHover}
              >
                About
              </Link>
              <Link
                href="/contacts"
                className={cn(
                  "px-3 py-2 font-medium transition-all duration-300 relative",
                  pathname === "/contacts"
                    ? "text-white [text-shadow:0_0_15px_rgba(255,255,255,0.7)]"
                    : "text-gray-400 hover:text-white hover:[text-shadow:0_0_15px_rgba(255,255,255,0.7)]",
                )}
                onClick={(e) => handleNavClick(e)}
                onMouseEnter={onButtonHover}
              >
                Contacts
              </Link>
            </div>
          </div>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            src="/Ida B-W2.png"
            alt="IDA Lighting Logo"
            className="h-12 w-auto transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] cursor-pointer"
          />
        </div>

        {/* Right Buttons - Using the new HeaderButtons component */}
        <HeaderButtons soundOn={soundOn} onSoundToggle={handleSoundToggle} playSound={playSound} />
      </div>

      {/* Mobile Navigation - New 3-button layout */}
      <div className="flex md:hidden items-center justify-between">
        {/* Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="px-5 py-2 bg-white text-black rounded-full font-medium hover:bg-opacity-90 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.7)]"
          aria-label="Open menu"
        >
          Menu
        </button>

        {/* Center Logo */}
        <img
          src="/Ida B-W2.png"
          alt="IDA Lighting Logo"
          className="h-12 w-auto transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] cursor-pointer"
        />

        {/* Contact Button - Using the same style as desktop buttons */}
        <button
          onClick={() => router.push("/contacts")}
          className="flex items-center px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] text-white"
        >
          Liên hệ
        </button>

        {/* Mobile Menu - Updated with rounded corners and two-column layout */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
            <div className="flex items-center justify-between p-4 animate-slide-down">
              <button
                onClick={toggleMobileMenu}
                className="px-5 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300 hover:translate-y-[-2px]"
              >
                Close
              </button>

              <img
                src="/Ida B-W2.png"
                alt="IDA Lighting Logo"
                className="h-12 w-auto transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] cursor-pointer"
              />

              <button
                onClick={() => router.push("/contacts")}
                className="flex items-center px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] text-white"
              >
                Liên hệ
              </button>
            </div>

            <div className="flex flex-col mt-4 px-4 space-y-4">
              <Link
                href="/"
                className="py-6 px-8 text-left text-xl font-medium bg-white/10 backdrop-blur-xl text-white rounded-full transform transition-all duration-300 hover:scale-[1.02] hover:translate-y-[-4px] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-white/20 animate-slide-down group relative overflow-hidden"
                style={{ animationDelay: "100ms" }}
                onClick={(e) => handleNavClick(e)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                Home
              </Link>

              <Link
                href="/work"
                className="py-6 px-8 text-left text-xl font-medium bg-white/10 backdrop-blur-xl text-white rounded-full transform transition-all duration-300 hover:scale-[1.02] hover:translate-y-[-4px] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-white/20 animate-slide-down group relative overflow-hidden"
                style={{ animationDelay: "200ms" }}
                onClick={(e) => handleNavClick(e)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                Works
              </Link>

              <Link
                href="/about"
                className="py-6 px-8 text-left text-xl font-medium bg-white/10 backdrop-blur-xl text-white rounded-full transform transition-all duration-300 hover:scale-[1.02] hover:translate-y-[-4px] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-white/20 animate-slide-down group relative overflow-hidden"
                style={{ animationDelay: "300ms" }}
                onClick={(e) => handleNavClick(e)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                About
              </Link>

              <Link
                href="/contacts"
                className="py-6 px-8 text-left text-xl font-medium bg-white/10 backdrop-blur-xl text-white rounded-full transform transition-all duration-300 hover:scale-[1.02] hover:translate-y-[-4px] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-white/20 animate-slide-down group relative overflow-hidden"
                style={{ animationDelay: "400ms" }}
                onClick={(e) => handleNavClick(e)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                Contact
              </Link>
            </div>

            <div className="p-8 mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                className="bg-white/10 backdrop-blur-xl rounded-[30px] p-8 transform transition-all duration-300 hover:scale-[1.02] hover:translate-y-[-4px] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-white/20 animate-slide-down group relative overflow-hidden"
                style={{ animationDelay: "500ms" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                <h3 className="font-medium mb-4 text-white relative z-10">Social media</h3>
                <ul className="space-y-4 relative z-10">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] inline-block"
                    >
                      Vimeo
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] inline-block"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] inline-block"
                    >
                      X Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] inline-block"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] inline-block"
                    >
                      Behance
                    </a>
                  </li>
                </ul>
              </div>

              <div
                className="bg-white/10 backdrop-blur-xl rounded-[30px] p-8 transform transition-all duration-300 hover:scale-[1.02] hover:translate-y-[-4px] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-white/20 animate-slide-down group relative overflow-hidden"
                style={{ animationDelay: "600ms" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                <div className="relative z-10">
                  <h3 className="font-medium mb-4 text-white">Hà Tĩnh</h3>
                  <p className="text-gray-400 mb-1">153 Hà Huy Tập</p>
                  <p className="text-gray-400 mb-1">Thành phố Hà Tĩnh, Việt Nam</p>
                  <p className="text-gray-400 mb-4">+84 0924.222.888</p>
                </div>

                <div className="mt-8 relative z-10">
                  <h3 className="font-medium mb-4 text-white">Hà Nội</h3>
                  <p className="text-gray-400 mb-1">Tầng 3, Tòa nhà Vantage</p>
                  <p className="text-gray-400 mb-1">Hoàn Kiếm, Hà Nội, Việt Nam</p>
                  <p className="text-gray-400">+84 0924.222.888</p>
                </div>
              </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-xl p-4 flex justify-between items-center animate-slide-up">
              <button
                onClick={handleSoundToggle}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                aria-label={soundOn ? "Mute sound" : "Enable sound"}
              >
                {soundOn ? <Volume2 size={20} className="text-white" /> : <VolumeX size={20} className="text-white" />}
              </button>

              <a
                href="/IDA LIGHTING 02 03 2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-200 transition-colors duration-300"
                onClick={() => playSound()}
              >
                Download catalogue
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
