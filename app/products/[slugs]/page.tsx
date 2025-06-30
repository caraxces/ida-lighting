"use client"

import { useState, use } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

import { Button } from "@/components/ui/button"

// Define product variant type
interface ProductVariant {
  name: string;
  image: string;
}

// Define product type
interface Product {
  id: number;
  title: string;
  slug: string;
  image: string;
  price: number;
  description: string;
  mainImage: string;
  variants: ProductVariant[];
  category?: string;
}

// Get all product data from categories
const getAllProducts = (): Product[] => {
  // Product data with manually defined variants
  const productData: Product[] = [
    {
      id: 1,
      title: "IDA 6899-10+5 Crystal Glass",
      slug: "ida-6899-crystal",
      image: "/slides/6899-10+5.png",
      price: 12500000,
      description: "IDA 6899-10+5 Crystal Glass là sản phẩm đèn cao cấp của IDA Lighting, thiết kế tinh tế với chất liệu cao cấp, mang đến không gian sống sang trọng và đẳng cấp. Sản phẩm phù hợp với nhiều phong cách nội thất khác nhau.",
      mainImage: "/slides/6899-10+5.png",
      variants: [
        { name: "Crystal Glass", image: "/slides/6899-10+5.png" },
        { name: "Gold Finish", image: "/slides/6551-6.png" },
        { name: "Black Nickel", image: "/slides/6897-1.png" }
      ],
      category: "lighting"
    },
    {
      id: 2,
      title: "IDA 6551-6 Gold Finish",
      slug: "ida-6551-gold",
      image: "/slides/6551-6.png",
      price: 8900000,
      description: "IDA 6551-6 Gold Finish là sản phẩm đèn cao cấp của IDA Lighting với lớp hoàn thiện vàng sang trọng, tạo điểm nhấn nổi bật cho không gian nội thất. Thiết kế tinh tế kết hợp công nghệ chiếu sáng hiện đại mang đến trải nghiệm ánh sáng hoàn hảo.",
      mainImage: "/slides/6551-6.png",
      variants: [
        { name: "Gold Finish", image: "/slides/6551-6.png" },
        { name: "Chrome", image: "/slides/6899-2+1.png" }
      ],
      category: "lighting"
    },
    {
      id: 3,
      title: "IDA 6897-1 Black Nickel",
      slug: "ida-6897-black",
      image: "/slides/6897-1.png",
      price: 9500000,
      description: "IDA 6897-1 Black Nickel là sản phẩm đèn hiện đại với lớp hoàn thiện niken đen sang trọng, mang đến vẻ đẹp tinh tế và đẳng cấp cho không gian. Thiết kế độc đáo kết hợp với công nghệ ánh sáng tiên tiến tạo nên sản phẩm chiếu sáng hoàn hảo.",
      mainImage: "/slides/6897-1.png",
      variants: [
        { name: "Black Nickel", image: "/slides/6897-1.png" }
      ],
      category: "lighting"
    },
    {
      id: 4,
      title: "Đèn chùm pha lê",
      slug: "chandelier-crystal",
      image: "/slides/6899-10+5.png",
      price: 18500000,
      description: "Đèn chùm pha lê là sản phẩm đèn cao cấp của IDA Lighting, thiết kế tinh xảo với những viên pha lê lấp lánh, tạo hiệu ứng ánh sáng lộng lẫy cho không gian nội thất. Sản phẩm phù hợp với phong cách thiết kế sang trọng, cổ điển.",
      mainImage: "/slides/6899-10+5.png",
      variants: [
        { name: "Crystal", image: "/slides/6899-10+5.png" },
        { name: "Gold Trim", image: "/slides/6551-6.png" },
        { name: "Modern", image: "/slides/6897-1.png" }
      ],
      category: "chandeliers"
    },
    {
      id: 5,
      title: "Đèn thả bàn ăn",
      slug: "pendant-dining",
      image: "/slides/6551-6.png",
      price: 6500000,
      description: "Đèn thả bàn ăn là sản phẩm đèn trang trí cao cấp, thiết kế đơn giản nhưng tinh tế, phù hợp cho không gian bàn ăn gia đình. Ánh sáng dịu nhẹ, ấm áp tạo không khí thân mật cho những bữa ăn gia đình.",
      mainImage: "/slides/6551-6.png",
      variants: [
        { name: "Gold", image: "/slides/6551-6.png" },
        { name: "Silver", image: "/slides/6899-2+1.png" }
      ],
      category: "pendants"
    },
    {
      id: 6,
      title: "Đèn tường phòng ngủ",
      slug: "wall-bedroom",
      image: "/slides/6897-1.png",
      price: 3900000,
      description: "Đèn tường phòng ngủ là sản phẩm đèn trang trí tinh tế, thiết kế thanh lịch phù hợp cho không gian phòng ngủ. Ánh sáng dịu nhẹ, ấm áp tạo cảm giác thư giãn và thoải mái.",
      mainImage: "/slides/6897-1.png",
      variants: [], // No variants for this product
      category: "wallLights"
    },
    {
      id: 7,
      title: "Đèn thông minh điều khiển từ xa",
      slug: "smart-remote",
      image: "/slides/6898-8.png",
      price: 5200000,
      description: "Đèn thông minh điều khiển từ xa là sản phẩm đèn hiện đại tích hợp công nghệ điều khiển thông minh, cho phép người dùng điều chỉnh ánh sáng một cách dễ dàng thông qua remote. Sản phẩm phù hợp với nhiều không gian và nhu cầu sử dụng khác nhau.",
      mainImage: "/slides/6898-8.png",
      variants: [
        { name: "White", image: "/slides/6898-8.png" },
        { name: "Black", image: "/slides/6897-1.png" },
        { name: "Silver", image: "/slides/6899-2+1.png" }
      ],
      category: "smartLighting"
    },
    // Thêm sản phẩm đèn downlight
    {
      id: 8,
      title: "KZN0875A",
      slug: "downlight-kzn0875a",
      image: "/products/Downlight/KZN0875A.png",
      price: 680000,
      description: "Chóa đèn âm trần chống chói. <br />Chất liệu: Nhựa PC. <br />Kích thước chóa: Ø85*36mm. <br />Cut out: Ø75mm. <br />Màu sắc: Trắng.",
      mainImage: "/products/Downlight/KZN0875A.png",
      variants: [
        { name: "KZN0875A - Trắng", image: "/products/Downlight/KZN0875A.png" },
      ],
      category: "downlight"
    },
    {
      id: 9,
      title: "KZN0875A Black",
      slug: "downlight-kzn0875",
      image: "/products/Downlight/KZN0875A (black).png",
      price: 680000,
      description: "Chóa đèn âm trần chống chói. <br />Chất liệu: Nhựa PC. <br />Kích thước chóa: Ø85*36mm. <br />Cut out: Ø75mm. <br />Màu sắc: Đen (màu theo khách chọn).",
      mainImage: "/products/Downlight/KZN0875A (black).png",
      variants: [
        { name: "KZN0875A - Đen", image: "/products/Downlight/KZN0875A (black).png" },
      ],
      category: "downlight"
    },
    {
      id: 10,
      title: "KZN0885A",
      slug: "downlight-kzn0885a",
      image: "/products/Downlight/KZN0885A.png",
      price: 680000,
      description: "Chóa đèn âm trần chống chói. <br />Chất liệu: Nhựa PC. <br />Kích thước chóa: Ø95*33mm. <br />Cut out: Ø85mm. <br />Màu sắc: Trắng.",
      mainImage: "/products/Downlight/KZN0885A.png",
      variants: [
        { name: "KZN0885A", image: "/products/Downlight/KZN0885A.png" },
      ],
      category: "downlight"
    },
    {
      id: 11,
      title: "KZN0885B",
      slug: "downlight-kzn0885b",
      image: "/products/Downlight/KZN0885B.png",
      price: 680000,
      description: "Chóa đèn âm trần chống chói Flip. <br />Chất liệu: Nhựa PC. <br />Kích thước chóa: Ø 93*H33mm. <br />Cut out: Ø85mm. <br />Màu sắc: Trắng.",
      mainImage: "/products/Downlight/KZN0885B.png",
      variants: [
        { name: "KZN0885B", image: "/products/Downlight/KZN0885B.png" },
      ],
      category: "downlight"
    },
    {
      id: 12,
      title: "KZN0775A",
      slug: "downlight-kzn0775a",
      image: "/products/Downlight/KZN0775A.png",
      price: 680000,
      description: "Chóa đèn âm trần chống chói vuông. <br />Chất liệu: Nhựa PC. <br />Kích thước chóa: 85*85*H36mm. <br />Cut out: Ø75mm. <br />Màu sắc: Trắng.",
      mainImage: "/products/Downlight/KZN0775A.png",
      variants: [
        { name: "KZN0775A", image: "/products/Downlight/KZN0775A.png" },
      ],
      category: "downlight"
    },
    {
      id: 13,
      title: "N11-C-W",
      slug: "downlight-n11-c-w",
      image: "/products/Downlight/N11-C-W.png",
      price: 680000,
      description: "Chóa đèn âm trần chống chói chỉnh hướng góc 15°. <br />Chất liệu: Nhựa PC. <br />Kích thước chóa: Ø88*H39mm. <br />Cut out: Ø75mm. <br />Màu sắc: White.",
      mainImage: "/products/Downlight/N11-C-W.png",
      variants: [
        { name: "N11-C-W", image: "/products/Downlight/N11-C-W.png" },
      ],
      category: "downlight"
    },
    {
      id: 14,
      title: "N11-C-S",
      slug: "downlight-n11-c-s",
      image: "/products/Downlight/N11-C-S.png",
      price: 830000,
      description: "Chóa đèn âm trần chống chói chỉnh hướng góc 15°. <br />Chất liệu: Nhựa PC. <br />Kích thước chóa: Ø88*H39mm. <br />Cut out: Ø75mm. <br />Màu sắc: White + Plating silver.",
      mainImage: "/products/Downlight/N11-C-S.png",
      variants: [
        { name: "N11-C-S", image: "/products/Downlight/N11-C-S.png" },
      ],
      category: "downlight"
    },
    {
      id: 15,
      title: "N11-C-G",
      slug: "downlight-n11-c-g",
      image: "/products/Downlight/N11-C-G.png",
      price: 850000,
      description: "Chóa đèn âm trần chống chói chỉnh hướng góc 15°. <br />Chất liệu: Nhựa PC. <br />Kích thước chóa: Ø88*H39mm. <br />Cut out: Ø75mm. <br />Màu sắc: White + Plating rose gold.",
      mainImage: "/products/Downlight/N11-C-G.png",
      variants: [
        { name: "N11-C-G", image: "/products/Downlight/N11-C-G.png" },
      ],
      category: "downlight"
    },
    {
      id: 16,
      title: "N3100",
      slug: "downlight-n3100",
      image: "/products/Downlight/N3100.png",
      price: 850000,
      description: "Chóa đèn âm trần chống chói chỉnh hướng. <br />Chất liệu: Nhựa PC. <br />Kích thước chóa: Ø110*H29mm. <br />Cut out: Ø75-100mm. <br />Màu sắc: White.",
      mainImage: "/products/Downlight/N3100.png",
      variants: [
        { name: "N3100", image: "/products/Downlight/N3100.png" },
      ],
      category: "downlight"
    },
    {
      id: 17,
      title: "KZN0875A-G",
      slug: "downlight-kzn0875a-g",
      image: "/products/Downlight/KZN0875A-G.png",
      price: 780000,
      description: "Chóa đèn âm trần chống chói. <br />Chất liệu: Kim loại. <br />Kích thước chóa: Ø85*36mm. <br />Cut out: Ø75mm. <br />Màu sắc: Gold brush.",
      mainImage: "/products/Downlight/KZN0875A-G.png",
      variants: [
        { name: "KZN0875A-G", image: "/products/Downlight/KZN0875A-G.png" },
      ],
      category: "downlight"
    },
    {
      id: 18,
      title: "YMN-78-WH",
      slug: "downlight-ymn-78-wh",
      image: "/products/Downlight/YMN-78-WH.png",
      price: 750000,
      description: "Chóa đèn không viền chống chói. Chất liệu: Kim loại. Kích thước chóa: Ø78×H35mm. Màu sắc: White.",
      mainImage: "/products/Downlight/YMN-78-WH.png",
      variants: [
        { name: "YMN-78-WH", image: "/products/Downlight/YMN-78-WH.png" },
      ],
      category: "downlight"
    },
    {
      id: 19,
      title: "YMN-78-BL",
      slug: "downlight-ymn-78-bl",
      image: "/products/Downlight/YMN-78-BL.png",
      price: 750000,
      description: "Chóa đèn không viền chống chói. Chất liệu: Kim loại. Kích thước chóa: Ø78×H35mm. Màu sắc: Black.",
      mainImage: "/products/Downlight/YMN-78-BL.png",
      variants: [
        { name: "YMN-78-BL", image: "/products/Downlight/YMN-78-BL.png" },
      ],
      category: "downlight"
    },
    {
      id: 20,
      title: "YMN-78-CP",
      slug: "downlight-ymn-78-cp",
      image: "/products/Downlight/YMN-78-CP.png",
      price: 850000,
      description: "Chóa đèn không viền chống chói. Chất liệu: Kim loại. Kích thước chóa: Ø78×H35mm. Màu sắc: Copper.",
      mainImage: "/products/Downlight/YMN-78-CP.png",
      variants: [
        { name: "YMN-78-CP", image: "/products/Downlight/YMN-78-CP.png" },
      ],
      category: "downlight"
    },
    {
      id: 21,
      title: "YMN-78-CF",
      slug: "downlight-ymn-78-cf",
      image: "/products/Downlight/YMN-78-CF.png",
      price: 850000,
      description: "Chóa đèn không viền chống chói. Chất liệu: Kim loại. Kích thước chóa: Ø78×H35mm. Màu sắc: Coffee.",
      mainImage: "/products/Downlight/YMN-78-CF.png",
      variants: [
        { name: "YMN-78-CF", image: "/products/Downlight/YMN-78-CF.png" },
      ],
      category: "downlight"
    },
    {
      id: 22,
      title: "YMN-78-RB",
      slug: "downlight-ymn-78-rb",
      image: "/products/Downlight/YMN-78-RB.png",
      price: 950000,
      description: "Chóa đèn không viền chống chói. Chất liệu: Kim loại. Kích thước chóa: Ø78×H35mm. Màu sắc: Rose Gold Brush.",
      mainImage: "/products/Downlight/YMN-78-RB.png",
      variants: [
        { name: "YMN-78-RB", image: "/products/Downlight/YMN-78-RB.png" },
      ],
      category: "downlight"
    },
    // Thêm sản phẩm chip LED downlight
    {
      id: 23,
      title: "KZBS08055J",
      slug: "downlight-kzbs08055j",
      image: "/products/Downlight/KZBS080550.png",
      price: 1350000,
      description: "Đèn âm trần chống chói. Kích thước bóng: Ø50*H22mm. Nhiệt độ màu: 4000K. Góc chiếu: 45°. CRI: Ra>90.",
      mainImage: "/products/Downlight/KZBS080550.png",
      variants: [
        { name: "KZBS08055J B8-6W", image: "/products/Downlight/KZBS080550.png" },
      ],
      category: "downlight"
    },
    {
      id: 24,
      title: "KZB9104502",
      slug: "downlight-kzb9104502",
      image: "/products/Downlight/KZB010450.png",
      price: 1350000,
      description: "Đèn âm trần chống chói. Kích thước bóng: Ø50*H80mm. Nhiệt độ màu: 4000K. Góc chiếu: 38°. CRI: Ra>92.",
      mainImage: "/products/Downlight/KZB010450.png",
      variants: [
        { name: "KZB9104502 B1-9w", image: "/products/Downlight/IDA0069.png" },
        { name: "Chip LED B1-9W", image: "/products/Downlight/KZB010450.png" },
      ],
      category: "downlight"
    },
    {
      id: 25,
      title: "PRO.S38 (C)",
      slug: "downlight-pros38c",
      image: "/collections/Downlight/IDA0075.png",
      price: 1450000,
      description: "Đèn âm trần chống chói. Kích thước bóng: Ø50*H55mm. Nhiệt độ màu: 4000K. Góc chiếu: 38°. CRI: Ra>97.",
      mainImage: "/collections/Downlight/IDA0075.png",
      variants: [
        { name: "PRO.S38 (C)", image: "/collections/Downlight/IDA0075.png" },
      ],
      category: "downlight"
    },
    {
      id: 26,
      title: "PRO.S38 (M)",
      slug: "downlight-pros38m",
      image: "/collections/Downlight/IDA0076.JPG",
      price: 1450000,
      description: "Đèn âm trần chống chói. <br />Kích thước bóng: Ø50*H55mm. <br />Nhiệt độ màu: 4000K. <br />Góc chiếu: 38°. <br />CRI: Ra>97. <br />Chip: Osram - Đức. <br />",
      mainImage: "/collections/Downlight/IDA0076.JPG",
      variants: [
        { name: "PRO.S38 (M)", image: "/collections/Downlight/IDA0076.JPG" },
      ],
      category: "downlight"
    },
    {
      id: 27,
      title: "PRO.S60",
      slug: "downlight-pros60",
      image: "/products/Downlight/PRO.S60.png",
      price: 1450000,
      description: "Đèn âm trần chống chói. <br />Kích thước bóng: Ø50*H55mm. <br />Nhiệt độ màu: 3000K. <br />Góc chiếu: 60°. <br />CRI: Ra>97. <br />Chip: Osram - Đức. <br />",
      mainImage: "/products/Downlight/PRO.S60.png",
      variants: [
        { name: "PRO.S60", image: "/products/Downlight/PRO.S60.png" },
      ],
      category: "downlight"
    },
    {
      id: 28,
      title: "B3-12W",
      slug: "led-module-b3-12w",
      image: "/products/Downlight/IDA0087.png",
      price: 1550000,
      description: "Đèn âm trần chống chói. <br />Kích thước bóng: Ø50*H55mm. <br />Nhiệt độ màu: 3000K. <br />Góc chiếu: 60°. <br />CRI: Ra>97.",
      mainImage: "/products/Downlight/B3-12W.png",
      variants: [
        { name: "B3-12W", image: "/products/Downlight/IDA0087.png" },
        { name: "Chip LED B3-12W", image: "/products/Downlight/B3-12W.png" },
      ],
      category: "downlight"
    },
    {
      id: 29,
      title: "B8-6W",
      slug: "downlight-b8-6w",
      image: "/products/Downlight/IDA0086.png",
      price: 780000,
      description: "Đèn rọi âm trần Spotlight. <br />Màu sắc: Trắng. <br />Góc chiếu: 15°. <br />CRI: > 97Ra. <br />Nhiệt độ màu: 3000K. <br />Chip: Full Osram - Đức. <br />W/lm: 5W/485lm. <br />Lỗ Khoét: ∅35.",
      mainImage: "/products/Downlight/IDA0086.png",
      variants: [
        { name: "B8-6W", image: "/products/Downlight/IDA0086.png" },
      ],
      category: "downlight"
    },
    {
      id: 30,
      title: "PRO.S60 (B)",
      slug: "downlight-pros60b",
      image: "/products/Downlight/IDA0087.png",
      price: 680000,
      description: "Đèn âm trần chống ẩm chóa đen. <br />Kích thước bóng: ∅50*H55mm. <br />Kích thước chóa: ∅110*H27mm. <br />Nhiệt độ màu: 4000K. <br />Góc chiếu: 60°. <br />CRI: Ra>97. <br />Chip: Osram - Đức. <br />W/lm: 12w. <br />Lỗ Khoét: ∅75.",
      mainImage: "/products/Downlight/IDA0087.png",
      variants: [
        { name: "PRO.S60 (B)", image: "/products/Downlight/IDA0087.png" },
      ],
      category: "downlight"
    },
    {
      id: 31,
      title: "PRO.DLS38",
      slug: "downlight-prodls38",
      image: "/products/Downlight/IDA0075.png",
      price: 1850000,
      description: "Đèn âm trần chống chói. Kích thước bóng: Ø50*H75mm. COB 15W   AC180-240V. Nhiệt độ màu: 2700-6500K. Góc chiếu: 38°. CRI 97Ra. Chip Dali OSRAM 97Ra, driver Dali iTECH.",
      mainImage: "/products/Downlight/IDA0075.png",
      variants: [
        { name: "PRO.DLS38", image: "/products/Downlight/IDA0075.png" },
      ],
      category: "downlight"
    },
    {
      id: 32,
      title: "PRO.DLS60",
      slug: "downlight-prodls60",
      image: "/products/Downlight/IDA0075.png",
      price: 1850000,
      description: "Đèn âm trần chống chói. Kích thước bóng: Ø50*H75mm. COB 15W   AC180-240V. Nhiệt độ màu: 2700-6500K. Góc chiếu: 60°. CRI 97Ra. Chip Dali OSRAM 97Ra, driver Dali iTECH.",
      mainImage: "/products/Downlight/IDA0075.png",
      variants: [
        { name: "PRO.DLS60", image: "/products/Downlight/IDA0075.png" },
      ],
      category: "downlight"
    },
    {
      id: 33,
      title: "B9-75-15w",
      slug: "downlight-b9-75-15w",
      image: "/products/Downlight/B9-75-15w.png",
      price: 1850000,
      description: "Đèn âm trần chống chói. Kích thước bóng: Ø50*H75mm. COB 15W   AC180-240V. Nhiệt độ màu: 2700-6500K. Góc chiếu: 60°. CRI 97Ra.",
      mainImage: "/products/Downlight/B9-75-15w.png",
      variants: [
        { name: "B9-75-15w", image: "/products/Downlight/B9-75-15w.png" },
      ],
      category: "downlight"
    },
    {
      id: 34,
      title: "E35",
      slug: "downlight-e35",
      image: "/products/Downlight/IDA0075.png",
      price: 1250000,
      description: "Đèn âm trần Spotlight. Màu sắc: Trắng. Góc chiếu: 15°. CRI> 97Ra. Nhiệt độ màu: 3000K. Chip: Osram.",
      mainImage: "/products/Downlight/IDA0075.png",
      variants: [
        { name: "E35", image: "/products/Downlight/IDA0075.png" },
      ],
      category: "downlight"
    },
    {
      id: 35,
      title: "PRO.S60 Combo",
      slug: "led-module-pros60",
      image: "/products/Downlight/PRO.S60.png",
      price: 1450000,
      description: "Combo đèn âm trần chống chói không chỉnh hướng. Kích thước chóa: Ø88*H39mm. Kích thước bóng: Ø50*H55mm. Nhiệt độ màu: 4000K. Góc chiếu: 60°. CRI: Ra>97.",
      mainImage: "/products/Downlight/PRO.S60.png",
      variants: [
        { name: "PRO.S60 Combo", image: "/products/Downlight/IDA0075.png" },
        { name: "Chip LED S60", image: "/products/Downlight/PRO.S60.png" },
      ],
      category: "downlight"
    },
    {
      id: 36,
      title: "PRO.S60 Combo",
      slug: "downlight-pros60-combo",
      image: "/products/Downlight/PRO.S60.png", 
      price: 1450000,
      description: "Combo đèn âm trần chống chói chỉnh hướng góc 15°. Kích thước chóa: Ø88*H39mm. Kích thước bóng: Ø50*H55mm. Nhiệt độ màu: 4000K. Góc chiếu: 60°. CRI: Ra>97.",
      mainImage: "/products/Downlight/PRO.S60.png",
      variants: [
        { name: "PRO.S60 Combo", image: "/products/Downlight/PRO.S60.png" },
      ],
      category: "downlight"
    },
    // Đèn outdoor mới cập nhật
    {
      id: 16,
      title: "CP20183",
      slug: "cp20183",
      image: "/collections/out-door/CP20183/1.jpg",
      price: 1950000,
      description: "Đèn trụ sân vườn CP20183 với thiết kế hiện đại, thân đèn làm từ hợp kim nhôm cao cấp với lớp sơn tĩnh điện Sand black. Với kích thước Ø150mm và chiều cao 600mm, đèn mang đến vẻ đẹp sang trọng cho không gian ngoại thất.",
      mainImage: "/collections/out-door/CP20183/1.jpg",
      variants: [
        { name: "Góc nhìn 1", image: "/collections/out-door/CP20183/1.jpg" },
        { name: "Góc nhìn 2", image: "/collections/out-door/CP20183/2.jpg" },
        { name: "Góc nhìn 3", image: "/collections/out-door/CP20183/3.jpg" }
      ],
      category: "outdoor"
    },
    {
      id: 17,
      title: "CP20184",
      slug: "cp20184",
      image: "/collections/out-door/CP20184/6.jpg",
      price: 1850000,
      description: "Đèn trụ sân vườn CP20184 với kiểu dáng tinh tế, kích thước Ø200*400mm, công suất 7W và sử dụng chip LED COB. Thân đèn làm từ nhôm nguyên khối sơn tĩnh điện, chống oxy hóa, thích hợp cho điều kiện thời tiết khắc nghiệt.",
      mainImage: "/collections/out-door/CP20184/6.jpg",
      variants: [
        { name: "Góc nhìn 1", image: "/collections/out-door/CP20184/6.jpg" },
        { name: "Góc nhìn 2", image: "/collections/out-door/CP20184/2.jpg" },
        { name: "Góc nhìn 3", image: "/collections/out-door/CP20184/3.jpg" },
        { name: "Góc nhìn 4", image: "/collections/out-door/CP20184/4.jpg" }
      ],
      category: "outdoor"
    },
    {
      id: 18,
      title: "CP20188",
      slug: "cp20188",
      image: "/collections/out-door/CP20188/4.jpg",
      price: 2100000,
      description: "Đèn trụ sân vườn CP20188 với thiết kế độc đáo, kích thước 160*55*600mm và công suất 10W. Đèn sử dụng chip LED COB với nhiệt độ màu 3000K, tạo ánh sáng ấm áp cho khu vực sân vườn vào buổi tối.",
      mainImage: "/collections/out-door/CP20188/4.jpg",
      variants: [
        { name: "Góc nhìn 1", image: "/collections/out-door/CP20188/4.jpg" },
        { name: "Góc nhìn 2", image: "/collections/out-door/CP20188/1.jpg" },
        { name: "Góc nhìn 3", image: "/collections/out-door/CP20188/2.jpg" },
        { name: "Góc nhìn 4", image: "/collections/out-door/CP20188/3.jpg" }
      ],
      category: "outdoor"
    },
    {
      id: 19,
      title: "CP20196",
      slug: "cp20196",
      image: "/collections/out-door/CP20196/6.jpg",
      price: 2250000,
      description: "Đèn trụ sân vườn CP20196 có kích thước 150*150*600mm, công suất 7W làm từ nhôm sơn tĩnh điện màu đen cát. Đèn sử dụng chip LED COB với nhiệt độ màu 3000K, mang đến ánh sáng ấm cúng và sang trọng cho không gian ngoại thất.",
      mainImage: "/collections/out-door/CP20196/6.jpg",
      variants: [
        { name: "Góc nhìn 1", image: "/collections/out-door/CP20196/6.jpg" },
        { name: "Góc nhìn 2", image: "/collections/out-door/CP20196/2.jpg" },
        { name: "Góc nhìn 3", image: "/collections/out-door/CP20196/3.jpg" },
        { name: "Góc nhìn 4", image: "/collections/out-door/CP20196/4.jpg" }
      ],
      category: "outdoor"
    },
    {
      id: 20,
      title: "CP20199",
      slug: "cp20199",
      image: "/collections/out-door/CP20199/2.jpg",
      price: 1980000,
      description: "Đèn trụ sân vườn CP20199 với kích thước 150*150*600mm, công suất 10W, điện áp 24V. Thân đèn được làm từ hợp kim nhôm sơn tĩnh điện màu đen cát, chống thấm nước và oxy hóa, phù hợp cho không gian ngoại thất.",
      mainImage: "/collections/out-door/CP20199/2.jpg",
      variants: [
        { name: "Góc nhìn 1", image: "/collections/out-door/CP20199/2.jpg" },
        { name: "Góc nhìn 2", image: "/collections/out-door/CP20199/1.jpg" },
        { name: "Góc nhìn 3", image: "/collections/out-door/CP20199/3.jpg" },
        { name: "Góc nhìn ban đêm", image: "/collections/out-door/CP20199/4.jpg" }
      ],
      category: "outdoor"
    },
    {
      id: 21,
      title: "CP20205",
      slug: "cp20205",
      image: "/collections/out-door/CP20205/3.jpg",
      price: 1750000,
      description: "Đèn trụ sân vườn CP20205 với kích thước nhỏ gọn 100*78mm, chiều cao 600mm phù hợp cho lối đi trong vườn. Công suất 7W với ánh sáng ấm 3000K mang đến không gian ngoại thất sang trọng vào buổi tối.",
      mainImage: "/collections/out-door/CP20205/3.jpg",
      variants: [
        { name: "Góc nhìn 1", image: "/collections/out-door/CP20205/3.jpg" },
        { name: "Góc nhìn 2", image: "/collections/out-door/CP20205/1.jpg" },
        { name: "Góc nhìn 3", image: "/collections/out-door/CP20205/2.jpg" },
        { name: "Góc nhìn ban đêm", image: "/collections/out-door/CP20205/4.jpg" }
      ],
      category: "outdoor"
    },
    {
      id: 22,
      title: "CP20219",
      slug: "cp20219",
      image: "/collections/out-door/CP20219/3.jpg",
      price: 1820000,
      description: "Đèn trụ sân vườn CP20219 với thiết kế đặc biệt, kích thước 120*40mm và chiều cao 600mm. Công suất 7W với ánh sáng LED COB 3000K tạo hiệu ứng chiếu sáng độc đáo cho không gian sân vườn vào buổi tối.",
      mainImage: "/collections/out-door/CP20219/3.jpg",
      variants: [
        { name: "Góc nhìn 1", image: "/collections/out-door/CP20219/3.jpg" },
        { name: "Góc nhìn 2", image: "/collections/out-door/CP20219/1.jpg" },
        { name: "Góc nhìn 3", image: "/collections/out-door/CP20219/2.jpg" },
        { name: "Góc nhìn ban đêm", image: "/collections/out-door/CP20219/4.jpg" }
      ],
      category: "outdoor"
    },
    {
      id: 23,
      title: "CP201812",
      slug: "cp201812",
      image: "/collections/out-door/CP201812/2.jpg",
      price: 2450000,
      description: "Đèn trụ sân vườn CP201812 với thiết kế sang trọng, kích thước Ø140mm và chiều cao 600mm. Đèn sử dụng 2 bóng LED COB 8W, tổng công suất 16W, mang đến hiệu ứng chiếu sáng hai hướng độc đáo cho không gian ngoại thất.",
      mainImage: "/collections/out-door/CP201812/2.jpg",
      variants: [
        { name: "Góc nhìn 1", image: "/collections/out-door/CP201812/2.jpg" },
        { name: "Góc nhìn 2", image: "/collections/out-door/CP201812/1.jpg" },
        { name: "Góc nhìn 3", image: "/collections/out-door/CP201812/3.jpg" },
        { name: "Góc nhìn ban đêm", image: "/collections/out-door/CP201812/4.jpg" }
      ],
      category: "outdoor"
    },
    {
      id: 24,
      title: "CP202112",
      slug: "cp202112",
      image: "/collections/out-door/CP202112/4.jpg",
      price: 2400000,
      description: "Đèn trụ sân vườn CP202112 với thiết kế hiện đại, kích thước Ø140mm và chiều cao 600mm. Đèn sử dụng công nghệ LED tiên tiến với công suất 12W, độ hoàn màu CRI>80 và nhiệt độ màu 3000K, tạo ánh sáng ấm áp cho không gian ngoại thất.",
      mainImage: "/collections/out-door/CP202112/4.jpg",
      variants: [
        { name: "Góc nhìn ban đêm", image: "/collections/out-door/CP202112/4.jpg" },
        { name: "Góc nhìn 1", image: "/collections/out-door/CP202112/1.jpg" },
        { name: "Góc nhìn 2", image: "/collections/out-door/CP202112/2.jpg" },
        { name: "Góc nhìn 3", image: "/collections/out-door/CP202112/3.jpg" }
      ],
      category: "outdoor"
    },
    {
      id: 25,
      title: "CP202113",
      slug: "cp202113",
      image: "/collections/out-door/CP202113/2.jpg",
      price: 1800000,
      description: "Đèn trụ sân vườn CP202113 với thiết kế hình khối độc đáo, kích thước 160*55*600mm. Đèn sử dụng chip LED COB công suất 16W, nhiệt độ màu 3000K mang đến ánh sáng ấm áp và sang trọng cho không gian ngoại thất vào buổi tối.",
      mainImage: "/collections/out-door/CP202113/2.jpg",
      variants: [
        { name: "Góc nhìn 1", image: "/collections/out-door/CP202113/2.jpg" },
        { name: "Góc nhìn 2", image: "/collections/out-door/CP202113/1.jpg" },
        { name: "Góc nhìn 3", image: "/collections/out-door/CP202113/3.jpg" },
        { name: "Góc nhìn ban đêm", image: "/collections/out-door/CP202113/4.jpg" }
      ],
      category: "outdoor"
    },
    {
      id: 26,
      title: "CP202455",
      slug: "cp202455",
      image: "/products/outdoor/garden-light-5.png",
      price: 4200000,
      description: "Đèn trang trí sân vườn CP202455 với kiểu dáng đèn chùm hiện đại, kích thước Ø200*800mm. Với công suất 18W, ánh sáng LED COB 3000K, đèn mang đến hiệu ứng chiếu sáng trang trí độc đáo cho không gian ngoại thất cao cấp.",
      mainImage: "/products/outdoor/garden-light-5.png",
      variants: [
        { name: "Mẫu tiêu chuẩn", image: "/products/outdoor/garden-light-5.png" },
        { name: "Ứng dụng 1", image: "/products/outdoor/garden-light-1.png" },
        { name: "Ứng dụng 2", image: "/products/outdoor/garden-light-2.png" },
        { name: "Ứng dụng 3", image: "/products/outdoor/garden-light-3.png" }
      ],
      category: "outdoor"
    },
    {
      id: 27,
      title: "CP202456",
      slug: "cp202456",
      image: "/collections/out-door/CP202456/4.jpg",
      price: 2900000,
      description: "Đèn cột sân vườn CP202456 với kích thước 120*120*1000mm, công suất 24W và điện áp 220V. Đèn sử dụng chip LED COB với nhiệt độ màu 3000K, thân đèn làm từ hợp kim nhôm sơn tĩnh điện màu xám đen, mang đến vẻ đẹp hiện đại cho không gian ngoại thất.",
      mainImage: "/collections/out-door/CP202456/4.jpg",
      variants: [
        { name: "Góc nhìn ban đêm", image: "/collections/out-door/CP202456/4.jpg" },
        { name: "Góc nhìn 1", image: "/collections/out-door/CP202456/1.jpg" },
        { name: "Góc nhìn 2", image: "/collections/out-door/CP202456/2.jpg" },
        { name: "Góc nhìn 3", image: "/collections/out-door/CP202456/3.jpg" }
      ],
      category: "outdoor"
    },
    // Add anti-glare trim products from data file
    {
      id: 28,
      title: "KZN0875A",
      slug: "downlight-kzn0875a-white",
      image: "/products/Downlight/KZN0875A.png",
      price: 680000,
      description: "Đèn chóa âm trần chống chói với chất liệu nhựa PC, kích thước chóa Ø85×36mm, cut out Ø75mm. Màu trắng tinh tế phù hợp với nhiều loại trần nhà, tương thích với chip LED Osram/CREE.",
      mainImage: "/products/Downlight/KZN0875A.png",
      variants: [
        { name: "KZN0875A - Trắng", image: "/products/Downlight/KZN0875A.png" }
      ],
      category: "downlight"
    },
    {
      id: 29,
      title: "KZN0875A-B",
      slug: "downlight-kzn0875a-black",
      image: "/products/Downlight/KZN0875A (black).png",
      price: 680000,
      description: "Đèn chóa âm trần chống chói màu đen với chất liệu nhựa PC, kích thước chóa Ø85×36mm, cut out Ø75mm. Thiết kế màu đen sang trọng tạo điểm nhấn cho không gian nội thất, tương thích với chip LED Osram/CREE.",
      mainImage: "/products/Downlight/KZN0875A (black).png",
      variants: [
        { name: "KZN0875A-B - Đen", image: "/products/Downlight/KZN0875A (black).png" }
      ],
      category: "downlight"
    },
    {
      id: 30,
      title: "KZN0885A",
      slug: "downlight-kzn0885a",
      image: "/products/Downlight/KZN0885A.png",
      price: 680000,
      description: "Đèn chóa âm trần chống chói với chất liệu nhựa PC, kích thước chóa Ø95×51mm, cut out Ø85mm. Màu trắng tinh tế phù hợp với nhiều không gian nội thất, tương thích với chip LED Osram/CREE.",
      mainImage: "/products/Downlight/KZN0885A.png",
      variants: [
        { name: "KZN0885A - Trắng", image: "/products/Downlight/KZN0885A.png" }
      ],
      category: "downlight"
    },
    {
      id: 31,
      title: "KZN0885B",
      slug: "downlight-kzn0885b",
      image: "/products/Downlight/KZN0885B.png",
      price: 680000,
      description: "Đèn chóa âm trần chống chói với chất liệu nhựa PC, kích thước chóa Ø93×H33mm, cut out Ø85mm. Màu trắng thanh lịch, thiết kế tinh tế phù hợp cho nhiều không gian, tương thích với chip LED Osram/CREE.",
      mainImage: "/products/Downlight/KZN0885B.png",
      variants: [
        { name: "KZN0885B", image: "/products/Downlight/KZN0885B.png" }
      ],
      category: "downlight"
    },
    {
      id: 32,
      title: "KZN0775A",
      slug: "downlight-kzn0775a",
      image: "/products/Downlight/KZN0775A.png",
      price: 680000,
      description: "Đèn chóa âm trần chống chói hình vuông với chất liệu nhựa PC, kích thước chóa 85×85×H36mm, cut out Ø75mm. Thiết kế vuông màu trắng hiện đại, tương thích với chip LED Osram/CREE.",
      mainImage: "/products/Downlight/KZN0775A.png",
      variants: [
        { name: "KZN0775A - Trắng", image: "/products/Downlight/KZN0775A.png" }
      ],
      category: "downlight"
    },
    {
      id: 33,
      title: "N11-C-W",
      slug: "downlight-n11-c-w",
      image: "/products/Downlight/N11-C-W.png",
      price: 750000,
      description: "Đèn chóa âm trần chống chói với chất liệu nhựa PC, kích thước chóa Ø88×H39mm, cut out Ø75mm. Màu trắng tinh tế, tương thích với chip LED Osram/CREE mang lại ánh sáng chất lượng cao.",
      mainImage: "/products/Downlight/N11-C-W.png",
      variants: [
        { name: "N11-C-W", image: "/products/Downlight/N11-C-W.png" }
      ],
      category: "downlight"
    },
    {
      id: 34,
      title: "N11-C-S",
      slug: "downlight-n11-c-s",
      image: "/products/Downlight/N11-C-S.png",
      price: 800000,
      description: "Đèn chóa âm trần chống chói với chất liệu nhựa PC, kích thước chóa Ø88×H39mm, cut out Ø75mm. Màu trắng kết hợp với mạ bạc tinh tế, tương thích với chip LED Osram/CREE.",
      mainImage: "/products/Downlight/N11-C-S.png",
      variants: [
        { name: "N11-C-S", image: "/products/Downlight/N11-C-S.png" }
      ],
      category: "downlight"
    },
    {
      id: 35,
      title: "N11-C-G",
      slug: "downlight-n11-c-g",
      image: "/products/Downlight/N11-C-G.png",
      price: 850000,
      description: "Đèn chóa âm trần chống chói với chất liệu nhựa PC, kích thước chóa Ø88×H39mm, cut out Ø75mm. Màu trắng kết hợp với mạ vàng hồng sang trọng, tương thích với chip LED Osram/CREE.",
      mainImage: "/products/Downlight/N11-C-G.png",
      variants: [
        { name: "N11-C-G", image: "/products/Downlight/N11-C-G.png" }
      ],
      category: "downlight"
    },
    {
      id: 36,
      title: "N3100",
      slug: "downlight-n3100",
      image: "/products/Downlight/N3100.png",
      price: 780000,
      description: "Đèn chóa âm trần chống chói với chất liệu nhựa PC, kích thước chóa Ø110×H29mm, cut out Ø75-100mm. Màu trắng tinh tế, tương thích với chip LED Osram/CREE.",
      mainImage: "/products/Downlight/N3100.png",
      variants: [
        { name: "N3100", image: "/products/Downlight/N3100.png" }
      ],
      category: "downlight"
    },
    {
      id: 37,
      title: "P04-W",
      slug: "downlight-p04-w",
      image: "/products/Downlight/P04-W.png",
      price: 720000,
      description: "Đèn chóa âm trần chống chói với chất liệu nhựa PC, kích thước chóa Ø88×H39mm, cut out Ø75mm. Màu trắng tinh tế, tương thích với chip LED Osram/CREE.",
      mainImage: "/products/Downlight/P04-W.png",
      variants: [
        { name: "P04-W", image: "/products/Downlight/P04-W.png" }
      ],
      category: "downlight"
    },
    {
      id: 38,
      title: "P06-W",
      slug: "downlight-p06-w",
      image: "/products/Downlight/P06-W.png",
      price: 720000,
      description: "Đèn chóa âm trần chống chói với chất liệu nhựa PC, kích thước chóa Ø88×H39mm, cut out Ø75mm. Màu trắng tinh tế, tương thích với chip LED Osram/CREE.",
      mainImage: "/products/Downlight/P06-W.png",
      variants: [
        { name: "P06-W", image: "/products/Downlight/P06-W.png" }
      ],
      category: "downlight"
    },
    {
      id: 39,
      title: "P06-CP",
      slug: "downlight-p06-cp",
      image: "/products/Downlight/P06-CP.png",
      price: 780000,
      description: "Đèn chóa âm trần chống chói với chất liệu nhựa PC, kích thước chóa Ø88×H39mm, cut out Ø75mm. Màu đồng sang trọng, tương thích với chip LED Osram/CREE.",
      mainImage: "/products/Downlight/P06-CP.png",
      variants: [
        { name: "P06-CP", image: "/products/Downlight/P06-CP.png" }
      ],
      category: "downlight"
    },
    {
      id: 40,
      title: "F201975",
      slug: "downlight-f201975",
      image: "/products/Downlight/F201975.png",
      price: 820000,
      description: "Đèn chóa âm trần chống chói với chất liệu nhựa PC, kích thước chóa Ø120×H40mm, cut out Ø90×H35mm. Màu trắng thanh lịch, tương thích với chip LED Osram/CREE.",
      mainImage: "/products/Downlight/F201975.png",
      variants: [
        { name: "F201975", image: "/products/Downlight/F201975.png" }
      ],
      category: "downlight"
    },
    {
      id: 41,
      title: "KZN01875C",
      slug: "downlight-kzn01875c",
      image: "/products/Downlight/KZN01875C.png",
      price: 750000,
      description: "Đèn chóa âm trần không viền với chất liệu nhựa PC, kích thước chóa Ø110×H40mm, cut out Ø75mm. Màu trắng tinh tế, tương thích với chip LED Osram/CREE.",
      mainImage: "/products/Downlight/KZN01875C.png",
      variants: [
        { name: "KZN01875C - Trắng", image: "/products/Downlight/KZN01875C.png" }
      ],
      category: "downlight"
    },
    {
      id: 42,
      title: "YMN-78-WH",
      slug: "downlight-ymn-78-wh",
      image: "/products/Downlight/YMN-78-WH.png",
      price: 950000,
      description: "Đèn chóa âm trần không viền với chất liệu kim loại cao cấp, kích thước chóa Ø78×H35mm. Màu trắng sang trọng, tương thích với chip LED Osram/CREE.",
      mainImage: "/products/Downlight/YMN-78-WH.png",
      variants: [
        { name: "YMN-78-WH", image: "/products/Downlight/YMN-78-WH.png" }
      ],
      category: "downlight"
    },
    {
      id: 43,
      title: "YMN-78-BL",
      slug: "downlight-ymn-78-bl",
      image: "/products/Downlight/YMN-78-BL.png",
      price: 950000,
      description: "Đèn chóa âm trần không viền với chất liệu kim loại cao cấp, kích thước chóa Ø78×H35mm. Màu đen sang trọng, tương thích với chip LED Osram/CREE.",
      mainImage: "/products/Downlight/YMN-78-BL.png",
      variants: [
        { name: "YMN-78-BL", image: "/products/Downlight/YMN-78-BL.png" }
      ],
      category: "downlight"
    },
    {
      id: 44,
      title: "YMN-78-CP",
      slug: "downlight-ymn-78-cp",
      image: "/products/Downlight/YMN-78-CP.png",
      price: 980000,
      description: "Đèn chóa âm trần không viền với chất liệu kim loại cao cấp, kích thước chóa Ø78×H35mm. Màu đồng sang trọng, tương thích với chip LED Osram/CREE.",
      mainImage: "/products/Downlight/YMN-78-CP.png",
      variants: [
        { name: "YMN-78-CP", image: "/products/Downlight/YMN-78-CP.png" }
      ],
      category: "downlight"
    },
    {
      id: 45,
      title: "YMN-78-CF",
      slug: "downlight-ymn-78-cf",
      image: "/products/Downlight/YMN-78-CF.png",
      price: 980000,
      description: "Đèn chóa âm trần không viền với chất liệu kim loại cao cấp, kích thước chóa Ø78×H35mm. Màu coffee sang trọng, tương thích với chip LED Osram/CREE.",
      mainImage: "/products/Downlight/YMN-78-CF.png",
      variants: [
        { name: "YMN-78-CF", image: "/products/Downlight/YMN-78-CF.png" }
      ],
      category: "downlight"
    },
    {
      id: 46,
      title: "YMN-78-RB",
      slug: "downlight-ymn-78-rb",
      image: "/products/Downlight/YMN-78-RB.png",
      price: 980000,
      description: "Đèn chóa âm trần không viền với chất liệu kim loại cao cấp, kích thước chóa Ø78×H35mm. Màu nâu đỏ (Redish brown) sang trọng, tương thích với chip LED Osram/CREE.",
      mainImage: "/products/Downlight/YMN-78-RB.png",
      variants: [
        { name: "YMN-78-RB", image: "/products/Downlight/YMN-78-RB.png" }
      ],
      category: "downlight"
    },
    {
      id: 47,
      title: "B9-12W-3000K",
      slug: "led-module-b9-12w-3000k",
      image: "/products/Downlight/B9-12W-3000K.png",
      price: 1250000,
      description: "Module LED cao cấp với công suất 12W, kích thước Ø50×H55mm, nhiệt độ màu 3000K. CRI>97, sử dụng chip LED Osram - Đức và driver Dali lTech (Lắp ráp Trung Quốc).",
      mainImage: "/products/Downlight/B9-12W-3000K.png",
      variants: [
        { name: "B9-12W-3000K", image: "/products/Downlight/B9-12W-3000K.png" }
      ],
      category: "downlight"
    }
  ];
  
  // Add luxury decorative lighting products
  const decorativeLightProducts = [
    {
      id: 100,
      title: "ĐÈN CHÙM BẠCH QUẢ GINGKO",
      slug: "luxury-chandelier-fp",
      image: "/collections/chad/ĐÈN CHÙM BẠCH QUẢ GINGKO/ĐÈN CHÙM BẠCH QUẢ GINGKO/1.jpg",
      price: 32500000,
      description: "Đèn chùm Bạch Quả Gingko với thiết kế tinh tế lấy cảm hứng từ lá cây bạch quả, được làm từ chất liệu nhôm mạ vàng và acrylic cao cấp. Ánh sáng dịu nhẹ tỏa ra từ những chiếc lá tạo nên không gian ấm cúng và sang trọng.",
      mainImage: "/collections/chad/ĐÈN CHÙM BẠCH QUẢ GINGKO/ĐÈN CHÙM BẠCH QUẢ GINGKO/1.jpg",
      variants: [
        { name: "Góc nhìn 1", image: "/collections/chad/ĐÈN CHÙM BẠCH QUẢ GINGKO/ĐÈN CHÙM BẠCH QUẢ GINGKO/1.jpg" },
        { name: "Góc nhìn 2", image: "/collections/chad/ĐÈN CHÙM BẠCH QUẢ GINGKO/ĐÈN CHÙM BẠCH QUẢ GINGKO/2.jpg" },
        { name: "Góc nhìn 3", image: "/collections/chad/ĐÈN CHÙM BẠCH QUẢ GINGKO/ĐÈN CHÙM BẠCH QUẢ GINGKO/3.jpg" },
        { name: "Góc nhìn 4", image: "/collections/chad/ĐÈN CHÙM BẠCH QUẢ GINGKO/ĐÈN CHÙM BẠCH QUẢ GINGKO/4.jpg" },
        { name: "Góc nhìn 5", image: "/collections/chad/ĐÈN CHÙM BẠCH QUẢ GINGKO/ĐÈN CHÙM BẠCH QUẢ GINGKO/5.jpg" },
        { name: "Góc nhìn 6", image: "/collections/chad/ĐÈN CHÙM BẠCH QUẢ GINGKO/ĐÈN CHÙM BẠCH QUẢ GINGKO/6.jpg" }
      ],
      category: "decorative"
    },
    {
      id: 101,
      title: "ĐÈN CHÙM BẰNG ĐỒNG CỔ ĐIỂN",
      slug: "luxury-chandelier-gcb",
      image: "/collections/chad/ĐÈN CHÙM BẰNG ĐỒNG CỔ ĐIỂN/ĐÈN CHÙM BẰNG ĐỒNG CỔ ĐIỂN/1.jpg",
      price: 42800000,
      description: "Đèn chùm bằng đồng cổ điển là tác phẩm nghệ thuật đỉnh cao, kết hợp giữa chất liệu đồng mạ vàng và pha lê crystal K9 cao cấp. Thiết kế sang trọng theo phong cách châu Âu cổ điển, mang đến vẻ đẹp vượt thời gian cho không gian sống.",
      mainImage: "/collections/chad/ĐÈN CHÙM BẰNG ĐỒNG CỔ ĐIỂN/ĐÈN CHÙM BẰNG ĐỒNG CỔ ĐIỂN/1.jpg",
      variants: [
        { name: "Góc nhìn 1", image: "/collections/chad/ĐÈN CHÙM BẰNG ĐỒNG CỔ ĐIỂN/ĐÈN CHÙM BẰNG ĐỒNG CỔ ĐIỂN/1.jpg" },
        { name: "Góc nhìn 2", image: "/collections/chad/ĐÈN CHÙM BẰNG ĐỒNG CỔ ĐIỂN/ĐÈN CHÙM BẰNG ĐỒNG CỔ ĐIỂN/2.jpg" },
        { name: "Góc nhìn 3", image: "/collections/chad/ĐÈN CHÙM BẰNG ĐỒNG CỔ ĐIỂN/ĐÈN CHÙM BẰNG ĐỒNG CỔ ĐIỂN/3.jpg" },
        { name: "Góc nhìn 4", image: "/collections/chad/ĐÈN CHÙM BẰNG ĐỒNG CỔ ĐIỂN/ĐÈN CHÙM BẰNG ĐỒNG CỔ ĐIỂN/4.jpg" },
        { name: "Góc nhìn 5", image: "/collections/chad/ĐÈN CHÙM BẰNG ĐỒNG CỔ ĐIỂN/ĐÈN CHÙM BẰNG ĐỒNG CỔ ĐIỂN/5.jpg" },
        { name: "Góc nhìn 6", image: "/collections/chad/ĐÈN CHÙM BẰNG ĐỒNG CỔ ĐIỂN/ĐÈN CHÙM BẰNG ĐỒNG CỔ ĐIỂN/6.jpg" }
      ],
      category: "decorative"
    },
    {
      id: 102,
      title: "ĐÈN CHÙM BIJOU",
      slug: "luxury-chandelier-gr",
      image: "/collections/chad/ĐÈN CHÙM BIJOU/ĐÈN CHÙM BIJOU/1.jpg",
      price: 28600000,
      description: "Đèn chùm Bijou là tác phẩm nghệ thuật ánh sáng hiện đại với thiết kế hình vòng tròn chồng lên nhau tạo hiệu ứng độc đáo. Chất liệu thép không gỉ mạ PVD vàng sang trọng với hai tầng đèn, kết hợp công nghệ LED tích hợp có thể điều chỉnh nhiệt độ màu.",
      mainImage: "/collections/chad/ĐÈN CHÙM BIJOU/ĐÈN CHÙM BIJOU/1.jpg",
      variants: [
        { name: "Góc nhìn 1", image: "/collections/chad/ĐÈN CHÙM BIJOU/ĐÈN CHÙM BIJOU/1.jpg" },
        { name: "Góc nhìn 2", image: "/collections/chad/ĐÈN CHÙM BIJOU/ĐÈN CHÙM BIJOU/2.jpg" },
        { name: "Góc nhìn 3", image: "/collections/chad/ĐÈN CHÙM BIJOU/ĐÈN CHÙM BIJOU/3.jpg" },
        { name: "Góc nhìn 4", image: "/collections/chad/ĐÈN CHÙM BIJOU/ĐÈN CHÙM BIJOU/4.jpg" },
        { name: "Góc nhìn 5", image: "/collections/chad/ĐÈN CHÙM BIJOU/ĐÈN CHÙM BIJOU/5.jpg" }
      ],
      category: "decorative"
    },
    {
      id: 103,
      title: "ĐÈN CHÙM HOA BAY",
      slug: "luxury-chandelier-cw",
      image: "/collections/chad/ĐÈN CHÙM HOA BAY/ĐÈN CHÙM HOA BAY/1.jpg",
      price: 58900000,
      description: "Đèn chùm Hoa Bay là tác phẩm nghệ thuật tinh xảo với thiết kế các cánh hoa lơ lửng tạo cảm giác như một thác nước pha lê đang đổ xuống. Chất liệu crystal cao cấp kết hợp với thép không gỉ mạ vàng tạo nên vẻ đẹp lộng lẫy, sang trọng.",
      mainImage: "/collections/chad/ĐÈN CHÙM HOA BAY/ĐÈN CHÙM HOA BAY/1.jpg",
      variants: [
        { name: "Góc nhìn 1", image: "/collections/chad/ĐÈN CHÙM HOA BAY/ĐÈN CHÙM HOA BAY/1.jpg" },
        { name: "Góc nhìn 2", image: "/collections/chad/ĐÈN CHÙM HOA BAY/ĐÈN CHÙM HOA BAY/2.jpg" },
        { name: "Góc nhìn 3", image: "/collections/chad/ĐÈN CHÙM HOA BAY/ĐÈN CHÙM HOA BAY/3.jpg" },
        { name: "Góc nhìn 4", image: "/collections/chad/ĐÈN CHÙM HOA BAY/ĐÈN CHÙM HOA BAY/4.jpg" },
        { name: "Góc nhìn 5", image: "/collections/chad/ĐÈN CHÙM HOA BAY/ĐÈN CHÙM HOA BAY/5.jpg" },
        { name: "Góc nhìn 6", image: "/collections/chad/ĐÈN CHÙM HOA BAY/ĐÈN CHÙM HOA BAY/6.jpg" },
        { name: "Góc nhìn 7", image: "/collections/chad/ĐÈN CHÙM HOA BAY/ĐÈN CHÙM HOA BAY/7.jpg" },
        { name: "Góc nhìn 8", image: "/collections/chad/ĐÈN CHÙM HOA BAY/ĐÈN CHÙM HOA BAY/8.jpg" },
        { name: "Góc nhìn 9", image: "/collections/chad/ĐÈN CHÙM HOA BAY/ĐÈN CHÙM HOA BAY/9.jpg" },
        { name: "Góc nhìn 10", image: "/collections/chad/ĐÈN CHÙM HOA BAY/ĐÈN CHÙM HOA BAY/10.jpg" },
        { name: "Góc nhìn 11", image: "/collections/chad/ĐÈN CHÙM HOA BAY/ĐÈN CHÙM HOA BAY/11.jpg" },
        { name: "Góc nhìn 12", image: "/collections/chad/ĐÈN CHÙM HOA BAY/ĐÈN CHÙM HOA BAY/12.jpg" },
        { name: "Góc nhìn 13", image: "/collections/chad/ĐÈN CHÙM HOA BAY/ĐÈN CHÙM HOA BAY/13.jpg" }
      ],
      category: "decorative"
    },
    {
      id: 104,
      title: "ĐÈN CHÙM LÁ PHONG",
      slug: "luxury-chandelier-be",
      image: "/collections/chad/ĐÈN CHÙM LÁ PHONG/ĐÈN CHÙM LÁ PHONG/1.jpg",
      price: 36700000,
      description: "Đèn chùm Lá Phong là tác phẩm nghệ thuật lấy cảm hứng từ vẻ đẹp của lá phong mùa thu. Được chế tác từ đồng thau và thủy tinh pha lê cao cấp, đèn mang đến vẻ đẹp tự nhiên và ấm áp cho không gian sống.",
      mainImage: "/collections/chad/ĐÈN CHÙM LÁ PHONG/ĐÈN CHÙM LÁ PHONG/1.jpg",
      variants: [
        { name: "Góc nhìn 1", image: "/collections/chad/ĐÈN CHÙM LÁ PHONG/ĐÈN CHÙM LÁ PHONG/1.jpg" },
        { name: "Góc nhìn 2", image: "/collections/chad/ĐÈN CHÙM LÁ PHONG/ĐÈN CHÙM LÁ PHONG/2.jpg" },
        { name: "Góc nhìn 3", image: "/collections/chad/ĐÈN CHÙM LÁ PHONG/ĐÈN CHÙM LÁ PHONG/3.jpg" },
        { name: "Góc nhìn 4", image: "/collections/chad/ĐÈN CHÙM LÁ PHONG/ĐÈN CHÙM LÁ PHONG/4.jpg" },
        { name: "Góc nhìn 5", image: "/collections/chad/ĐÈN CHÙM LÁ PHONG/ĐÈN CHÙM LÁ PHONG/5.jpg" }
      ],
      category: "decorative"
    },
    {
      id: 105,
      title: "ĐÈN CHÙM SOFIA",
      slug: "luxury-chandelier-cr",
      image: "/collections/chad/ĐÈN CHÙM SOFIA/ĐÈN CHÙM SOFIA/1.jpg",
      price: 63500000,
      description: "Đèn chùm Sofia là tác phẩm nghệ thuật đỉnh cao với thiết kế hiện đại, lấy cảm hứng từ những giọt mưa pha lê. Chất liệu crystal cao cấp kết hợp với thép không gỉ mạ vàng, tích hợp công nghệ LED có thể điều chỉnh nhiệt độ màu từ 3000K đến 6000K.",
      mainImage: "/collections/chad/ĐÈN CHÙM SOFIA/ĐÈN CHÙM SOFIA/1.jpg",
      variants: [
        { name: "Góc nhìn 1", image: "/collections/chad/ĐÈN CHÙM SOFIA/ĐÈN CHÙM SOFIA/1.jpg" },
        { name: "Góc nhìn 2", image: "/collections/chad/ĐÈN CHÙM SOFIA/ĐÈN CHÙM SOFIA/2.jpg" },
        { name: "Góc nhìn 3", image: "/collections/chad/ĐÈN CHÙM SOFIA/ĐÈN CHÙM SOFIA/3.jpg" },
        { name: "Góc nhìn 4", image: "/collections/chad/ĐÈN CHÙM SOFIA/ĐÈN CHÙM SOFIA/4.jpg" },
        { name: "Góc nhìn 5", image: "/collections/chad/ĐÈN CHÙM SOFIA/ĐÈN CHÙM SOFIA/5.jpg" },
        { name: "Góc nhìn 6", image: "/collections/chad/ĐÈN CHÙM SOFIA/ĐÈN CHÙM SOFIA/6.jpg" },
        { name: "Góc nhìn 7", image: "/collections/chad/ĐÈN CHÙM SOFIA/ĐÈN CHÙM SOFIA/7.jpg" },
        { name: "Góc nhìn 8", image: "/collections/chad/ĐÈN CHÙM SOFIA/ĐÈN CHÙM SOFIA/8.jpg" },
        { name: "Góc nhìn 9", image: "/collections/chad/ĐÈN CHÙM SOFIA/ĐÈN CHÙM SOFIA/9.jpg" },
        { name: "Góc nhìn 10", image: "/collections/chad/ĐÈN CHÙM SOFIA/ĐÈN CHÙM SOFIA/10.jpg" },
        { name: "Góc nhìn 11", image: "/collections/chad/ĐÈN CHÙM SOFIA/ĐÈN CHÙM SOFIA/11.jpg" }
      ],
      category: "decorative"
    },
    {
      id: 106,
      title: "ĐÈN CHÙM TRÒN QUẢ CẦU PHA LÊ",
      slug: "luxury-chandelier-ml",
      image: "/collections/chad/ĐÈN CHÙM TRÒN QUẢ CẦU PHA LÊ/ĐÈN CHÙM TRÒN QUẢ CẦU PHA LÊ/1.jpg",
      price: 47800000,
      description: "Đèn chùm tròn quả cầu pha lê là tác phẩm nghệ thuật ánh sáng hiện đại với thiết kế hình tròn quả cầu pha lê lấp lánh. Được chế tác từ đồng mạ vàng và acrylic cao cấp, đèn mang đến không gian sống sang trọng và đẳng cấp.",
      mainImage: "/collections/chad/ĐÈN CHÙM TRÒN QUẢ CẦU PHA LÊ/ĐÈN CHÙM TRÒN QUẢ CẦU PHA LÊ/1.jpg",
      variants: [
        { name: "Góc nhìn 1", image: "/collections/chad/ĐÈN CHÙM TRÒN QUẢ CẦU PHA LÊ/ĐÈN CHÙM TRÒN QUẢ CẦU PHA LÊ/1.jpg" },
        { name: "Góc nhìn 2", image: "/collections/chad/ĐÈN CHÙM TRÒN QUẢ CẦU PHA LÊ/ĐÈN CHÙM TRÒN QUẢ CẦU PHA LÊ/2.jpg" },
        { name: "Góc nhìn 3", image: "/collections/chad/ĐÈN CHÙM TRÒN QUẢ CẦU PHA LÊ/ĐÈN CHÙM TRÒN QUẢ CẦU PHA LÊ/3.jpg" },
        { name: "Góc nhìn 4", image: "/collections/chad/ĐÈN CHÙM TRÒN QUẢ CẦU PHA LÊ/ĐÈN CHÙM TRÒN QUẢ CẦU PHA LÊ/4.jpg" },
        { name: "Góc nhìn 5", image: "/collections/chad/ĐÈN CHÙM TRÒN QUẢ CẦU PHA LÊ/ĐÈN CHÙM TRÒN QUẢ CẦU PHA LÊ/5.jpg" },
        { name: "Góc nhìn 6", image: "/collections/chad/ĐÈN CHÙM TRÒN QUẢ CẦU PHA LÊ/ĐÈN CHÙM TRÒN QUẢ CẦU PHA LÊ/6.jpg" }
      ],
      category: "decorative"
    },
    {
      id: 107,
      title: "ĐÈN CIRCULAR",
      slug: "luxury-chandelier-mc",
      image: "/collections/chad/ĐÈN CIRCULAR/ĐÈN CIRCULAR/1.jpg",
      price: 26900000,
      description: "Đèn Circular là tác phẩm nghệ thuật ánh sáng hiện đại với thiết kế hình tròn tối giản. Được chế tác từ nhôm sơn tĩnh điện cao cấp với công nghệ LED tích hợp, đèn cho phép điều chỉnh nhiệt độ màu từ 3000K đến 6000K, mang đến không gian sống hiện đại và tinh tế.",
      mainImage: "/collections/chad/ĐÈN CIRCULAR/ĐÈN CIRCULAR/1.jpg",
      variants: [
        { name: "Góc nhìn 1", image: "/collections/chad/ĐÈN CIRCULAR/ĐÈN CIRCULAR/1.jpg" },
        { name: "Góc nhìn 2", image: "/collections/chad/ĐÈN CIRCULAR/ĐÈN CIRCULAR/2.jpg" },
        { name: "Góc nhìn 3", image: "/collections/chad/ĐÈN CIRCULAR/ĐÈN CIRCULAR/3.jpg" },
        { name: "Góc nhìn 4", image: "/collections/chad/ĐÈN CIRCULAR/ĐÈN CIRCULAR/4.jpg" },
        { name: "Góc nhìn 5", image: "/collections/chad/ĐÈN CIRCULAR/ĐÈN CIRCULAR/5.jpg" },
        { name: "Góc nhìn 6", image: "/collections/chad/ĐÈN CIRCULAR/ĐÈN CIRCULAR/6.jpg" }
      ],
      category: "decorative"
    },
    {
      id: 108,
      title: "ĐÈN CHÙM MIRA",
      slug: "luxury-pendant-fb",
      image: "/collections/chad/ĐÈN CHÙM MIRA/1.jpg",
      price: 48500000,
      description: "Đèn chùm Mira là tác phẩm nghệ thuật ánh sáng hiện đại với thiết kế độc đáo. Được chế tác từ thép không gỉ mạ vàng và acrylic cao cấp, đèn tạo ra hiệu ứng ánh sáng tinh tế, mang đến không gian sống sang trọng và đẳng cấp.",
      mainImage: "/collections/chad/ĐÈN CHÙM MIRA/1.jpg",
      variants: [
        { name: "Góc nhìn 1", image: "/collections/chad/ĐÈN CHÙM MIRA/1.jpg" },
        { name: "Góc nhìn 2", image: "/collections/chad/ĐÈN CHÙM MIRA/2.jpg" },
        { name: "Góc nhìn 3", image: "/collections/chad/ĐÈN CHÙM MIRA/3.jpg" },
        { name: "Góc nhìn 4", image: "/collections/chad/ĐÈN CHÙM MIRA/4.jpg" },
        { name: "Góc nhìn 5", image: "/collections/chad/ĐÈN CHÙM MIRA/5.jpg" },
        { name: "Góc nhìn 6", image: "/collections/chad/ĐÈN CHÙM MIRA/6.jpg" },
        { name: "Góc nhìn 7", image: "/collections/chad/ĐÈN CHÙM MIRA/7.jpg" },
        { name: "Góc nhìn 8", image: "/collections/chad/ĐÈN CHÙM MIRA/8.jpg" },
        { name: "Góc nhìn 9", image: "/collections/chad/ĐÈN CHÙM MIRA/9.jpg" },
        { name: "Góc nhìn 10", image: "/collections/chad/ĐÈN CHÙM MIRA/10.jpg" },
        { name: "Góc nhìn 11", image: "/collections/chad/ĐÈN CHÙM MIRA/11.jpg" },
        { name: "Góc nhìn 12", image: "/collections/chad/ĐÈN CHÙM MIRA/12.jpg" }
      ],
      category: "decorative"
    },
    {
      id: 109,
      title: "ĐÈN CHÙM PHA LÊ HIRO NODA",
      slug: "luxury-chandelier-gc",
      image: "/collections/chad/ĐÈN CHÙM PHA LÊ HIRO NODA/1.jpg",
      price: 72000000,
      description: "Đèn chùm pha lê Hiro Noda là kiệt tác nghệ thuật ánh sáng với thiết kế cổ điển sang trọng. Được chế tác từ đồng mạ vàng 24K và crystal K9 cao cấp, đèn mang đến vẻ đẹp lộng lẫy và đẳng cấp cho không gian sống.",
      mainImage: "/collections/chad/ĐÈN CHÙM PHA LÊ HIRO NODA/1.jpg",
      variants: [
        { name: "Góc nhìn 1", image: "/collections/chad/ĐÈN CHÙM PHA LÊ HIRO NODA/1.jpg" },
        { name: "Góc nhìn 2", image: "/collections/chad/ĐÈN CHÙM PHA LÊ HIRO NODA/2.jpg" },
        { name: "Góc nhìn 3", image: "/collections/chad/ĐÈN CHÙM PHA LÊ HIRO NODA/3.jpg" },
        { name: "Góc nhìn 4", image: "/collections/chad/ĐÈN CHÙM PHA LÊ HIRO NODA/4.jpg" },
        { name: "Góc nhìn 5", image: "/collections/chad/ĐÈN CHÙM PHA LÊ HIRO NODA/5.jpg" }
      ],
      category: "decorative"
    },
    {
      id: 110,
      title: "ĐÈN CHÙM PHA LÊ STELLA",
      slug: "luxury-pendant-cb",
      image: "/collections/chad/ĐÈN CHÙM PHA LÊ STELLA/1.jpg",
      price: 52800000,
      description: "Đèn chùm pha lê Stella là tác phẩm nghệ thuật ánh sáng với thiết kế bong bóng pha lê tinh tế. Được chế tác từ thủy tinh pha lê và thép không gỉ mạ vàng, đèn mang đến hiệu ứng ánh sáng lấp lánh như những ngôi sao, tạo không gian sống sang trọng và đẳng cấp.",
      mainImage: "/collections/chad/ĐÈN CHÙM PHA LÊ STELLA/1.jpg",
      variants: [
        { name: "Góc nhìn 1", image: "/collections/chad/ĐÈN CHÙM PHA LÊ STELLA/1.jpg" },
        { name: "Góc nhìn 2", image: "/collections/chad/ĐÈN CHÙM PHA LÊ STELLA/2.jpg" },
        { name: "Góc nhìn 3", image: "/collections/chad/ĐÈN CHÙM PHA LÊ STELLA/3.jpg" },
        { name: "Góc nhìn 4", image: "/collections/chad/ĐÈN CHÙM PHA LÊ STELLA/4.jpg" },
        { name: "Góc nhìn 5", image: "/collections/chad/ĐÈN CHÙM PHA LÊ STELLA/5.jpg" },
        { name: "Góc nhìn 6", image: "/collections/chad/ĐÈN CHÙM PHA LÊ STELLA/6.jpg" }
      ],
      category: "decorative"
    },
    {
      id: 111,
      title: "ĐÈN CHÙM PHA LÊ TRÒN HALO",
      slug: "luxury-chandelier-gb",
      image: "/collections/chad/ĐÈN CHÙM PHA LÊ TRÒN HALO/1.jpg",
      price: 66900000,
      description: "Đèn chùm pha lê tròn Halo là tác phẩm nghệ thuật ánh sáng hiện đại với thiết kế vòng tròn hoàn hảo. Được chế tác từ đồng mạ vàng và crystal cao cấp, đèn mang đến hiệu ứng ánh sáng lộng lẫy và sang trọng cho không gian sống.",
      mainImage: "/collections/chad/ĐÈN CHÙM PHA LÊ TRÒN HALO/1.jpg",
      variants: [
        { name: "Góc nhìn 1", image: "/collections/chad/ĐÈN CHÙM PHA LÊ TRÒN HALO/1.jpg" },
        { name: "Góc nhìn 2", image: "/collections/chad/ĐÈN CHÙM PHA LÊ TRÒN HALO/2.jpg" },
        { name: "Góc nhìn 3", image: "/collections/chad/ĐÈN CHÙM PHA LÊ TRÒN HALO/3.jpg" },
        { name: "Góc nhìn 4", image: "/collections/chad/ĐÈN CHÙM PHA LÊ TRÒN HALO/4.jpg" },
        { name: "Góc nhìn 5", image: "/collections/chad/ĐÈN CHÙM PHA LÊ TRÒN HALO/5.jpg" },
        { name: "Góc nhìn 6", image: "/collections/chad/ĐÈN CHÙM PHA LÊ TRÒN HALO/6.jpg" },
        { name: "Góc nhìn 7", image: "/collections/chad/ĐÈN CHÙM PHA LÊ TRÒN HALO/7.jpg" },
        { name: "Góc nhìn 8", image: "/collections/chad/ĐÈN CHÙM PHA LÊ TRÒN HALO/8.jpg" },
        { name: "Góc nhìn 9", image: "/collections/chad/ĐÈN CHÙM PHA LÊ TRÒN HALO/9.jpg" },
        { name: "Góc nhìn 10", image: "/collections/chad/ĐÈN CHÙM PHA LÊ TRÒN HALO/10.jpg" }
      ],
      category: "decorative"
    }
  ];

  // Add decorative light products to the main product array
  return [...productData, ...decorativeLightProducts];
};

// Find product by slug
const getProductBySlug = (slug: string): Product | undefined => {
  const allProducts = getAllProducts();
  return allProducts.find(product => product.slug === slug);
};

// Get suggested products (2 random products from the same category if possible, otherwise any 2 random products)
const getSuggestedProducts = (currentProduct: Product): Product[] => {
  const allProducts = getAllProducts();
  const filteredProducts = allProducts.filter(p => p.id !== currentProduct.id);
  
  // First try to get products from the same category
  if (currentProduct.category) {
    const sameCategory = filteredProducts.filter(p => p.category === currentProduct.category);
    if (sameCategory.length >= 2) {
      // Shuffle and get 2 random products from same category
      return [...sameCategory].sort(() => 0.5 - Math.random()).slice(0, 2);
    }
  }
  
  // If not enough products in the same category, get any random products
  return [...filteredProducts].sort(() => 0.5 - Math.random()).slice(0, 2);
};

// Define a type for the params
interface PageParams {
  slugs: string;
}

export default function ProductPage({ params }: { params: PageParams }) {
  const slug = params.slugs;
  
  const product = getProductBySlug(slug);
  const [selectedImage, setSelectedImage] = useState<string>("");

  if (!product) {
    notFound();
  }

  // Initialize selected image when product loads
  if (!selectedImage && product.mainImage) {
    setSelectedImage(product.mainImage);
  }

  // Get all images including variants for the image gallery
  const allProductImages = [product.mainImage, ...product.variants.map(v => v.image)];
  // Filter out duplicates
  const uniqueProductImages = [...new Set(allProductImages)];
  
  // Get suggested products
  const suggestedProducts = getSuggestedProducts(product);

  // Format price function
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0 
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8 mt-20">
        {/* Product Title for Mobile */}
        <div className="md:hidden mb-6">
          <div className="relative">
            <div className="absolute -left-4 top-0 h-full w-1 bg-red-600"></div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
          </div>
        </div>

        {/* Product Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative bg-gradient-to-br from-red-900 to-black rounded-lg overflow-hidden md:min-h-[600px] p-6">
          {/* Background Branding Text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none overflow-hidden z-20">
            <h1 className="text-[80px] md:text-[200px] font-bold tracking-tighter whitespace-nowrap">
              IDA Lighting
            </h1>
          </div>
          
          {/* Right Column - Product Image, appears first on mobile */}
          <div className="order-1 md:order-1 flex items-center justify-center z-10 min-h-[300px] md:min-h-[500px] w-full overflow-visible">
            <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={selectedImage || product.mainImage || "/placeholder.svg"}
              alt={product.title}
              width={600}
              height={600}
                className="object-contain max-w-full max-h-full transition-opacity duration-300"
                style={{ maxHeight: "100%", width: "auto" }}
            />

            {/* Navigation Arrows - only show if multiple images */}
            {uniqueProductImages.length > 1 && (
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button 
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                  onClick={() => {
                    const currentIndex = uniqueProductImages.indexOf(selectedImage);
                    const prevIndex = currentIndex <= 0 ? uniqueProductImages.length - 1 : currentIndex - 1;
                    setSelectedImage(uniqueProductImages[prevIndex]);
                  }}
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button 
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                  onClick={() => {
                    const currentIndex = uniqueProductImages.indexOf(selectedImage);
                    const nextIndex = currentIndex >= uniqueProductImages.length - 1 ? 0 : currentIndex + 1;
                    setSelectedImage(uniqueProductImages[nextIndex]);
                  }}
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            )}
            </div>
          </div>

          {/* Left Column - Product Info, appears second on mobile */}
          <div className="pl-0 md:pl-12 order-2 md:order-2 flex flex-col justify-center z-10">
            <div className="relative hidden md:block">
              <div className="absolute -left-4 top-0 h-full w-1 bg-red-600"></div>
              <h1 className="text-5xl font-bold mb-8">{product.title}</h1>
            </div>

            <p 
              className="text-gray-400 mb-8 hidden md:block" 
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></p>

            {/* Variants section - only show if there are variants */}
            {product.variants && product.variants.length > 0 && (
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Phiên bản</h3>
                <div className="flex flex-wrap gap-4">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(variant.image)}
                      className={`px-4 py-2 rounded-md border ${
                        selectedImage === variant.image 
                          ? 'border-red-500 bg-red-500/10' 
                          : 'border-gray-700 hover:border-gray-500'
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
            </div>
            )}

            {/* Thumbnails - only display if there are variant images */}
            {uniqueProductImages.length > 1 && (
            <div className="flex space-x-4 mb-8">
                {uniqueProductImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`w-16 h-16 md:w-20 md:h-20 border rounded-sm overflow-hidden ${
                      selectedImage === image 
                        ? 'border-red-500' 
                        : 'border-white/20 hover:border-white/50'
                    }`}
                  >
                  <Image
                    src={image || "/placeholder.svg"}
                      alt={`${product.title} thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                  </button>
              ))}
            </div>
            )}

            {/* Contact Button */}
            <div className="hidden md:block">
              <Link href="https://m.me/855258281507149" target="_blank" rel="noopener noreferrer" className="inline-block w-full">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-md py-3 flex items-center justify-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span className="font-bold">LIÊN HỆ VÀ NHẬN ƯU ĐÃI</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Content - displayed below the product image */}
        <div className="md:hidden mt-6 bg-zinc-900/50 p-6 rounded-lg space-y-6">
          <p 
            className="text-gray-400"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></p>
          
          {/* Removing variant section for mobile to avoid duplication */}

          {/* Contact Button for mobile */}
          <Link href="https://m.me/855258281507149" target="_blank" rel="noopener noreferrer" className="inline-block w-full">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-md py-3 flex items-center justify-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="font-bold">LIÊN HỆ VÀ NHẬN ƯU ĐÃI</span>
            </Button>
          </Link>
          </div>

        {/* Back to Products Button */}
        <div className="mt-12">
          <Link href="/products" className="inline-block">
            <Button variant="outline" className="text-white border-white hover:bg-white/10">
              ← Quay lại trang sản phẩm
            </Button>
          </Link>
        </div>
        
        {/* Suggested Products Section */}
        {suggestedProducts.length > 0 && (
          <div className="mt-20">
            <div className="mb-8">
              <div className="relative">
                <div className="absolute -left-4 top-0 h-full w-1 bg-red-600"></div>
                <h2 className="text-3xl font-bold">Sản phẩm gợi ý</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {suggestedProducts.map((suggestedProduct) => (
                <Link 
                  key={suggestedProduct.id} 
                  href={`/products/${suggestedProduct.slug}`}
                  className="block"
                >
                  <div className="group bg-gradient-to-br from-zinc-900 to-black rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 border border-zinc-800 hover:border-red-500/30">
                    <div className="aspect-[4/3] overflow-hidden">
                      <Image
                        src={suggestedProduct.image || "/placeholder.svg"}
                        alt={suggestedProduct.title}
                        width={600}
                        height={450}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-red-400 transition-colors">
                        {suggestedProduct.title}
                      </h3>
                      <p 
                        className="text-gray-400 line-clamp-2 mb-3 text-sm"
                        dangerouslySetInnerHTML={{ __html: suggestedProduct.description.substring(0, 150) }}
                      ></p>
                      <div className="flex justify-end items-center">
                        <span className="text-white text-sm bg-red-600 rounded-full px-3 py-1">Xem chi tiết</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  )
}
