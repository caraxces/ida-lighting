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
  title?: string
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
      { id: 1, image: "/work/IDA_Starlake/TRC_7699.jpg" },
      { id: 2, image: "/work/IDA_Starlake/TRC_7696.jpg" },
      { id: 3, image: "/work/IDA_Starlake/TRC_7695.jpg" },
      { id: 4, image: "/work/IDA_Starlake/TRC_7672.jpg" },
      { id: 5, image: "/work/IDA_Starlake/TRC_7677.jpg" },
      { id: 6, image: "/work/IDA_Starlake/TRC_7688.jpg" },
      { id: 7, image: "/work/IDA_Starlake/TRC_7670.jpg" },
      { id: 8, image: "/work/IDA_Starlake/TRC_7674.jpg" },
      { id: 9, image: "/work/IDA_Starlake/TRC_7756.jpg" },
      { id: 10, image: "/work/IDA_Starlake/TRC_7743.jpg" },
      { id: 11, image: "/work/IDA_Starlake/TRC_7748.jpg" },
      { id: 12, image: "/work/IDA_Starlake/TRC_7749.jpg" },
      { id: 13, image: "/work/IDA_Starlake/TRC_7734.jpg" },
      { id: 14, image: "/work/IDA_Starlake/TRC_7745.jpg" },
      { id: 15, image: "/work/IDA_Starlake/TRC_7757.jpg" },
      { id: 16, image: "/work/IDA_Starlake/TRC_7751.jpg" },
      { id: 17, image: "/work/IDA_Starlake/TRC_7742.jpg" },
      { id: 18, image: "/work/IDA_Starlake/TRC_7754.jpg" },
      { id: 19, image: "/work/IDA_Starlake/TRC_7746.jpg" },
      { id: 20, image: "/work/IDA_Starlake/TRC_7731.jpg" },
      { id: 21, image: "/work/IDA_Starlake/TRC_7752.jpg" },
      { id: 22, image: "/work/IDA_Starlake/TRC_7723.jpg" },
      { id: 23, image: "/work/IDA_Starlake/TRC_7744.jpg" },
      { id: 24, image: "/work/IDA_Starlake/TRC_7716.jpg" },
      { id: 25, image: "/work/IDA_Starlake/TRC_7755.jpg" },
      { id: 26, image: "/work/IDA_Starlake/TRC_7740.jpg" },
      { id: 27, image: "/work/IDA_Starlake/TRC_7677.jpg" },
      { id: 28, image: "/work/IDA_Starlake/TRC_7719.jpg" },
      { id: 29, image: "/work/IDA_Starlake/TRC_7739.jpg" },
      { id: 30, image: "/work/IDA_Starlake/TRC_7724.jpg" },
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
      { id: 1, image: "/work/koi cafe/2020_11_21_15_39_IMG_0140.JPG" },
      { id: 2, image: "/work/koi cafe/2020_11_21_14_12_IMG_0136.JPG" },
      { id: 3, image: "/work/koi cafe/2020_11_21_15_06_IMG_0139.JPG" },
      { id: 4, image: "/work/koi cafe/2020_11_21_17_54_IMG_0152.JPG" },
      { id: 5, image: "/work/koi cafe/2020_11_21_16_45_IMG_0142.JPG" },
      { id: 6, image: "/work/koi cafe/2020_11_21_17_43_IMG_0147.JPG" },
      { id: 7, image: "/work/koi cafe/2020_11_21_17_46_IMG_0148.JPG" },
      { id: 8, image: "/work/koi cafe/2020_11_21_17_49_IMG_0150.JPG" },
      { id: 9, image: "/work/koi cafe/2020_11_21_14_12_IMG_0137.JPG" },
      { id: 10, image: "/work/koi cafe/2020_11_21_17_55_IMG_0153.JPG" },
      { id: 11, image: "/work/koi cafe/z4657775267180_273d7041ad31becaf7e453ee94636cb4.jpg" },
      { id: 12, image: "/work/koi cafe/150030371_266236301548582_2927341516468461359_n.jpg" },
      { id: 13, image: "/work/koi cafe/z4657775278117_c708d0f200ab9d39c42f939602962319.jpg" },
      { id: 14, image: "/work/koi cafe/z4657775281798_6bbdfeb86f6c763884fa4463621ff438.jpg" },
      { id: 15, image: "/work/koi cafe/z4657775269758_f4e3cbef0d9d0fefd655dab457acc009.jpg" },
      { id: 16, image: "/work/koi cafe/335923656_599881578654042_1268634657177024188_n.jpg" },
      { id: 17, image: "/work/koi cafe/297064468_596248115214064_7650294870205169416_n.jpg" },
      { id: 18, image: "/work/koi cafe/z4657775265937_b58cb298fa6ef09f4e88c5590eec4195.jpg" },
      { id: 19, image: "/work/koi cafe/2020_11_21_16_44_IMG_0141.JPG" },
      { id: 20, image: "/work/koi cafe/z4657775283761_9ebaf04f0491b2db975e8f63b2b0fab4.jpg" },
      { id: 21, image: "/work/koi cafe/340091591_938369397315716_1744049555005482317_n.jpg" },
      { id: 22, image: "/work/koi cafe/2020_11_21_17_35_IMG_0144.JPG" },
      { id: 23, image: "/work/koi cafe/327427671_1357387545058636_892862445078244852_n.jpg" },
      { id: 24, image: "/work/koi cafe/340012239_109710155423306_7501542820500424786_n.jpg" },
      { id: 25, image: "/work/koi cafe/2020_11_21_17_34_IMG_0143.JPG" },
      { id: 26, image: "/work/koi cafe/2020_11_21_17_42_IMG_0146.JPG" },
      { id: 27, image: "/work/koi cafe/z4657775257822_e259063c59e520ff45fda77f8d022733.jpg" },
      { id: 28, image: "/work/koi cafe/2020_11_21_17_54_IMG_0151.JPG" },
      { id: 29, image: "/work/koi cafe/2020_11_21_17_37_IMG_0145.JPG" },
      { id: 30, image: "/work/koi cafe/2020_11_21_17_46_IMG_0149.JPG" },
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
      { id: 1, image: "/work/residential/Modern-Villa-Lighting.jpeg" },
      { id: 2, image: "/work/residential/Apartment-Lighting-Systems.png" },
      { id: 3, image: "/work/residential/Kitchen-Lighting-Solutions.png" },
      { id: 4, image: "/work/residential/Bedroom-Ambient-Lighting.jpeg" },
      { id: 5, image: "/work/residential/Living-Room-Lighting-Design.jpeg" },
      { id: 6, image: "/work/residential/Bathroom-Lighting.jpeg" },
      { id: 7, image: "/work/residential/Home-Office-Lighting.jpeg" },
      { id: 8, image: "/work/residential/Staircase-Lighting.jpeg" },
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
      { id: 1, image: "/work/commercial/office-lighting.jpeg" },
      { id: 2, image: "/work/commercial/retail-store-lighting.jpeg" },
      { id: 3, image: "/work/commercial/restaurant-lighting.jpeg" },
      { id: 4, image: "/work/commercial/hotel-lighting-systems.jpeg" },
      { id: 5, image: "/work/commercial/shopping-mall-lighting.jpeg" },
      { id: 6, image: "/work/commercial/conference-room-lighting.jpeg" },
      { id: 7, image: "/work/commercial/showroom-lighting.jpg" },
      { id: 8, image: "/work/commercial/spa-lighting.jpeg" },
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
      { id: 1, image: "/work/industry/factory-floor-lighting.png" },
      { id: 2, image: "/work/industry/warehouse-lighting.png" },
      { id: 3, image: "/work/industry/Production-Line-Lighting.jpeg" },
      { id: 4, image: "/work/industry/Loading-Dock-Lighting.jpeg" },
      { id: 5, image: "/work/industry/Industrial-Ceiling-Lighting.jpeg" },
      { id: 6, image: "/work/industry/Emergency-Lighting-Systems.jpeg" },
      { id: 7, image: "/work/industry/High-Bay-Lighting.jpeg" },
      { id: 8, image: "/work/industry/Industrial-Task-Lighting.jpeg" },
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
      { id: 1, image: "/placeholder.svg?height=600&width=800" },
      { id: 2, image: "/placeholder.svg?height=600&width=800" },
      { id: 3, image: "/placeholder.svg?height=600&width=800" },
      { id: 4, image: "/placeholder.svg?height=600&width=800" },
      { id: 5, image: "/placeholder.svg?height=600&width=800" },
      { id: 6, image: "/placeholder.svg?height=600&width=800" },
      { id: 7, image: "/placeholder.svg?height=600&width=800" },
      { id: 8, image: "/placeholder.svg?height=600&width=800" },
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
      { id: 1, image: "/work/smart-home/smart-home-app.jpeg" },
      { id: 2, image: "/work/smart-home/IDA0302.JPG" },
      { id: 3, image: "/work/smart-home/IDA0321.JPG" },
      { id: 4, image: "/work/smart-home/K.jpeg" },
      { id: 5, image: "/work/smart-home/smart-home.jpeg" },
      { id: 6, image: "/work/smart-home/smarthomekit.jpeg" },
      { id: 7, image: "/work/smart-home/199ac585-1b7f-41c3-9d07-097d5eec3252.png" },
      { id: 8, image: "/work/smart-home/6063c516-1ac2-4870-9eaf-1b592de8fcfe.png" },
    ],
  },
  "koi-gardens": {
    title: "Nhà riêng",
    description: "Premium residential lighting design showcasing luxury and comfort",
    banner: "/work/vn1/2022_10_21_14_54_IMG_9377.JPG",
    location: "Vietnam",
    application: "Facades, Interior, Landscape, Fountains and swimming pools",
    project: "IDA Lighting",
    photo: "IDA Team",
    products: [
      {
        id: "downlight-1",
        name: "PRO.S38 (C)",
        description: "Recessed downlight with adjustable beam angle",
        specs: "3000K, 15W, 30°, IP44",
        image: "/collections/Downlight/IDA0062.JPG"
      },
      {
        id: "outdoor-1",
        name: "CP20183",
        description: "Đèn trụ sân vườn",
        specs: "Ø150mm, 600mm, 12W, 3000K",
        image: "/collections/out-door/CP20183/4.jpg"
      }
    ],
    items: [
      { id: 1, image: "/work/vn1/2022_07_25_16_39_IMG_6556.JPG" },
      { id: 2, image: "/work/vn1/2022_07_25_16_39_IMG_6557.JPG" },
      { id: 3, image: "/work/vn1/2022_07_25_16_40_IMG_6558.JPG" },
      { id: 4, image: "/work/vn1/2022_07_25_16_42_IMG_6559.JPG" },
      { id: 5, image: "/work/vn1/2022_07_25_16_42_IMG_6560.JPG" },
      { id: 6, image: "/work/vn1/2022_07_25_16_43_IMG_6561.JPG" },
      { id: 7, image: "/work/vn1/2022_07_25_16_43_IMG_6562.JPG" },
      { id: 8, image: "/work/vn1/2022_07_25_16_46_IMG_6563.JPG" },
      { id: 9, image: "/work/vn1/2022_07_25_16_47_IMG_6564.JPG" },
      { id: 10, image: "/work/vn1/2022_10_21_14_54_IMG_9376.JPG" },
      { id: 11, image: "/work/vn1/2022_10_21_14_54_IMG_9377.JPG" },
      { id: 12, image: "/work/vn1/2022_10_21_14_54_IMG_9378.JPG" },
      { id: 13, image: "/work/vn1/2022_10_21_14_54_IMG_9379.JPG" }
    ],
  },
  "luxury-apartments": {
    title: "Nhà riêng",
    description: "Modern residential lighting solutions with a focus on comfort and style",
    banner: "/work/vn2/z4279796446188_4aaf42a5ea2830e48d8572d24725dcac.jpg",
    location: "Vietnam",
    application: "Interior, Wellness, Landscape",
    project: "IDA Lighting",
    photo: "IDA Team",
    products: [
      {
        id: "downlight-2",
        name: "E35",
        description: "Đèn âm trần chống chói",
        specs: "∅50*H55mm, 4000K, 12W",
        image: "/collections/Downlight/IDA0069.JPG"
      },
      {
        id: "outdoor-v2",
        name: "CP20205",
        description: "Đèn trụ sân vườn",
        specs: "100*78mm, 600mm, 7W, 3000K",
        image: "/collections/out-door/CP20205/3.jpg"
      }
    ],
    items: [
      { id: 1, image: "/work/vn2/z4279796446188_4aaf42a5ea2830e48d8572d24725dcac.jpg" },
      { id: 2, image: "/work/vn2/z4279796444199_187b195dc10370a3b7e232807913be9a.jpg" },
      { id: 3, image: "/work/vn2/z4279796466044_c5730d70c7b17454e2f9592618ade7ad.jpg" },
      { id: 4, image: "/work/vn2/z4279796467822_94c1444c1f9662cde1f462e12b420fd7.jpg" },
      { id: 5, image: "/work/vn2/z4279796477537_2d44c70444780b51f0aaeb8ef53cd9cd.jpg" },
      { id: 6, image: "/work/vn2/z4279796478648_6f87d8600736f8a18bc1d2e21ab88b6a.jpg" },
      { id: 7, image: "/work/vn2/2022_08_03_14_40_IMG_6858.JPG" },
      { id: 8, image: "/work/vn2/2022_08_03_15_15_IMG_6859.JPG" },
      { id: 9, image: "/work/vn2/2022_08_03_15_15_IMG_6860.JPG" },
      { id: 10, image: "/work/vn2/2022_08_03_17_01_IMG_6862.JPG" },
      { id: 11, image: "/work/vn2/2022_08_03_17_01_IMG_6863.JPG" },
      { id: 12, image: "/work/vn2/2022_08_03_17_01_IMG_6864.JPG" },
      { id: 13, image: "/work/vn2/2022_08_03_17_02_IMG_6865.JPG" },
      { id: 14, image: "/work/vn2/2022_08_03_17_02_IMG_6866.JPG" }
    ],
  },
  "luxury-villas": {
    title: "Nhà riêng",
    description: "Cultural lighting design highlighting architectural elements and historical significance",
    banner: "/work/vn3/2022_09_26_19_38_IMG_8530.JPG",
    location: "Vietnam",
    application: "Facades, Landscape, Museums and exhibitions",
    project: "IDA Lighting",
    photo: "IDA Team",
    products: [
      {
        id: "downlight-3",
        name: "PRO.S60 (W)",
        description: "Đèn âm trần chống chói",
        specs: "∅50*H75mm, 15W, 60°, 97Ra",
        image: "/collections/Downlight/IDA0075.JPG"
      },
      {
        id: "outdoor-3",
        name: "CP20188",
        description: "Đèn trụ sân vườn",
        specs: "160*55*600mm, 10W, 3000K",
        image: "/collections/out-door/CP20188/4.jpg"
      }
    ],
    items: [
      { id: 1, image: "/work/vn3/2022_09_26_19_38_IMG_8530.JPG" },
      { id: 2, image: "/work/vn3/2022_09_26_19_39_IMG_8533.JPG" },
      { id: 3, image: "/work/vn3/2022_09_26_19_39_IMG_8534.JPG" },
      { id: 4, image: "/work/vn3/2022_09_26_19_40_IMG_8535.JPG" },
      { id: 5, image: "/work/vn3/2022_09_26_19_40_IMG_8536.JPG" },
      { id: 6, image: "/work/vn3/2022_09_26_19_41_IMG_8537.JPG" },
      { id: 7, image: "/work/vn3/2022_09_26_19_41_IMG_8538.JPG" },
      { id: 8, image: "/work/vn3/2022_09_26_19_41_IMG_8539.JPG" },
      { id: 9, image: "/work/vn3/2022_09_26_19_41_IMG_8540.JPG" },
      { id: 10, image: "/work/vn3/2022_09_26_19_42_IMG_8541.JPG" },
      { id: 11, image: "/work/vn3/2022_09_26_19_42_IMG_8542.JPG" },
      { id: 12, image: "/work/vn3/2022_09_26_19_34_IMG_8522.JPG" },
      { id: 13, image: "/work/vn3/2022_09_26_19_34_IMG_8523.JPG" },
      { id: 14, image: "/work/vn3/2022_09_26_19_34_IMG_8524.JPG" },
      { id: 15, image: "/work/vn3/2022_09_26_19_35_IMG_8525.JPG" },
      { id: 16, image: "/work/vn3/2022_09_26_19_38_IMG_8526.JPG" },
      { id: 17, image: "/work/vn3/2022_09_26_19_38_IMG_8527.JPG" },
      { id: 18, image: "/work/vn3/2022_09_26_19_38_IMG_8528.JPG" },
      { id: 19, image: "/work/vn3/2022_09_26_19_38_IMG_8529.JPG" },
      { id: 20, image: "/work/vn3/2022_09_26_19_38_IMG_8530.JPG" },
      { id: 21, image: "/work/vn3/2022_09_26_19_39_IMG_8531.JPG" },
      { id: 22, image: "/work/vn3/2022_09_26_19_39_IMG_8532.JPG" },
      { id: 23, image: "/work/vn3/2022_09_26_17_50_IMG_8515.JPG" },
      { id: 24, image: "/work/vn3/2022_09_26_17_50_IMG_8516.JPG" },
      { id: 25, image: "/work/vn3/2022_09_26_17_50_IMG_8517.JPG" },
      { id: 26, image: "/work/vn3/2022_09_26_17_50_IMG_8518.JPG" },
      { id: 27, image: "/work/vn3/2022_09_26_19_31_IMG_8519.JPG" },
      { id: 28, image: "/work/vn3/2022_09_26_19_31_IMG_8520.JPG" },
      { id: 29, image: "/work/vn3/2022_09_26_19_31_IMG_8521.JPG" }
    ],
  },
  "retail": {
    title: "Bamboo cafe",
    description: "Contemporary cafe lighting design creating a vibrant and welcoming atmosphere",
    banner: "/work/vn4/2020_12_26_19_53_IMG_0314.JPG",
    location: "Vietnam",
    application: "Facades, Interior, Public spaces",
    project: "IDA Lighting",
    photo: "IDA Team",
    products: [
      {
        id: "downlight-5",
        name: "B8-6W",
        description: "Đèn rọi âm trần Spotlight",
        specs: "Trắng, 15°, >97Ra, 3000K",
        image: "/collections/Downlight/IDA0086.JPG"
      },
      {
        id: "outdoor-4",
        name: "CP20196",
        description: "Đèn trụ sân vườn",
        specs: "150*150*600mm, 7W, 3000K",
        image: "/collections/out-door/CP20196/6.jpg"
      }
    ],
    items: [
      { id: 18, image: "/work/vn4/2020_12_24_15_07_IMG_0298.JPG" },
      { id: 19, image: "/work/vn4/2020_12_24_15_08_IMG_0299.JPG" },
      { id: 20, image: "/work/vn4/2020_12_24_15_08_IMG_0300.JPG" },
      { id: 21, image: "/work/vn4/2020_12_24_15_11_IMG_0301.JPG" },
      { id: 22, image: "/work/vn4/2020_12_24_15_11_IMG_0302.JPG" },
      { id: 23, image: "/work/vn4/2020_12_24_15_12_IMG_0303.JPG" },
      { id: 24, image: "/work/vn4/2020_12_24_15_13_IMG_0304.JPG" },
      { id: 25, image: "/work/vn4/2020_12_24_15_14_IMG_0305.JPG" },
      { id: 26, image: "/work/vn4/2020_12_26_19_47_IMG_0306.JPG" },
      { id: 27, image: "/work/vn4/2020_12_26_19_48_IMG_0307.JPG" },
      { id: 28, image: "/work/vn4/2020_12_26_19_49_IMG_0308.JPG" },
      { id: 29, image: "/work/vn4/2020_12_26_19_49_IMG_0309.JPG" },
      { id: 30, image: "/work/vn4/2020_12_26_19_50_IMG_0310.JPG" },
      { id: 31, image: "/work/vn4/2020_12_26_19_52_IMG_0311.JPG" },
      { id: 32, image: "/work/vn4/2020_12_26_19_52_IMG_0312.JPG" },
      { id: 33, image: "/work/vn4/2020_12_26_19_53_IMG_0313.JPG" },
      { id: 34, image: "/work/vn4/2020_12_26_19_53_IMG_0314.JPG" },
      { id: 35, image: "/work/vn4/2020_12_26_20_07_IMG_0315.JPG" },
      { id: 36, image: "/work/vn4/2021_01_21_21_09_IMG_0340.JPG" },
      { id: 37, image: "/work/vn4/2021_01_21_21_09_IMG_0341.JPG" },
      { id: 38, image: "/work/vn4/2021_01_21_21_09_IMG_0342.JPG" },
      { id: 39, image: "/work/vn4/2021_01_24_20_15_IMG_0353.JPG" },
      { id: 40, image: "/work/vn4/2021_01_24_20_16_IMG_0354.JPG" },
      { id: 41, image: "/work/vn4/2021_01_24_20_18_IMG_0358.JPG" },
      { id: 42, image: "/work/vn4/2021_02_01_11_03_IMG_0377.JPG" },
      { id: 43, image: "/work/vn4/2021_02_01_11_04_IMG_0378.JPG" },
      { id: 44, image: "/work/vn4/2021_02_09_23_18_IMG_0412.JPG" },
      { id: 45, image: "/work/vn4/2021_02_09_23_19_IMG_0413.JPG" },
      { id: 46, image: "/work/vn4/2021_02_09_23_20_IMG_0414.JPG" },
      { id: 47, image: "/work/vn4/2021_02_09_23_20_IMG_0415.JPG" },
      { id: 48, image: "/work/vn4/2021_02_10_20_53_IMG_0416.JPG" },
      { id: 49, image: "/work/vn4/2021_02_10_20_53_IMG_0417.JPG" },
      { id: 50, image: "/work/vn4/2021_02_10_20_53_IMG_0418.JPG" },
      { id: 51, image: "/work/vn4/2021_02_10_20_53_IMG_0419.JPG" },
      { id: 52, image: "/work/vn4/2021_03_01_22_20_IMG_0879.JPG" },
      { id: 53, image: "/work/vn4/2021_03_24_20_55_IMG_0422.JPG" },
      { id: 54, image: "/work/vn4/2021_03_24_20_56_IMG_0423.JPG" },
      { id: 55, image: "/work/vn4/2021_04_14_20_43_IMG_0426.JPG" },
      { id: 56, image: "/work/vn4/2021_04_14_20_44_IMG_0429.JPG" }
    ],
  },
  "outdoor": {
    title: "Out door field",
    description: "Entertainment lighting solutions for outdoor recreational areas and public spaces",
    banner: "/work/vn5/2022_04_28_19_36_IMG_3661.JPG",
    location: "Vietnam",
    application: "Facades, Landscape, Paths and steps",
    project: "IDA Lighting",
    photo: "IDA Team",
    products: [
      {
        id: "product-1",
        name: "CP202112",
        description: "Đèn trụ sân vườn",
        specs: "Ø140mm, Ø65mm, 600mm, 12W",
        image: "/collections/out-door/CP202112/4.jpg"
      },
      {
        id: "product-2",
        name: "CP202113",
        description: "Đèn trụ sân vườn hình khối",
        specs: "160*55*600mm, 16W, 3000K",
        image: "/collections/out-door/CP202113/2.jpg"
      }
    ],
    items: [
      { id: 17, image: "/work/vn5/2022_04_25_20_34_IMG_3551.JPG" },
      { id: 18, image: "/work/vn5/2022_04_25_20_35_IMG_3552.JPG" },
      { id: 19, image: "/work/vn5/2022_04_25_20_50_IMG_3553.JPG" },
      { id: 20, image: "/work/vn5/2022_04_25_20_57_IMG_3554.JPG" },
      { id: 21, image: "/work/vn5/2022_04_26_08_57_IMG_3557.JPG" },
      { id: 22, image: "/work/vn5/2022_04_26_21_50_IMG_3567.JPG" },
      { id: 23, image: "/work/vn5/2022_04_26_21_51_IMG_3568.JPG" },
      { id: 24, image: "/work/vn5/2022_04_26_21_51_IMG_3569.JPG" },
      { id: 25, image: "/work/vn5/2022_04_26_21_57_IMG_3570.JPG" },
      { id: 26, image: "/work/vn5/2022_04_28_15_16_IMG_3652.JPG" },
      { id: 27, image: "/work/vn5/2022_04_28_16_33_IMG_3654.JPG" },
      { id: 28, image: "/work/vn5/2022_04_28_16_33_IMG_3655.JPG" },
      { id: 29, image: "/work/vn5/2022_04_28_18_02_IMG_3657.JPG" },
      { id: 30, image: "/work/vn5/2022_04_28_18_18_IMG_3658.JPG" },
      { id: 31, image: "/work/vn5/2022_04_28_18_19_IMG_3659.JPG" },
      { id: 32, image: "/work/vn5/2022_04_28_19_36_IMG_3660.JPG" },
      { id: 33, image: "/work/vn5/2022_04_28_19_36_IMG_3661.JPG" },
      { id: 34, image: "/work/vn5/2022_04_28_19_38_IMG_3662.JPG" },
      { id: 35, image: "/work/vn5/2022_05_04_17_29_IMG_3831.JPG" },
      { id: 36, image: "/work/vn5/2022_05_04_17_29_IMG_3832.JPG" },
      { id: 37, image: "/work/vn5/2022_05_04_17_30_IMG_3833.JPG" },
      { id: 38, image: "/work/vn5/2022_05_04_17_32_IMG_3834.JPG" },
      { id: 39, image: "/work/vn5/2022_05_07_14_01_IMG_0957.JPG" },
      { id: 40, image: "/work/vn5/2022_05_07_14_01_IMG_0958.JPG" },
      { id: 41, image: "/work/vn5/2022_05_07_14_01_IMG_0959.JPG" },
      { id: 42, image: "/work/vn5/2022_05_07_14_01_IMG_0960.JPG" },
      { id: 43, image: "/work/vn5/2022_05_07_14_01_IMG_0961.JPG" },
      { id: 44, image: "/work/vn5/2022_05_07_14_01_IMG_0962.JPG" },
      { id: 45, image: "/work/vn5/2022_05_07_14_01_IMG_0963.JPG" },
      { id: 46, image: "/work/vn5/2022_05_07_14_01_IMG_0964.JPG" },
      { id: 47, image: "/work/vn5/2022_05_07_14_01_IMG_0965.JPG" },
      { id: 48, image: "/work/vn5/2022_05_07_14_01_IMG_0966.JPG" },
      { id: 49, image: "/work/vn5/2022_05_07_14_01_IMG_0967.JPG" },
      { id: 50, image: "/work/vn5/2022_05_07_14_01_IMG_0968.JPG" },
      { id: 51, image: "/work/vn5/2022_05_07_14_01_IMG_0969.JPG" },
      { id: 52, image: "/work/vn5/2022_05_07_14_01_IMG_0970.JPG" },
      { id: 53, image: "/work/vn5/2022_05_07_14_01_IMG_0971.JPG" },
      { id: 54, image: "/work/vn5/2022_05_07_14_01_IMG_0972.JPG" },
      { id: 55, image: "/work/vn5/2022_05_07_14_01_IMG_0973.JPG" },
      { id: 56, image: "/work/vn5/2022_05_07_14_01_IMG_0974.JPG" },
      { id: 57, image: "/work/vn5/2022_05_07_14_01_IMG_0975.JPG" },
      { id: 58, image: "/work/vn5/2022_05_07_14_01_IMG_0976.JPG" },
      { id: 59, image: "/work/vn5/2022_05_07_14_01_IMG_0977.JPG" },
      { id: 60, image: "/work/vn5/2022_05_07_14_01_IMG_0978.JPG" },
      { id: 61, image: "/work/vn5/2022_05_07_14_01_IMG_0979.JPG" },
      { id: 62, image: "/work/vn5/2022_05_07_14_01_IMG_0980.JPG" },
      { id: 63, image: "/work/vn5/2022_05_07_14_01_IMG_0981.JPG" },
      { id: 64, image: "/work/vn5/2022_05_07_14_01_IMG_0982.JPG" },
      { id: 65, image: "/work/vn5/2022_05_07_14_01_IMG_0983.JPG" },
      { id: 66, image: "/work/vn5/2022_05_07_14_01_IMG_0984.JPG" },
      { id: 67, image: "/work/vn5/2022_05_07_14_01_IMG_0985.JPG" }
    ],
  },
  "villa": {
    title: "Nhà riêng",
    description: "Retail lighting design enhancing product displays and creating an immersive shopping experience",
    banner: "/work/vn6/DSC09659_HDR 1.jpg",
    location: "Vietnam",
    application: "Facades, Interior, Public spaces",
    project: "IDA Lighting",
    photo: "IDA Team",
    products: [
      {
        id: "downlight-8",
        name: "PRO.S60 (S)",
        description: "Combo đèn âm trần chống chói chỉnh hướng góc 15°",
        specs: "∅50*H55mm, 4000K, 60°, Ra>97",
        image: "/collections/Downlight/IDA0075.JPG"
      },
      {
        id: "outdoor-v1",
        name: "CP20199",
        description: "Đèn trụ sân vườn",
        specs: "150*150*600mm, 10W, 3000K",
        image: "/collections/out-door/CP20199/6.jpg"
      }
    ],
    items: [
      { id: 27, image: "/work/vn6/DSC09596_HDR.jpg" },
      { id: 28, image: "/work/vn6/DSC09601_HDR.jpg" },
      { id: 29, image: "/work/vn6/DSC09606_HDR.jpg" },
      { id: 30, image: "/work/vn6/DSC09610_HDR 1.jpg" },
      { id: 31, image: "/work/vn6/DSC09616_HDR.jpg" },
      { id: 32, image: "/work/vn6/DSC09628_HDR 1.jpg" },
      { id: 33, image: "/work/vn6/DSC09635_HDR 1.jpg" },
      { id: 34, image: "/work/vn6/DSC09638_HDR 1.jpg" },
      { id: 35, image: "/work/vn6/DSC09641 1.jpg" },
      { id: 36, image: "/work/vn6/DSC09653_HDR 1.jpg" },
      { id: 37, image: "/work/vn6/DSC09659_HDR 1.jpg" },
      { id: 38, image: "/work/vn6/DSC09664_HDR 1.jpg" },
      { id: 39, image: "/work/vn6/DSC09670_HDR 1.jpg" },
      { id: 40, image: "/work/vn6/DSC09674_HDR 1.jpg" },
      { id: 41, image: "/work/vn6/DSC09679_HDR 1.jpg" },
      { id: 42, image: "/work/vn6/DSC09684_HDR 1.jpg" },
      { id: 43, image: "/work/vn6/DSC09695_HDR 1.jpg" },
      { id: 44, image: "/work/vn6/DSC09739_HDR 1.jpg" },
      { id: 45, image: "/work/vn6/DSC09747_HDR 1.jpg" },
      { id: 46, image: "/work/vn6/DSC09752_HDR 1.jpg" },
      { id: 47, image: "/work/vn6/DSC09757_HDR 1.jpg" },
      { id: 48, image: "/work/vn6/DSC09763_HDR 1.jpg" },
      { id: 49, image: "/work/vn6/DSC09771_HDR 1.jpg" },
      { id: 50, image: "/work/vn6/DSC09778_HDR 1.jpg" },
      { id: 51, image: "/work/vn6/DSC09781 1.jpg" },
      { id: 52, image: "/work/vn6/DSC09789 1.jpg" },
      { id: 53, image: "/work/vn6/DSC09792 1.jpg" },
      { id: 54, image: "/work/vn6/DSC09798 1.jpg" },
      { id: 55, image: "/work/vn6/DSC09801 1.jpg" },
      { id: 56, image: "/work/vn6/DSC09813_HDR 1.jpg" },
      { id: 57, image: "/work/vn6/DSC09824_HDR 1.jpg" },
      { id: 58, image: "/work/vn6/DSC09829_HDR 1.jpg" },
      { id: 59, image: "/work/vn6/DSC09835_HDR 1.jpg" },
      { id: 60, image: "/work/vn6/DSC09846 1.jpg" },
      { id: 61, image: "/work/vn6/DSC09853 1.jpg" },
      { id: 62, image: "/work/vn6/DSC09860 1.jpg" },
      { id: 63, image: "/work/vn6/DSC09861 1.jpg" }
    ],
  },
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

