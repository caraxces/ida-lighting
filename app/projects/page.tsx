"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import CollectionBanner from "@/components/collection-banner"

// Project data
const projects = [
  {
    id: 1,
    title: "STARLAKE RESIDENTIAL COMPLEX",
    location: "Hanoi, Vietnam",
    category: "Residential",
    application: ["Facades", "Interior", "Landscape"],
    image: "/work/IDA_Starlake/TRC_7559.jpg",
    slug: "starlake",
  },
  {
    id: 2,
    title: "KOI CAFE",
    location: "Vietnam",
    category: "Hospitality",
    application: ["Interior", "Entertainment"],
    image: "/work/koi cafe/2020_11_21_17_37_IMG_0145-min.JPG",
    slug: "koicafe",
  },
  {
    id: 3,
    title: "AN HOUSE CAFE",
    location: "Vietnam",
    category: "Hospitality",
    application: ["Interior", "Entertainment", "Facades"],
    image: "/work/An-Cafe/273036452_476970200609189_519737183736654516_n.jpg",
    slug: "an-house",
  },
  {
    id: 4,
    title: "IDA LIGHTING SHOWROOM",
    location: "Ha Tinh, Vietnam",
    category: "Retail",
    application: ["Interior", "Lighting Design", "Showroom"],
    image: "/work/ida-showroom/TRC_9628.jpg",
    slug: "ida-showroom",
  },
  {
    id: 11,
    title: "NHÀ RIÊNG",
    location: "Vietnam",
    category: "Hospitality",
    application: ["Facades", "Interior", "Landscape", "Fountains and swimming pools"],
    image: "/work/vn1/2022_10_21_14_54_IMG_9377.JPG",
    slug: "koi-gardens",
  },
  {
    id: 12,
    title: "NHÀ RIÊNG",
    location: "Vietnam",
    category: "Residential",
    application: ["Interior", "Wellness", "Landscape"],
    image: "/work/vn2/z4279796446188_4aaf42a5ea2830e48d8572d24725dcac.jpg",
    slug: "luxury-apartments",
  },
  {
    id: 13,
    title: "NHÀ RIÊNG",
    location: "Vietnam",
    category: "Historical buildings & cultural destinations",
    application: ["Facades", "Landscape", "Museums and exhibitions"],
    image: "/work/vn3/2022_09_26_19_34_IMG_8523.JPG",
    slug: "luxury-villas",
  },
  {
    id: 14,
    title: "BAMBOO CAFE",
    location: "Vietnam",
    category: "Corporate",
    application: ["Facades", "Interior", "Public spaces"],
    image: "/work/vn4/2020_12_26_19_53_IMG_0314.JPG",
    slug: "retail",
  },
  {
    id: 15,
    title: "MOCHI CAFE",
    location: "Vietnam",
    category: "Entertainment",
    application: ["Facades", "Landscape", "Paths and steps"],
    image: "/work/vn5/2022_04_25_20_35_IMG_3552.JPG",
    slug: "mochi-cafe",
  },
  {
    id: 16,
    title: "NHÀ RIÊNG",
    location: "Vietnam",
    category: "Retail",
    application: ["Facades", "Interior", "Public spaces"],
    image: "/work/vn6/DSC09659_HDR 1.jpg",
    slug: "villa",
  },
  {
    id: 17,
    title: "LONG HOUSE",
    location: "Ha Tinh, Vietnam",
    category: "Residential",
    application: ["Facades", "Interior", "Landscape"],
    image: "/work/long-house/_TRC7471-min.jpg",
    slug: "long-house",
  },
  {
    id: 18,
    title: "VILLA 44 HÀ NỘI",
    location: "Hanoi, Vietnam",
    category: "Residential",
    application: ["Facades", "Interior", "Landscape", "Smart Home"],
    image: "/work/villa-44/TRC_9197-min.jpg",
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

// Lazy load components
const LazyFooter = dynamic(() => import("@/components/footer"), {
  loading: () => <div className="py-10 bg-black"></div>,
  ssr: false
})

export default function WorkPage() {
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedApplications, setSelectedApplications] = useState<string[]>([])

  // Apply filters when selections change - Tối ưu với useCallback
  const applyFilters = useCallback(() => {
    let result = [...projects]

    if (selectedCategories.length > 0) {
      result = result.filter((project) => selectedCategories.includes(project.category))
    }

    if (selectedApplications.length > 0) {
      result = result.filter((project) => project.application.some((app) => selectedApplications.includes(app)))
    }

    setFilteredProjects(result)
  }, [selectedCategories, selectedApplications])

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

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

  // Tối ưu item render bằng cách tạo thành component riêng
  const ProjectItem = ({ project, index }: { project: typeof projects[0], index: number }) => (
    <motion.div
      key={project.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/projects/${project.slug}`} className="block group">
        <div className="relative aspect-[4/3] overflow-hidden mb-4 rounded-md">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
  )

  return (
    <main className="min-h-screen bg-gradient-to-r from-black via-black to-[#8B2323] text-white">
      <Header />

      <CollectionBanner
        title="DỰ ÁN"
        description="Các dự án được thực hiện bởi IDA Lighting"
        image="/work/IDA_Starlake/TRC_7728.jpg"
        height="45vh"
      />

      <div className="pt-32 pb-16 px-4 md:px-8 max-w-[1400px] mx-auto">
        {/* Page title */}
        {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16">DỰ ÁN</h1> */}

        {/* Projects grid */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectItem key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* Show message when no projects match filters */}
          {filteredProjects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-black/20 p-10 rounded-md text-center my-10"
            >
              <p className="text-xl text-gray-300 mb-4">Không tìm thấy dự án phù hợp với bộ lọc</p>
              <button 
                onClick={resetFilters}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
              >
                Xóa bộ lọc
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <LazyFooter />
    </main>
  )
}
