"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { motion } from "framer-motion"

// Project data
const projects = [
  {
    id: 1,
    title: "Starlake Residential Complex",
    location: "Vietnam",
    category: "Residential",
    application: ["Facades", "Interior", "Landscape"],
    image: "/work/IDA_Starlake-20250415T093235Z-001/IDA_Starlake/TRC_7700.jpg",
    slug: "starlake",
  },
  {
    id: 2,
    title: "Koi Cafe",
    location: "Vietnam",
    category: "Hospitality",
    application: ["Interior", "Entertainment"],
    image: "/work/koi cafe/2020_11_21_14_18_IMG_0138.JPG",
    slug: "koicafe",
  },

  {
    id: 11,
    title: "Nhà riêng",
    location: "Vietnam",
    category: "Hospitality",
    application: ["Facades", "Interior", "Landscape", "Fountains and swimming pools"],
    image: "/work/vn1/2022_10_21_14_54_IMG_9377.JPG",
    slug: "hoiana-resort-casino",
  },
  {
    id: 12,
    title: "Nhà riêng",
    location: "Vietnam",
    category: "Residential",
    application: ["Interior", "Wellness", "Landscape"],
    image: "/work/vn2/z4279796446188_4aaf42a5ea2830e48d8572d24725dcac.jpg",
    slug: "the-marq-apartments",
  },
  {
    id: 13,
    title: "Nhà riêng",
    location: "Vietnam",
    category: "Historical buildings & cultural destinations",
    application: ["Facades", "Landscape", "Museums and exhibitions"],
    image: "/work/vn3/2022_09_26_19_38_IMG_8530.JPG",
    slug: "saigon-opera-house",
  },
  {
    id: 14,
    title: "Bamboo cafe",
    location: "Vietnam",
    category: "Corporate",
    application: ["Facades", "Interior", "Public spaces"],
    image: "/work/vn4/2020_12_26_19_53_IMG_0314.JPG",
    slug: "landmark-81-tower",
  },
  {
    id: 15,
    title: "Out door field",
    location: "Vietnam",
    category: "Entertainment",
    application: ["Facades", "Landscape", "Paths and steps"],
    image: "/work/vn5/2022_04_28_19_36_IMG_3661.JPG",
    slug: "sun-world-bana-hills",
  },
  {
    id: 16,
    title: "Nhà riêng",
    location: "Vietnam",
    category: "Retail",
    application: ["Facades", "Interior", "Public spaces"],
    image: "/work/vn6/DSC09659_HDR 1.jpg",
    slug: "vincom-center-retail",
  },
]

// Categories for filtering
const categories = [
  "Historical buildings & cultural destinations",
  "Retail",
  "Entertainment",
  "Hospitality",
  "Residential",
  "Corporate",
  "Public spaces",
]

// Applications for filtering
const applications = [
  "Paths and steps",
  "Facades",
  "Landscape",
  "Fountains and swimming pools",
  "Wellness",
  "Churches",
  "Museums and exhibitions",
]

export default function WorkPage() {
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedApplications, setSelectedApplications] = useState<string[]>([])

  // Apply filters when selections change
  useEffect(() => {
    let result = [...projects]

    if (selectedCategories.length > 0) {
      result = result.filter((project) => selectedCategories.includes(project.category))
    }

    if (selectedApplications.length > 0) {
      result = result.filter((project) => project.application.some((app) => selectedApplications.includes(app)))
    }

    setFilteredProjects(result)
  }, [selectedCategories, selectedApplications])

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Toggle application selection
  const toggleApplication = (application: string) => {
    setSelectedApplications((prev) =>
      prev.includes(application) ? prev.filter((a) => a !== application) : [...prev, application],
    )
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([])
    setSelectedApplications([])
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-black via-black to-[#8B2323] text-white">
      <Header />

      <div className="pt-32 pb-16 px-4 md:px-8 max-w-[1400px] mx-auto">
        {/* Page title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16">Projects</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with filters */}
          <aside className="w-full md:w-[360px] shrink-0 bg-black/30 text-white p-6 rounded-sm">
            {/* Categories */}
            <div className="mb-8">
              <h2 className="uppercase text-sm font-bold mb-4">CATEGORY</h2>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category} className="flex items-center gap-2">
                    <button
                      className="w-4 h-4 rounded-full border border-white flex items-center justify-center"
                      onClick={() => toggleCategory(category)}
                    >
                      {selectedCategories.includes(category) && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </button>
                    <span className="text-sm">{category}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications */}
            <div className="mb-8">
              <h2 className="uppercase text-sm font-bold mb-4">APPLICATION</h2>
              <ul className="space-y-2">
                {applications.map((application) => (
                  <li key={application} className="flex items-center gap-2">
                    <button
                      className="w-4 h-4 rounded-full border border-white flex items-center justify-center"
                      onClick={() => toggleApplication(application)}
                    >
                      {selectedApplications.includes(application) && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </button>
                    <span className="text-sm">{application}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reset button */}
            <button
              onClick={resetFilters}
              className="w-full border border-white py-2 px-4 flex items-center justify-center gap-2 hover:bg-white hover:text-[#8B2323] transition-colors"
            >
              <span className="rotate-45">↻</span>
              <span>RESET</span>
            </button>
          </aside>

          {/* Projects grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link href={`/projects/${project.slug}`} className="block group">
                    <div className="relative aspect-[4/3] overflow-hidden mb-4 rounded-md">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="uppercase text-xs text-gray-300 font-medium">{project.category}</div>
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <p className="text-sm text-gray-300">{project.location}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
