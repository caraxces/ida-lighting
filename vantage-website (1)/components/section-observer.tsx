"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { useScrollLock } from "@/hooks/use-scroll-lock"

interface SectionObserverProps {
  sectionId: string
  children: React.ReactNode
  hasViewedAll: boolean
}

export default function SectionObserver({ sectionId, children, hasViewedAll }: SectionObserverProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { lockScroll, unlockScroll } = useScrollLock()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasViewedAll) {
            // Lock scroll when section enters viewport and hasn't been fully viewed
            lockScroll(sectionId)
          } else if (!entry.isIntersecting || hasViewedAll) {
            // Unlock scroll when section leaves viewport or has been fully viewed
            unlockScroll(sectionId)
          }
        })
      },
      { threshold: 0.5 }, // Trigger when 50% of the section is visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [sectionId, hasViewedAll, lockScroll, unlockScroll])

  return (
    <div ref={sectionRef} className="section-container">
      {children}
    </div>
  )
}

