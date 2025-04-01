import Header from "@/components/header"
import ProjectBanner from "@/components/project-banner"
import ProjectGrid from "@/components/project-grid"
import Footer from "@/components/footer"
import { notFound } from "next/navigation"

// Define project data with content from idalighting.vn
const projects = {
  residential: {
    title: "Residential Lighting",
    description: "Elegant lighting solutions that enhance the comfort and aesthetics of homes",
    banner: "/work/residential/13387622937775503.mp4",
    items: [
      { id: 1, title: "Modern Villa Lighting", image: "/work/residential/Modern-Villa-Lighting.jpeg" },
      { id: 2, title: "Apartment Lighting Systems", image: "/work/residential/Apartment-Lighting-Systems.png" },
      { id: 3, title: "Kitchen Lighting Solutions", image: "/work/residential/Kitchen-Lighting-Solutions.png" },
      { id: 4, title: "Bedroom Ambient Lighting", image: "/work/residential/Bedroom-Ambient-Lighting.jpeg" },
      { id: 5, title: "Living Room Lighting Design", image: "/work/residential/Living-Room-Lighting-Design.jpeg" },
      { id: 6, title: "Bathroom Lighting", image: "/work/residential/Bathroom-Lighting.jpeg" },
      { id: 7, title: "Home Office Lighting", image: "/work/residential/Home-Office-Lighting.jpeg" },
      { id: 8, title: "Staircase Lighting", image: "/work/residential/Staircase-Lighting.jpeg" },
    ],
  },
  commercial: {
    title: "Commercial Lighting",
    description: "Professional lighting solutions for offices, retail spaces, and hospitality venues",
    banner: "/work/commercial/commercial.png",
    items: [
      { id: 1, title: "Office Building Lighting", image: "/work/commercial/office-lighting.jpeg" },
      { id: 2, title: "Retail Store Lighting", image: "/work/commercial/retail-store-lighting.jpeg" },
      { id: 3, title: "Restaurant Lighting", image: "/work/commercial/restaurant-lighting.jpeg" },
      { id: 4, title: "Hotel Lighting Systems", image: "/work/commercial/hotel-lighting-systems.jpeg" },
      { id: 5, title: "Shopping Mall Lighting", image: "/work/commercial/shopping-mall-lighting.jpeg" },
      { id: 6, title: "Conference Room Lighting", image: "/work/commercial/conference-room-lighting.jpeg" },
      { id: 7, title: "Showroom Lighting", image: "/work/commercial/showroom-lighting.jpg" },
      { id: 8, title: "Spa and Wellness Center Lighting", image: "/work/commercial/spa-lighting.jpeg" },
    ],
  },
  industrial: {
    title: "Indstrial Lighting",
    description: "High-performance lighting solutions for factories, warehouses, and industrial facilities",
    banner: "/work/industry/factory-floor-lighting.png",
    items: [
      { id: 1, title: "Factory Floor Lighting", image: "/work/industry/factory-floor-lighting.png" },
      { id: 2, title: "Warehouse Lighting", image: "/work/industry/warehouse-lighting.png" },
      { id: 3, title: "Production Line Lighting", image: "/work/industry/Production-Line-Lighting.jpeg" },
      { id: 4, title: "Loading Dock Lighting", image: "/work/industry/Loading-Dock-Lighting.jpeg" },
      { id: 5, title: "Industrial Ceiling Lighting", image: "/work/industry/Industrial-Ceiling-Lighting.jpeg" },
      { id: 6, title: "Emergency Lighting Systems", image: "/work/industry/Emergency-Lighting-Systems.jpeg" },
      { id: 7, title: "High Bay Lighting", image: "/work/industry/High-Bay-Lighting.jpeg" },
      { id: 8, title: "Industrial Task Lighting", image: "/work/industry/Industrial-Task-Lighting.jpeg" },
    ],
  },
  outdoor: {
    title: "Outdoor Lighting",
    description: "Weather-resistant lighting solutions for gardens, pathways, and building exteriors",
    banner: "/placeholder.svg?height=800&width=1600",
    items: [
      { id: 1, title: "Garden Lighting", image: "/placeholder.svg?height=600&width=800" },
      { id: 2, title: "Pathway Lighting", image: "/placeholder.svg?height=600&width=800" },
      { id: 3, title: "Building Facade Lighting", image: "/placeholder.svg?height=600&width=800" },
      { id: 4, title: "Landscape Lighting", image: "/placeholder.svg?height=600&width=800" },
      { id: 5, title: "Pool and Water Feature Lighting", image: "/placeholder.svg?height=600&width=800" },
      { id: 6, title: "Outdoor Security Lighting", image: "/placeholder.svg?height=600&width=800" },
      { id: 7, title: "Street and Parking Lot Lighting", image: "/placeholder.svg?height=600&width=800" },
      { id: 8, title: "Deck and Patio Lighting", image: "/placeholder.svg?height=600&width=800" },
    ],
  },
  smart: {
    title: "Smart Lighting",
    description: "Intelligent lighting systems with advanced control and automation capabilities",
    banner: "/work/smart-home/ida-vid.mp4",
    items: [
      { id: 1, title: "Smart Home Lighting Systems", image: "/work/smart-home/smart-home-app.jpeg" },
      { id: 2, title: "Voice-Controlled Lighting", image: "/work/smart-home/IDA0302.JPG" },
      { id: 3, title: "App-Controlled Lighting", image: "/work/smart-home/IDA0321.JPG" },
      { id: 4, title: "Automated Lighting Schedules", image: "/work/smart-home/K.jpeg" },
      { id: 5, title: "Motion-Activated Lighting", image: "/work/smart-home/smart-home.jpeg" },
      { id: 6, title: "Color-Changing Lighting", image: "/work/smart-home/smarthomekit.jpeg" },
      { id: 7, title: "Energy-Efficient Smart Lighting", image: "/work/smart-home/199ac585-1b7f-41c3-9d07-097d5eec3252.png" },
      { id: 8, title: "Smart Lighting Integration", image: "/work/smart-home/6063c516-1ac2-4870-9eaf-1b592de8fcfe.png" },
    ],
  },
  // decorative: {
  //   title: "Decorative Lighting",
  //   description: "Artistic lighting fixtures that enhance interior design and create ambiance",
  //   banner: "/placeholder.svg?height=800&width=1600",
  //   items: [
  //     { id: 1, title: "Chandeliers", image: "/placeholder.svg?height=600&width=800" },
  //     { id: 2, title: "Pendant Lights", image: "/placeholder.svg?height=600&width=800" },
  //     { id: 3, title: "Wall Sconces", image: "/placeholder.svg?height=600&width=800" },
  //     { id: 4, title: "Table Lamps", image: "/placeholder.svg?height=600&width=800" },
  //     { id: 5, title: "Floor Lamps", image: "/placeholder.svg?height=600&width=800" },
  //     { id: 6, title: "Art Lighting", image: "/placeholder.svg?height=600&width=800" },
  //     { id: 7, title: "Accent Lighting", image: "/placeholder.svg?height=600&width=800" },
  //     { id: 8, title: "Decorative Light Fixtures", image: "/placeholder.svg?height=600&width=800" },
  //   ],
  // },
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const slug = params?.slug || '';

  // Check if the project exists
  if (!projects[slug as keyof typeof projects]) {
    notFound()
  }

  const project = projects[slug as keyof typeof projects]

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <ProjectBanner title={project.title} description={project.description} image={project.banner} />
      <ProjectGrid items={project.items} />
      <Footer />
    </main>
  )
}

