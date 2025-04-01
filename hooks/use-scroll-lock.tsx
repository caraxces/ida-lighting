"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState, useRef } from "react"

type ScrollLockContextType = {
  lockScroll: (sectionId: string) => void
  unlockScroll: (sectionId: string) => void
  isScrollLocked: boolean
  currentSection: string | null
}

const ScrollLockContext = createContext<ScrollLockContextType>({
  lockScroll: () => {},
  unlockScroll: () => {},
  isScrollLocked: false,
  currentSection: null,
})

export function ScrollLockProvider({ children }: { children: React.ReactNode }) {
  const [isScrollLocked, setIsScrollLocked] = useState(false)
  const [currentSection, setCurrentSection] = useState<string | null>(null)
  const lastScrollY = useRef(0)

  const lockScroll = (sectionId: string) => {
    if (!isScrollLocked) {
      lastScrollY.current = window.scrollY
      setIsScrollLocked(true)
      setCurrentSection(sectionId)
    }
  }

  const unlockScroll = (sectionId: string) => {
    if (isScrollLocked && currentSection === sectionId) {
      setIsScrollLocked(false)
      setCurrentSection(null)
    }
  }

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (isScrollLocked) {
        // If we're in a section that needs to handle its own scrolling,
        // let that section handle the scroll event
        if (
          e.target &&
          (e.target as HTMLElement).closest(`[data-viewed-all-slides="false"], [data-viewed-all-services="false"]`)
        ) {
          return
        }

        // Otherwise, prevent default scrolling
        e.preventDefault()
      }
    }

    // Add wheel event listener to prevent scrolling when locked
    window.addEventListener("wheel", handleScroll, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleScroll)
    }
  }, [isScrollLocked])

  return (
    <ScrollLockContext.Provider value={{ lockScroll, unlockScroll, isScrollLocked, currentSection }}>
      {children}
    </ScrollLockContext.Provider>
  )
}

export function useScrollLock() {
  return useContext(ScrollLockContext)
}

