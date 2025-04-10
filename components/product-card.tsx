import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
  variant?: "default" | "compact"
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  if (variant === "compact") {
    return (
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-3">
          <Image
            src={product.mainImage || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <h3 className="text-sm font-medium">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500">${product.price}</p>
      </Link>
    )
  }

  return (
    <div className="group relative bg-white p-6 rounded-lg shadow-md">
      <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
        <Image
          src={product.mainImage || "/placeholder.svg"}
          alt={product.name}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-lg font-bold">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="mt-1 text-gray-500">{product.colors.length} colors</p>
        </div>
        <p className="text-lg font-medium">${product.price}</p>
      </div>
      <Button className="mt-4 w-full" variant="default">
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to cart
      </Button>
    </div>
  )
}
