"use client"
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
  price: number
  specs: ProductSpec[]
}

interface Product {
  id: string
  name: string
  slug: string
  variants: ProductVariant[]
}

interface CollectionsListingProps {
  products: Product[]
  title?: string
}

export default function CollectionsListing({ products, title }: CollectionsListingProps) {
  // Flatten products and variants for display
  const productItems = products.flatMap((product) =>
    product.variants.map((variant) => ({
      product,
      variant,
    })),
  )

  // Group products into rows of 2
  const rows = []
  for (let i = 0; i < productItems.length; i += 2) {
    rows.push(productItems.slice(i, i + 2))
  }

  return (
    <div className="w-full bg-black">
      {title && <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>}
      
      {rows.map((row, rowIndex) => (
        <div key={rowIndex}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
            {row.map(({ product, variant }, index) => (
              <div key={`${product.id}-${variant.id}`} className="flex">
                <div className="w-1/3">
                  <Link href={`/products/${product.slug}`} className="block bg-white p-2 h-44 flex items-center justify-center transition-transform hover:scale-[1.02]">
                    <Image
                      src={variant.image || "/placeholder.svg"}
                      alt={`${product.name} - ${variant.name}`}
                      width={150}
                      height={150}
                      className="object-contain"
                    />
                  </Link>
                  <div className="mt-2 text-center">
                    <Link href={`/products/${product.slug}`} className="text-white font-medium hover:text-red-400 transition-colors block">
                      {variant.name}
                    </Link>
                    <p className="text-white font-medium">
                      GIÁ BÁN: {new Intl.NumberFormat("vi-VN").format(variant.price)} VNĐ
                    </p>
                  </div>
                </div>

                <div className="w-2/3 pl-4">
                  <h3 className="text-white font-medium mb-2">THÔNG SỐ KỸ THUẬT ĐÈN:</h3>
                  <div className="text-white">
                    {variant.specs.map((spec, i) => (
                      <p key={i} className="mb-1">
                        - {spec.label}: {spec.value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {rowIndex < rows.length - 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-t border-dashed border-white opacity-30 w-full"></div>
              <div className="border-t border-dashed border-white opacity-30 w-full"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
