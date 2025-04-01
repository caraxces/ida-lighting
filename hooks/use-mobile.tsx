"use client"

import { useState, useEffect } from "react"

// Default breakpoints
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
  largeDesktop: 1536,
}

type BreakpointKey = keyof typeof BREAKPOINTS
type BreakpointValue = typeof BREAKPOINTS[BreakpointKey]

interface UseResponsiveOptions {
  defaultValue?: boolean
  breakpoint?: BreakpointValue
}

/**
 * Hook to detect if device is mobile based on screen width
 * @param options Configuration options
 * @returns Boolean indicating if screen width is below specified breakpoint
 */
export function useMobile(options?: UseResponsiveOptions) {
  const { breakpoint = BREAKPOINTS.mobile, defaultValue = false } = options || {}
  const [isMobile, setIsMobile] = useState(defaultValue)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Initial check
    checkIfMobile()
    setIsInitialized(true)

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [breakpoint])

  return { isMobile, isInitialized }
}

/**
 * Hook to get the current device type based on screen width
 * @returns The current device type (mobile, tablet, desktop, largeDesktop)
 */
export function useDeviceType() {
  const [deviceType, setDeviceType] = useState<BreakpointKey | null>(null)

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth
      
      if (width < BREAKPOINTS.mobile) {
        setDeviceType("mobile")
      } else if (width < BREAKPOINTS.tablet) {
        setDeviceType("tablet")
      } else if (width < BREAKPOINTS.desktop) {
        setDeviceType("desktop")
      } else {
        setDeviceType("largeDesktop")
      }
    }

    // Initial check
    checkDeviceType()

    // Add event listener
    window.addEventListener("resize", checkDeviceType)

    // Cleanup
    return () => window.removeEventListener("resize", checkDeviceType)
  }, [])

  return deviceType
}

/**
 * Hook to check if screen matches a media query
 * @param query Media query string
 * @returns Boolean indicating if screen matches the query
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => {
      setMatches(mql.matches)
    }

    // Set initial value
    setMatches(mql.matches)
    setIsInitialized(true)

    // Modern way to add listener
    mql.addEventListener("change", onChange)
    
    // Cleanup
    return () => mql.removeEventListener("change", onChange)
  }, [query])

  return { matches, isInitialized }
}

