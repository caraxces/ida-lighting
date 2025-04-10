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
      title: "PRO.S38 (C)",
      slug: "downlight-pros38c",
      image: "/collections/Downlight/IDA0062.JPG",
      price: 1350000,
      description: "Đèn âm trần chống chói với chip OSRAM và độ hoàn màu CRI 97Ra, thiết kế tinh tế mang đến hiệu quả chiếu sáng vượt trội. Phù hợp cho không gian văn phòng, trưng bày và các khu vực cần ánh sáng tập trung với góc chiếu 38°.",
      mainImage: "/collections/Downlight/IDA0062.JPG",
      variants: [
        { name: "PRO.S38 (C)", image: "/collections/Downlight/IDA0062.JPG" },
      ],
      category: "downlight"
    },
    {
      id: 9,
      title: "E35",
      slug: "downlight-e35",
      image: "/collections/Downlight/IDA0069.JPG",
      price: 680000,
      description: "Đèn âm trần chống chói E35 sử dụng chip Osram - Đức với driver Dali lTech, thiết kế hiện đại với kích thước bóng ∅50*H55mm. Với góc chiếu 38° và nhiệt độ màu 4000K, sản phẩm mang đến hiệu quả chiếu sáng chuyên nghiệp.",
      mainImage: "/collections/Downlight/IDA0069.JPG",
      variants: [
        { name: "E35", image: "/collections/Downlight/IDA0069.JPG" },
      ],
      category: "downlight"
    },
    {
      id: 10,
      title: "PRO.S60 (W)",
      slug: "downlight-pros60w",
      image: "/collections/Downlight/IDA0075.JPG",
      price: 1350000,
      description: "Đèn âm trần chống chói PRO.S60 (W) với chip OSRAM và độ hoàn màu CRI 97Ra, kích thước bóng ∅50*H75mm. Góc chiếu 60° mang đến vùng chiếu sáng rộng hơn, phù hợp cho các không gian cần ánh sáng đồng đều trên diện tích lớn.",
      mainImage: "/collections/Downlight/IDA0075.JPG",
      variants: [
        { name: "PRO.S60 (W)", image: "/collections/Downlight/IDA0075.JPG" },
      ],
      category: "downlight"
    },
    {
      id: 11,
      title: "KZBS080550",
      slug: "downlight-kzbs080550",
      image: "/collections/Downlight/IDA0076.JPG",
      price: 680000,
      description: "Đèn âm trần chống chói KZBS080550 sử dụng chip Osram - Đức và driver Dali lTech, kích thước bóng ∅50*H55mm. Với góc chiếu 60° và nhiệt độ màu 4000K, sản phẩm mang đến hiệu quả chiếu sáng đồng đều cho không gian rộng.",
      mainImage: "/collections/Downlight/IDA0076.JPG",
      variants: [
        { name: "KZBS080550", image: "/collections/Downlight/IDA0076.JPG" },
      ],
      category: "downlight"
    },
    {
      id: 12,
      title: "B8-6W",
      slug: "downlight-b8-6w",
      image: "/collections/Downlight/IDA0086.JPG",
      price: 780000,
      description: "Đèn rọi âm trần Spotlight B8-6W màu trắng, sử dụng chip Full Osram - Đức. Góc chiếu hẹp 15° với CRI>97Ra và nhiệt độ màu 3000K, mang đến hiệu ứng ánh sáng tập trung cao, phù hợp cho trưng bày sản phẩm và trang trí.",
      mainImage: "/collections/Downlight/IDA0086.JPG",
      variants: [
        { name: "B8-6W", image: "/collections/Downlight/IDA0086.JPG" },
      ],
      category: "downlight"
    },
    {
      id: 13,
      title: "PRO.S60 (B)",
      slug: "downlight-pros60b",
      image: "/collections/Downlight/IDA0087.JPG",
      price: 680000,
      description: "Đèn âm trần chống ẩm chóa đen PRO.S60 (B) sử dụng chip Osram - Đức với driver Dali lTech. Kích thước bóng ∅50*H55mm với chóa ∅110*H27mm, góc chiếu 60° mang đến hiệu quả chiếu sáng tối ưu với CRI>97.",
      mainImage: "/collections/Downlight/IDA0087.JPG",
      variants: [
        { name: "PRO.S60 (B)", image: "/collections/Downlight/IDA0087.JPG" },
      ],
      category: "downlight"
    },
    {
      id: 14,
      title: "PRO.S60 Combo",
      slug: "downlight-pros60combo",
      image: "/collections/Downlight/IDA0086.JPG",
      price: 830000,
      description: "Combo đèn âm trần chống chói không chỉnh hướng PRO.S60 Combo sử dụng chip Osram - Đức với driver Dali lTech. Kích thước bóng ∅50*H55mm với chóa ∅88*H39mm, góc chiếu 60° mang đến hiệu quả chiếu sáng đồng đều với CRI>97.",
      mainImage: "/collections/Downlight/IDA0086.JPG",
      variants: [
        { name: "PRO.S60 Combo", image: "/collections/Downlight/IDA0086.JPG" },
      ],
      category: "downlight"
    },
    {
      id: 15,
      title: "PRO.S60 (S)",
      slug: "downlight-pros60s",
      image: "/collections/Downlight/IDA0075.JPG",
      price: 795000,
      description: "Combo đèn âm trần chống chói chỉnh hướng góc 15° PRO.S60 (S) sử dụng chip Osram - Đức với driver Osram. Kích thước bóng ∅50*H55mm với chóa ∅88*H39mm, góc chiếu 60° mang đến hiệu quả chiếu sáng đa dạng với CRI>97.",
      mainImage: "/collections/Downlight/IDA0075.JPG",
      variants: [
        { name: "PRO.S60 (S)", image: "/collections/Downlight/IDA0075.JPG" },
      ],
      category: "downlight"
    }
  ];
  
  return productData;
};

// Find product by slug
const getProductBySlug = (slug: string): Product | undefined => {
  const allProducts = getAllProducts();
  return allProducts.find(product => product.slug === slug);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative bg-gradient-to-br from-red-900 to-black rounded-lg overflow-hidden md:h-[600px] aspect-square md:aspect-auto p-6">
          {/* Background Branding Text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none overflow-hidden z-20">
            <h1 className="text-[80px] md:text-[200px] font-bold tracking-tighter whitespace-nowrap">
              IDA Lighting
            </h1>
          </div>
          
          {/* Right Column - Product Image, appears first on mobile */}
          <div className="order-1 md:order-1 flex items-center justify-center z-10">
            <Image
              src={selectedImage || product.mainImage || "/placeholder.svg"}
              alt={product.title}
              width={600}
              height={600}
              className="object-contain transition-opacity duration-300"
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

          {/* Left Column - Product Info, appears second on mobile */}
          <div className="pl-0 md:pl-12 order-2 md:order-2 flex flex-col justify-center z-10">
            <div className="relative hidden md:block">
              <div className="absolute -left-4 top-0 h-full w-1 bg-red-600"></div>
              <h1 className="text-5xl font-bold mb-8">{product.title}</h1>
            </div>

            <p className="text-gray-400 mb-8 hidden md:block">{product.description}</p>

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
              <Link href="https://m.me/855258281507149" target="_blank" rel="noopener noreferrer">
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
          <p className="text-gray-400">{product.description}</p>
          
          {/* Variants section for mobile - only show if there are variants */}
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
          
          {/* Thumbnails for mobile - only display if there are variant images */}
          {uniqueProductImages.length > 1 && (
            <div className="flex space-x-4 mb-8">
                {uniqueProductImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`w-16 h-16 border rounded-sm overflow-hidden ${
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
          
          {/* Contact Button for mobile */}
          <Link href="https://m.me/855258281507149" target="_blank" rel="noopener noreferrer">
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
          <Link href="/products">
            <Button variant="outline" className="text-white border-white hover:bg-white/10">
              ← Quay lại trang sản phẩm
            </Button>
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
