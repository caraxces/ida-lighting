"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Volume2, VolumeX, Box, BookOpen } from "lucide-react"
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
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
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
    // When opening menu, prevent body scrolling
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    if (isSoundEnabled) {
      playSound()
    }
  }

  // Cleanup body overflow when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    document.body.style.overflow = ''
  }, [pathname])

  // Thêm menu item mới cho blog
  const menuItems = [
    { title: "Home", href: "/" },
    { title: "About us", href: "/about" },
    { title: "Projects", href: "/projects" },
    {
      title: "Products",
      href: "/products",
      submenu: [
        { title: "Đèn Downlight", href: "/products#downlight" },
        { title: "Đèn Trang Trí", href: "/products#decorative" },
        { title: "Đèn Outdoor", href: "/products#outdoor" },
      ],
    },
    { title: "Contacts", href: "/contacts" },
  ]

  return (
    <header
      className={cn(
        "w-full py-4 md:py-6 px-4 md:px-8 fixed top-0 z-[99999] transition-all duration-500",
        scrolled ? "bg-black/60 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      {/* Desktop Navigation */}
      <div className="container mx-auto hidden lg:flex items-center justify-between">
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
                href="/products"
                className={cn(
                  "px-3 py-2 font-medium transition-all duration-300 relative group/products",
                  pathname === "/products"
                    ? "text-white [text-shadow:0_0_15px_rgba(255,255,255,0.7)]"
                    : "text-gray-400 hover:text-white hover:[text-shadow:0_0_15px_rgba(255,255,255,0.7)]",
                )}
                onClick={(e) => handleNavClick(e)}
                onMouseEnter={onButtonHover}
              >
                Products
                <div className="absolute left-0 top-full mt-2 w-56 bg-black/90 rounded-xl shadow-lg opacity-0 group-hover/products:opacity-100 group-hover/products:pointer-events-auto pointer-events-none transition-all duration-300 hover:opacity-100 hover:pointer-events-auto">
                  <ul className="py-2">
                    <li>
                      <Link href="/products#downlight" className="block px-6 py-3 text-white hover:bg-red-600/80 transition-colors duration-200" onClick={e => handleNavClick(e)}>
                        Đèn Downlight
                      </Link>
                    </li>
                    <li>
                      <Link href="/products#decorative" className="block px-6 py-3 text-white hover:bg-red-600/80 transition-colors duration-200" onClick={e => handleNavClick(e)}>
                        Đèn Trang Trí
                      </Link>
                    </li>
                    <li>
                      <Link href="/products#outdoor" className="block px-6 py-3 text-white hover:bg-red-600/80 transition-colors duration-200" onClick={e => handleNavClick(e)}>
                        Đèn Outdoor
                      </Link>
                    </li>
                  </ul>
                </div>
              </Link>
              <Link
                href="/projects"
                className={cn(
                  "px-3 py-2 font-medium transition-all duration-300 relative",
                  pathname === "/projects"
                    ? "text-white [text-shadow:0_0_15px_rgba(255,255,255,0.7)]"
                    : "text-gray-400 hover:text-white hover:[text-shadow:0_0_15px_rgba(255,255,255,0.7)]",
                )}
                onClick={(e) => handleNavClick(e)}
                onMouseEnter={onButtonHover}
              >
                Projects
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

      {/* Mobile Navigation - Updated layout with 3D model button */}
      <div className="flex lg:hidden items-center justify-between">
        {/* Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="px-5 py-2 bg-white text-black rounded-full font-medium hover:bg-opacity-90 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.7)]"
          aria-label="Open menu"
        >
          Menu
        </button>

        {/* Center Logo */}
        <div className="flex-1 flex justify-center">
          <img
            src="/Ida B-W2.png"
            alt="IDA Lighting Logo"
            className="h-12 w-auto transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] cursor-pointer"
          />
        </div>
        
        {/* Mobile buttons container */}
        <div className="flex space-x-1">
          {/* Sound Button */}
          <button
            onClick={handleSoundToggle}
            className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 text-white"
            aria-label={soundOn ? "Mute sound" : "Enable sound"}
          >
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          
          {/* Catalogue button */}
          <a
            href="/IDA LIGHTING 02 03 2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 text-white"
            onClick={() => playSound()}
            aria-label="Download catalogue"
          >
            <BookOpen size={18} />
          </a>
          
          {/* 3D model button */}
          <a
            href="https://1miba.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 text-white"
            onClick={() => playSound()}
            aria-label="View 3D model"
          >
            <Box size={18} />
          </a>
        </div>
      </div>

      {/* Mobile Menu - Consistent overlay for all pages */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-[99999] lg:hidden"
          style={{ height: '100vh', overflowY: 'auto' }}
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-between p-4 animate-slide-down sticky top-0 bg-black/80 backdrop-blur-xl z-10">
              <button
                onClick={toggleMobileMenu}
                className="px-5 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300 hover:translate-y-[-2px]"
              >
                Close
              </button>

              <div className="flex-1 flex justify-center">
                <img
                  src="/Ida B-W2.png"
                  alt="IDA Lighting Logo"
                  className="h-12 w-auto transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] cursor-pointer"
                />
              </div>
              
              {/* Catalogue Button */}
              <a
                href="/IDA LIGHTING 02 03 2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] text-white text-sm"
                onClick={(e) => handleNavClick(e)}
              >
                Catalogue
              </a>
            </div>

            <div className="flex-1 flex flex-col mt-4 px-4 space-y-4">
              {menuItems.map((item, index) => (
                item.title === "Products" ? (
                  <div key={item.href} className="relative">
                    <button
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className="w-full py-6 px-8 text-left text-xl font-medium bg-white/10 backdrop-blur-xl text-white rounded-full transform transition-all duration-300 hover:scale-[1.02] hover:translate-y-[-4px] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-white/20 animate-slide-down group relative overflow-hidden"
                      style={{ animationDelay: `${100 + index * 50}ms` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                      {item.title}
                    </button>
                    <div className={`mt-2 space-y-2 overflow-hidden transition-all duration-300 ${mobileProductsOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      {item.submenu?.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block py-4 px-8 ml-4 text-left text-lg font-medium bg-white/5 backdrop-blur-xl text-white rounded-full transform transition-all duration-300 hover:scale-[1.02] hover:translate-y-[-2px] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-white/10"
                          onClick={(e) => {
                            handleNavClick(e)
                            setMobileProductsOpen(false)
                          }}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-6 px-8 text-left text-xl font-medium bg-white/10 backdrop-blur-xl text-white rounded-full transform transition-all duration-300 hover:scale-[1.02] hover:translate-y-[-4px] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-white/20 animate-slide-down group relative overflow-hidden"
                    style={{ animationDelay: `${100 + index * 50}ms` }}
                    onClick={(e) => handleNavClick(e)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                    {item.title}
                  </Link>
                )
              ))}
            
              {/* Sound and 3D model buttons without container */}
              <div className="flex justify-between items-center px-8 animate-slide-down" style={{ animationDelay: "500ms" }}>
                <button
                  onClick={handleSoundToggle}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                  aria-label={soundOn ? "Mute sound" : "Enable sound"}
                >
                  {soundOn ? <Volume2 size={20} className="text-white" /> : <VolumeX size={20} className="text-white" />}
                </button>

                <a
                  href="https://1miba.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] flex items-center space-x-2"
                  onClick={() => playSound()}
                >
                  <Box size={20} className="text-white" />
                  <span className="text-white">3D model</span>
                </a>
              </div>
            </div>

            <div className="p-8 mt-4 flex justify-center">
              <div
                className="bg-white/10 backdrop-blur-xl rounded-[30px] p-8 max-w-md w-full transform transition-all duration-300 hover:scale-[1.02] hover:translate-y-[-4px] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-white/20 animate-slide-down group relative overflow-hidden"
                style={{ animationDelay: "600ms" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                <div className="relative z-10">
                  <h3 className="font-medium mb-4 text-white text-center">Hà Tĩnh</h3>
                  <p className="text-gray-400 mb-1 text-center">153 Hà Huy Tập</p>
                  <p className="text-gray-400 mb-1 text-center">Thành phố Hà Tĩnh, Việt Nam</p>
                  <p className="text-gray-400 mb-8 text-center">+84 0924.222.888</p>
                </div>

                <div className="mt-8 relative z-10">
                  <h3 className="font-medium mb-4 text-white text-center">Hà Nội</h3>
                  <p className="text-gray-400 mb-1 text-center">Trung tâm Hội nghị Quốc Gia</p>
                  <p className="text-gray-400 mb-1 text-center">Số 1 Đại lộ Thăng Long, Nam Từ Liêm</p>
                  <p className="text-gray-400 text-center">+84 0924.222.888</p>
                </div>
              </div>
            </div>

            {/* Extra padding space at the bottom for better scrolling */}
            <div className="h-[40px] md:hidden"></div>
          </div>
        </div>
      )}
    </header>
  )
}
