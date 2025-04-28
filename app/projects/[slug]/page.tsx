"use client"

import Header from "@/components/header"
import { notFound } from "next/navigation"
import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion"
import dynamic from "next/dynamic"
import { default as NextImage } from "next/image"

// Lazy load Footer component
const Footer = dynamic(() => import("@/components/footer"), {
  ssr: false,
  loading: () => <div className="py-10 bg-black"></div>,
})

// Lazy load image component
const OptimizedImage = dynamic(() => import("next/image"), {
  ssr: true,
})

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
    title: "STARLAKE PROJECT",
    description: "IDA Lighting – Định hình đẳng cấp bằng ánh sáng.\nHệ thống chiếu sáng được thiết kế chỉn chu từ ngoại thất đến nội thất, tôn vinh vẻ đẹp kiến trúc tinh tế và khu vườn bonsai đắt giá.Ánh sáng được bố trí khéo léo: sắc nét nơi mặt tiền, nhẹ nhàng dưới từng tán cây, và tinh tế trong từng không gian sinh hoạt.Với IDA Lighting, mỗi điểm sáng không chỉ làm nổi bật vẻ đẹp công trình mà còn đem đến cảm xúc sang trọng và ấm áp cho gia chủ.",
    banner: "/work/IDA_Starlake/TRC_7559.jpg",
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
      { id: 1, image: "/work/IDA_Starlake/TRC_7559.jpg" },
      { id: 2, image: "/work/IDA_Starlake/TRC_7561.jpg" },
      { id: 3, image: "/work/IDA_Starlake/TRC_7562.jpg" },
      { id: 4, image: "/work/IDA_Starlake/TRC_7565.jpg" },
      { id: 5, image: "/work/IDA_Starlake/TRC_7568.jpg" },
      { id: 6, image: "/work/IDA_Starlake/TRC_7569.jpg" },
      { id: 7, image: "/work/IDA_Starlake/TRC_7570.jpg" },
      { id: 8, image: "/work/IDA_Starlake/TRC_7571.jpg" },
      { id: 9, image: "/work/IDA_Starlake/TRC_7572.jpg" },
      { id: 10, image: "/work/IDA_Starlake/TRC_7576.jpg" },
      { id: 11, image: "/work/IDA_Starlake/TRC_7577.jpg" },
      { id: 12, image: "/work/IDA_Starlake/TRC_7579.jpg" },
      { id: 13, image: "/work/IDA_Starlake/TRC_7582.jpg" },
      { id: 14, image: "/work/IDA_Starlake/TRC_7585.jpg" },
      { id: 15, image: "/work/IDA_Starlake/TRC_7586.jpg" },
      { id: 16, image: "/work/IDA_Starlake/TRC_7587.jpg" },
      { id: 17, image: "/work/IDA_Starlake/TRC_7588.jpg" },
      { id: 18, image: "/work/IDA_Starlake/TRC_7719.jpg" },
      { id: 19, image: "/work/IDA_Starlake/TRC_7720.jpg" },
      { id: 20, image: "/work/IDA_Starlake/TRC_7721.jpg" },
      { id: 21, image: "/work/IDA_Starlake/TRC_7722.jpg" },
      { id: 22, image: "/work/IDA_Starlake/TRC_7723.jpg" },
      { id: 23, image: "/work/IDA_Starlake/TRC_7724.jpg" },
      { id: 24, image: "/work/IDA_Starlake/TRC_7725.jpg" },
      { id: 25, image: "/work/IDA_Starlake/TRC_7726.jpg" },
      { id: 26, image: "/work/IDA_Starlake/TRC_7728.jpg" },
      { id: 27, image: "/work/IDA_Starlake/TRC_7729.jpg" },
      { id: 28, image: "/work/IDA_Starlake/TRC_7731.jpg" },
      { id: 29, image: "/work/IDA_Starlake/TRC_7744.jpg" },
      { id: 30, image: "/work/IDA_Starlake/TRC_7745.jpg" },
      { id: 31, image: "/work/IDA_Starlake/TRC_7746.jpg" },
      { id: 32, image: "/work/IDA_Starlake/TRC_7748.jpg" },
      { id: 33, image: "/work/IDA_Starlake/TRC_7749.jpg" },
      { id: 34, image: "/work/IDA_Starlake/TRC_7751.jpg" },
      { id: 35, image: "/work/IDA_Starlake/TRC_7752.jpg" },
      { id: 36, image: "/work/IDA_Starlake/TRC_7754.jpg" },
      { id: 37, image: "/work/IDA_Starlake/TRC_7755.jpg" },
      { id: 38, image: "/work/IDA_Starlake/TRC_7756.jpg" },
      { id: 39, image: "/work/IDA_Starlake/TRC_7757.jpg" },
    ],
  },
  koicafe: {
    title: "KOI CAFE",
    description: "Atmospheric lighting design for the trendy Koi Cafe space, creating a warm and inviting ambiance for customers",
    banner: "/work/koi cafe/2020_11_21_14_18_IMG_0138-min.JPG",
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
      { id: 1, image: "/work/koi cafe/2020_11_21_15_39_IMG_0140-min.JPG" },
      { id: 2, image: "/work/koi cafe/2020_11_21_14_12_IMG_0136-min.JPG" },
      { id: 3, image: "/work/koi cafe/2020_11_21_15_06_IMG_0139-min.JPG" },
      { id: 4, image: "/work/koi cafe/2020_11_21_17_54_IMG_0152-min.JPG" },
      { id: 5, image: "/work/koi cafe/2020_11_21_16_45_IMG_0142-min.JPG" },
      { id: 6, image: "/work/koi cafe/2020_11_21_17_43_IMG_0147-min.JPG" },
      { id: 7, image: "/work/koi cafe/2020_11_21_17_46_IMG_0148-min.JPG" },
      { id: 8, image: "/work/koi cafe/2020_11_21_17_49_IMG_0150-min.JPG" },
      { id: 9, image: "/work/koi cafe/2020_11_21_14_12_IMG_0137-min.JPG" },
      { id: 10, image: "/work/koi cafe/2020_11_21_17_55_IMG_0153-min.JPG" },
      { id: 11, image: "/work/koi cafe/150030371_266236301548582_2927341516468461359_n-min.jpg" },
      { id: 12, image: "/work/koi cafe/297064468_596248115214064_7650294870205169416_n-min.jpg" },
      { id: 13, image: "/work/koi cafe/2020_11_21_16_44_IMG_0141-min.JPG" },
      { id: 14, image: "/work/koi cafe/2020_11_21_17_34_IMG_0143-min.JPG" },
      { id: 15, image: "/work/koi cafe/2020_11_21_17_35_IMG_0144-min.JPG" },
      { id: 16, image: "/work/koi cafe/2020_11_21_17_37_IMG_0145-min.JPG" },
      { id: 17, image: "/work/koi cafe/2020_11_21_17_42_IMG_0146-min.JPG" },
      { id: 18, image: "/work/koi cafe/2020_11_21_17_46_IMG_0149-min.JPG" },
      { id: 19, image: "/work/koi cafe/2020_11_21_17_54_IMG_0151-min.JPG" }
    ],
  },
  residential: {
    title: "RESIDENTIAL LIGHTING",
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
    title: "COMMERCIAL LIGHTING",
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
    ],
  },
  "an-house": {
    title: "AN HOUSE CAFE",
    description: "IDA Lighting – Tôn vinh vẻ đẹp tự nhiên bằng nghệ thuật ánh sáng. Hệ thống chiếu sáng được thiết kế tinh tế, khai thác tối đa nét đẹp mộc mạc của sân vườn và kiến trúc ngôi nhà. Ánh sáng ấm áp, nhẹ nhàng lan tỏa từ khu vườn, hàng hiên đến không gian sinh hoạt bên trong, tạo nên sự kết nối mượt mà giữa thiên nhiên và đời sống. Với IDA Lighting, mỗi điểm sáng không chỉ phục vụ công năng, mà còn làm bật lên vẻ đẹp giản dị, gần gũi nhưng đầy chiều sâu của ngôi nhà.",
    banner: "/work/An-Cafe/273036452_476970200609189_519737183736654516_n.jpg",
    location: "Vietnam",
    application: "Interior, Entertainment, Facades",
    project: "IDA Lighting",
    photo: "IDA Team",
    products: [
      {
        id: "pendant-cafe",
        name: "Pendant Light Cafe",
        description: "Đèn thả trang trí với ánh sáng ấm áp",
        specs: "2700K, 12W, IP20",
        image: "/placeholder.svg?text=Pendant+Light"
      },
      {
        id: "track-light-cafe",
        name: "Track Light Cafe",
        description: "Đèn rọi ray điều chỉnh được góc chiếu",
        specs: "3000K, 9W, 24°, IP20",
        image: "/placeholder.svg?text=Track+Light"
      }
    ],
    items: [
      { id: 1, image: "/work/An-Cafe/273036452_476970200609189_519737183736654516_n.jpg" },
      { id: 2, image: "/work/An-Cafe/273153054_476970020609207_1953069252824951596_n.jpg" },
      { id: 3, image: "/work/An-Cafe/273145338_476969410609268_4232080327976446112_n.jpg" },
      { id: 4, image: "/work/An-Cafe/273097633_476970090609200_8207569673886408840_n.jpg" },
      { id: 5, image: "/work/An-Cafe/273044179_476970220609187_3768350115792204449_n.jpg" },
      { id: 6, image: "/work/An-Cafe/273040919_476970307275845_7621753489078212460_n.jpg" },
      { id: 7, image: "/work/An-Cafe/273020676_476969253942617_8496593909134627452_n.jpg" },
      { id: 8, image: "/work/An-Cafe/273012846_476969990609210_5032301823756282491_n.jpg" },
      { id: 9, image: "/work/An-Cafe/273011262_476970323942510_8270373612534376329_n.jpg" },
      { id: 10, image: "/work/An-Cafe/273009783_476969967275879_3232670678817827375_n.jpg" },
      { id: 11, image: "/work/An-Cafe/273006171_476970603942482_5412547294444936745_n.jpg" },
      { id: 12, image: "/work/An-Cafe/272997168_476963463943196_4364219283871969024_n.jpg" },
      { id: 13, image: "/work/An-Cafe/272989059_476970047275871_5931971642207911985_n.jpg" },
      { id: 14, image: "/work/An-Cafe/272985496_476963490609860_4483102597761457761_n.jpg" },
      { id: 15, image: "/work/An-Cafe/272980580_476970360609173_5273232442304297218_n.jpg" },
      { id: 16, image: "/work/An-Cafe/272978022_476969860609223_2914778970330520994_n.jpg" },
      { id: 17, image: "/work/An-Cafe/272977978_476970263942516_1004164692432689240_n.jpg" },
      { id: 18, image: "/work/An-Cafe/272969349_476969883942554_2010372399852259210_n.jpg" },
      { id: 19, image: "/work/An-Cafe/272953823_476970530609156_8540554412566475554_n.jpg" },
      { id: 20, image: "/work/An-Cafe/272952702_476969480609261_3552277787493408036_n.jpg" },
      { id: 21, image: "/work/An-Cafe/272950380_476970063942536_1891645111920650179_n.jpg" },
      { id: 22, image: "/work/An-Cafe/272925080_476970640609145_2090219521710712024_n.jpg" },
      { id: 23, image: "/work/An-Cafe/272923701_476970007275875_7916882954717063419_n.jpg" },
      { id: 24, image: "/work/An-Cafe/272915144_476967787276097_6866459614991483205_n.jpg" },
      { id: 25, image: "/work/An-Cafe/272905502_476969947275881_6792890762343098025_n.jpg" },
      { id: 26, image: "/work/An-Cafe/272905103_476969700609239_7296056438247620035_n.jpg" },
      { id: 27, image: "/work/An-Cafe/272904596_476969780609231_2450749147280200196_n.jpg" },
      { id: 28, image: "/work/An-Cafe/272896867_476969750609234_168858909764072575_n.jpg" },
      { id: 29, image: "/work/An-Cafe/272896115_476970103942532_317586839310745103_n.jpg" },
      { id: 30, image: "/work/An-Cafe/272889537_476969533942589_3012475385227198172_n.jpg" },
      { id: 31, image: "/work/An-Cafe/272888736_476969803942562_3556880259685266629_n.jpg" },
      { id: 32, image: "/work/An-Cafe/272887816_476970567275819_6703812009959233606_n.jpg" },
      { id: 33, image: "/work/An-Cafe/272881064_476969827275893_7452532553828505582_n.jpg" },
      { id: 34, image: "/work/An-Cafe/272878589_476970037275872_4575077158475970283_n.jpg" },
      { id: 35, image: "/work/An-Cafe/272874406_476969500609259_5163052348461260576_n.jpg" },
      { id: 36, image: "/work/An-Cafe/272862353_476969273942615_1782160660840719939_n.jpg" },
      { id: 37, image: "/work/An-Cafe/272862333_476969937275882_5995076349875201529_n.jpg" },
      { id: 38, image: "/work/An-Cafe/272860313_476969677275908_7190793267840767901_n.jpg" },
      { id: 39, image: "/work/An-Cafe/272860292_476969310609278_8967172397754355945_n.jpg" },
      { id: 40, image: "/work/An-Cafe/272859434_476970393942503_2527941663293977426_n.jpg" },
      { id: 41, image: "/work/An-Cafe/272855666_476963350609874_4027803332054735399_n.jpg" },
      { id: 42, image: "/work/An-Cafe/272844745_476970850609124_8085639326872499942_n.jpg" },
      { id: 43, image: "/work/An-Cafe/272842271_476970130609196_2220981759536775288_n.jpg" },
      { id: 44, image: "/work/An-Cafe/272841642_476970700609139_5550813206735608644_n.jpg" },
      { id: 45, image: "/work/An-Cafe/272825487_476969437275932_8926422362445058443_n.jpg" },
      { id: 46, image: "/work/An-Cafe/272814280_476969460609263_771711073144436249_n.jpg" },
      { id: 47, image: "/work/An-Cafe/272795484_476970173942525_8341974085553444627_n.jpg" },
      { id: 48, image: "/work/An-Cafe/272782740_476970147275861_7547076805916605831_n.jpg" },
      { id: 49, image: "/work/An-Cafe/272748837_476969580609251_7533456975364801662_n.jpg" },
      { id: 50, image: "/work/An-Cafe/271788453_464562571849952_4359803997906251766_n.jpg" },
      { id: 51, image: "/work/An-Cafe/271627212_464562651849944_8265829503232498916_n.jpg" },
      { id: 52, image: "/work/An-Cafe/271597302_464562588516617_461312111088783072_n.jpg" }
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
    title: "Koi Garden",
    description: "Premium outdoor space lighting with elegant water features and landscaping",
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
    title: "NHÀ RIÊNG",
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
      { id: 6, image: "/work/vn2/z4279796478648_6f87d8600736f8a18bc1d2e21ab88b6a.jpg" }
    ],
  },
  "luxury-villas": {
    title: "NHÀ RIÊNG",
    description: "Cultural lighting design highlighting architectural elements and historical significance",
    banner: "/work/vn3/2022_09_26_19_34_IMG_8523.JPG",
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
      { id: 1, image: "/work/vn3/2022_05_04_06_51_IMG_3810-min.JPG" },
      { id: 2, image: "/work/vn3/2022_05_04_06_51_IMG_3811-min.JPG" },
      { id: 3, image: "/work/vn3/2022_08_03_07_29_IMG_6852-min.JPG" },
      { id: 4, image: "/work/vn3/2022_08_03_14_36_IMG_6854-min.JPG" },
      { id: 5, image: "/work/vn3/2022_08_03_17_02_IMG_6865-min.JPG" },
      { id: 6, image: "/work/vn3/2022_08_03_17_02_IMG_6866-min.JPG" },
      { id: 7, image: "/work/vn3/2022_08_03_18_01_IMG_6868-min.JPG" },
      { id: 8, image: "/work/vn3/2022_08_03_18_01_IMG_6869-min.JPG" },
      { id: 9, image: "/work/vn3/2022_08_04_10_17_IMG_6879-min.JPG" },
      { id: 10, image: "/work/vn3/2022_08_04_11_43_IMG_6880-min.JPG" },
      { id: 11, image: "/work/vn3/2022_09_26_17_50_IMG_8515-min.JPG" },
      { id: 12, image: "/work/vn3/2022_09_26_19_34_IMG_8523.JPG" },
      { id: 13, image: "/work/vn3/2022_09_26_19_34_IMG_8524.JPG" },
      { id: 14, image: "/work/vn3/2022_09_26_19_38_IMG_8526.JPG" },
      { id: 15, image: "/work/vn3/2022_09_26_19_38_IMG_8529.JPG" },
      { id: 16, image: "/work/vn3/2022_09_26_19_39_IMG_8531.JPG" },
      { id: 17, image: "/work/vn3/2022_09_26_19_39_IMG_8532.JPG" },
      { id: 18, image: "/work/vn3/2022_09_26_19_39_IMG_8533.JPG" },
      { id: 19, image: "/work/vn3/2022_09_26_19_39_IMG_8534.JPG" },
      { id: 20, image: "/work/vn3/2022_09_26_19_41_IMG_8538.JPG" },
      { id: 21, image: "/work/vn3/2022_09_26_19_41_IMG_8539.JPG" },
      { id: 22, image: "/work/vn3/2022_09_26_19_41_IMG_8540.JPG" },
      { id: 23, image: "/work/vn3/2022_09_26_19_42_IMG_8541.JPG" },
      { id: 24, image: "/work/vn3/2022_09_26_19_42_IMG_8542.JPG" }
    ],
  },
  "retail": {
    title: "BAMBOO CAFE",
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
      { id: 18, image: "/work/vn4/2020_12_24_15_07_IMG_0298-min.JPG" },
      { id: 19, image: "/work/vn4/2020_12_24_15_08_IMG_0299-min.JPG" },
      { id: 20, image: "/work/vn4/2020_12_24_15_08_IMG_0300-min.JPG" },
      { id: 21, image: "/work/vn4/2020_12_24_15_11_IMG_0301-min.JPG" },
      { id: 22, image: "/work/vn4/2020_12_24_15_11_IMG_0302-min.JPG" },
      { id: 23, image: "/work/vn4/2020_12_24_15_12_IMG_0303-min.JPG" },
      { id: 24, image: "/work/vn4/2020_12_24_15_13_IMG_0304-min.JPG" },
      { id: 25, image: "/work/vn4/2020_12_24_15_14_IMG_0305-min.JPG" },
      { id: 26, image: "/work/vn4/2020_12_26_19_47_IMG_0306-min.JPG" },
      { id: 27, image: "/work/vn4/2020_12_26_19_48_IMG_0307-min.JPG" },
      { id: 28, image: "/work/vn4/2020_12_26_19_49_IMG_0308-min.JPG" },
      { id: 29, image: "/work/vn4/2020_12_26_19_49_IMG_0309-min.JPG" },
      { id: 30, image: "/work/vn4/2020_12_26_19_50_IMG_0310-min.JPG" },
      { id: 31, image: "/work/vn4/2020_12_26_19_52_IMG_0311-min.JPG" },
      { id: 32, image: "/work/vn4/2020_12_26_19_52_IMG_0312-min.JPG" },
      { id: 33, image: "/work/vn4/2020_12_26_19_53_IMG_0313-min.JPG" },
      { id: 34, image: "/work/vn4/2020_12_26_19_53_IMG_0314-min.JPG" },
      { id: 35, image: "/work/vn4/2020_12_26_20_07_IMG_0315-min.JPG" },
      { id: 36, image: "/work/vn4/2021_01_21_21_09_IMG_0340-min.JPG" },
      { id: 37, image: "/work/vn4/2021_01_21_21_09_IMG_0341-min.JPG" },
      { id: 38, image: "/work/vn4/2021_01_21_21_09_IMG_0342-min.JPG" },
      { id: 39, image: "/work/vn4/2021_01_24_20_15_IMG_0353-min.JPG" },
      { id: 40, image: "/work/vn4/2021_01_24_20_16_IMG_0354-min.JPG" },
      { id: 41, image: "/work/vn4/2021_01_24_20_18_IMG_0358-min.JPG" },
      { id: 42, image: "/work/vn4/2021_02_01_11_03_IMG_0377-min.JPG" },
      { id: 43, image: "/work/vn4/2021_02_01_11_04_IMG_0378-min.JPG" },
      { id: 44, image: "/work/vn4/2021_02_09_23_18_IMG_0412-min.JPG" },
      { id: 45, image: "/work/vn4/2021_02_09_23_19_IMG_0413-min.JPG" },
      { id: 46, image: "/work/vn4/2021_02_09_23_20_IMG_0414-min.JPG" },
      { id: 47, image: "/work/vn4/2021_02_09_23_20_IMG_0415-min.JPG" },
      { id: 48, image: "/work/vn4/2021_02_10_20_53_IMG_0416-min.JPG" },
      { id: 49, image: "/work/vn4/2021_02_10_20_53_IMG_0417-min.JPG" },
      { id: 50, image: "/work/vn4/2021_02_10_20_53_IMG_0418-min.JPG" },
      { id: 51, image: "/work/vn4/2021_02_10_20_53_IMG_0419-min.JPG" },
      { id: 52, image: "/work/vn4/2021_03_01_22_20_IMG_0879-min.JPG" },
      { id: 53, image: "/work/vn4/2021_03_24_20_55_IMG_0422-min.JPG" },
      { id: 54, image: "/work/vn4/2021_03_24_20_56_IMG_0423-min.JPG" },
      { id: 55, image: "/work/vn4/2021_04_14_20_43_IMG_0426-min.JPG" },
      { id: 56, image: "/work/vn4/2021_04_14_20_44_IMG_0429-min.JPG" }
    ],
  },
  "mochi-cafe": {
    title: "MOCHI CAFE",
    description: "Entertainment lighting solutions for outdoor recreational areas and public spaces",
    banner: "/work/vn5/2022_04_26_21_51_IMG_3568.JPG",
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
      { id: 1, image: "/work/vn5/2022_04_25_20_35_IMG_3552.JPG" },
      { id: 2, image: "/work/vn5/2022_04_25_20_50_IMG_3553.JPG" },
      { id: 3, image: "/work/vn5/2022_04_25_20_57_IMG_3554.JPG" },
      { id: 4, image: "/work/vn5/2022_04_26_08_57_IMG_3557.JPG" },
      { id: 5, image: "/work/vn5/2022_04_26_21_50_IMG_3567.JPG" },
      { id: 6, image: "/work/vn5/2022_04_26_21_51_IMG_3568.JPG" },
      { id: 7, image: "/work/vn5/2022_04_26_21_51_IMG_3569.JPG" },
      { id: 8, image: "/work/vn5/2022_04_26_21_57_IMG_3570.JPG" },
      { id: 9, image: "/work/vn5/2022_04_28_18_02_IMG_3657.JPG" },
      { id: 10, image: "/work/vn5/2022_04_28_18_18_IMG_3658.JPG" },
      { id: 11, image: "/work/vn5/2022_04_28_18_19_IMG_3659.JPG" },
      { id: 12, image: "/work/vn5/2022_04_28_19_38_IMG_3662.JPG" },
      { id: 13, image: "/work/vn5/2022_05_04_17_29_IMG_3831.JPG" },
      { id: 14, image: "/work/vn5/2022_05_04_17_29_IMG_3832.JPG" },
      { id: 15, image: "/work/vn5/2022_05_04_17_32_IMG_3834.JPG" },
      { id: 16, image: "/work/vn5/2022_05_07_14_01_IMG_0957.JPG" },
      { id: 17, image: "/work/vn5/2022_05_07_14_01_IMG_0958.JPG" },
      { id: 18, image: "/work/vn5/2022_05_07_14_01_IMG_0959.JPG" },
      { id: 19, image: "/work/vn5/2022_05_07_14_01_IMG_0960.JPG" },
      { id: 20, image: "/work/vn5/2022_05_07_14_01_IMG_0961.JPG" },
      { id: 21, image: "/work/vn5/2022_05_07_14_01_IMG_0962.JPG" },
      { id: 22, image: "/work/vn5/2022_05_07_14_01_IMG_0963.JPG" },
      { id: 23, image: "/work/vn5/2022_05_07_14_01_IMG_0964.JPG" },
      { id: 24, image: "/work/vn5/2022_05_07_14_01_IMG_0965.JPG" },
      { id: 25, image: "/work/vn5/2022_05_07_14_01_IMG_0966.JPG" },
      { id: 26, image: "/work/vn5/2022_05_07_14_01_IMG_0967.JPG" },
      { id: 27, image: "/work/vn5/2022_05_07_14_01_IMG_0968.JPG" },
      { id: 28, image: "/work/vn5/2022_05_07_14_01_IMG_0969.JPG" },
      { id: 29, image: "/work/vn5/2022_05_07_14_01_IMG_0970.JPG" },
      { id: 30, image: "/work/vn5/2022_05_07_14_01_IMG_0971.JPG" },
      { id: 31, image: "/work/vn5/2022_05_07_14_01_IMG_0972.JPG" },
      { id: 32, image: "/work/vn5/2022_05_07_14_01_IMG_0973.JPG" },
      { id: 33, image: "/work/vn5/2022_05_07_14_01_IMG_0975.JPG" },
      { id: 34, image: "/work/vn5/2022_05_07_14_01_IMG_0977.JPG" },
      { id: 35, image: "/work/vn5/2022_05_07_14_01_IMG_0979.JPG" },
      { id: 36, image: "/work/vn5/2022_05_07_14_01_IMG_0981.JPG" },
      { id: 37, image: "/work/vn5/2022_05_07_14_01_IMG_0982.JPG" },
      { id: 38, image: "/work/vn5/2022_05_07_14_01_IMG_0984.JPG" },
      { id: 39, image: "/work/vn5/z4657774934112_d8b2f2aecd365287e273366f2f91c7a9.jpg" },
      { id: 40, image: "/work/vn5/z4657774950267_06e274dbe712f58d3f7da8f7c749a344.jpg" },
      { id: 41, image: "/work/vn5/z4657774952734_d2b8a186b3afc4425c0ac34aa0b16a30.jpg" }
    ],
  },
  "villa": {
    title: "NHÀ RIÊNG",
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
  "long-house": {
    title: "LONG HOUSE",
    description: "IDA Lighting – Thắp sáng không gian sống bằng cảm xúc. Ánh sáng được thiết kế xuyên suốt từ sân vườn, lối đi đến từng phòng trong nhà, kết nối thiên nhiên với nội thất một cách tự nhiên và hài hòa. Từng cụm cây, phiến đá, bức tường đều được chiếu sáng khéo léo, vừa đủ để tôn vinh vẻ đẹp mộc mạc, vừa tạo nên chiều sâu ấm cúng cho tổng thể. Với IDA Lighting, mỗi điểm sáng không chỉ để soi tỏ, mà còn để nuôi dưỡng cảm giác bình yên trong từng khoảnh khắc sống.",
    banner: "/work/long-house/_TRC7471-min.jpg",
    location: "Vietnam",
    application: "Facades, Interior, Landscape",
    project: "IDA Lighting",
    photo: "IDA Team",
    products: [
      {
        id: "downlight-lh",
        name: "PRO.S60 (W)",
        description: "Đèn âm trần chống chói",
        specs: "∅50*H75mm, 15W, 60°, 97Ra",
        image: "/collections/Downlight/IDA0075.JPG"
      },
      {
        id: "outdoor-lh",
        name: "CP20188",
        description: "Đèn trụ sân vườn",
        specs: "160*55*600mm, 10W, 3000K",
        image: "/collections/out-door/CP20188/4.jpg"
      }
    ],
    items: [
      { id: 1, image: "/work/long-house/_TRC7253-min.jpg" },
      { id: 2, image: "/work/long-house/_TRC7254-min.jpg" },
      { id: 3, image: "/work/long-house/_TRC7255-min.jpg" },
      { id: 4, image: "/work/long-house/_TRC7258-min.jpg" },
      { id: 5, image: "/work/long-house/_TRC7261-min.jpg" },
      { id: 6, image: "/work/long-house/_TRC7266-min.jpg" },
      { id: 7, image: "/work/long-house/_TRC7410-min.jpg" },
      { id: 8, image: "/work/long-house/_TRC7413-min.jpg" },
      { id: 9, image: "/work/long-house/_TRC7420-min.jpg" },
      { id: 10, image: "/work/long-house/_TRC7428-min.jpg" },
      { id: 11, image: "/work/long-house/_TRC7440-min.jpg" },
      { id: 12, image: "/work/long-house/_TRC7442-min.jpg" },
      { id: 13, image: "/work/long-house/_TRC7443-min.jpg" },
      { id: 14, image: "/work/long-house/_TRC7455-min.jpg" },
      { id: 15, image: "/work/long-house/_TRC7470-min.jpg" },
      { id: 16, image: "/work/long-house/_TRC7471-min.jpg" },
      { id: 17, image: "/work/long-house/_TRC7472-min.jpg" },
      { id: 18, image: "/work/long-house/_TRC7474-min.jpg" },
      { id: 19, image: "/work/long-house/_TRC7477-min.jpg" },
      { id: 20, image: "/work/long-house/_TRC7478-min.jpg" },
      { id: 21, image: "/work/long-house/_TRC6913.jpg" },
      { id: 22, image: "/work/long-house/_TRC6920.jpg" },
      { id: 23, image: "/work/long-house/_TRC6934.jpg" },
      { id: 24, image: "/work/long-house/_TRC6943.jpg" },
      { id: 25, image: "/work/long-house/_TRC6944.jpg" },
      { id: 26, image: "/work/long-house/_TRC6946.jpg" },
      { id: 27, image: "/work/long-house/_TRC6947.jpg" },
      { id: 28, image: "/work/long-house/_TRC6962.jpg" },
      { id: 29, image: "/work/long-house/_TRC6964.jpg" },
      { id: 30, image: "/work/long-house/_TRC6966.jpg" },
      { id: 31, image: "/work/long-house/_TRC6968.jpg" },
      { id: 32, image: "/work/long-house/_TRC6985.jpg" },
      { id: 33, image: "/work/long-house/_TRC6996.jpg" },
      { id: 34, image: "/work/long-house/_TRC7000.jpg" },
      { id: 35, image: "/work/long-house/_TRC7153.jpg" }
    ],
  },
  "villa-44": {
    title: "VILLA 44 HÀ NỘI",
    description: "IDA Lighting – Kiến tạo không gian sống bằng ngôn ngữ của ánh sáng.Trong dự án lần này, chúng tôi đồng hành cùng gia chủ để thiết kế và thi công hệ thống chiếu sáng, với mong muốn không chỉ chiếu sáng không gian mà còn thắp lên cảm xúc.Ở mỗi bước chân trong căn nhà này, bạn đều cảm nhận được sự cân bằng giữa kỹ thuật chính xác và sự tinh tế trong cảm xúc — đó cũng chính là triết lý mà IDA Lighting luôn theo đuổi",
    banner: "/work/villa-44/TRC_9185-min.jpg",
    location: "Hanoi, Vietnam",
    application: "Facades, Interior, Landscape, Smart Home",
    project: "IDA Lighting",
    photo: "IDA Team",
    products: [
      {
        id: "downlight-v44",
        name: "PRO.S60 (W)",
        description: "Recessed downlight with adjustable beam angle",
        specs: "3000K, 15W, 60°, IP44, 97Ra",
        image: "/collections/Downlight/IDA0075.JPG"
      },
      {
        id: "outdoor-v44",
        name: "CP20188",
        description: "Đèn trụ sân vườn",
        specs: "160*55*600mm, 10W, 3000K",
        image: "/collections/out-door/CP20188/4.jpg"
      }
    ],
    items: [
      { id: 1, image: "/work/villa-44/TRC_9185-min.jpg" },
      { id: 2, image: "/work/villa-44/TRC_9186-min.jpg" },
      { id: 3, image: "/work/villa-44/TRC_9195-min.jpg" },
      { id: 4, image: "/work/villa-44/TRC_9197-min.jpg" },
      { id: 5, image: "/work/villa-44/TRC_9198-min.jpg" },
      { id: 6, image: "/work/villa-44/TRC_9199-min.jpg" },
      { id: 7, image: "/work/villa-44/TRC_9276-min.jpg" },
      { id: 8, image: "/work/villa-44/TRC_9282-min.jpg" },
      { id: 9, image: "/work/villa-44/TRC_9298-min.jpg" },
      { id: 10, image: "/work/villa-44/TRC_9299-min.jpg" },
      { id: 11, image: "/work/villa-44/TRC_9309-min.jpg" },
      { id: 12, image: "/work/villa-44/TRC_9329-min.jpg" },
      { id: 13, image: "/work/villa-44/TRC_9352-min.jpg" },
      { id: 14, image: "/work/villa-44/TRC_9373-min.jpg" },
      { id: 15, image: "/work/villa-44/TRC_9397-min.jpg" },
      { id: 16, image: "/work/villa-44/TRC_9417-min.jpg" },
      { id: 17, image: "/work/villa-44/TRC_9461-min.jpg" },
      { id: 18, image: "/work/villa-44/TRC_9467-min.jpg" },
      { id: 19, image: "/work/villa-44/TRC_9473-min.jpg" },
      { id: 20, image: "/work/villa-44/TRC_9476-min.jpg" },
      { id: 21, image: "/work/villa-44/TRC_9483-min.jpg" }
    ],
  },
}

type ProjectPageProps = {
  params: { slug: string }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const slug = params?.slug || '';
  
  // Kiểm tra dự án có tồn tại không và trả về notFound nếu không
  if (!projects[slug as keyof typeof projects]) {
    notFound()
  }

  const project = projects[slug as keyof typeof projects]
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZooming, setIsZooming] = useState(false)
  
  // Cache lại mảng hình ảnh để tránh tạo mới mỗi lần render
  const allImages = useMemo(() => 
    project ? [project.banner, ...project.items.map(item => item.image)] : [],
    [project]
  )
  
  // Khởi tạo selected product nếu có
  useEffect(() => {
    if (project.products.length > 0 && !selectedProduct) {
      setSelectedProduct(project.products[0])
    }
  }, [project, selectedProduct])
  
  // Enhanced parallax scroll effect với tối ưu
  const { scrollYProgress } = useScroll()
  
  // Memoize các transformation để tránh tính toán lại
  const bannerY = useTransform(scrollYProgress, [0, 1], [0, 50])
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -15])
  const descriptionY = useTransform(scrollYProgress, [0.1, 0.5], [0, -20])
  // Thêm sliderScale transformation
  const sliderScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05])
  
  // Zoom animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsZooming(prev => !prev)
    }, 8000)
    
    return () => clearInterval(interval)
  }, [])
  
  // Tối ưu chức năng navigation hình ảnh
  const goToNextImage = useCallback(() => {
    const nextIndex = (currentImageIndex + 1) % allImages.length
    setCurrentImageIndex(nextIndex)
  }, [currentImageIndex, allImages.length])
  
  const goToPrevImage = useCallback(() => {
    const prevIndex = (currentImageIndex === 0) ? allImages.length - 1 : currentImageIndex - 1
    setCurrentImageIndex(prevIndex)
  }, [currentImageIndex, allImages.length])
  
  // Cải thiện performance cho gallery với memo
  const GalleryItem = useCallback(({ item, index }: { item: ProjectItem, index: number }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { 
      once: true,
      amount: 0.1,
      margin: "0px 0px 100px 0px" 
    })
    
    return (
      <motion.div 
        ref={ref}
        className="relative overflow-hidden rounded-md"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={isInView ? 
          { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } } : 
          { opacity: 0, scale: 0.92 }
        }
      >
        <motion.div 
          className="aspect-[4/3] w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: isInView ? [1.1, 1.03, 1] : 1.1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="w-full h-full relative">
            <NextImage
              key={`gallery-${item.id}`}
              src={item.image}
              alt={item.title || `Project image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={85}
            />
          </div>
        </motion.div>
      </motion.div>
    )
  }, [])

  // Let's split the JSX to simplify the render tree
  const renderGallery = useMemo(() => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {project.items.map((item, idx) => (
          <GalleryItem key={item.id} item={item} index={idx} />
        ))}
      </div>
    )
  }, [GalleryItem, project.items])

  // Optimize slider component to prevent reflow and repaints
  const renderImageSlider = useCallback(() => {
    return (
      <div className="relative aspect-[16/9] mb-8 overflow-hidden rounded-md">
        <motion.div 
          className="relative h-full"
          initial={{ scale: 1 }}
          animate={{ scale: isZooming ? 1.02 : 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentImageIndex}
              className="relative w-full h-full"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {allImages[currentImageIndex]?.endsWith('.mp4') ? (
                <video 
                  src={allImages[currentImageIndex]} 
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <NextImage 
                  src={allImages[currentImageIndex]} 
                  alt={`Gallery image ${currentImageIndex + 1}`}
                  className="object-cover"
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  quality={90}
                  priority={currentImageIndex === 0}
                />
              )}
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation arrows with improved hover effects */}
          <button 
            onClick={goToPrevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={goToNextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
            {currentImageIndex + 1} / {allImages.length}
          </div>
        </motion.div>
      </div>
    )
  }, [allImages, currentImageIndex, goToPrevImage, goToNextImage, isZooming])

  return (
    <main className="min-h-screen bg-gradient-to-r from-black via-black to-[#8B2323] text-white">
      <Header />
      
      {/* New layout with simplified DOM structure */}
      <div className="container mx-auto pt-32 pb-16 px-4 md:px-8">
        {/* Project title with simplified styling */}
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {project.title}
        </motion.h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main image */}
          <div className="lg:w-2/3">
            <motion.div 
              className="relative aspect-[16/9] mb-4 overflow-hidden rounded-md"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
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
                <motion.div 
                  className="relative h-full overflow-hidden"
                  animate={{ scale: isZooming ? 1.03 : 1 }}
                  transition={{ duration: 5, ease: "easeInOut" }}
                >
                  <div className="relative w-full h-full">
                    <NextImage 
                      src={project.banner} 
                      alt={project.title}
                      className="object-cover"
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      quality={95}
                      priority
                    />
                  </div>
                  
                  {/* Product indicators with simplified DOM */}
                  {project.products.slice(0, 2).map((product, index) => (
                    <motion.button
                      key={product.id}
                      className={`absolute w-8 h-8 rounded-full flex items-center justify-center 
                                 transition-colors ${selectedProduct?.id === product.id 
                                   ? 'bg-red-600 text-white' 
                                   : 'bg-white text-black border border-gray-300'}`}
                      style={{
                        left: `${20 + (index * 15)}%`,
                        top: '70%',
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                      onClick={() => setSelectedProduct(product)}
                    >
                      {index + 1}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </motion.div>
            
            {/* Image slider with optimized DOM */}
            {renderImageSlider()}
            
            {/* Project description with simplified styling */}
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-lg leading-relaxed mb-8 text-gray-200">{project.description}</p>
              
              {/* Products section - visible only on mobile/tablet */}
              <div className="mt-12 lg:hidden">
                <h2 className="text-2xl font-bold mb-4">Products</h2>
                
                {selectedProduct && (
                  <motion.div 
                    className="flex flex-col md:flex-row gap-8 p-6 bg-black/30 backdrop-blur-sm rounded-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="md:w-1/3">
                      <motion.div 
                        className="aspect-square bg-black/50 rounded-md overflow-hidden border border-gray-800"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8 }}
                      >
                        <motion.img 
                          src={selectedProduct.image || "/placeholder.svg"} 
                          alt={selectedProduct.name}
                          className="w-full h-full object-contain p-4"
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 1.2 }}
                        />
                      </motion.div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-bold mb-2">{selectedProduct.name}</h3>
                      <p className="mb-4 text-gray-300">{selectedProduct.description}</p>
                      <div className="bg-black/50 p-3 rounded-md inline-block">
                        <p className="font-mono text-sm text-gray-200">{selectedProduct.specs}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Product selection buttons - limit to 2 on mobile */}
                <div className="flex gap-3 mt-4">
                  {project.products.slice(0, 2).map((product, index) => (
                    <motion.button
                      key={product.id}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        selectedProduct?.id === product.id
                          ? 'bg-red-600 text-white'
                          : 'bg-black/30 hover:bg-black/50 text-white'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 * index, duration: 0.5 }}
                      onClick={() => setSelectedProduct(product)}
                    >
                      {product.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Project details sidebar */}
          <motion.div 
            className="lg:w-1/3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
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
                  <motion.div 
                    className="flex flex-col gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div>
                      <motion.div 
                        className="aspect-square bg-black/50 rounded-md overflow-hidden border border-gray-800"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8 }}
                      >
                        <motion.img 
                          src={selectedProduct.image || "/placeholder.svg"} 
                          alt={selectedProduct.name}
                          className="w-full h-full object-contain p-4"
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 1.2 }}
                        />
                      </motion.div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{selectedProduct.name}</h3>
                      <p className="mb-4 text-gray-300">{selectedProduct.description}</p>
                      <div className="bg-black/50 p-3 rounded-md inline-block">
                        <p className="font-mono text-sm text-gray-200">{selectedProduct.specs}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Product selection buttons */}
                <div className="flex flex-wrap gap-3 mt-4">
                  {project.products.map((product, index) => (
                    <motion.button
                      key={product.id}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        selectedProduct?.id === product.id
                          ? 'bg-red-600 text-white'
                          : 'bg-black/30 hover:bg-black/50 text-white'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 * index, duration: 0.5 }}
                      onClick={() => setSelectedProduct(product)}
                    >
                      {product.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Project gallery with optimized rendering */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
          
          {/* Use memoized gallery render */}
          {renderGallery}
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}

