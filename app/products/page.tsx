"use client"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CollectionsListing from "@/components/collections-listing"
import VerticalProductListing from "@/components/vertical-product-listing"
import CollectionBanner from "@/components/collection-banner"

// Define types for our data structure
interface ProductSpec {
  label: string
  value: string
}

interface ProductVariant {
  id: string
  name: string
  image: string
  price: number
  specs: ProductSpec[]
}

interface Product {
  id: string
  name: string
  slug: string
  variants: ProductVariant[]
}

// Sản phẩm Downlight
const downlightProducts: Product[] = [
  {
    id: "downlight-1",
    name: "PRO.S38 (C)",
    slug: "downlight-pros38c",
    variants: [
      {
        id: "pros38c",
        name: "PRO.S38 (C)",
        image: "/collections/Downlight/IDA0062.JPG",
        price: 1350000,
        specs: [
          { label: "Loại đèn", value: "Đèn âm trần chống chói" },
          { label: "Kích thước bóng", value: "∅50*H75mm" },
          { label: "Công suất", value: "COB 15W AC180-240V 2700-6500K" },
          { label: "Góc chiếu", value: "38°" },
          { label: "CRI", value: "97Ra" },
          { label: "Chip", value: "Dali OSRAM 97Ra" },
          { label: "Driver", value: "Dali lTECH" },
          { label: "W/lm", value: "15w" },
          { label: "Lỗ Khoét", value: "∅75" },
        ],
      },
    ],
  },
  {
    id: "downlight-2",
    name: "E35",
    slug: "downlight-e35",
    variants: [
      {
        id: "e35",
        name: "E35",
        image: "/collections/Downlight/IDA0069.JPG",
        price: 680000,
        specs: [
          { label: "Loại đèn", value: "Đèn âm trần chống chói" },
          { label: "Kích thước bóng", value: "∅50*H55mm" },
          { label: "Nhiệt độ màu", value: "4000K" },
          { label: "Góc chiếu", value: "38°" },
          { label: "CRI", value: "Ra>97" },
          { label: "Chip", value: "Osram - Đức" },
          { label: "Driver", value: "Dali lTech (Lắp ráp Trung Quốc)" },
          { label: "W/lm", value: "12w" },
          { label: "Lỗ Khoét", value: "∅75" },
        ],
      },
    ],
  },
  {
    id: "downlight-3",
    name: "PRO.S60 (W)",
    slug: "downlight-pros60w",
    variants: [
      {
        id: "pros60w",
        name: "PRO.S60 (W)",
        image: "/collections/Downlight/IDA0075.JPG",
        price: 1350000,
        specs: [
          { label: "Loại đèn", value: "Đèn âm trần chống chói" },
          { label: "Kích thước bóng", value: "∅50*H75mm" },
          { label: "Công suất", value: "COB 15W AC180-240V 2700-6500K" },
          { label: "Góc chiếu", value: "60°" },
          { label: "CRI", value: "97Ra" },
          { label: "Chip", value: "Dali OSRAM 97Ra" },
          { label: "Driver", value: "Dali lTECH" },
          { label: "W/lm", value: "15w" },
          { label: "Lỗ Khoét", value: "∅75" },
        ],
      },
    ],
  },
  {
    id: "downlight-4",
    name: "KZBS080550",
    slug: "downlight-kzbs080550",
    variants: [
      {
        id: "kzbs080550",
        name: "KZBS080550",
        image: "/collections/Downlight/IDA0076.JPG",
        price: 680000,
        specs: [
          { label: "Loại đèn", value: "Đèn âm trần chống chói" },
          { label: "Kích thước bóng", value: "∅50*H55mm" },
          { label: "Nhiệt độ màu", value: "4000K" },
          { label: "Góc chiếu", value: "60°" },
          { label: "CRI", value: "Ra>97" },
          { label: "Chip", value: "Osram - Đức" },
          { label: "Driver", value: "Dali lTech (Lắp ráp Trung Quốc)" },
          { label: "W/lm", value: "12w" },
          { label: "Lỗ Khoét", value: "∅75" },
        ],
      },
    ],
  },
]

// Sản phẩm đèn Garden Light
const products: Product[] = [
  {
    id: "product-1",
    name: "Garden Light",
    slug: "ida-6899-crystal",
    variants: [
      {
        id: "gp201-88",
        name: "GP201 88",
        image: "/slides/6899-10+5.png",
        price: 2400000,
        specs: [
          { label: "Đèn trụ sân vườn", value: "" },
          { label: "Kích thước", value: "Ø140mm" },
          { label: "Kích thước đế", value: "Ø65mm" },
          { label: "Chiều cao", value: "600mm" },
          { label: "Công suất", value: "12W" },
          { label: "Điện áp", value: "24V" },
          { label: "Chỉ số hoàn màu", value: "CRI>80" },
          { label: "CCT", value: "3000K" },
          { label: "Màu sắc", value: "Sand black" },
        ],
      },
      {
        id: "gp201-96",
        name: "GP201 96",
        image: "/slides/6551-6.png",
        price: 2750000,
        specs: [
          { label: "Đèn trụ sân vườn", value: "" },
          { label: "Kích thước", value: "Ø80*600mm" },
          { label: "Công suất", value: "9W" },
          { label: "Điện áp", value: "24V" },
          { label: "Chip led", value: "COB" },
          { label: "CCT", value: "3000K" },
          { label: "Màu sắc", value: "Sand black" },
        ],
      },
    ],
  },
  {
    id: "product-2",
    name: "Garden Light",
    slug: "ida-6551-gold",
    variants: [
      {
        id: "gp201-812",
        name: "GP201 812",
        image: "/slides/6897-1.png",
        price: 1800000,
        specs: [
          { label: "Đèn trụ sân vườn", value: "" },
          { label: "Kích thước", value: "160*55*600mm" },
          { label: "Công suất", value: "16W" },
          { label: "Điện áp", value: "24V" },
          { label: "Chip led", value: "COB" },
          { label: "CCT", value: "3000K" },
          { label: "Màu sắc", value: "Sand black" },
        ],
      },
      {
        id: "gp201-99",
        name: "GP201 99",
        image: "/slides/6898-8.png",
        price: 3200000,
        specs: [
          { label: "Đèn trụ sân vườn", value: "" },
          { label: "Kích thước", value: "160*150*600mm" },
          { label: "Công suất", value: "12W" },
          { label: "Điện áp", value: "24V" },
          { label: "Chip led", value: "COB" },
          { label: "CCT", value: "3000K" },
          { label: "Màu sắc", value: "Sand black" },
        ],
      },
    ],
  },
]

// Sản phẩm bổ sung
const verticalProducts: Product[] = [
  {
    id: "downlight-5",
    name: "B8-6W",
    slug: "downlight-b8-6w",
    variants: [
      {
        id: "b8-6w",
        name: "B8-6W",
        image: "/collections/Downlight/IDA0086.JPG",
        price: 780000,
        specs: [
          { label: "Loại đèn", value: "Đèn rọi âm trần Spotlight" },
          { label: "Màu sắc", value: "Trắng" },
          { label: "Góc chiếu", value: "15°" },
          { label: "CRI", value: "> 97Ra" },
          { label: "Nhiệt độ màu", value: "3000K" },
          { label: "Chip", value: "Full Osram - Đức" },
          { label: "Xuất xứ", value: "Lắp ráp Trung Quốc" },
          { label: "W/lm", value: "5W/485lm" },
          { label: "Lỗ Khoét", value: "∅35" },
        ],
      },
    ],
  },
  {
    id: "downlight-6",
    name: "PRO.S60 (B)",
    slug: "downlight-pros60b",
    variants: [
      {
        id: "pros60b",
        name: "PRO.S60 (B)",
        image: "/collections/Downlight/IDA0087.JPG",
        price: 680000,
        specs: [
          { label: "Loại đèn", value: "Đèn âm trần chống ẩm chóa đen" },
          { label: "Kích thước bóng", value: "∅50*H55mm" },
          { label: "Kích thước chóa", value: "∅110*H27mm" },
          { label: "Nhiệt độ màu", value: "4000K" },
          { label: "Góc chiếu", value: "60°" },
          { label: "CRI", value: "Ra>97" },
          { label: "Chip", value: "Osram - Đức" },
          { label: "Driver", value: "Dali lTech - Đức (Lắp ráp Trung Quốc)" },
          { label: "W/lm", value: "12w" },
          { label: "Lỗ Khoét", value: "∅75" },
        ],
      },
    ],
  },
  {
    id: "downlight-7",
    name: "PRO.S60 Combo",
    slug: "downlight-pros60combo",
    variants: [
      {
        id: "pros60combo",
        name: "PRO.S60 Combo",
        image: "/collections/Downlight/IDA0086.JPG",
        price: 830000,
        specs: [
          { label: "Loại đèn", value: "Combo đèn âm trần chống chói không chỉnh hướng" },
          { label: "Kích thước bóng", value: "∅50*H55mm" },
          { label: "Kích thước chóa", value: "∅88*H39mm" },
          { label: "Nhiệt độ màu", value: "4000K" },
          { label: "Góc chiếu", value: "60°" },
          { label: "CRI", value: "Ra>97" },
          { label: "Chip", value: "Osram - Đức" },
          { label: "Driver", value: "Dali lTech - Đức (Lắp ráp Trung Quốc)" },
          { label: "W/lm", value: "12w" },
          { label: "Lỗ Khoét", value: "∅75" },
        ],
      },
    ],
  },
  {
    id: "downlight-8",
    name: "PRO.S60 (S)",
    slug: "downlight-pros60s",
    variants: [
      {
        id: "pros60s",
        name: "PRO.S60 (S)",
        image: "/collections/Downlight/IDA0075.JPG",
        price: 795000,
        specs: [
          { label: "Loại đèn", value: "Combo đèn âm trần chống chói chỉnh hướng góc 15°" },
          { label: "Kích thước bóng", value: "∅50*H55mm" },
          { label: "Kích thước chóa", value: "∅88*H39mm" },
          { label: "Nhiệt độ màu", value: "4000K" },
          { label: "Góc chiếu", value: "60°" },
          { label: "CRI", value: "Ra>97" },
          { label: "Chip", value: "Osram - Đức" },
          { label: "Driver", value: "Osram - Đức (Lắp ráp Trung Quốc)" },
          { label: "W/lm", value: "12W" },
          { label: "Lỗ Khoét", value: "∅75" },
        ],
      },
    ],
  },
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="pt-16 pb-16">
        {/* Collection Banner */}
        <CollectionBanner 
          title="SERIES LED MODULE" 
          subtitle="DOWNLIGHT - SPOTLIGHT"
          image="/collections/TRC_9988.jpg" 
        />

        <div className="container mx-auto px-4 space-y-20">
          {/* Vertical Product Listing */}
          <VerticalProductListing products={verticalProducts} showcaseImage="/collections/TRC_9988.jpg" />
          
          {/* Downlight Products */}
          <CollectionsListing products={downlightProducts} title="Đèn Âm Trần Cao Cấp" />
          
          {/* Garden Light Products */}
          <CollectionsListing products={products} title="Đèn gỗ óc chó" />
        </div>
      </main>

      <Footer />
    </div>
  )
}
