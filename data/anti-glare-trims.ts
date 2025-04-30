// Define types for anti-glare trim downlights
export interface AntiGlareTrimSpec {
  label: string
  value: string
}

export interface AntiGlareTrimVariant {
  id: string
  name: string
  image: string
  specs: AntiGlareTrimSpec[]
}

export interface AntiGlareTrim {
  id: string
  name: string
  slug: string
  variants: AntiGlareTrimVariant[]
}

// Danh sách chóa đèn có viền từ Excel
export const antiGlareTrims: AntiGlareTrim[] = [
  // Chóa đèn có viền
  {
    id: "kzn0875a-white",
    name: "KZN0875A",
    slug: "downlight-kzn0875a",
    variants: [
      {
        id: "kzn0875a-white",
        name: "KZN0875A - Trắng",
        image: "/products/downlight-kzn/KZN0875A.jpg",
        specs: [
          { label: "Chất liệu", value: "Nhựa PC" },
          { label: "Kích thước chóa", value: "Ø85×36mm" },
          { label: "Cut out", value: "Ø75mm" },
          { label: "Màu sắc", value: "Trắng" },
          { label: "Chip LED", value: "Tương thích Osram/CREE/Samsung" }
        ]
      }
    ]
  },
  {
    id: "kzn0875a-black",
    name: "KZN0875A-B",
    slug: "downlight-kzn0875",
    variants: [
      {
        id: "kzn0875a-black",
        name: "KZN0875A-B - Đen",
        image: "/products/downlight-kzn/KZN0875A (black).JPG",
        specs: [
          { label: "Chất liệu", value: "Nhựa PC" },
          { label: "Kích thước chóa", value: "Ø85×36mm" },
          { label: "Cut out", value: "Ø75mm" },
          { label: "Màu sắc", value: "Đen" },
          { label: "Chip LED", value: "Tương thích Osram/CREE/Samsung" }
        ]
      }
    ]
  },
  {
    id: "kzn0885a",
    name: "KZN0885A",
    slug: "downlight-kzn0885a",
    variants: [
      {
        id: "kzn0885a",
        name: "KZN0885A - Trắng",
        image: "/products/downlight-kzn/KZN0885A.jpg",
        specs: [
          { label: "Chất liệu", value: "Nhựa PC" },
          { label: "Kích thước chóa", value: "Ø95×51mm" },
          { label: "Cut out", value: "Ø85mm" },
          { label: "Màu sắc", value: "Trắng" },
          { label: "Chip LED", value: "Tương thích Osram/CREE/Samsung" }
        ]
      }
    ]
  },
  {
    id: "kzn0885b",
    name: "KZN0885B",
    slug: "downlight-kzn0885b",
    variants: [
      {
        id: "kzn0885b",
        name: "KZN0885B",
        image: "/products/downlight-kzn/KZN0885B.jpg",
        specs: [
          { label: "Chất liệu", value: "Nhựa PC" },
          { label: "Kích thước chóa", value: "Ø93×H33mm" },
          { label: "Cut out", value: "Ø85mm" },
          { label: "Màu sắc", value: "Trắng" },
          { label: "Chip LED", value: "Tương thích Osram/CREE/Samsung" }
        ]
      }
    ]
  },
  {
    id: "kzn0775a",
    name: "KZN0775A",
    slug: "downlight-kzn0775a",
    variants: [
      {
        id: "kzn0775a",
        name: "KZN0775A - Trắng",
        image: "/products/downlight-kzn/KZN0775A.jpg",
        specs: [
          { label: "Chất liệu", value: "Nhựa PC" },
          { label: "Kích thước chóa", value: "85×85×H36mm" },
          { label: "Cut out", value: "Ø75mm" },
          { label: "Màu sắc", value: "Trắng" },
          { label: "Chip LED", value: "Tương thích Osram/CREE/Samsung" }
        ]
      }
    ]
  },
  {
    id: "n11-c-w",
    name: "N11-C-W",
    slug: "downlight-n11-c-w",
    variants: [
      {
        id: "n11-c-w",
        name: "N11-C-W",
        image: "/products/downlight-kzn/N11-C-W.jpg",
        specs: [
          { label: "Chất liệu", value: "Nhựa PC" },
          { label: "Kích thước chóa", value: "Ø88×H39mm" },
          { label: "Cut out", value: "Ø75mm" },
          { label: "Màu sắc", value: "White" },
          { label: "Chip LED", value: "Tương thích Osram/CREE/Samsung" }
        ]
      }
    ]
  },
  {
    id: "n11-c-s",
    name: "N11-C-S",
    slug: "downlight-n11-c-s",
    variants: [
      {
        id: "n11-c-s",
        name: "N11-C-S",
        image: "/products/downlight-kzn/N11-C-S.JPG",
        specs: [
          { label: "Chất liệu", value: "Nhựa PC" },
          { label: "Kích thước chóa", value: "Ø88×H39mm" },
          { label: "Cut out", value: "Ø75mm" },
          { label: "Màu sắc", value: "White + Plating silver" },
          { label: "Chip LED", value: "Tương thích Osram/CREE/Samsung" }
        ]
      }
    ]
  },
  {
    id: "n11-c-g",
    name: "N11-C-G",
    slug: "downlight-n11-c-g",
    variants: [
      {
        id: "n11-c-g",
        name: "N11-C-G",
        image: "/products/downlight-kzn/N11-C-G.png",
        specs: [
          { label: "Chất liệu", value: "Nhựa PC" },
          { label: "Kích thước chóa", value: "Ø88×H39mm" },
          { label: "Cut out", value: "Ø75mm" },
          { label: "Màu sắc", value: "White + Plating rose gold" },
          { label: "Chip LED", value: "Tương thích Osram/CREE/Samsung" }
        ]
      }
    ]
  },
  {
    id: "n3100",
    name: "N3100",
    slug: "downlight-n3100",
    variants: [
      {
        id: "n3100",
        name: "N3100",
        image: "/products/downlight-kzn/N3100.png",
        specs: [
          { label: "Chất liệu", value: "Nhựa PC" },
          { label: "Kích thước chóa", value: "Ø110×H29mm" },
          { label: "Cut out", value: "Ø75-100mm" },
          { label: "Màu sắc", value: "White" },
          { label: "Chip LED", value: "Tương thích Osram/CREE/Samsung" }
        ]
      }
    ]
  },
  {
    id: "p04-w",
    name: "P04-W",
    slug: "downlight-p04-w",
    variants: [
      {
        id: "p04-w",
        name: "P04-W",
        image: "/products/downlight-kzn/P04-W.png",
        specs: [
          { label: "Chất liệu", value: "Nhựa PC" },
          { label: "Kích thước chóa", value: "Ø88×H39mm" },
          { label: "Cut out", value: "Ø75mm" },
          { label: "Màu sắc", value: "White" },
          { label: "Chip LED", value: "Tương thích Osram/CREE/Samsung" }
        ]
      }
    ]
  },
  {
    id: "p06-w",
    name: "P06-W",
    slug: "downlight-p06-w",
    variants: [
      {
        id: "p06-w",
        name: "P06-W",
        image: "/products/downlight-kzn/P06-W.png",
        specs: [
          { label: "Chất liệu", value: "Nhựa PC" },
          { label: "Kích thước chóa", value: "Ø88×H39mm" },
          { label: "Cut out", value: "Ø75mm" },
          { label: "Màu sắc", value: "White" },
          { label: "Chip LED", value: "Tương thích Osram/CREE/Samsung" }
        ]
      }
    ]
  },
  {
    id: "p06-cp",
    name: "P06-CP",
    slug: "downlight-p06-cp",
    variants: [
      {
        id: "p06-cp",
        name: "P06-CP",
        image: "/products/downlight-kzn/P06-CP.png",
        specs: [
          { label: "Chất liệu", value: "Nhựa PC" },
          { label: "Kích thước chóa", value: "Ø88×H39mm" },
          { label: "Cut out", value: "Ø75mm" },
          { label: "Màu sắc", value: "Copper" },
          { label: "Chip LED", value: "Tương thích Osram/CREE/Samsung" }
        ]
      }
    ]
  },
  {
    id: "f201975",
    name: "F201975",
    slug: "downlight-f201975",
    variants: [
      {
        id: "f201975",
        name: "F201975",
        image: "/products/downlight-kzn/F201975.png",
        specs: [
          { label: "Chất liệu", value: "Nhựa PC" },
          { label: "Kích thước chóa", value: "Ø120×H40mm" },
          { label: "Cut out", value: "Ø90×H35mm" },
          { label: "Màu sắc", value: "Trắng" },
          { label: "Chip LED", value: "Tương thích Osram/CREE/Samsung" }
        ]
      }
    ]
  },
  
  // Chóa đèn không viền
  {
    id: "kzn01875c",
    name: "KZN01875C",
    slug: "downlight-kzn01875c",
    variants: [
      {
        id: "kzn01875c",
        name: "KZN01875C - Trắng",
        image: "/products/downlight-kzn/KZN01875C.jpg",
        specs: [
          { label: "Chất liệu", value: "Nhựa PC" },
          { label: "Kích thước chóa", value: "Ø110×H40mm" },
          { label: "Cut out", value: "Ø75mm" },
          { label: "Màu sắc", value: "Trắng" },
          { label: "Chip LED", value: "Tương thích Osram/CREE/Samsung" }
        ]
      }
    ]
  },
  {
    id: "ymn-78-wh",
    name: "YMN-78-WH",
    slug: "downlight-ymn-78-wh",
    variants: [
      {
        id: "ymn-78-wh",
        name: "YMN-78-WH",
        image: "/products/downlight-kzn/YMN-78-WH.png",
        specs: [
          { label: "Chất liệu", value: "Kim loại" },
          { label: "Kích thước chóa", value: "Ø78×H35mm" },
          { label: "Màu sắc", value: "Trắng" },
          { label: "Chip LED", value: "Tương thích Osram/CREE/Samsung" }
        ]
      }
    ]
  },
  {
    id: "ymn-78-bl",
    name: "YMN-78-BL",
    slug: "downlight-ymn-78-bl",
    variants: [
      {
        id: "ymn-78-bl",
        name: "YMN-78-BL",
        image: "/products/downlight-kzn/YMN-78-BL.png",
        specs: [
          { label: "Chất liệu", value: "Kim loại" },
          { label: "Kích thước chóa", value: "Ø78×H35mm" },
          { label: "Màu sắc", value: "Đen" },
          { label: "Chip LED", value: "Tương thích Osram/CREE/Samsung" }
        ]
      }
    ]
  },
  {
    id: "ymn-78-cp",
    name: "YMN-78-CP",
    slug: "downlight-ymn-78-cp",
    variants: [
      {
        id: "ymn-78-cp",
        name: "YMN-78-CP",
        image: "/products/downlight-kzn/YMN-78-CP.png",
        specs: [
          { label: "Chất liệu", value: "Kim loại" },
          { label: "Kích thước chóa", value: "Ø78×H35mm" },
          { label: "Màu sắc", value: "Đồng" },
          { label: "Chip LED", value: "Tương thích Osram/CREE/Samsung" }
        ]
      }
    ]
  },
  {
    id: "ymn-78-cf",
    name: "YMN-78-CF",
    slug: "downlight-ymn-78-cf",
    variants: [
      {
        id: "ymn-78-cf",
        name: "YMN-78-CF",
        image: "/products/downlight-kzn/YMN-78-CF.png",
        specs: [
          { label: "Chất liệu", value: "Kim loại" },
          { label: "Kích thước chóa", value: "Ø78×H35mm" },
          { label: "Màu sắc", value: "Coffee" },
          { label: "Chip LED", value: "Tương thích Osram/CREE/Samsung" }
        ]
      }
    ]
  },
  {
    id: "ymn-78-rb",
    name: "YMN-78-RB",
    slug: "downlight-ymn-78-rb",
    variants: [
      {
        id: "ymn-78-rb",
        name: "YMN-78-RB",
        image: "/products/downlight-kzn/YMN-78-RB.png",
        specs: [
          { label: "Chất liệu", value: "Kim loại" },
          { label: "Kích thước chóa", value: "Ø78×H35mm" },
          { label: "Màu sắc", value: "Redish brown" },
          { label: "Chip LED", value: "Tương thích Osram/CREE/Samsung" }
        ]
      }
    ]
  },
  {
    id: "b9-12w-3000k",
    name: "B9-12W-3000K",
    slug: "led-module-b9-12w-3000k",
    variants: [
      {
        id: "b9-12w-3000k",
        name: "B9-12W-3000K",
        image: "/products/downlight-kzn/B9-12W-3000K.png",
        specs: [
          { label: "Công suất", value: "12W" },
          { label: "Kích thước", value: "Ø50×H55mm" },
          { label: "Nhiệt độ màu", value: "3000K" },
          { label: "CRI", value: "Ra>97" },
          { label: "Chip LED", value: "Osram - Đức" },
          { label: "Driver", value: "Dali lTech (Lắp ráp Trung Quốc)" }
        ]
      }
    ]
  }
]; 