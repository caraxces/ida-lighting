"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

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

interface SuggestedProductsProps {
  allProducts: Product[]
  currentProductId?: string
}

export default function SuggestedProducts({ allProducts, currentProductId }: SuggestedProductsProps) {
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([])

  useEffect(() => {
    // Filter out current product if it exists
    const availableProducts = currentProductId 
      ? allProducts.filter(product => product.id !== currentProductId)
      : allProducts;

    // Get 2 random products
    const getRandomProducts = () => {
      const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 2);
    };

    setSuggestedProducts(getRandomProducts());
  }, [allProducts, currentProductId]);

  if (suggestedProducts.length === 0) return null;

  return (
    <div className="w-full bg-black mt-16">
      <h2 className="text-2xl font-bold mb-8 text-white">Sản Phẩm Đề Xuất</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {suggestedProducts.map((product) => {
          const variant = product.variants[0]; // Use first variant
          return (
            <Link 
              key={product.id} 
              href={`/products/${product.slug}`}
              className="group relative overflow-hidden bg-gradient-to-br from-zinc-900 to-black p-4 rounded-lg border border-zinc-800 transition-all duration-300 hover:border-red-500/50"
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/3 bg-white p-4 rounded-md mb-4 md:mb-0">
                  <Image
                    src={variant.image || "/placeholder.svg"}
                    alt={`${product.name} - ${variant.name}`}
                    width={150}
                    height={150}
                    className="object-contain mx-auto transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                
                <div className="w-full md:w-2/3 md:pl-6">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-red-400 transition-colors">
                    {variant.name}
                  </h3>
                  
                  <div className="space-y-1 text-zinc-400">
                    {variant.specs.slice(0, 4).map((spec, i) => (
                      <p key={i} className="text-sm">
                        {spec.label}: <span className="text-zinc-300">{spec.value}</span>
                      </p>
                    ))}
                    {variant.price && (
                      <p className="text-red-500 font-semibold mt-4">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(variant.price)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          )
        })}
      </div>
    </div>
  )
} 