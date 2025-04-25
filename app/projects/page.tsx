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
    slug: "koi-gardens",
  },
  {
    id: 12,
    title: "Nhà riêng",
    location: "Vietnam",
    category: "Residential",
    application: ["Interior", "Wellness", "Landscape"],
    image: "/work/vn2/z4279796446188_4aaf42a5ea2830e48d8572d24725dcac.jpg",
    slug: "luxury-apartments",
  },
  {
    id: 13,
    title: "Nhà riêng",
    location: "Vietnam",
    category: "Historical buildings & cultural destinations",
    application: ["Facades", "Landscape", "Museums and exhibitions"],
    image: "/work/vn3/2022_09_26_19_38_IMG_8530.JPG",
    slug: "luxury-villas",
  },
  {
    id: 14,
    title: "Bamboo cafe",
    location: "Vietnam",
    category: "Corporate",
    application: ["Facades", "Interior", "Public spaces"],
    image: "/work/vn4/2020_12_26_19_53_IMG_0314.JPG",
    slug: "retail",
  },
  {
    id: 15,
    title: "Out door field",
    location: "Vietnam",
    category: "Entertainment",
    application: ["Facades", "Landscape", "Paths and steps"],
    image: "/work/vn5/2022_04_28_19_36_IMG_3661.JPG",
    slug: "outdoor",
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
  {
    id: 17,
    title: "Long House",
    location: "Vietnam",
    category: "Residential",
    application: ["Facades", "Interior", "Landscape"],
    image: "/work/long-house/_TRC7471.jpg",
    slug: "long-house",
  },
  {
    id: 18,
    title: "Villa 44 Hà Nội",
    location: "Hanoi, Vietnam",
    category: "Residential",
    application: ["Facades", "Interior", "Landscape", "Smart Home"],
    image: "/work/villa-44/TRC_9185.jpg",
    slug: "villa-44",
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

        {/* Projects grid - removed filters sidebar */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
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

      <Footer />
    </main>
  )
}
