"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import HeroSection from "@/components/hero-section"
import ProjectSlider from "@/components/project-slider"
import ServicesSection from "@/components/services-section"
import { useMobile } from "@/hooks/use-mobile"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function SmoothScrollSections() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    // Wait for DOM to be fully loaded
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return

    // Clear any existing ScrollTriggers to prevent duplicates
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

    const sections = gsap.utils.toArray<HTMLElement>(".scroll-section")

    // Skip horizontal scrolling on mobile
    if (isMobile) {
      // Create pin for each section to ensure full viewing before moving on
      sections.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          id: `section-${i}`,
        })
      })

      return
    }

    // Create a timeline for horizontal scrolling
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${containerRef.current!.offsetWidth}`,
        invalidateOnRefresh: true,
      },
    })

    // Animate horizontal scrolling
    tl.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      duration: sections.length - 1,
    })

    // Create individual scroll triggers for each section
    sections.forEach((section, i) => {
      // Skip the first section as it's already visible
      if (i === 0) return

      const sectionTrigger = ScrollTrigger.create({
        trigger: section,
        containerAnimation: tl,
        start: "left center",
        end: "right center",
        id: `section-${i}`,
        toggleClass: { targets: section, className: "active" },
      })

      return () => {
        sectionTrigger.kill()
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [isLoaded, isMobile])

  return (
    <div
      ref={containerRef}
      className="smooth-scroll-container overflow-hidden"
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        className="sections-wrapper flex flex-nowrap"
        style={{
          width: isMobile ? "100%" : `${100 * 3}%`, // 3 sections
          height: "100vh",
        }}
      >
        <section className="scroll-section w-full h-full flex-shrink-0">
          <HeroSection />
        </section>

        <section className="scroll-section w-full h-full flex-shrink-0">
          <ProjectSlider />
        </section>

        <section className="scroll-section w-full h-full flex-shrink-0">
          <ServicesSection />
        </section>
      </div>
    </div>
  )
}

