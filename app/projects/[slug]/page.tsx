"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import { notFound } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

// Define project item type
type ProjectItem = {
  id: number
  title: string
  image: string
}

// Define product type
type Product = {
  id: string
  name: string
  description: string
  specs: string
  image: string
}

// Define project data type
type Project = {
  title: string
  description: string
  banner: string
  location: string
  application: string
  project: string
  photo: string
  items: ProjectItem[]
  products: Product[]
}

// Define project data with content from idalighting.vn
const projects: Record<string, Project> = {
  starlake: {
    title: "Starlake Project",
    description: "A premium lighting project for the luxurious Starlake residential complex, combining elegance and functionality",
    banner: "/work/IDA_Starlake/TRC_7700.jpg",
    location: "Hanoi, Vietnam",
    application: "Facades, Interior",
    project: "IDA Lighting",
    photo: "IDA Team",
    products: [
      {
        id: "downlight-1",
        name: "Downlight 1.0",
        description: "Recessed downlight with adjustable beam angle",
        specs: "3000K, 15W, 30°, IP44",
        image: "/products/Downlight/IDA0020.JPG"
      },
      {
        id: "strip-light-1",
        name: "Strip Light 2.0",
        description: "Flexible LED strip for cove and feature lighting",
        specs: "3000K, 18W/m, IP65",
        image: "/products/Downlight/IDA0076.JPG"
      }
    ],
    items: [
      { id: 1, title: "Exterior Facade Lighting", image: "/work/IDA_Starlake/TRC_7699.jpg" },
      { id: 2, title: "Interior Ambient Lighting", image: "/work/IDA_Starlake/TRC_7696.jpg" },
      { id: 3, title: "Garden Pathway Lighting", image: "/work/IDA_Starlake/TRC_7695.jpg" },
      { id: 4, title: "Accent Wall Lighting", image: "/work/IDA_Starlake/TRC_7672.jpg" },
      { id: 5, title: "Modern Living Room", image: "/work/IDA_Starlake/TRC_7677.jpg" },
      { id: 6, title: "Dining Area Lighting", image: "/work/IDA_Starlake/TRC_7688.jpg" },
      { id: 7, title: "Bedroom Ambient Lighting", image: "/work/IDA_Starlake/TRC_7670.jpg" },
      { id: 8, title: "Bathroom Lighting Design", image: "/work/IDA_Starlake/TRC_7674.jpg" },
      { id: 9, title: "Starlake Exterior View", image: "/work/IDA_Starlake/TRC_7756.jpg" },
      { id: 10, title: "Building Entrance Lighting", image: "/work/IDA_Starlake/TRC_7743.jpg" },
      { id: 11, title: "Luxury Hallway Lighting", image: "/work/IDA_Starlake/TRC_7748.jpg" },
      { id: 12, title: "Interior Design Showcase", image: "/work/IDA_Starlake/TRC_7749.jpg" },
      { id: 13, title: "Modern Lighting Solutions", image: "/work/IDA_Starlake/TRC_7734.jpg" },
      { id: 14, title: "Contemporary Lighting Design", image: "/work/IDA_Starlake/TRC_7745.jpg" },
      { id: 15, title: "Exterior Nighttime View", image: "/work/IDA_Starlake/TRC_7757.jpg" },
      { id: 16, title: "Luxury Residence Lighting", image: "/work/IDA_Starlake/TRC_7751.jpg" },
      { id: 17, title: "Architectural Lighting", image: "/work/IDA_Starlake/TRC_7742.jpg" },
      { id: 18, title: "Premium Lighting Features", image: "/work/IDA_Starlake/TRC_7754.jpg" },
      { id: 19, title: "Indoor Lighting Systems", image: "/work/IDA_Starlake/TRC_7746.jpg" },
      { id: 20, title: "Modern Interior Design", image: "/work/IDA_Starlake/TRC_7731.jpg" },
      { id: 21, title: "Elegant Wall Lighting", image: "/work/IDA_Starlake/TRC_7752.jpg" },
      { id: 22, title: "Contemporary Space Design", image: "/work/IDA_Starlake/TRC_7723.jpg" },
      { id: 23, title: "Premium Residential Lighting", image: "/work/IDA_Starlake/TRC_7744.jpg" },
      { id: 24, title: "Luxury Bathroom Lighting", image: "/work/IDA_Starlake/TRC_7716.jpg" },
      { id: 25, title: "Exterior Facade Detail", image: "/work/IDA_Starlake/TRC_7755.jpg" },
      { id: 26, title: "Sophisticated Lighting Design", image: "/work/IDA_Starlake/TRC_7740.jpg" },
      { id: 27, title: "Residential Corridor Lighting", image: "/work/IDA_Starlake/TRC_7677.jpg" },
      { id: 28, title: "Modern Kitchen Lighting", image: "/work/IDA_Starlake/TRC_7719.jpg" },
      { id: 29, title: "High-End Residential Design", image: "/work/IDA_Starlake/TRC_7739.jpg" },
      { id: 30, title: "Living Room Atmosphere", image: "/work/IDA_Starlake/TRC_7724.jpg" },
    ],
  },
  koicafe: {
    title: "Koi Cafe",
    description: "Atmospheric lighting design for the trendy Koi Cafe space, creating a warm and inviting ambiance for customers",
    banner: "/work/koi cafe/2020_11_21_14_18_IMG_0138.JPG",
    location: "Ho Chi Minh City, Vietnam",
    application: "Interior, Entertainment",
    project: "IDA Lighting",
    photo: "IDA Team",
    products: [
      {
        id: "pendant-1",
        name: "Pendant Light 3.0",
        description: "Decorative pendant light with ambient glow",
        specs: "2700K, 12W, IP20",
        image: "/placeholder.svg?text=Pendant+Light+3.0"
      },
      {
        id: "track-light-1",
        name: "Track Light 2.5",
        description: "Adjustable track spotlight for accent lighting",
        specs: "3000K, 9W, 24°, IP20",
        image: "/placeholder.svg?text=Track+Light+2.5"
      }
    ],
    items: [
      { id: 1, title: "Cafe Entrance Lighting", image: "/work/koi cafe/2020_11_21_15_39_IMG_0140.JPG" },
      { id: 2, title: "Seating Area Ambiance", image: "/work/koi cafe/2020_11_21_14_12_IMG_0136.JPG" },
      { id: 3, title: "Counter Lighting Design", image: "/work/koi cafe/2020_11_21_15_06_IMG_0139.JPG" },
      { id: 4, title: "Cafe Interior Mood", image: "/work/koi cafe/2020_11_21_17_54_IMG_0152.JPG" },
      { id: 5, title: "Artistic Wall Lighting", image: "/work/koi cafe/2020_11_21_16_45_IMG_0142.JPG" },
      { id: 6, title: "Evening Atmosphere", image: "/work/koi cafe/2020_11_21_17_43_IMG_0147.JPG" },
      { id: 7, title: "Decorative Light Elements", image: "/work/koi cafe/2020_11_21_17_46_IMG_0148.JPG" },
      { id: 8, title: "Outdoor Seating Area", image: "/work/koi cafe/2020_11_21_17_49_IMG_0150.JPG" },
      { id: 9, title: "Cozy Interior Setting", image: "/work/koi cafe/2020_11_21_14_12_IMG_0137.JPG" },
      { id: 10, title: "Night Ambiance View", image: "/work/koi cafe/2020_11_21_17_55_IMG_0153.JPG" },
      { id: 11, title: "Warm Evening Lighting", image: "/work/koi cafe/z4657775267180_273d7041ad31becaf7e453ee94636cb4.jpg" },
      { id: 12, title: "Cafe Social Space", image: "/work/koi cafe/150030371_266236301548582_2927341516468461359_n.jpg" },
      { id: 13, title: "Modern Cafe Interior", image: "/work/koi cafe/z4657775278117_c708d0f200ab9d39c42f939602962319.jpg" },
      { id: 14, title: "Contemporary Lighting Design", image: "/work/koi cafe/z4657775281798_6bbdfeb86f6c763884fa4463621ff438.jpg" },
      { id: 15, title: "Cafe Corridor Lighting", image: "/work/koi cafe/z4657775269758_f4e3cbef0d9d0fefd655dab457acc009.jpg" },
      { id: 16, title: "Stylish Customer Area", image: "/work/koi cafe/335923656_599881578654042_1268634657177024188_n.jpg" },
      { id: 17, title: "Evening Lounge Space", image: "/work/koi cafe/297064468_596248115214064_7650294870205169416_n.jpg" },
      { id: 18, title: "Cafe Entrance at Night", image: "/work/koi cafe/z4657775265937_b58cb298fa6ef09f4e88c5590eec4195.jpg" },
      { id: 19, title: "Counter Service Area", image: "/work/koi cafe/2020_11_21_16_44_IMG_0141.JPG" },
      { id: 20, title: "Cafe Exterior View", image: "/work/koi cafe/z4657775283761_9ebaf04f0491b2db975e8f63b2b0fab4.jpg" },
      { id: 21, title: "Artistic Interior Design", image: "/work/koi cafe/340091591_938369397315716_1744049555005482317_n.jpg" },
      { id: 22, title: "Evening Dining Experience", image: "/work/koi cafe/2020_11_21_17_35_IMG_0144.JPG" },
      { id: 23, title: "Warm Ambient Lighting", image: "/work/koi cafe/327427671_1357387545058636_892862445078244852_n.jpg" },
      { id: 24, title: "Modern Cafe Design", image: "/work/koi cafe/340012239_109710155423306_7501542820500424786_n.jpg" },
      { id: 25, title: "Cafe Bar Lighting", image: "/work/koi cafe/2020_11_21_17_34_IMG_0143.JPG" },
      { id: 26, title: "Dining Area Mood Lighting", image: "/work/koi cafe/2020_11_21_17_42_IMG_0146.JPG" },
      { id: 27, title: "Contemporary Cafe Setting", image: "/work/koi cafe/z4657775257822_e259063c59e520ff45fda77f8d022733.jpg" },
      { id: 28, title: "Lounge Area Lighting", image: "/work/koi cafe/2020_11_21_17_54_IMG_0151.JPG" },
      { id: 29, title: "Relaxing Ambiance", image: "/work/koi cafe/2020_11_21_17_37_IMG_0145.JPG" },
      { id: 30, title: "Customer Experience Space", image: "/work/koi cafe/2020_11_21_17_46_IMG_0149.JPG" },
    ],
  },
  residential: {
    title: "Residential Lighting",
    description: "Elegant lighting solutions that enhance the comfort and aesthetics of homes",
    banner: "/work/residential/13387622937775503.mp4",
    location: "Various locations, Vietnam",
    application: "Interior, Facades",
    project: "IDA Lighting",
    photo: "IDA Team",
    products: [
      {
        id: "cove-light-1",
        name: "Cove Light 1.5",
        description: "Linear LED profile for indirect lighting",
        specs: "3000K, 14W/m, IP20",
        image: "/placeholder.svg?text=Cove+Light+1.5"
      },
      {
        id: "wall-light-1",
        name: "Wall Light 2.0",
        description: "Surface mounted wall light with up/down effect",
        specs: "3000K, 2x6W, IP44",
        image: "/placeholder.svg?text=Wall+Light+2.0"
      }
    ],
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
    location: "Various locations, Vietnam",
    application: "Interior, Facades, Public spaces",
    project: "IDA Lighting",
    photo: "IDA Team",
    products: [
      {
        id: "panel-light-1",
        name: "Panel Light 2.0",
        description: "Ultra-thin LED panel for office lighting",
        specs: "4000K, 36W, UGR<19, IP20",
        image: "/placeholder.svg?text=Panel+Light+2.0"
      },
      {
        id: "spot-light-1",
        name: "Spot Light 1.0",
        description: "Recessed adjustable spotlight for retail",
        specs: "3000K, 18W, 15-60°, IP20",
        image: "/placeholder.svg?text=Spot+Light+1.0"
      }
    ],
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
    location: "Various locations, Vietnam",
    application: "Industrial, Interior",
    project: "IDA Lighting",
    photo: "IDA Team",
    products: [
      {
        id: "highbay-1",
        name: "High Bay 3.0",
        description: "High-efficiency LED high bay for industrial spaces",
        specs: "5000K, 150W, 110°, IP65",
        image: "/placeholder.svg?text=High+Bay+3.0"
      },
      {
        id: "triproof-1",
        name: "Triproof Light 2.0",
        description: "Dust, water and impact resistant linear light",
        specs: "4000K, 40W, IP65, IK10",
        image: "/placeholder.svg?text=Triproof+Light+2.0"
      }
    ],
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
    location: "Various locations, Vietnam",
    application: "Landscape, Paths and steps, Facades",
    project: "IDA Lighting",
    photo: "IDA Team",
    products: [
      {
        id: "bollard-1",
        name: "Bollard Light 1.0",
        description: "Modern pathway bollard with 360° light distribution",
        specs: "3000K, 18W, IP65, IK08",
        image: "/placeholder.svg?text=Bollard+Light+1.0"
      },
      {
        id: "inground-1",
        name: "Inground Light 2.0",
        description: "Recessed ground light for uplighting facades",
        specs: "3000K, 24W, 10°, IP67, IK10",
        image: "/placeholder.svg?text=Inground+Light+2.0"
      }
    ],
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
    location: "Various locations, Vietnam",
    application: "Interior, Residential, Corporate",
    project: "IDA Lighting",
    photo: "IDA Team",
    products: [
      {
        id: "smart-panel-1",
        name: "Smart Panel 3.0",
        description: "Connected lighting control panel with touch interface",
        specs: "WiFi/Bluetooth, 8 zones, white/black finish",
        image: "/placeholder.svg?text=Smart+Panel+3.0"
      },
      {
        id: "smart-bulb-1",
        name: "Smart Bulb 2.0",
        description: "Color-changing LED bulb with wireless control",
        specs: "RGB+CCT, 9W, E27, IP20",
        image: "/placeholder.svg?text=Smart+Bulb+2.0"
      }
    ],
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
  params: { slug: string }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const slug = params?.slug || '';

  // Check if the project exists
  if (!projects[slug as keyof typeof projects]) {
    notFound()
  }

  const project = projects[slug as keyof typeof projects]
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  
  // Parallax scroll effect references
  const { scrollYProgress } = useScroll();
  const bannerY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const sliderScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  
  // Zoom animation timing
  useEffect(() => {
    const interval = setInterval(() => {
      setIsZooming(prev => !prev);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Tạo mảng tất cả hình ảnh từ gallery để sử dụng cho slider
  const allImages = project ? [project.banner, ...project.items.map(item => item.image)] : [];
  
  // Hàm điều hướng hình ảnh
  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };
  
  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  // Set default selected product
  if (project.products.length > 0 && !selectedProduct) {
    setSelectedProduct(project.products[0])
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-black via-black to-[#8B2323] text-white">
      <Header />
      
      {/* New layout based on Lucelight.it */}
      <div className="container mx-auto pt-32 pb-16 px-4 md:px-8">
        {/* Project title */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-8"
        >
          {project.title}
        </motion.h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main image */}
          <div className="lg:w-2/3">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative aspect-[16/9] mb-4 overflow-hidden rounded-md"
            >
              {project.banner.endsWith('.mp4') ? (
                <video 
                  src={project.banner} 
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <div className="relative h-full overflow-hidden">
                  <motion.img 
                    style={{ y: bannerY }}
                    src={project.banner} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Product indicators */}
                  {project.products.map((product, index) => (
                    <button
                      key={product.id}
                      className={`absolute w-8 h-8 rounded-full flex items-center justify-center 
                                 transition-all duration-300 ${selectedProduct?.id === product.id 
                                   ? 'bg-red-600 text-white' 
                                   : 'bg-white text-black border border-gray-300'}`}
                      style={{
                        left: `${20 + (index * 15)}%`,
                        top: '70%',
                      }}
                      onClick={() => setSelectedProduct(product)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
            
            {/* Image slider with navigation arrows */}
            <motion.div 
              style={{ scale: sliderScale }}
              className="relative aspect-[16/9] mb-8 overflow-hidden rounded-md"
            >
              <div className="relative h-full">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ 
                      opacity: 1, 
                      scale: isZooming ? 1.05 : 1 
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      opacity: { duration: 0.5 },
                      scale: { duration: 5, ease: "easeInOut" }
                    }}
                    src={allImages[currentImageIndex]} 
                    alt={`Gallery image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                {/* Navigation arrows */}
                <button 
                  onClick={goToPrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all"
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button 
                  onClick={goToNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all"
                  aria-label="Next image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              </div>
            </motion.div>
            
            {/* Project description */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-12"
            >
              <p className="text-lg leading-relaxed mb-8 text-gray-200">{project.description}</p>
              
              {/* Products section - visible only on mobile/tablet */}
              <div className="mt-12 lg:hidden">
                <h2 className="text-2xl font-bold mb-4">Products</h2>
                
                {selectedProduct && (
                  <div className="flex flex-col md:flex-row gap-8 p-6 bg-black/30 backdrop-blur-sm rounded-md">
                    <div className="md:w-1/3">
                      <div className="aspect-square bg-black/50 rounded-md overflow-hidden border border-gray-800">
                        <img 
                          src={selectedProduct.image || "/placeholder.svg"} 
                          alt={selectedProduct.name}
                          className="w-full h-full object-contain p-4"
                        />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-bold mb-2">{selectedProduct.name}</h3>
                      <p className="mb-4 text-gray-300">{selectedProduct.description}</p>
                      <div className="bg-black/50 p-3 rounded-md inline-block">
                        <p className="font-mono text-sm text-gray-200">{selectedProduct.specs}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Product selection buttons */}
                <div className="flex gap-3 mt-4">
                  {project.products.map((product) => (
                    <button
                      key={product.id}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        selectedProduct?.id === product.id
                          ? 'bg-red-600 text-white'
                          : 'bg-black/30 hover:bg-black/50 text-white'
                      }`}
                      onClick={() => setSelectedProduct(product)}
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Project details sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-md">
              <table className="w-full text-left">
                <tbody>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 font-medium">Location</th>
                    <td className="py-3">{project.location}</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 font-medium">Application</th>
                    <td className="py-3">{project.application}</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 font-medium">Project</th>
                    <td className="py-3">{project.project}</td>
                  </tr>
                  <tr>
                    <th className="py-3 font-medium">Photo</th>
                    <td className="py-3">{project.photo}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Products section - visible only on desktop */}
            <div className="hidden lg:block mt-8">
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-md">
                <h2 className="text-2xl font-bold mb-4">Products</h2>
                
                {selectedProduct && (
                  <div className="flex flex-col gap-6">
                    <div>
                      <div className="aspect-square bg-black/50 rounded-md overflow-hidden border border-gray-800">
                        <img 
                          src={selectedProduct.image || "/placeholder.svg"} 
                          alt={selectedProduct.name}
                          className="w-full h-full object-contain p-4"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{selectedProduct.name}</h3>
                      <p className="mb-4 text-gray-300">{selectedProduct.description}</p>
                      <div className="bg-black/50 p-3 rounded-md inline-block">
                        <p className="font-mono text-sm text-gray-200">{selectedProduct.specs}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Product selection buttons */}
                <div className="flex flex-wrap gap-3 mt-4">
                  {project.products.map((product) => (
                    <button
                      key={product.id}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        selectedProduct?.id === product.id
                          ? 'bg-red-600 text-white'
                          : 'bg-black/30 hover:bg-black/50 text-white'
                      }`}
                      onClick={() => setSelectedProduct(product)}
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Project gallery */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.items.map((item, idx) => (
              <motion.div 
                key={item.id} 
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                  <motion.img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                    whileHover={{ 
                      scale: 1.1,
                      transition: { duration: 0.5 }
                    }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <h3 className="mt-2 font-medium">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </main>
  )
}

