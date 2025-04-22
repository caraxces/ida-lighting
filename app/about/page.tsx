"use client"

import Header from "@/components/header"
// import AboutHero from "@/components/about-hero"
import AboutBody from "@/components/about-body"
import Footer from "@/components/footer"
import LightingShowcase from "@/components/lighting-showcase"

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full relative bg-black text-white">
      <div className="sticky top-0 left-0 w-full z-50">
        <Header />
      </div>
      
      <main className="w-full">
        {/* Hero Section
        <section className="min-h-screen w-full">
          <AboutHero />
        </section> */}
        
        {/* Body Section */}
        <section className="w-full">
          <AboutBody />
        </section>
        
        {/* Lighting Showcase Section */}
        <section className="min-h-screen w-full">
          <LightingShowcase />
        </section>
        
        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
}

