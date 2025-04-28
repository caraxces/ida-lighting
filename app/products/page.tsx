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
    name: "CP202112",
    slug: "cp202112",
    variants: [
      {
        id: "cp202112",
        name: "CP202112 Trụ Sân Vườn",
        image: "/collections/out-door/CP202112/4.jpg",
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
    ],
  },
  {
    id: "product-2",
    name: "CP202113",
    slug: "cp202113",
    variants: [
      {
        id: "cp202113",
        name: "CP202113 Hình Khối",
        image: "/collections/out-door/CP202113/2.jpg",
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
        id: "cp202113-v2",
        name: "CP202113 Hình Vuông",
        image: "/products/outdoor/garden-light-4.png",
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
  {
    id: "product-3",
    name: "CP202455",
    slug: "cp202455",
    variants: [
      {
        id: "cp202455",
        name: "CP202455 Đèn Chùm",
        image: "/collections/outdoor/CP202455/1.jpg",
        price: 4200000,
        specs: [
          { label: "Đèn trang trí sân vườn", value: "" },
          { label: "Kích thước", value: "Ø200*800mm" },
          { label: "Công suất", value: "18W" },
          { label: "Điện áp", value: "24V" },
          { label: "Chip led", value: "COB" },
          { label: "CCT", value: "3000K" },
          { label: "Màu sắc", value: "Dark grey" },
        ],
      },
      
    ],
  },
  {
    id: "product-4",
    name: "CP202456",
    slug: "cp202456",
    variants: [
      {
        id: "cp202456",
        name: "CP202456 Đèn Cột",
        image: "/collections/outdoor/CP202456.jpg",
        price: 2900000,
        specs: [
          { label: "Đèn cột sân vườn", value: "" },
          { label: "Kích thước", value: "120*120*1000mm" },
          { label: "Công suất", value: "24W" },
          { label: "Điện áp", value: "220V" },
          { label: "Chip led", value: "COB" },
          { label: "CCT", value: "3000K" },
          { label: "Màu sắc", value: "Dark grey" },
        ],
      },
      {
        id: "cp202456-v2",
        name: "CP202456 Đèn Ray",
        image: "/products/outdoor/garden-light-8.png",
        price: 3150000,
        specs: [
          { label: "Đèn ray sân vườn", value: "" },
          { label: "Kích thước", value: "100*120*800mm" },
          { label: "Công suất", value: "20W" },
          { label: "Điện áp", value: "220V" },
          { label: "Chip led", value: "COB" },
          { label: "CCT", value: "3000K/4000K" },
          { label: "Màu sắc", value: "Black" },
        ],
      },
    ],
  },
  {
    id: "product-5",
    name: "Garden Light - Chiếu Điểm",
    slug: "garden-light-spotlight",
    variants: [
      {
        id: "gl-s1",
        name: "GL-S1 Spotlight",
        image: "/products/outdoor/garden-light-9.png",
        price: 1600000,
        specs: [
          { label: "Đèn chiếu điểm sân vườn", value: "" },
          { label: "Kích thước", value: "Ø80*180mm" },
          { label: "Công suất", value: "10W" },
          { label: "Điện áp", value: "24V" },
          { label: "Góc chiếu", value: "15°/30°/45°" },
          { label: "CCT", value: "3000K" },
          { label: "Màu sắc", value: "Black" },
          { label: "IP", value: "IP65" },
        ],
      },
      {
        id: "gl-s2",
        name: "GL-S2 Spotlight",
        image: "/products/outdoor/garden-light-10.png",
        price: 1900000,
        specs: [
          { label: "Đèn chiếu điểm sân vườn", value: "" },
          { label: "Kích thước", value: "Ø90*200mm" },
          { label: "Công suất", value: "12W" },
          { label: "Điện áp", value: "24V" },
          { label: "Góc chiếu", value: "30°/60°" },
          { label: "CCT", value: "3000K/4000K" },
          { label: "Màu sắc", value: "Dark grey" },
          { label: "IP", value: "IP65" },
        ],
      },
    ],
  },
  {
    id: "product-6",
    name: "Garden Light - Âm Đất",
    slug: "garden-light-underground",
    variants: [
      {
        id: "gl-u1",
        name: "GL-U1 Âm Đất",
        image: "/products/outdoor/garden-light-11.png",
        price: 1200000,
        specs: [
          { label: "Đèn âm đất", value: "" },
          { label: "Kích thước", value: "Ø120*80mm" },
          { label: "Công suất", value: "9W" },
          { label: "Điện áp", value: "24V" },
          { label: "Góc chiếu", value: "30°" },
          { label: "CCT", value: "3000K" },
          { label: "Màu sắc", value: "Stainless steel" },
          { label: "IP", value: "IP67" },
        ],
      },
      {
        id: "gl-u2",
        name: "GL-U2 Âm Đất",
        image: "/products/outdoor/garden-light-12.png",
        price: 1400000,
        specs: [
          { label: "Đèn âm đất", value: "" },
          { label: "Kích thước", value: "Ø150*100mm" },
          { label: "Công suất", value: "12W" },
          { label: "Điện áp", value: "24V" },
          { label: "Góc chiếu", value: "45°" },
          { label: "CCT", value: "3000K/4000K" },
          { label: "Màu sắc", value: "Stainless steel" },
          { label: "IP", value: "IP67" },
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
    name: "CP20183",
    slug: "cp20183",
    variants: [
      {
        id: "cp20183",
        name: "CP20183",
        image: "/collections/out-door/CP20183/4.jpg",
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
    name: "CP20184",
    slug: "cp20184",
    variants: [
      {
        id: "cp20184",
        name: "CP20184",
        image: "/collections/out-door/CP20184/6.jpg",
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
    name: "CP20188",
    slug: "cp20188",
    variants: [
      {
        id: "cp20188",
        name: "CP20188",
        image: "/collections/out-door/CP20188/4.jpg",
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
    name: "CP20196",
    slug: "cp20196",
    variants: [
      {
        id: "cp20196",
        name: "CP20196",
        image: "/collections/out-door/CP20196/6.jpg",
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
    name: "CP20199",
    slug: "cp20199",
    variants: [
      {
        id: "cp20199",
        name: "CP20199",
        image: "/collections/out-door/CP20199/6.jpg",
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
    name: "CP20205",
    slug: "cp20205",
    variants: [
      {
        id: "cp20205",
        name: "CP20205",
        image: "/collections/out-door/CP20205/3.jpg",
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
    name: "CP20219",
    slug: "cp20219",
    variants: [
      {
        id: "cp20219",
        name: "CP20219",
        image: "/collections/out-door/CP20219/3.jpg",
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
    name: "CP201812",
    slug: "cp201812",
    variants: [
      {
        id: "cp201812",
        name: "CP201812",
        image: "/collections/out-door/CP201812/4.jpg",
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
    name: "ĐÈN CHÙM BẠCH QUẢ GINGKO",
    slug: "luxury-chandelier-fp",
    variants: [
      {
        id: "floating-petals",
        name: "ĐÈN CHÙM BẠCH QUẢ GINGKO",
        image: "/collections/chad/ĐÈN CHÙM BẠCH QUẢ GINGKO/ĐÈN CHÙM BẠCH QUẢ GINGKO/1.jpg",
        price: 32500000,
        specs: [
          { label: "Chất liệu", value: "Nhôm mạ vàng & Acrylic" },
          { label: "Kích thước", value: "Ø900 x H300mm" },
          { label: "Số bóng đèn", value: "LED tích hợp 48W" },
          { label: "Nhiệt độ màu", value: "3000K" },
          { label: "Bảo hành", value: "5 năm" },
          { label: "Xuất xứ", value: "Nhập khẩu" },
        ],
      },
    ],
  },
  {
    id: "decorative-2",
    name: "ĐÈN CHÙM BẰNG ĐỒNG CỔ ĐIỂN",
    slug: "luxury-chandelier-gcb",
    variants: [
      {
        id: "golden-crystal-branch",
        name: "ĐÈN CHÙM BẰNG ĐỒNG CỔ ĐIỂN",
        image: "/collections/chad/ĐÈN CHÙM BẰNG ĐỒNG CỔ ĐIỂN/ĐÈN CHÙM BẰNG ĐỒNG CỔ ĐIỂN/6.jpg",
        price: 42800000,
        specs: [
          { label: "Chất liệu", value: "Đồng mạ vàng & Crystal K9" },
          { label: "Kích thước", value: "L1200 x W400 x H350mm" },
          { label: "Số bóng đèn", value: "LED tích hợp 65W" },
          { label: "Nhiệt độ màu", value: "3000K" },
          { label: "Bảo hành", value: "5 năm" },
          { label: "Xuất xứ", value: "Nhập khẩu Châu Âu" },
        ],
      },
    ],
  },
  {
    id: "decorative-3",
    name: "ĐÈN CHÙM BIJOU",
    slug: "luxury-chandelier-gr",
    variants: [
      {
        id: "golden-rings",
        name: "ĐÈN CHÙM BIJOU",
        image: "/collections/chad/ĐÈN CHÙM BIJOU/ĐÈN CHÙM BIJOU/1.jpg",
        price: 28600000,
        specs: [
          { label: "Chất liệu", value: "Thép không gỉ mạ PVD vàng" },
          { label: "Kích thước", value: "Ø800 x H1200mm (2 tầng)" },
          { label: "Số bóng đèn", value: "LED tích hợp 56W" },
          { label: "Nhiệt độ màu", value: "3000K - 4000K (Điều chỉnh)" },
          { label: "Bảo hành", value: "5 năm" },
          { label: "Xuất xứ", value: "Nhập khẩu" },
        ],
      },
    ],
  },
  {
    id: "decorative-4",
    name: "ĐÈN CHÙM HOA BAY",
    slug: "luxury-chandelier-cw",
    variants: [
      {
        id: "crystal-waterfall",
        name: "ĐÈN CHÙM HOA BAY",
        image: "/collections/chad/ĐÈN CHÙM HOA BAY/ĐÈN CHÙM HOA BAY/13.jpg",
        price: 58900000,
        specs: [
          { label: "Chất liệu", value: "Crystal cao cấp & Thép không gỉ mạ vàng" },
          { label: "Kích thước", value: "Ø600 x H800mm" },
          { label: "Số bóng đèn", value: "LED tích hợp 78W" },
          { label: "Nhiệt độ màu", value: "3000K" },
          { label: "Bảo hành", value: "5 năm" },
          { label: "Xuất xứ", value: "Nhập khẩu" },
        ],
      },
    ],
  },
  {
    id: "decorative-5",
    name: "ĐÈN CHÙM LÁ PHONG",
    slug: "luxury-chandelier-be",
    variants: [
      {
        id: "brass-elegance",
        name: "ĐÈN CHÙM LÁ PHONG",
        image: "/collections/chad/ĐÈN CHÙM LÁ PHONG/ĐÈN CHÙM LÁ PHONG/1.jpg",
        price: 36700000,
        specs: [
          { label: "Chất liệu", value: "Đồng thau & Thủy tinh pha lê" },
          { label: "Kích thước", value: "Ø750 x H400mm" },
          { label: "Số bóng đèn", value: "12 bóng G9 (5W mỗi bóng)" },
          { label: "Nhiệt độ màu", value: "3000K" },
          { label: "Bảo hành", value: "5 năm" },
          { label: "Xuất xứ", value: "Nhập khẩu" },
        ],
      },
    ],
  },
  {
    id: "decorative-6",
    name: "ĐÈN CHÙM SOFIA",
    slug: "luxury-chandelier-cr",
    variants: [
      {
        id: "crystal-rain",
        name: "ĐÈN CHÙM SOFIA",
        image: "/collections/chad/ĐÈN CHÙM SOFIA/ĐÈN CHÙM SOFIA/11.jpg",
        price: 63500000,
        specs: [
          { label: "Chất liệu", value: "Crystal cao cấp & Thép không gỉ mạ vàng" },
          { label: "Kích thước", value: "Ø800 x H1500mm" },
          { label: "Số bóng đèn", value: "LED tích hợp 96W" },
          { label: "Nhiệt độ màu", value: "3000K - 6000K (Điều chỉnh)" },
          { label: "Bảo hành", value: "5 năm" },
          { label: "Xuất xứ", value: "Nhập khẩu Châu Âu" },
        ],
      },
    ],
  },
  {
    id: "decorative-7",
    name: "ĐÈN CHÙM TRÒN QUẢ CẦU PHA LÊ",
    slug: "luxury-chandelier-ml",
    variants: [
      {
        id: "modern-leaf",
        name: "ĐÈN CHÙM TRÒN QUẢ CẦU PHA LÊ",
        image: "/collections/chad/ĐÈN CHÙM TRÒN QUẢ CẦU PHA LÊ/ĐÈN CHÙM TRÒN QUẢ CẦU PHA LÊ/1.jpg",
        price: 47800000,
        specs: [
          { label: "Chất liệu", value: "Đồng mạ vàng & Acrylic cao cấp" },
          { label: "Kích thước", value: "Ø1000 x H700mm" },
          { label: "Số bóng đèn", value: "LED tích hợp 85W" },
          { label: "Nhiệt độ màu", value: "3000K" },
          { label: "Bảo hành", value: "5 năm" },
          { label: "Xuất xứ", value: "Nhập khẩu" },
        ],
      },
    ],
  },
  {
    id: "decorative-8",
    name: "ĐÈN CIRCULAR",
    slug: "luxury-chandelier-mc",
    variants: [
      {
        id: "modern-circle",
        name: "ĐÈN CIRCULAR",
        image: "/collections/chad/ĐÈN CIRCULAR/ĐÈN CIRCULAR/1.jpg",
        price: 26900000,
        specs: [
          { label: "Chất liệu", value: "Nhôm sơn tĩnh điện" },
          { label: "Kích thước", value: "Ø600 x H80mm" },
          { label: "Số bóng đèn", value: "LED tích hợp 45W" },
          { label: "Nhiệt độ màu", value: "3000K - 6000K (Điều chỉnh)" },
          { label: "Bảo hành", value: "5 năm" },
          { label: "Xuất xứ", value: "Nhập khẩu" },
        ],
      },
    ],
  },
]

// Sản phẩm Đèn Trang Trí Vertical
const decorativeVerticalProducts: Product[] = [
  {
    id: "decorative-v1",
    name: "ĐÈN CHÙM MIRA",
    slug: "luxury-pendant-fb",
    variants: [
      {
        id: "mira",
        name: "ĐÈN CHÙM MIRA",
        image: "/collections/chad/ĐÈN CHÙM MIRA/12.jpg",
        price: 48500000,
        specs: [
          { label: "Chất liệu", value: "Thép không gỉ mạ vàng & Acrylic" },
          { label: "Kích thước", value: "Ø800 x H500mm" },
          { label: "Số bóng đèn", value: "LED tích hợp 65W" },
          { label: "Nhiệt độ màu", value: "3000K" },
          { label: "Bảo hành", value: "5 năm" },
          { label: "Xuất xứ", value: "Nhập khẩu Châu Âu" },
        ],
      },
    ],
  },
  {
    id: "decorative-v2",
    name: "ĐÈN CHÙM PHA LÊ HIRO NODA",
    slug: "luxury-chandelier-gc",
    variants: [
      {
        id: "golden-chandelier",
        name: "ĐÈN CHÙM PHA LÊ HIRO NODA",
        image: "/collections/chad/ĐÈN CHÙM PHA LÊ HIRO NODA/3.jpg",
        price: 72000000,
        specs: [
          { label: "Chất liệu", value: "Đồng mạ vàng & Crystal K9" },
          { label: "Kích thước", value: "Ø900 x H1200mm" },
          { label: "Số bóng đèn", value: "18 bóng E14 (5W mỗi bóng)" },
          { label: "Nhiệt độ màu", value: "3000K" },
          { label: "Bảo hành", value: "5 năm" },
          { label: "Xuất xứ", value: "Nhập khẩu" },
        ],
      },
    ],
  },
  {
    id: "decorative-v3",
    name: "ĐÈN CHÙM PHA LÊ STELLA",
    slug: "luxury-pendant-cb",
    variants: [
      {
        id: "crystal-bubble",
        name: "ĐÈN CHÙM PHA LÊ STELLA",
        image: "/collections/chad/ĐÈN CHÙM PHA LÊ STELLA/1.jpg",
        price: 52800000,
        specs: [
          { label: "Chất liệu", value: "Thủy tinh pha lê & Thép không gỉ mạ vàng" },
          { label: "Kích thước", value: "Ø800 x H600mm" },
          { label: "Số bóng đèn", value: "12 bóng G9 (5W mỗi bóng)" },
          { label: "Nhiệt độ màu", value: "3000K" },
          { label: "Bảo hành", value: "5 năm" },
          { label: "Xuất xứ", value: "Nhập khẩu Châu Âu" },
        ],
      },
    ],
  },
  {
    id: "decorative-v4",
    name: "ĐÈN CHÙM PHA LÊ TRÒN HALO",
    slug: "luxury-chandelier-gb",
    variants: [
      {
        id: "gold-branch",
        name: "ĐÈN CHÙM PHA LÊ TRÒN HALO",
        image: "/collections/chad/ĐÈN CHÙM PHA LÊ TRÒN HALO/10.jpg",
        price: 66900000,
        specs: [
          { label: "Chất liệu", value: "Đồng mạ vàng & Crystal" },
          { label: "Kích thước", value: "Ø1000 x H800mm" },
          { label: "Số bóng đèn", value: "LED tích hợp 120W" },
          { label: "Nhiệt độ màu", value: "3000K" },
          { label: "Bảo hành", value: "5 năm" },
          { label: "Xuất xứ", value: "Nhập khẩu" },
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
        <section id="downlight">
          <CollectionBanner 
            title="SERIES LED MODULE" 
            subtitle="DOWNLIGHT - SPOTLIGHT"
            image="/collections/TRC_9988.jpg" 
          />

          <div className="container mx-auto px-4 space-y-20">
            <VerticalProductListing products={verticalProducts} showcaseImage="/collections/TRC_9988.jpg" />
            <CollectionsListing products={downlightProducts} title="Đèn Âm Trần Cao Cấp" />
          </div>
        </section>

        {/* Outdoor Section */}
        <section id="outdoor">
          <CollectionBanner 
            title="SERIES OUTDOOR" 
            subtitle="GARDEN LIGHT"
            image="/collections/outdoor1.JPG" 
          />

          <div className="container mx-auto px-4 space-y-20">
            <VerticalProductListing products={outdoorVerticalProducts} showcaseImage="/collections/outdoor1.JPG" />
            <CollectionsListing products={outdoorProducts} title="Đèn Sân Vườn" />
          </div>
        </section>

        {/* Decorative Section */}
        <section id="decorative">
          <CollectionBanner 
            title="SERIES CRYSTAL" 
            subtitle="DECORATIVE LIGHT"
            image="/collections/1.png" 
          />

          <div className="container mx-auto px-4 space-y-20">
            <VerticalProductListing products={decorativeVerticalProducts} showcaseImage="/collections/5.jpg" />
            <CollectionsListing products={decorativeLightProducts} title="Đèn Trang Trí Pha Lê" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
