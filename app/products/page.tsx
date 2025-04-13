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
  price?: number
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

// Sản phẩm Outdoor Light
const outdoorProducts: Product[] = [
  {
    id: "outdoor-1",
    name: "Garden Light",
    slug: "cp201-85",
    variants: [
      {
        id: "cp201-85",
        name: "CP201 85",
        image: "/collections/outdoor/CP20185.jpg",
        specs: [
          { label: "Đèn trụ sân vườn", value: "" },
          { label: "Kích thước", value: "Ø150mm" },
          { label: "Chiều cao", value: "600mm" },
          { label: "Công suất", value: "12W" },
          { label: "Điện áp", value: "24V" },
          { label: "Chip led", value: "COB" },
          { label: "CCT", value: "3000K" },
          { label: "Màu sắc", value: "Sand black" },
        ],
      },
    ],
  },
  {
    id: "outdoor-2",
    name: "Garden Light",
    slug: "cp201-96",
    variants: [
      {
        id: "cp201-96",
        name: "CP201 96",
        image: "/collections/outdoor/CP20196.jpg",
        specs: [
          { label: "Đèn trụ sân vườn", value: "" },
          { label: "Kích thước", value: "Ø200*400mm" },
          { label: "Công suất", value: "7W" },
          { label: "Điện áp", value: "24V" },
          { label: "Chip led", value: "COB" },
          { label: "CCT", value: "3000K" },
          { label: "Màu sắc", value: "Sand black" },
        ],
      },
    ],
  },
  {
    id: "outdoor-3",
    name: "Garden Light",
    slug: "cp201-812",
    variants: [
      {
        id: "cp201-812",
        name: "CP201 812",
        image: "/collections/outdoor/CP201812.jpg",
        specs: [
          { label: "Đèn trụ sân vườn", value: "" },
          { label: "Kích thước", value: "160*55*600mm" },
          { label: "Công suất", value: "10W" },
          { label: "Điện áp", value: "24V" },
          { label: "Chip led", value: "COB" },
          { label: "CCT", value: "3000K" },
          { label: "Màu sắc", value: "Sand black" },
        ],
      },
    ],
  },
  {
    id: "outdoor-4",
    name: "Garden Light",
    slug: "cp201-99",
    variants: [
      {
        id: "cp201-99",
        name: "CP201 99",
        image: "/collections/outdoor/CP20199.jpg",
        specs: [
          { label: "Đèn trụ sân vườn", value: "" },
          { label: "Kích thước", value: "150*150*600mm" },
          { label: "Công suất", value: "7W" },
          { label: "Điện áp", value: "24V" },
          { label: "Chip led", value: "COB" },
          { label: "CCT", value: "3000K" },
          { label: "Màu sắc", value: "Sand black" },
        ],
      },
    ],
  },
]

// Sản phẩm Outdoor Light Vertical
const outdoorVerticalProducts: Product[] = [
  {
    id: "outdoor-v1",
    name: "Garden Light",
    slug: "cp202-05",
    variants: [
      {
        id: "cp202-05",
        name: "CP202 05",
        image: "/collections/outdoor/CP20205.jpg",
        specs: [
          { label: "Đèn trụ sân vườn", value: "" },
          { label: "Kích thước", value: "150*150*600mm" },
          { label: "Chiều cao", value: "600mm" },
          { label: "Công suất", value: "10W" },
          { label: "Điện áp", value: "24V" },
          { label: "Chip led", value: "COB" },
          { label: "CCT", value: "3000K" },
          { label: "Màu sắc", value: "Sand black" },
        ],
      },
    ],
  },
  {
    id: "outdoor-v2",
    name: "Garden Light",
    slug: "cp202-112",
    variants: [
      {
        id: "cp202-112",
        name: "CP202 112",
        image: "/collections/outdoor/CP202112.jpg",
        specs: [
          { label: "Đèn trụ sân vườn", value: "" },
          { label: "Kích thước", value: "100*78mm" },
          { label: "Chiều cao", value: "600mm" },
          { label: "Công suất", value: "7W" },
          { label: "Điện áp", value: "24V" },
          { label: "Chip led", value: "COB" },
          { label: "CCT", value: "3000K" },
          { label: "Màu sắc", value: "Sand black" },
        ],
      },
    ],
  },
  {
    id: "outdoor-v3",
    name: "Garden Light",
    slug: "cp202-19",
    variants: [
      {
        id: "cp202-19",
        name: "CP202 19",
        image: "/collections/outdoor/CP20219.jpg",
        specs: [
          { label: "Đèn trụ sân vườn", value: "" },
          { label: "Kích thước", value: "120*40mm" },
          { label: "Chiều cao", value: "600mm" },
          { label: "Công suất", value: "7W" },
          { label: "Điện áp", value: "24V" },
          { label: "Chip led", value: "COB" },
          { label: "CCT", value: "3000K" },
          { label: "Màu sắc", value: "Sand black" },
        ],
      },
    ],
  },
  {
    id: "outdoor-v4",
    name: "Garden Light",
    slug: "cp202-113",
    variants: [
      {
        id: "cp202-113",
        name: "CP202 113",
        image: "/collections/outdoor/CP202113.jpg",
        specs: [
          { label: "Đèn trụ sân vườn", value: "" },
          { label: "Kích thước", value: "Ø140mm" },
          { label: "Chiều cao", value: "600mm" },
          { label: "Công suất", value: "2*8W" },
          { label: "Điện áp", value: "24V" },
          { label: "Chip led", value: "COB" },
          { label: "CCT", value: "3000K" },
          { label: "Màu sắc", value: "Sand black" },
        ],
      },
    ],
  },
]

// Sản phẩm Đèn Trang Trí
const decorativeLightProducts: Product[] = [
  {
    id: "decorative-1",
    name: "Crystal Chandelier",
    slug: "d8050",
    variants: [
      {
        id: "d8050",
        name: "D8050",
        image: "/collections/decorative/D8050.jpg",
        specs: [
          { label: "Chất liệu", value: "Pha lê K9" },
          { label: "Kích thước", value: "W 280 x H 300mm" },
          { label: "Số tay nến", value: "2 tay" },
          { label: "Bảo hành", value: "5 năm" },
        ],
      },
    ],
  },
  {
    id: "decorative-2",
    name: "Crystal Chandelier",
    slug: "d8064",
    variants: [
      {
        id: "d8064",
        name: "D8064",
        image: "/collections/decorative/D8064.jpg",
        specs: [
          { label: "Chất liệu", value: "Pha lê K9" },
          { label: "Kích thước", value: "W 280 x H 300mm" },
          { label: "Số tay nến", value: "2 tay" },
          { label: "Bảo hành", value: "5 năm" },
        ],
      },
    ],
  },
  {
    id: "decorative-3",
    name: "Crystal Chandelier",
    slug: "d8052",
    variants: [
      {
        id: "d8052",
        name: "D8052",
        image: "/collections/decorative/D8052.jpg",
        specs: [
          { label: "Chất liệu", value: "Pha lê K9" },
          { label: "Kích thước", value: "W 280 x H 300mm" },
          { label: "Số tay nến", value: "2 tay" },
          { label: "Bảo hành", value: "5 năm" },
        ],
      },
    ],
  },
  {
    id: "decorative-4",
    name: "Crystal Chandelier",
    slug: "d8061",
    variants: [
      {
        id: "d8061",
        name: "D8061",
        image: "/collections/decorative/D8061.jpg",
        specs: [
          { label: "Chất liệu", value: "Pha lê K9" },
          { label: "Kích thước", value: "W 800 x H 620mm" },
          { label: "Số tay nến", value: "10 tay" },
          { label: "Bảo hành", value: "5 năm" },
        ],
      },
    ],
  },
]

// Sản phẩm Đèn Trang Trí Vertical
const decorativeVerticalProducts: Product[] = [
  {
    id: "decorative-v1",
    name: "Crystal Chandelier",
    slug: "d8008",
    variants: [
      {
        id: "d8008",
        name: "D8008",
        image: "/collections/decorative/D8008.jpg",
        specs: [
          { label: "Chất liệu", value: "Pha lê K9" },
          { label: "Kích thước", value: "W 800 x H 750mm" },
          { label: "Số tay nến", value: "10+5 tay" },
          { label: "Bảo hành", value: "5 năm" },
        ],
      },
    ],
  },
  {
    id: "decorative-v2",
    name: "Crystal Chandelier",
    slug: "d8016",
    variants: [
      {
        id: "d8016",
        name: "D8016",
        image: "/collections/decorative/D8016.jpg",
        specs: [
          { label: "Chất liệu", value: "Pha lê K9" },
          { label: "Kích thước", value: "W 800 x H 600mm" },
          { label: "Số tay nến", value: "10+5 tay" },
          { label: "Bảo hành", value: "5 năm" },
        ],
      },
    ],
  },
  {
    id: "decorative-v3",
    name: "Crystal Chandelier",
    slug: "d8029",
    variants: [
      {
        id: "d8029",
        name: "D8029",
        image: "/collections/decorative/D8029.jpg",
        specs: [
          { label: "Chất liệu", value: "Pha lê K9" },
          { label: "Kích thước", value: "W 800 x H 750mm" },
          { label: "Số tay nến", value: "10+5 tay" },
          { label: "Bảo hành", value: "5 năm" },
        ],
      },
    ],
  },
  {
    id: "decorative-v4",
    name: "Crystal Chandelier",
    slug: "d8003",
    variants: [
      {
        id: "d8003",
        name: "D8003",
        image: "/collections/decorative/D8003.jpg",
        specs: [
          { label: "Chất liệu", value: "Pha lê K9" },
          { label: "Kích thước", value: "W 600 x H 650mm" },
          { label: "Số tay nến", value: "6 tay" },
          { label: "Bảo hành", value: "5 năm" },
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
        {/* Downlight Section */}
        <CollectionBanner 
          title="SERIES LED MODULE" 
          subtitle="DOWNLIGHT - SPOTLIGHT"
          image="/collections/TRC_9988.jpg" 
        />

        <div className="container mx-auto px-4 space-y-20">
          <VerticalProductListing products={verticalProducts} showcaseImage="/collections/TRC_9988.jpg" />
          <CollectionsListing products={downlightProducts} title="Đèn Âm Trần Cao Cấp" />
                </div>

        {/* Outdoor Section */}
        <CollectionBanner 
          title="SERIES OUTDOOR" 
          subtitle="GARDEN LIGHT"
          image="/collections/outdoor/banner.jpg" 
        />

        <div className="container mx-auto px-4 space-y-20">
          <VerticalProductListing products={outdoorVerticalProducts} showcaseImage="/collections/outdoor/showcase.jpg" />
          <CollectionsListing products={outdoorProducts} title="Đèn Sân Vườn" />
              </div>

        {/* Decorative Section */}
        <CollectionBanner 
          title="SERIES CRYSTAL" 
          subtitle="DECORATIVE LIGHT"
          image="/collections/decorative/banner.jpg" 
        />

        <div className="container mx-auto px-4 space-y-20">
          <VerticalProductListing products={decorativeVerticalProducts} showcaseImage="/collections/decorative/showcase.jpg" />
          <CollectionsListing products={decorativeLightProducts} title="Đèn Trang Trí Pha Lê" />
        </div>
      </main>

      <Footer />
    </div>
  )
}
