// Define types for our LED module data structure
export interface LEDModuleSpec {
  label: string
  value: string
}

export interface LEDModuleVariant {
  id: string
  name: string
  image: string
  price?: number
  specs: LEDModuleSpec[]
}

export interface LEDModule {
  id: string
  name: string
  slug: string
  variants: LEDModuleVariant[]
}

// LED Module data
export const ledModules: LEDModule[] = [
  // Standard Series
  {
    id: "kzbs08055j",
    name: "KZBS08055J",
    slug: "downlight-kzbs08055j",
    variants: [
      { 
        id: "b8-6w",
        name: "KZBS08055J B8-6W",
        image: "/products/Downlight/KZBS080550.png",
        specs: [
          { label: "Công suất", value: "6W" },
          { label: "Kích thước", value: "Ø50×H22mm" },
          { label: "Nhiệt độ màu", value: "4000K" },
          { label: "Góc chiếu", value: "45°" },
          { label: "CRI", value: "Ra>90" },
          { label: "Chip", value: "Chip Sanan" }        ]
      }
    ]
  },
  {
    id: "kzb9104502",
    name: "KZB9104502",
    slug: "downlight-kzb9104502",
    variants: [
      {
        id: "b1-9w",
        name: "KZB9104502 B1-9W",
        image: "/products/Downlight/KZB010450.png",
        specs: [
          { label: "Công suất", value: "9W" },
          { label: "Kích thước", value: "Ø50×H80mm" },
          { label: "Nhiệt độ màu", value: "4000K" },
          { label: "Góc chiếu", value: "38°" },
          { label: "CRI", value: "Ra>92" },
          { label: "Chip", value: "Chip Sanan" }        ]
      }
    ]
  },
  {
    id: "pros38",
    name: "PRO.S38",
    slug: "led-module-pros38",
    variants: [
      {
        id: "pros38-c",
        name: "PRO.S38 (C)",
        image: "/products/Downlight/PRO.S38.png",
        specs: [
          { label: "Công suất", value: "12W" },
          { label: "Kích thước", value: "Ø50×H55mm" },
          { label: "Nhiệt độ màu", value: "4000K" },
          { label: "Góc chiếu", value: "38°" },
          { label: "CRI", value: "Ra>97" },
          { label: "Chip", value: "Chip Osram - Đức" }        ]
      },
      {
        id: "pros38-m",
        name: "PRO.S38 (M)",
        image: "/products/Downlight/PRO.S38.png",
        specs: [
          { label: "Công suất", value: "12W" },
          { label: "Kích thước", value: "Ø50×H55mm" },
          { label: "Nhiệt độ màu", value: "4000K" },
          { label: "Góc chiếu", value: "38°" },
          { label: "CRI", value: "Ra>97" },
          { label: "Chip", value: "Chip Osram - Đức" }        ]
      }
    ]
  },
  {
    id: "pros60",
    name: "PRO.S60",
    slug: "led-module-pros60",
    variants: [
      {
        id: "pros60-standard",
        name: "PRO.S60",
        image: "/products/Downlight/PRO.S60.png",
        specs: [
          { label: "Công suất", value: "12W" },
          { label: "Kích thước", value: "Ø50×H55mm" },
          { label: "Nhiệt độ màu", value: "4000K" },
          { label: "Góc chiếu", value: "60°" },
          { label: "CRI", value: "Ra>97" },
          { label: "Chip", value: "Chip Osram - Đức" }        ]
      }
    ]
  },
  {
    id: "b3-12w",
    name: "B3-12W",
    slug: "led-module-b3-12w",
    variants: [
      {
        id: "b3-12w-standard",
        name: "B3-12W",
        image: "/products/Downlight/B3-12W.png",
        specs: [
          { label: "Công suất", value: "12W" },
          { label: "Kích thước", value: "Ø50×H55mm" },
          { label: "Nhiệt độ màu", value: "3000K" },
          { label: "Góc chiếu", value: "60°" },
          { label: "CRI", value: "Ra>97" },
          { label: "Chip", value: "Chip Osram - Đức" }        ]
      }
    ]
  },
  {
    id: "b9-12w",
    name: "B9-12W",
    slug: "downlight-b9-12w-3000k",
    variants: [
      {
        id: "b9-12w-3000k",
        name: "B9-12W (3000K)",
        image: "/products/Downlight/IDA0086.png",
        specs: [
          { label: "Công suất", value: "12W" },
          { label: "Kích thước", value: "Ø50×H55mm" },
          { label: "Nhiệt độ màu", value: "3000K" },
          { label: "Góc chiếu", value: "60°" },
          { label: "CRI", value: "Ra>97" },
          { label: "Chip", value: "Chip Osram - Đức" }        ]
      },
      {
        id: "b9-12w-4000k",
        name: "B9-12W (4000K)",
        image: "/collections/Downlight/IDA0075.png",
        specs: [
          { label: "Công suất", value: "12W" },
          { label: "Kích thước", value: "Ø50×H55mm" },
          { label: "Nhiệt độ màu", value: "4000K" },
          { label: "Góc chiếu", value: "60°" },
          { label: "CRI", value: "Ra>97" },
          { label: "Chip", value: "Chip Osram - Đức" }        ]
      }
    ]
  },
  {
    id: "pro-dali",
    name: "PRO Dali Series",
    slug: "led-module-pro-dali",
    variants: [
      {
        id: "pro-dls38",
        name: "PRO.DLS38",
        image: "/products/Downlight/PRO.DLS38.png",
        specs: [
          { label: "Công suất", value: "15W" },
          { label: "Kích thước", value: "Ø50×H75mm" },
          { label: "Nhiệt độ màu", value: "2700-6500K" },
          { label: "Góc chiếu", value: "38°" },
          { label: "CRI", value: "Ra>97" },
          { label: "Chip", value: "Chip Osram - Đức" }        ]
      },
      {
        id: "pro-dls60",
        name: "PRO.DLS60",
        image: "/products/Downlight/PRO.DLS60.png",
        specs: [
          { label: "Công suất", value: "15W" },
          { label: "Kích thước", value: "Ø50×H75mm" },
          { label: "Nhiệt độ màu", value: "2700-6500K" },
          { label: "Góc chiếu", value: "60°" },
          { label: "CRI", value: "Ra>97" },
          { label: "Chip", value: "Chip Osram - Đức" }        ]
      }
    ]
  },
  {
    id: "b9-75-15w",
    name: "B9-75-15W",
    slug: "downlight-b9-75-15w",
    variants: [
      {
        id: "b9-75-15w",
        name: "B9-75-15w",
        image: "/products/Downlight/B9-75-15w.png",
        specs: [
          { label: "Công suất", value: "15W" },
          { label: "Kích thước", value: "Ø50×H75mm" },
          { label: "Nhiệt độ màu", value: "2700-6500K" },
          { label: "Góc chiếu", value: "60°" },
          { label: "CRI", value: "Ra>97" },
          { label: "Chip", value: "GreatShine Chip" }
        ]
      }
    ]
  },
]; 